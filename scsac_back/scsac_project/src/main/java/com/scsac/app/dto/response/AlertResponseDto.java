package com.scsac.app.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AlertResponseDto {

    private Long id;
    private ArticleResponseDto article;
    private CommentResponseDto recieceComment;
    private UserResponseDto sendUser;
    private UserResponseDto receiveUser;
    private String type;
}