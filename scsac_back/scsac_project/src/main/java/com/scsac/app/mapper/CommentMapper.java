package com.scsac.app.mapper;

import org.springframework.stereotype.Component;

import com.scsac.app.dto.response.CommentResponseDto;
import com.scsac.app.entity.CommentEntity;

@Component
public class CommentMapper {
	
	public static CommentResponseDto toDto(CommentEntity ce) {
		return null;
	}
}
