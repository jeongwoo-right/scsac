package com.scsac.app.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.zip.CRC32;

import com.scsac.app.repository.CommentRepository;

@Entity
@Table(name = "article")
@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
public class ArticleEntity {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private CategoryEntity category;

    @Column(length = 200, nullable = false)
    private String title;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @Lob
    @Column(nullable = false)
    private String content;

    @Column(name = "created_at", columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt;

    @Column(columnDefinition = "INT DEFAULT 0")
    private int views;

    @Column(columnDefinition = "INT DEFAULT 0")
    private int isUpdated;

    

}