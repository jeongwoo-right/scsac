package com.scsac.app.dto.response;

import java.time.LocalDateTime;

import com.scsac.app.entity.CategoryEntity;
import com.scsac.app.entity.UserEntity;

import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;

public class ArticleResponseDto {
	private Long id;
    private CategoryResponseDto category;
    private String title;
    private UserResponseDto user;
    private String content;
    private LocalDateTime createdAt;
    private int views;
    private int isUpdated;

}
