package com.scsac.app.service;

import com.scsac.app.dto.request.CommentRequestDto;
import com.scsac.app.dto.response.CommentResponseDto;

public interface CommentService {

	CommentResponseDto insertComment(CommentRequestDto comment);

	void deleteComment(Long id);

}
