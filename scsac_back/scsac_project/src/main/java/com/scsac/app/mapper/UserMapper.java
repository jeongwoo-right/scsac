package com.scsac.app.mapper;

import org.springframework.stereotype.Component;

import com.scsac.app.dto.request.UserRequestDto;
import com.scsac.app.dto.response.UserResponseDto;
import com.scsac.app.entity.UserEntity;

@Component
public class UserMapper {
	public UserEntity toEntity(UserRequestDto userRequest) {
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
	
	public UserResponseDto toDto(UserEntity userEntity) {
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
