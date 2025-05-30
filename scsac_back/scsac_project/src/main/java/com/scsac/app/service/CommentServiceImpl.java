package com.scsac.app.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.scsac.app.dto.request.CommentRequestDto;
import com.scsac.app.dto.response.CommentResponseDto;
import com.scsac.app.entity.CommentEntity;
import com.scsac.app.mapper.CommentMapper;
import com.scsac.app.repository.CommentRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {
	
	private final CommentRepository cr;
	private final CommentMapper cm;
	
	@Override
	public CommentResponseDto insertComment(CommentRequestDto comment) {
		CommentEntity ce = cr.save(cm.toEntity(comment));
		return cm.toDto(ce);
	}

	@Override
	public void deleteComment(Long id) {
		cr.deleteById(id);
	}

	@Override
	public List<CommentResponseDto> getCommentByUserId(String id) {
		List<CommentEntity> comments = cr.findAllByUser_Id(id);
		return comments.stream().map(cm::toDto).toList();
	}

}
