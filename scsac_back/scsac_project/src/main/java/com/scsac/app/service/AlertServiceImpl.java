package com.scsac.app.service;

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

	@Override
	public AlertResponseDto addAlert(AlertRequestDto alert) {
		AlertEntity ae = ar.save(am.toEntity(alert));
		return am.toDto(ae);
	}

	@Override
	public Collection<? extends AlertResponseDto> addAllAlert(List<AlertRequestDto> mentions) {
		List<AlertEntity> aes = ar.saveAll(mentions.stream().map(m->am.toEntity(m)).toList());
		return aes.stream().map(me -> am.toDto(me)).toList();
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
