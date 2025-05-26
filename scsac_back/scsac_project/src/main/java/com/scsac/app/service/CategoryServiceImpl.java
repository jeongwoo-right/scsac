package com.scsac.app.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.scsac.app.dto.Category;
import com.scsac.app.dto.response.CategoryResponseDto;
import com.scsac.app.entity.ArticleEntity;
import com.scsac.app.entity.CategoryEntity;
import com.scsac.app.mapper.CategoryMapper;
import com.scsac.app.repository.ArticleRepository;
import com.scsac.app.repository.CategoryRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

	private final CategoryRepository cr;
	private final ArticleRepository ar;

	@Override
	public List<CategoryResponseDto> getCategories() {
		return cr.findAll().stream().map(CategoryMapper::toDto).toList();
	}

	@Override
	@Transactional
	public CategoryEntity addCategory(String title) {
		CategoryEntity category = CategoryEntity.builder()
				.title(title)
				.build();
		return cr.save(category);
	}

	@Override
	public List<ArticleEntity> getArticlesByCategoryId(Long id) {
		List<ArticleEntity> articles = ar.findAllByCategoryId(id);
		return articles;
	}

	@Override
	public void deleteCategory(Long id) {
		cr.deleteById(id);
	}

}
