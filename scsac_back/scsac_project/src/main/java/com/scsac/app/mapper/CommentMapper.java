package com.scsac.app.mapper;

import java.time.LocalDateTime;

import org.springframework.stereotype.Component;

import com.scsac.app.dto.request.CommentRequestDto;
import com.scsac.app.dto.response.CommentResponseDto;
import com.scsac.app.entity.ArticleEntity;
import com.scsac.app.entity.CommentEntity;
import com.scsac.app.entity.UserEntity;
import com.scsac.app.repository.ArticleRepository;
import com.scsac.app.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class CommentMapper {
	
	private final UserRepository ur;
	private final ArticleRepository ar;
	private final UserMapper um;
	
	public CommentEntity toEntity(CommentRequestDto c) {
		
		UserEntity userEntity = ur.findById(c.getUserId())
			    .orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다."));
		ArticleEntity articleEntity = ar.findById(c.getArticleId())
				.orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다."));
		
		return CommentEntity.builder()
				.user(userEntity)
				.article(articleEntity)
				.content(c.getContent())
				.createdAt(LocalDateTime.now())
				.build();
	}
	
	public CommentResponseDto toDto(CommentEntity ce) {
		
		return CommentResponseDto.builder()
				.id(ce.getId())
				.user(um.toDto(ce.getUser()))
				.articleId(ce.getArticle().getId())
				.content(ce.getContent())
				.createdAt(ce.getCreatedAt())
				.build();
	}
}
