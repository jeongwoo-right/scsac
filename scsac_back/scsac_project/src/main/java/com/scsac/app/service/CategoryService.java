package com.scsac.app.service;

import java.util.List;

import com.scsac.app.dto.Category;
import com.scsac.app.dto.response.CategoryResponseDto;
import com.scsac.app.entity.ArticleEntity;
import com.scsac.app.entity.CategoryEntity;

public interface CategoryService {

	List<CategoryResponseDto> getCategories();

	CategoryEntity addCategory(String title);

	List<ArticleEntity> getArticlesByCategoryId(Long id);

	void deleteCategory(Long id);

}
