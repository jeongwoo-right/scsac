package com.scsac.app.security;

import java.io.Serializable;

import org.springframework.security.access.PermissionEvaluator;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.scsac.app.repository.ArticleRepository;
import com.scsac.app.repository.CommentRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class CustomPermissionEvaluator implements PermissionEvaluator {
	
	private final ArticleRepository ar;
	private final CommentRepository cr;
	
	@Override
	public boolean hasPermission(Authentication authentication, Object targetDomainObject, Object permission) {
		return false;
	}
	@Override
	public boolean hasPermission(Authentication authentication, Serializable targetId, String targetType,
			Object permission) {
		String userId = authentication.getName();
		
		if ("article".equals(targetType)) {
			return ar.findById((Long)targetId)
					.map(article -> article.getUser().getId().equals(userId))
					.orElse(false);
		} else if ("comment".equals(targetType)) {
			return cr.findById((Long) targetId)
					.map(comment -> comment.getUser().getId().equals(userId))
					.orElse(false);
		}
		return false;
	}
	
}
