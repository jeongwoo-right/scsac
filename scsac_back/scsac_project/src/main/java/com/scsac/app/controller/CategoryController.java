package com.scsac.app.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.scsac.app.dto.Article;
import com.scsac.app.dto.Category;
import com.scsac.app.entity.ArticleEntity;
import com.scsac.app.entity.CategoryEntity;
import com.scsac.app.service.CategoryService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/category")
@RequiredArgsConstructor
public class CategoryController {
	
	private final CategoryService cs;
	
	@GetMapping
	public ResponseEntity<?> getCategories(){
		List<Category> categories = cs.getCategories();
		if(categories==null || categories.size()==0) {
			return ResponseEntity.noContent().build();
		} else {
			return ResponseEntity.ok(categories);
		}
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getArticleByCategory(@PathVariable("id") Long id){
		List<ArticleEntity> articles = cs.getArticlesByCategoryId(id);
		if(articles==null || articles.size()==0) {
			return ResponseEntity.noContent().build();
		} else {
			return ResponseEntity.ok(articles);
		}
		
	}
	
	@PostMapping
	public ResponseEntity<?> addCategory(@RequestBody Category category){
		CategoryEntity saved = cs.addCategory(category.getTitle());
		if (saved==null) {
			return ResponseEntity.badRequest().build();
		} else {
			return ResponseEntity.ok().build();
		}
	}
}
