package com.scsac.app.service;

import com.scsac.app.dto.request.UserRequestDto;
import com.scsac.app.dto.response.UserResponseDto;

public interface UserService {
	UserResponseDto findbyId(String id);
	int insertUser(int num, int generation,String password);
	UserResponseDto updateUser(UserRequestDto user);
	int updateAuthority(int generation);
	UserResponseDto makeAdmin(String id);
}
