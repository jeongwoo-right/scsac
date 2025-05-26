package com.scsac.app.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Article {
    private Long id;
    private Long categoryId;
    private String title;
    private String userId;
    private String content;
    private LocalDateTime createdAt;
    private int views;
    private int isUpdated;
}
