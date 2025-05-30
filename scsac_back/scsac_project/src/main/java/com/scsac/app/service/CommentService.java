package com.scsac.app.service;

import java.util.List;

import com.scsac.app.dto.request.CommentRequestDto;
import com.scsac.app.dto.response.CommentResponseDto;

public interface CommentService {

	CommentResponseDto insertComment(CommentRequestDto comment);

	void deleteComment(Long id);

	List<CommentResponseDto> getCommentByUserId(String id);

}
