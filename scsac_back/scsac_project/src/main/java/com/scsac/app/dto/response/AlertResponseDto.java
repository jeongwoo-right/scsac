package com.scsac.app.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class AlertResponseDto {

    private Long id;
    private ArticleResponseDto article;
    private CommentResponseDto recieveComment;
    private UserResponseDto sendUser;
    private UserResponseDto receiveUser;
    private String type;
    private int checked;
}