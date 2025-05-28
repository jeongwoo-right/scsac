package com.scsac.app.security;

import java.io.Serializable;
import java.util.NoSuchElementException;

import org.springframework.security.access.PermissionEvaluator;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.scsac.app.entity.ArticleEntity;
import com.scsac.app.entity.CategoryEntity;
import com.scsac.app.repository.ArticleRepository;
import com.scsac.app.repository.CategoryRepository;
import com.scsac.app.repository.CommentRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class CustomPermissionEvaluator implements PermissionEvaluator {

	private final ArticleRepository ar;
	private final CommentRepository cr;
	private final CategoryRepository ctr;

	@Override
	public boolean hasPermission(Authentication authentication, Object targetDomainObject, Object permission) {
		return false;
	}
	@Override
	public boolean hasPermission(Authentication authentication, Serializable targetId, String targetType,
			Object permission) {
		String userId = authentication.getName();

		if ("category".equals(targetType)) {
			if ("read".equals(permission)) {
				CategoryEntity category = ctr.findById((Long) targetId)
						.orElseThrow(()->new NoSuchElementException("해당 카테고리가 없습니다."));

				String requiredAuthority = category.getAuthority();
				return authentication.getAuthorities().stream()
						.anyMatch(granted ->
						granted.getAuthority().equals("ROLE_Admin") ||granted.getAuthority().equals(requiredAuthority));

			}
		} else if ("article".equals(targetType)) {
			if("write".equals(permission)) {

				CategoryEntity category = ctr.findById((Long) targetId)
						.orElseThrow(()->new NoSuchElementException("해당 카테고리가 없습니다."));

				String requiredAuthority = category.getAuthority();
				return authentication.getAuthorities().stream()
						.anyMatch(granted ->
						granted.getAuthority().equals("ROLE_Admin") ||granted.getAuthority().equals(requiredAuthority));


			} else if("update".equals(permission)) {
				return ar.findById((Long)targetId)
						.map(article -> article.getUser().getId().equals(userId))
						.orElse(false);				
			} else if ("read".equals(permission)) {
				ArticleEntity article = ar.findById((Long) targetId)
						.orElseThrow(()-> new NoSuchElementException("해당 게시물이 없습니다."));
				String requiredAuthority = article.getCategory().getAuthority();
				return authentication.getAuthorities().stream()
						.anyMatch(granted ->
						granted.getAuthority().equals("ROLE_Admin") ||
						granted.getAuthority().equals(requiredAuthority));
			}
		} else if ("comment".equals(targetType)) {
			return cr.findById((Long) targetId)
					.map(comment -> comment.getUser().getId().equals(userId))
					.orElse(false);
		}
		return false;
	}

}
