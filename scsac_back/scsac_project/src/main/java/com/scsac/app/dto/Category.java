package com.scsac.app.dto;

import com.scsac.app.entity.CategoryEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Category {

	private Long id;
	private String title;
	
	public CategoryEntity toEntity(Category c) {
		return new CategoryEntity(c.id, c.title);
	}
}
