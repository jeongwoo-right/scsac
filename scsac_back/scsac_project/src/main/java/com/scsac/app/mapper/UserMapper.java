package com.scsac.app.mapper;

import com.scsac.app.dto.request.UserRequestDto;
import com.scsac.app.dto.response.UserResponseDto;
import com.scsac.app.entity.UserEntity;

public class UserMapper {
	public static UserEntity toEntity(UserRequestDto userRequest) {
		return UserEntity.builder()
				.id(userRequest.getId())
				.affiliate(userRequest.getAffiliate())
				.authority(userRequest.getAuthority())
				.bojId(userRequest.getBojId())
				.name(userRequest.getName())
				.generation(userRequest.getGeneration())
				.nickname(userRequest.getNickname())
				.password(userRequest.getPassword())
				.build();
		
	}
	
	public static UserResponseDto toDto(UserEntity userEntity) {
		return UserResponseDto.builder()
				.id(userEntity.getId())
				.affiliate(userEntity.getAffiliate())
				.authority(userEntity.getAuthority())
				.bojId(userEntity.getBojId())
				.name(userEntity.getName())
				.generation(userEntity.getGeneration())
				.nickname(userEntity.getNickname())
				.build();
	}
}
