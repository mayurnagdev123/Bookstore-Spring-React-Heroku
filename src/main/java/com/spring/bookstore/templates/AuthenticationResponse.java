/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spring.bookstore.templates;

import java.io.Serializable;

/**
 *
 * @author mnagdev
 */
public class AuthenticationResponse implements Serializable {

private String jwt;

public AuthenticationResponse() {
}

public AuthenticationResponse(String jwt) {
    this.jwt = jwt;
}

public String getJwt() {
    return jwt;
}

public void setJwt(String jwt) {
    this.jwt = jwt;
}

}
