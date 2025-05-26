package com.scsac.app.dto.request;

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
public class UserRequestDto {
	private String id;
	private String password;
	private int authority;
	private int generation;

	private String affiliate;
	private String name;
	private String nickname;
	private String bojId;
}
