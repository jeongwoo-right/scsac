package com.scsac.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.scsac.app.entity.AlertEntity;

public interface AlertRepository extends JpaRepository<AlertEntity, Long> {

	List<AlertEntity> findByReceiveUser_Id(String id);

}
