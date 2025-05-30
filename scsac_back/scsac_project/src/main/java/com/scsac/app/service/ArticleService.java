package com.scsac.app.service;

import java.util.List;

import com.scsac.app.dto.request.ArticleRequestDto;
import com.scsac.app.dto.response.ArticleResponseDto;
import com.scsac.app.entity.ArticleEntity;

public interface ArticleService {

	ArticleResponseDto getArticleById(Long id);

	ArticleResponseDto addArticle(ArticleRequestDto article);

	void increaseViewCount(Long articleId);

	ArticleResponseDto putArticle(Long id, ArticleRequestDto article);

	int deleteArticle(Long id);

	List<String> getAllArticleContents();
	List<ArticleResponseDto> getArticleByUserId(String id);

}
