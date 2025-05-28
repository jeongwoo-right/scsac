package com.scsac.app.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.scsac.app.dto.request.CategoryRequestDto;
import com.scsac.app.dto.response.ArticleResponseDto;
import com.scsac.app.dto.response.CategoryResponseDto;
import com.scsac.app.entity.ArticleEntity;
import com.scsac.app.entity.CategoryEntity;

public interface CategoryService {

	List<CategoryResponseDto> getCategories();

	void deleteCategory(Long id);

	CategoryResponseDto addCategory(CategoryRequestDto category);

	Page<ArticleResponseDto> getArticlesByCategoryId(Long id, String sort, int page, int size);
}
