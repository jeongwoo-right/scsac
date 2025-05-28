package com.scsac.app.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.scsac.app.dto.request.LoginRequest;
import com.scsac.app.dto.response.LoginResponseDto;
import com.scsac.app.dto.response.UserResponseDto;
import com.scsac.app.entity.UserEntity;
import com.scsac.app.mapper.UserMapper;
import com.scsac.app.repository.UserRepository;
import com.scsac.app.security.JwtTokenProvider;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class AuthController {
	
	private final AuthenticationManager authManager;
	private final JwtTokenProvider tokenProvider;
	private final UserRepository userRepository;
	private final UserMapper um;
	
	@PostMapping("/login")
	@PreAuthorize("isAnonymous()")
	public ResponseEntity<?> login(@RequestBody LoginRequest request, HttpServletRequest req){
		Authentication authentication = authManager.authenticate(
			new UsernamePasswordAuthenticationToken(request.getId(), request.getPassword()));
		
		UserEntity user = userRepository.findById(request.getId())
							.orElseThrow(()-> new UsernameNotFoundException("사용자 없음"));
		
		String role = user.getAuthority();
		
		String token = tokenProvider.generateToken(user.getId(), role);
		
		LoginResponseDto response = new LoginResponseDto(token, um.toDto(user));
		
		return ResponseEntity.ok().body(response);

	}
	
	@PostMapping("/check")
	public ResponseEntity<?> check(@RequestBody LoginRequest request, HttpServletRequest req){
		
		Authentication authentication = authManager.authenticate(
				new UsernamePasswordAuthenticationToken(request.getId(), request.getPassword()));
	    
		return ResponseEntity.ok("비밀번호 일치!");
	}
}


