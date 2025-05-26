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
	
	
	public static Category toDto(CategoryEntity c) {
		return new Category(c.getId(), c.getTitle());
	}

}
