package com.scsac.app.dto.request;


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
public class AlertRequestDto {
    private Long articleId;
    private Long commentId;
    private String senderId;
    private String receiverId;
    private String type;
}
