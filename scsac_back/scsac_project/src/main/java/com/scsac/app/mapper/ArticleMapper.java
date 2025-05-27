package com.scsac.app.mapper;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.scsac.app.dto.request.ArticleRequestDto;
import com.scsac.app.dto.response.ArticleResponseDto;
import com.scsac.app.dto.response.CommentResponseDto;
import com.scsac.app.entity.ArticleEntity;
import com.scsac.app.entity.CategoryEntity;
import com.scsac.app.entity.UserEntity;
import com.scsac.app.repository.ArticleRepository;
import com.scsac.app.repository.CategoryRepository;
import com.scsac.app.repository.CommentRepository;
import com.scsac.app.repository.UserRepository;
import com.scsac.app.mapper.CommentMapper;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ArticleMapper {
	
	private final UserRepository ur;
	private final CategoryRepository ctr;
	private final ArticleRepository ar;
	private final CommentRepository cr;
	private final CommentMapper cm;
	private final CategoryMapper ctm;
	private final UserMapper um;
	
	public ArticleEntity toEntity(ArticleRequestDto a) {
		
		UserEntity userEntity = ur.findById(a.getUserId())
			    .orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다."));

		CategoryEntity categoryEntity = ctr.findById(a.getCategoryId())
			    .orElseThrow(() -> new IllegalArgumentException("해당 카테고리가 없습니다."));

		return ArticleEntity.builder()
				.content(a.getContent())
				.title(a.getTitle())
				.user(userEntity)
				.category(categoryEntity)
				.createdAt(LocalDateTime.now())
				.views(0)
				.isUpdated(0).build();
	}
	

	public ArticleResponseDto toDto(ArticleEntity ae) {
		List<CommentResponseDto> comments = cr.findAllByArticleId(ae.getId()).stream()
												.map(comment -> cm.toDto(comment))
												.collect(Collectors.toList());
		return ArticleResponseDto.builder()
					.id(ae.getId())
					.title(ae.getTitle())
					.content(ae.getContent())
					.createdAt(ae.getCreatedAt())
					.category(ctm.toDto(ae.getCategory()))
					.views(ae.getViews())
					.comments(comments)
					.isUpdated(ae.getIsUpdated())
					.user(um.toDto(ae.getUser()))
					.build();
					
	}
}
