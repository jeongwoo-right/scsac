package com.scsac.app.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.scsac.app.dto.request.ArticleRequestDto;
import com.scsac.app.dto.request.UserRequestDto;
import com.scsac.app.dto.response.ArticleResponseDto;
import com.scsac.app.service.ArticleService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/article")
@RequiredArgsConstructor
public class ArticleController {
	
	private final ArticleService as;
	
	@GetMapping("/{id}")
	@PreAuthorize("hasPermission(#id, 'article', 'read')")
	public ResponseEntity<?> getArticleById(@PathVariable("id") Long id){
		ArticleResponseDto article = as.getArticleById(id);
		if(article==null) {
			return ResponseEntity.noContent().build();
		} else {
			as.increaseViewCount(id);
			return ResponseEntity.ok(article);
		}
	}
	
	@PostMapping
	@PreAuthorize("hasPermission(#article.getCategoryId(), 'article', 'write')")
	public ResponseEntity<?> addArticle(@RequestBody ArticleRequestDto article){
		ArticleResponseDto saved = as.addArticle(article);
		return ResponseEntity.ok(saved);
	}
	
	@PreAuthorize("hasPermission(#id, 'article', 'update')")
	@PutMapping("/{id}")
	public ResponseEntity<?> modifyArticle(@PathVariable("id") Long id, @RequestBody ArticleRequestDto article){
		ArticleResponseDto saved = as.putArticle(id, article);
		return ResponseEntity.ok(saved);
	}
	
	@PreAuthorize("hasPermission(#id, 'article', 'update')")
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteArticle(@PathVariable("id") Long id){
		int r = 0;
		r=as.deleteArticle(id);
		if (r==0) {
			return ResponseEntity.badRequest().build();
		}
		return ResponseEntity.ok().build();
	}
	
	@GetMapping("/user")
	public ResponseEntity<?> getArticleByUser(@RequestParam("id") String id){
		List<ArticleResponseDto> articles = as.getArticleByUserId(id);
		return ResponseEntity.ok(articles);
	}
	
}
