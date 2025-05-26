package com.scsac.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.scsac.app.dto.request.ArticleRequestDto;
import com.scsac.app.entity.ArticleEntity;

@Repository
public interface ArticleRepository extends JpaRepository<ArticleEntity, Long>{

	List<ArticleEntity> findAllByCategoryId(Long id);

}
