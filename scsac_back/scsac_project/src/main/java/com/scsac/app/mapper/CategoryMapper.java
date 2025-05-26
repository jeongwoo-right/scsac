package com.scsac.app.mapper;

import org.springframework.stereotype.Component;

import com.scsac.app.dto.request.CategoryRequestDto;
import com.scsac.app.dto.response.CategoryResponseDto;
import com.scsac.app.entity.CategoryEntity;

@Component
public class CategoryMapper {
	
	public static CategoryEntity toEntity(CategoryRequestDto categoryRequest) {
		return CategoryEntity.builder()
				.title(categoryRequest.getTitle())
				.build();
	}
	
	public static CategoryResponseDto toDto(CategoryEntity categoryEntity) {
		return CategoryResponseDto.builder()
				.id(categoryEntity.getId())
				.title(categoryEntity.getTitle())
				.build();
	}
}
