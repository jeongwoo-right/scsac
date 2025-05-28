package com.scsac.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.scsac.app.entity.AlertEntity;

public interface AlertRepository extends JpaRepository<AlertEntity, Long> {

}
