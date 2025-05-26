package com.scsac.app.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scsac.app.entity.ArticleEntity;
import com.scsac.app.service.ArticleService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/article")
@RequiredArgsConstructor
public class ArticleController {
	
	private final ArticleService as;
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getArticleById(@PathVariable("id") Long id){
		ArticleEntity article = as.getArticleById(id);
		if(article==null) {
			return ResponseEntity.noContent().build();
		} else {
			return ResponseEntity.ok(article);
		}
	}
}
