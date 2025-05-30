package com.scsac.app.service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.scsac.app.dto.request.ArticleRequestDto;
import com.scsac.app.dto.response.ArticleResponseDto;
import com.scsac.app.entity.ArticleEntity;
import com.scsac.app.entity.CategoryEntity;
import com.scsac.app.entity.UserEntity;
import com.scsac.app.mapper.ArticleMapper;
import com.scsac.app.repository.ArticleRepository;
import com.scsac.app.repository.CategoryRepository;
import com.scsac.app.repository.CommentRepository;
import com.scsac.app.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ArticleServiceImpl implements ArticleService {
	
	private final ArticleRepository ar;
	private final ArticleMapper am;
	
	
	@Override
	@Transactional
	public ArticleResponseDto getArticleById(Long id) {
		ArticleEntity articleE = ar.findById(id)
									.orElseThrow(() -> new NoSuchElementException("해당 게시글이 존재하지 않습니다. id=" + id));
		ArticleResponseDto article = am.toDto(articleE);
		return article;
	}

	@Override
	@Transactional
	public ArticleResponseDto addArticle(ArticleRequestDto article) {
		ArticleEntity ae = ar.save(am.toEntity(article));
		return am.toDto(ae);
	}

	@Override
	@Transactional
	public void increaseViewCount(Long articleId) {
	    ArticleEntity article = ar.findById(articleId)
	        .orElseThrow(() -> new RuntimeException("게시글이 존재하지 않습니다."));
	    article.setViews(article.getViews() + 1);
	}

	@Override
	@Transactional
	public ArticleResponseDto putArticle(Long id, ArticleRequestDto article) {
		ArticleEntity ae = ar.findById(id)
							.orElseThrow(()->new NoSuchElementException("해당 게시들이 존재하지 않습니다. id="+id));
		ae.setIsUpdated(1);
		ae.setTitle(article.getTitle());
		ae.setContent(article.getContent());
		ae.setCategory(CategoryEntity.builder().id(article.getCategoryId()).build());
		return am.toDto(ae);
	}

	@Override
	@Transactional
	public int deleteArticle(Long id) {
		ar.deleteById(id);
		return 1;
	}

	@Override
	public List<String> getAllArticleContents() {
		List<ArticleEntity> articles = ar.findAll();
		List<String> res = new ArrayList<>();
		for (ArticleEntity article : articles) {
			res.add("title :"+article.getTitle()+"/ content :"+article.getContent());
		}
		return res;
	}

}
