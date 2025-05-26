package com.scsac.app.service;

import java.util.NoSuchElementException;

import org.springframework.stereotype.Service;

import com.scsac.app.entity.ArticleEntity;
import com.scsac.app.repository.ArticleRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ArticleServiceImpl implements ArticleService {

	private final ArticleRepository ar;
	
	@Override
	public ArticleEntity getArticleById(Long id) {
		ArticleEntity article = ar.findById(id)
									.orElseThrow(() -> new NoSuchElementException("해당 게시글이 존재하지 않습니다. id=" + id));
		return article;
	}

}
