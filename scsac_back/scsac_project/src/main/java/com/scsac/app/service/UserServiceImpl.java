package com.scsac.app.service;

import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.scsac.app.dto.request.UserRequestDto;
import com.scsac.app.dto.response.UserResponseDto;
import com.scsac.app.entity.UserEntity;
import com.scsac.app.mapper.UserMapper;
import com.scsac.app.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
	
	private final UserRepository ur;
	private final UserMapper um;
	private final PasswordEncoder pw;


	@Override
	public UserResponseDto findbyId(String id) {
		UserEntity e = ur.findById(id)
						.orElseThrow(() -> new NoSuchElementException("해당 사용자가 존재하지 않습니다. id=" + id));

		return um.toDto(e);
	}

	@Override
	public int insertUser(int num, int generation, String password) {
		int r = 0;
		try {
			for (int i = 1; i <= num; i++) {
				UserEntity e = new UserEntity();
				e.setId(String.format("%02d", generation) + String.format("%02d", i));
				e.setPassword(pw.encode(password));
				e.setGeneration(generation);
				e.setAuthority("ROLE_Student");

				UserEntity saved = ur.save(e);
				r += saved.getId() != null ? 1 : 0;
			}
			if (r == num) {
				return 1;
			} else {
				throw new RuntimeException("오류 발생");
			}

		} catch (Exception ex) {
			ex.printStackTrace(); // 실제로는 로깅 처리
			return 0;
		}
	}

	@Override
	@Transactional
	public UserResponseDto updateUser(UserRequestDto user) {
		UserEntity usere = ur.findById(String.valueOf(user.getId()))
									.orElseThrow(()-> new NoSuchElementException("해당 사용자가 없습니다."));

		usere.setPassword(pw.encode(user.getPassword()));
		usere.setAffiliate(user.getAffiliate());
		usere.setName(user.getName());
		usere.setNickname(user.getNickname());
		usere.setBojId(user.getBojId());

		return um.toDto(usere);
	}

	@Override
	@Transactional
	public int updateAuthority(int generation) {
		int r = ur.updateAuthority(generation);
		if (r == 0)
			return 0;
		return 1;
	}
	
	@Override
	@Transactional
	public UserResponseDto makeAdmin(String id) {
		UserEntity user = ur.findById(id)
							.orElseThrow(()->new NoSuchElementException("해당 사용자가 없습니다."));
		user.setAuthority("ROLE_Admin");
		return um.toDto(user);
	}
}
