package com.scsac.app.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.scsac.app.dto.response.AlertResponseDto;
import com.scsac.app.service.AlertService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/alert")
@RequiredArgsConstructor
public class AlertController {
	private final AlertService as;
	
	@GetMapping
	public ResponseEntity<?> getAlert(@RequestParam String id) {
		List<AlertResponseDto> res = as.getAlertById(id);
		return ResponseEntity.ok(res);
	}
}
