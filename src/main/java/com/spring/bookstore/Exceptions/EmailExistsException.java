/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spring.bookstore.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 *
 * @author mnagdev
 */
@ResponseStatus(HttpStatus.CONFLICT)
public class EmailExistsException extends RuntimeException {

  String error_message;

  public String getError_message() {
    return error_message;
  }

  public void setError_message(String error_message) {
    this.error_message = error_message;
  }

  public EmailExistsException() {
  }

  public EmailExistsException(String message) {
    super(message);
  }

}
