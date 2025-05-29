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
	private final UserRepository ur;
	private final CommentRepository cr;
	private final ArticleRepository ar;
	
	public AlertEntity toEntity(AlertRequestDto a) {
		UserEntity senderEntity = ur.findById(a.getSenderId())
			    .orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다."));
		UserEntity recieverEntity = ur.findById(a.getReceiverId())
				.orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다."));
		
		CommentEntity comment = cr.findById(a.getCommentId())
				.orElseThrow(() -> new IllegalArgumentException("해당 댓글이 없습니다."));
		
		ArticleEntity article = ar.findById(a.getArticleId())
				.orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다."));
		
		return AlertEntity.builder()
				.article(article)
				.recieceComment(comment)
				.sendUser(senderEntity)
				.receiveUser(recieverEntity)
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
