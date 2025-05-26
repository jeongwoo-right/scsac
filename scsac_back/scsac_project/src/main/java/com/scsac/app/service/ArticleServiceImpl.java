package com.scsac.app.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.scsac.app.dto.Article;
import com.scsac.app.dto.Comment;
import com.scsac.app.entity.ArticleEntity;
import com.scsac.app.entity.CategoryEntity;
import com.scsac.app.entity.UserEntity;
import com.scsac.app.repository.ArticleRepository;
import com.scsac.app.repository.CategoryRepository;
import com.scsac.app.repository.CommentRepository;
import com.scsac.app.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ArticleServiceImpl implements ArticleService {
	
	private final UserRepository ur;
	private final ArticleRepository ar;
	private final CategoryRepository ctr;
	private final CommentRepository cr;
	
	public void fillComments(Article article){
		List<Comment> comments = cr.findAllByArticleId(article.getId()).stream().map(Comment::toDto).collect(Collectors.toList());
		article.setComments(comments);
	}
	
	@Override
	public Article getArticleById(Long id) {
		ArticleEntity articleE = ar.findById(id)
									.orElseThrow(() -> new NoSuchElementException("해당 게시글이 존재하지 않습니다. id=" + id));
		Article article = Article.toDto(articleE);
		fillComments(article);
		return article;
	}

	@Override
	public Article addArticle(Article article) {
		System.out.println(article);
		UserEntity user = ur.findById(article.getUserId())
			    .orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다."));

		CategoryEntity category = ctr.findById(article.getCategoryId())
			    .orElseThrow(() -> new IllegalArgumentException("해당 카테고리가 없습니다."));
		
		ArticleEntity ae = ArticleEntity.toEntity(article);
		ae.setCategory(category);
		ae.setUser(user);
		return Article.toDto(ae);
	}

}
