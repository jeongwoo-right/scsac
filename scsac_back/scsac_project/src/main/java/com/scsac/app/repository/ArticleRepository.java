package com.scsac.app.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.util.Streamable;
import org.springframework.stereotype.Repository;

import com.scsac.app.dto.request.ArticleRequestDto;
import com.scsac.app.entity.ArticleEntity;

@Repository
public interface ArticleRepository extends JpaRepository<ArticleEntity, Long>{

	Page<ArticleEntity> findAllByCategoryId(Long id, Pageable pageable);

	Page<ArticleEntity> findAllByCategoryIdAndTitleContaining(Long id, String keyword, Pageable pageable);

	Page<ArticleEntity> findAllByCategoryIdAndUser_NameContaining(Long id, String keyword, Pageable pageable);

	List<ArticleEntity> findAllByUser_Id(String id);

}
