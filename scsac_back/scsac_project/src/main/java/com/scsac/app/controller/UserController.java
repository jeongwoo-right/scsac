package com.scsac.app.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scsac.app.dto.request.UserRequestDto;
import com.scsac.app.dto.response.UserResponseDto;
import com.scsac.app.service.UserService;

import lombok.RequiredArgsConstructor;

@RequestMapping("/user")
@RestController
@RequiredArgsConstructor
public class UserController {
	private final UserService us;

	@GetMapping("/{id}")
	public ResponseEntity<?> detail(@PathVariable String id) {
		UserResponseDto user = us.findbyId(id);
		if (user != null) {
			return ResponseEntity.ok(user);
		} else {
			return ResponseEntity.noContent().build();
		}
	}
	
	@GetMapping("/me")
	public ResponseEntity<?> me(){
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		return detail(auth.getName());
	}
	
	@PostMapping
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> insert(@RequestBody Map<String, String> data) {
		int r = us.insertUser(Integer.parseInt(data.get("num")), Integer.parseInt(data.get("generation")), data.get("password"));
		if (r == 1) {
			return new ResponseEntity<Integer>(r, HttpStatus.CREATED);
		} else {
			return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
		}
	}

<<<<<<< HEAD
=======

>>>>>>> ef3975113160bc6d5836b3c01d63da6f27d36369
	@PutMapping
	public ResponseEntity<?> update(@RequestBody UserRequestDto user) {
		
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();

		if (auth != null && auth.isAuthenticated() && !"anonymousUser".equals(auth.getPrincipal())) {
		    String userId = auth.getName();
		    
			if(userId.equals(user.getId())) {
				UserResponseDto saved = us.updateUser(user);
				return ResponseEntity.ok(saved);
			}
		}
		return ResponseEntity.badRequest().build();
	}

	@PutMapping("/admin")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> updateauhthority() {
		int r = us.updateAuthority();
		if (r == 1) {
			return new ResponseEntity<Integer>(r, HttpStatus.OK);
		} else {
			return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
		}
	}

//	@PutMapping("/add_admin")
//	@PreAuthorize("hasRole('ADMIN')")
//	public ResponseEntity<?> updateAdmin(@RequestParam String id) {
//		User user = us.findbyId(id);
//		if (user == null) {
//		    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//		}
//		user.setAuthority(1);
//		int r = us.updateUser(user);
//		if (r == 1) {
//			return new ResponseEntity<Integer>(r, HttpStatus.OK);
//		} else {
//			return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
//		}
//	}
}
