package com.scsac.app.controller;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.google.gson.Gson;
import com.google.gson.annotations.SerializedName;
import com.scsac.app.service.ArticleService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/ai")
@RequiredArgsConstructor
public class AiController {

    private final ArticleService as;
    private final String apiKey = "";
    private final String endpoint = "https://api.openai.com/v1/chat/completions";

    @PostMapping
    public ResponseEntity<?> aibot(@RequestBody Map<String, String> map) throws IOException, InterruptedException {
        List<String> articles = as.getAllArticleContents();

        String question = map.get("question");
        String systemContent = "너는 게시판을 참고해서 사용자에게 정보를 주는 챗봇이야. 해당 게시판은 SCSA라는 교육기관의 커뮤니티이고, 그 교육기관의 학생들이 사용자야. 다음 자료들을 참고해서 알려줘. 자료에 참고할 만한 내용이 없으면 다시 한번 검토해. 자료 없다고 안내하고 끝내지말고, 꼭 유의미한 정보를 제공해야해. 형식은 친절한 안내원의 말처럼. 이모티콘도 추가해";
        String fullContent = systemContent + "\n\n<질문>\n" + question + "\n\n<참고자료>\n" + String.join("\n", articles);

        ChatRequest.Message message = new ChatRequest.Message("user", fullContent);
        ChatRequest chatRequest = new ChatRequest("gpt-3.5-turbo", List.of(message));

        Gson gson = new Gson();
        String json = gson.toJson(chatRequest);

        HttpRequest request = HttpRequest.newBuilder()
        		.timeout(Duration.ofSeconds(25))
                .uri(URI.create(endpoint))
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer " + apiKey)
                .POST(HttpRequest.BodyPublishers.ofString(json, StandardCharsets.UTF_8))
                .build();

        HttpClient client = HttpClient.newBuilder()
        								.connectTimeout(Duration.ofSeconds(10))
        								.build();
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

        return ResponseEntity.ok(response.body());
    }

    static class ChatRequest {
        String model;
        List<Message> messages;

        ChatRequest(String model, List<Message> messages) {
            this.model = model;
            this.messages = messages;
        }

        static class Message {
            String role;
            String content;

            Message(String role, String content) {
                this.role = role;
                this.content = content;
            }
        }
    }
}
