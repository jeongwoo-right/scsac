package com.scsac.app.security;

import java.util.function.Supplier;

import org.springframework.security.authorization.AuthorizationDecision;
import org.springframework.security.authorization.AuthorizationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.access.intercept.RequestAuthorizationContext;
import org.springframework.stereotype.Component;

import com.scsac.app.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class MustUpdateAuthorizationManager implements AuthorizationManager<RequestAuthorizationContext> {

    private final UserRepository ur;

    @Override
    public AuthorizationDecision check(Supplier<Authentication> authentication, RequestAuthorizationContext context) {
        Authentication auth = authentication.get();

        if (auth == null || !auth.isAuthenticated()) return new AuthorizationDecision(false);

        String loginId = auth.getName();

        boolean hasName = ur.findById(loginId)
            .map(user -> user.getName() != null && !user.getName().isBlank())
            .orElse(false);

        return new AuthorizationDecision(hasName);
    }
}