package com.scsac.app.service;

import com.scsac.app.dto.request.ArticleRequestDto;
import com.scsac.app.dto.response.ArticleResponseDto;
import com.scsac.app.entity.ArticleEntity;

public interface ArticleService {

	ArticleResponseDto getArticleById(Long id);

	ArticleResponseDto addArticle(ArticleRequestDto article);

	void increaseViewCount(Long articleId);

	ArticleResponseDto putArticle(Long id, ArticleRequestDto article);

}
