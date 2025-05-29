package com.scsac.app.mapper;

import org.springframework.stereotype.Component;

import com.scsac.app.dto.request.AlertRequestDto;
import com.scsac.app.dto.response.AlertResponseDto;
import com.scsac.app.entity.AlertEntity;
import com.scsac.app.entity.ArticleEntity;
import com.scsac.app.entity.CommentEntity;
import com.scsac.app.entity.UserEntity;
import com.scsac.app.repository.ArticleRepository;
import com.scsac.app.repository.CommentRepository;
import com.scsac.app.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AlertMapper {
	
	private final ArticleMapper am;
	private final CommentMapper cm;
	private final UserMapper um;
	
	public AlertEntity toEntity(AlertRequestDto a) {
		return AlertEntity.builder()
				.article(ArticleEntity.builder().id(a.getArticleId()).build())
				.recieceComment(CommentEntity.builder().id(a.getCommentId()).build())
				.sendUser(UserEntity.builder().id(a.getType()).build())
				.receiveUser(UserEntity.builder().id(a.getReceiverId()).build())
				.type(a.getType())
				.build();
	}
	
	public AlertResponseDto toDto(AlertEntity a) {
		return AlertResponseDto.builder()
				.article(am.toDto(a.getArticle()))
				.recieceComment(cm.toDto(a.getRecieceComment()))
				.sendUser(um.toDto(a.getSendUser()))
				.receiveUser(um.toDto(a.getReceiveUser()))
				.type(a.getType())
				.build();
	}
}
