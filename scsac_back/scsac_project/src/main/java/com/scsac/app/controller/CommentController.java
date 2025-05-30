package com.scsac.app.controller;

import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scsac.app.dto.request.AlertRequestDto;
import com.scsac.app.dto.request.CommentRequestDto;
import com.scsac.app.dto.response.AlertResponseDto;
import com.scsac.app.dto.response.ArticleResponseDto;
import com.scsac.app.dto.response.CommentResponseDto;
import com.scsac.app.dto.response.UserResponseDto;
import com.scsac.app.entity.AlertEntity;
import com.scsac.app.service.AlertService;
import com.scsac.app.service.ArticleService;
import com.scsac.app.service.CommentService;
import com.scsac.app.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/comment")
@RequiredArgsConstructor
public class CommentController {

	private final CommentService cs;
	private final ArticleService as;
	private final AlertService als;
	private final UserService us;

	@PostMapping
	public ResponseEntity<?> addComment(@RequestBody CommentRequestDto comment){
		CommentResponseDto saved = cs.insertComment(comment);

		List<AlertResponseDto> savedAlert = new ArrayList<>();

		ArticleResponseDto a = as.getArticleById(comment.getArticleId());
		if (!saved.getUser().getId().equals(a.getUser().getId())) {
			AlertRequestDto alert = AlertRequestDto.builder()
					.articleId(comment.getArticleId())
					.commentId(saved.getId())
					.receiverId(a.getUser().getId())
					.senderId(comment.getUserId())
					.type("comment")
					.build();
			savedAlert.add(als.addAlert(alert));
		}

		Set<String> mentioned = new HashSet<>();

		String[] words = comment.getContent().split(" ");
		for(String word:words) {
			if('@'==word.charAt(0)) {
				try {
					UserResponseDto recieveUser =  us.findbyId(word.substring(1));
					if (!recieveUser.getId().equals(a.getUser().getId())) {
						mentioned.add(word.substring(1));
					}
				} catch (Exception e) {}
			}
		}
		List<AlertRequestDto> mentions = new ArrayList<>();
		for(String reciever : mentioned) {
			AlertRequestDto mentionalert = AlertRequestDto.builder()
					.articleId(comment.getArticleId())
					.commentId(saved.getId())
					.receiverId(reciever)
					.senderId(comment.getUserId())
					.type("mention")
					.build();
			mentions.add(mentionalert);
		}

		savedAlert.addAll(als.addAllAlert(mentions));
		return ResponseEntity.ok(saved);
	}


	@DeleteMapping("/{id}")
	@PreAuthorize("hasPermission(#id, 'comment', 'write')")
	public ResponseEntity<?> deleteComment(@PathVariable("id") Long id){
		cs.deleteComment(id);
		return ResponseEntity.ok().build();
	}
}
