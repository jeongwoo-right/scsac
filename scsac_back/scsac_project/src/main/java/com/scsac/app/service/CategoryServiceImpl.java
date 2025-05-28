package com.scsac.app.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.scsac.app.dto.request.CategoryRequestDto;
import com.scsac.app.dto.response.ArticleResponseDto;
import com.scsac.app.dto.response.CategoryResponseDto;
import com.scsac.app.entity.ArticleEntity;
import com.scsac.app.entity.CategoryEntity;
import com.scsac.app.mapper.ArticleMapper;
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
	private final CategoryMapper cm;
	private final ArticleMapper am;

	@Override
	public List<CategoryResponseDto> getCategories() {
		return cr.findAll().stream().map(CategoryMapper::toDto).toList();
	}

	@Override
	@Transactional
	public CategoryResponseDto addCategory(CategoryRequestDto category) {
		CategoryEntity categoryEntity = cm.toEntity(category);
		return cm.toDto(cr.save(categoryEntity));
	}

	@Override
	public Page<ArticleResponseDto> getArticlesByCategoryId(Long id, String sort, int page, int size, String condition, String keyword) {
		Pageable pageable = null;
		switch(sort) {
		case("viewCount") : pageable = PageRequest.of(page, size, Sort.by("views").descending()); break;
		case("datedDesc") : pageable = PageRequest.of(page, size, Sort.by("createdAt").descending()); break;
		case("dateAsc") : pageable = PageRequest.of(page, size, Sort.by("createdAt").ascending()); break;
		}

		Page<ArticleEntity> articles = null;
	    if (keyword == null || keyword.trim().isEmpty()) {
	        articles = ar.findAllByCategoryId(id, pageable);
	    } else {
	        articles = switch (condition) {
	            case "title" -> ar.findAllByCategoryIdAndTitleContaining(id, keyword, pageable);
	            case "writer" -> ar.findAllByCategoryIdAndUser_NameContaining(id, keyword, pageable);
	            default -> ar.findAllByCategoryId(id, pageable);
	        };
	    }
		return articles.map(am::toDto);
	}

	@Override
	public void deleteCategory(Long id) {
		cr.deleteById(id);
	}

}
