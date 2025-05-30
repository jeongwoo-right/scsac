package com.scsac.app.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.scsac.app.dto.request.AlertRequestDto;
import com.scsac.app.dto.response.AlertResponseDto;
import com.scsac.app.entity.AlertEntity;
import com.scsac.app.mapper.AlertMapper;
import com.scsac.app.repository.AlertRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AlertServiceImpl implements AlertService{
	private final AlertRepository ar;
	private final AlertMapper am;
	private final SseService ss;

	@Override
	public AlertResponseDto addAlert(AlertRequestDto alert) {
		AlertEntity ae = ar.save(am.toEntity(alert));
		ss.send(ae.getReceiveUser().getId(), ae);
		System.out.println(am.toDto(ae));
		return am.toDto(ae);
	}

	@Override
	public Collection<? extends AlertResponseDto> addAllAlert(List<AlertRequestDto> mentions) {
		List<AlertResponseDto> aes = new ArrayList<>();
		for(AlertRequestDto alert : mentions) {
			aes.add(addAlert(alert));
		}
		return aes;
	}

	@Override
	public List<AlertResponseDto> getAlertById(String id) {
		List<AlertEntity> res = ar.findByReceiveUser_Id(id);
		return res.stream().map(am::toDto).toList();
	}

	@Override
	public void deleteAlert(Long id) {
		ar.deleteById(id);
		
	}

	@Override
	@Transactional
	public void checkAlert(Long id) {
		AlertEntity ae = ar.findById(id)
							.orElseThrow(()->new NoSuchElementException("해당 알림이 없습니다."));
		ae.setChecked(1);
	}
}
