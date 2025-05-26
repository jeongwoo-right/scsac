package com.scsac.app.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.scsac.app.entity.ArticleEntity;
import com.scsac.app.entity.CommentEntity;
import com.scsac.app.repository.CommentRepository;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
@ToString
public class Article {
		
	private Long id;
    private Long categoryId;
    private String title;
    private String userId;
    private String content;
    private LocalDateTime createdAt;
    private int views;
    private int isUpdated;
    
    private List<Comment> comments;
    
    public static Article toDto(ArticleEntity ae) {
    	return new Article(ae.getId(), ae.getCategory().getId(), ae.getTitle(), ae.getUser().getId(), ae.getContent(), ae.getCreatedAt(), ae.getViews(), ae.getIsUpdated(), null);
    }
}
