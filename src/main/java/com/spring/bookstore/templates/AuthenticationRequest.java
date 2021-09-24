/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spring.bookstore.templates;

import java.io.Serializable;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;

/**
 *
 * @author mnagdev
 */
public class AuthenticationRequest implements Serializable {

private String username, password;

public AuthenticationRequest() {
}
//SimpleJpaRepository<Object, Object>

public AuthenticationRequest(String username, String password) {
    this.username = username;
    this.password = password;
}

public String getUsername() {
    return username;
}

public void setUsername(String username) {
    this.username = username;
}

public String getPassword() {
    return password;
}

public void setPassword(String password) {
    this.password = password;
}

}
