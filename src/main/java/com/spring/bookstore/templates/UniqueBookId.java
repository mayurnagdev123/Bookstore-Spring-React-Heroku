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
public class UniqueBookId implements Serializable {

  public UniqueBookId() {
  }
  private String uniqueBookId;

  public String getUniqueBookId() {
    return uniqueBookId;
  }

  public void setUniqueBookId(String uniqueBookId) {
    this.uniqueBookId = uniqueBookId;
  }

}
