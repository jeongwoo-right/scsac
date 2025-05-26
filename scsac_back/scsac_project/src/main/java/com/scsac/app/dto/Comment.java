package com.scsac.app.dto;

import java.time.LocalDateTime;
import java.util.function.Consumer;

import com.scsac.app.entity.CommentEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Comment {
	private Long id;
	private String userId;
	private Long articleId;
	private String content;
	private LocalDateTime createdAt;
	public static Comment toDto(CommentEntity ce) {
		return new Comment(ce.getId(), ce.getUserId(), ce.getArticleId(), ce.getContent(), ce.getCreatedAt());
	}
}
