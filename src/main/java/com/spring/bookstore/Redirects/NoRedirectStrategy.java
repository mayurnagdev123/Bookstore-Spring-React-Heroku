/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spring.bookstore.Redirects;

import java.io.IOException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.web.RedirectStrategy;

/**
 *
 * @author mnagdev
 */
public class NoRedirectStrategy implements RedirectStrategy {

@Override
public void sendRedirect(HttpServletRequest request, HttpServletResponse response, String url) throws IOException {
    // disable redirection for REST APIs
}

}
