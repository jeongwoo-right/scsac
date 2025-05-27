package com.scsac.app.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scsac.app.dto.request.CommentRequestDto;
import com.scsac.app.dto.response.CommentResponseDto;
import com.scsac.app.service.CommentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/comment")
@RequiredArgsConstructor
public class CommentController {
	
	private final CommentService cs;
	
	@PostMapping
	public ResponseEntity<?> addComment(@RequestBody CommentRequestDto comment){
		CommentResponseDto saved = cs.insertComment(comment);
		if (saved!=null) {
			return ResponseEntity.ok(saved);
		} else {
			return ResponseEntity.badRequest().build();
		}
	}
	
	@DeleteMapping("/{id}")
	@PreAuthorize("hasPermission(#id, 'comment', 'write')")
	public ResponseEntity<?> deleteComment(@PathVariable("id") Long id){
		cs.deleteComment(id);
		return ResponseEntity.ok().build();
	}
}
