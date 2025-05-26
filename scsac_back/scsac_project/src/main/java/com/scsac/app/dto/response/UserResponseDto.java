package com.scsac.app.dto.response;

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
public class UserResponseDto {
	private String id;
	private int authority;
	private int generation;

	private String affiliate;
	private String name;
	private String nickname;
	private String bojId;
}
