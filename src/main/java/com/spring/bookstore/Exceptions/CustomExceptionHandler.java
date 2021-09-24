/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spring.bookstore.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

/**
 *
 * @author mnagdev
 */
/**
 * A convenient base class that provides
 * centralized exception handling across
 * all {@code @RequestMapping} methods
 * through {@code @ExceptionHandler}
 * methods.
 */
@ControllerAdvice
public class CustomExceptionHandler extends ResponseEntityExceptionHandler {

  @ExceptionHandler(UsernameExistsException.class)
  public final ResponseEntity<ErrorResponse> handleUsernameExistsException(UsernameExistsException e, WebRequest request) {
    String cause = e.getLocalizedMessage();
    ErrorResponse error = new ErrorResponse(cause, "409");
    return new ResponseEntity<>(error, HttpStatus.CONFLICT);
  }

  @ExceptionHandler(EmailExistsException.class)
  public final ResponseEntity<ErrorResponse> handleEmailExistsException(EmailExistsException e) {
    String cause = e.getLocalizedMessage();
    ErrorResponse er = new ErrorResponse(cause, "409");
    return new ResponseEntity<>(er, HttpStatus.CONFLICT);
  }

  @ExceptionHandler(NoSuchUsernameException.class)
  public final ResponseEntity<ErrorResponse> handleNoSuchUsernameException(NoSuchUsernameException e, WebRequest request) {
    String cause = e.getLocalizedMessage();
    ErrorResponse error = new ErrorResponse(cause, "404");
    return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
  }

  @ExceptionHandler(BookAlreadyInCartException.class)
  public final ResponseEntity<ErrorResponse> handleBookAlreadyInCartException(BookAlreadyInCartException e, WebRequest request) {
    String cause = e.getLocalizedMessage();
    ErrorResponse error = new ErrorResponse(cause, "409");
    return new ResponseEntity<>(error, HttpStatus.CONFLICT);
  }
}
