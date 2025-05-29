package com.scsac.app.service;

import java.util.Collection;
import java.util.List;

import com.scsac.app.dto.request.AlertRequestDto;
import com.scsac.app.dto.response.AlertResponseDto;

public interface AlertService {

	AlertResponseDto addAlert(AlertRequestDto alert);

	Collection<? extends AlertResponseDto> addAllAlert(List<AlertRequestDto> mentions);

	List<AlertResponseDto> getAlertById(String id);

}
