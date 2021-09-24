/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spring.bookstore.JWT;

import io.jsonwebtoken.impl.DefaultJwtParser;
import io.jsonwebtoken.impl.crypto.DefaultSignatureValidatorFactory;
import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

/**
 *
 * @author mnagdev
 */
@Component
public class JwtRequestFilter extends OncePerRequestFilter {

  @Autowired
  private JwtUtil jwtUtil;
  @Autowired
  private UserDetailsService userDetailsService;

  private static final String AUTHORIZATION = "Authorization";

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
         throws ServletException, IOException {
    String authorizationHeader = request.getHeader(AUTHORIZATION);
    String username = null;
    String jwt = null;
    String jwtCookie = null;
    Cookie[] cookies = request.getCookies();
    if (cookies != null) {
      for (Cookie cookie : cookies) {
        if (cookie.getName().equals("jwt")) {
          jwtCookie = cookie.getValue();
          break;
        }
      }
    }

    if ((authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) || jwtCookie != null) {
      if (jwtCookie != null) {
        jwt = jwtCookie;
      } else {
        if (authorizationHeader != null) {
          jwt = authorizationHeader.substring(7);
        }
      }
      username = jwtUtil.extractUsername(jwt);//this calls extractClaims() that verifies the signature and checks if the token is not expired, throws an Exception in either case
    }
    if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) { //the JWT looks valid, verify if the username exists in the repository

      UserDetails userDetails = userDetailsService.loadUserByUsername(username);
      //if loadByUsername does not throw an exception , that means that the user does exist in the repository. 

      //Populate the SecurityContextHolder with an authentication object since all checks are done
      UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
             userDetails, null, userDetails.getAuthorities());
      usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
      SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
    }

    // JWT request filter sets the authentication object inside the SecurityContext if the jwt is valid. This ensures that the
    // AnonymousAuthenticationFilter that succeeds this filter down the filter chain does not fail the authentication
    chain.doFilter(request, response); //continue applying other filters
  }

}
