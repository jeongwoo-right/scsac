package com.scsac.app.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.scsac.app.dto.Category;
import com.scsac.app.entity.ArticleEntity;
import com.scsac.app.entity.CategoryEntity;
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
	public List<Category> getCategories() {
		List<CategoryEntity> ces = cr.findAll();
		List<Category> cs = new ArrayList<>();
		for (CategoryEntity ce : ces) {
			cs.add(CategoryEntity.toDto(ce));
		}
		return cs;
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

}
