package com.scsac.app.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.scsac.app.dto.request.CategoryRequestDto;
import com.scsac.app.dto.response.ArticleResponseDto;
import com.scsac.app.dto.response.CategoryResponseDto;
import com.scsac.app.service.CategoryService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/category")
@RequiredArgsConstructor
public class CategoryController {
	
	private final CategoryService cs;
	
	@GetMapping
	public ResponseEntity<?> getCategories(){
		List<CategoryResponseDto> categories = cs.getCategories();
		return ResponseEntity.ok(categories);
	}
	
	@GetMapping("/{id}")
	@PreAuthorize("hasPermission(#id, 'category', 'read')")
	public ResponseEntity<?> getArticleByCategory(@PathVariable("id") Long id,
													@RequestParam String sort,
													@RequestParam int page,
													@RequestParam int size,
													@RequestParam String condition,
													@RequestParam String keyword){
		System.out.println(sort);
		Page<ArticleResponseDto> articles = cs.getArticlesByCategoryId(id, sort, page, size, condition, keyword);
		return ResponseEntity.ok(articles);
	}
	
	@PostMapping
	public ResponseEntity<?> addCategory(@RequestBody CategoryRequestDto category){
		CategoryResponseDto saved = cs.addCategory(category);
		if (saved==null) {
			return ResponseEntity.badRequest().build();
		} else {
			return ResponseEntity.ok(saved);
		}
	}
	
	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('Admin')")
	public ResponseEntity<?> deleteCategory(@PathVariable("id") Long id){
		cs.deleteCategory(id);
		return ResponseEntity.ok().build();
	}
	
	
}
