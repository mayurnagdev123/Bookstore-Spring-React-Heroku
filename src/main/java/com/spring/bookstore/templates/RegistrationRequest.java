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
public class RegistrationRequest implements Serializable {
//Seriliazable allows us to flatten object(s) into a one-dimensional stream of bits, and to turn that stream of bits back into the original object(s) on the receiving end
//Serialization  makes storing and sending objects easy, no relation to security whatsoever

  public RegistrationRequest() {
  }
  private String username, name, email, password;

  public RegistrationRequest(String username, String name, String email, String password) {
    this.username = username;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getUsername() {
    return username;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
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
