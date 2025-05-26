package com.scsac.app.service;

import com.scsac.app.dto.Article;
import com.scsac.app.entity.ArticleEntity;

public interface ArticleService {

	Article getArticleById(Long id);

	Article addArticle(Article article);

}
