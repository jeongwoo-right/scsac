package com.scsac.app.dto.response;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ArticleResponseDto {
	private Long id;
    private CategoryResponseDto category;
    private String title;
    private UserResponseDto user;
    private String content;
    private LocalDateTime createdAt;
    private int views;
    private int isUpdated;
    private List<CommentResponseDto> comments;
}
