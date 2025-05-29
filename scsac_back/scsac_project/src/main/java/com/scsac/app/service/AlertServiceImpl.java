package com.scsac.app.service;

import org.springframework.stereotype.Service;

import com.scsac.app.repository.AlertRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AlertServiceImpl implements AlertService{
	private final AlertRepository ar;
}
