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
public class BookDetails implements Serializable {

  public BookDetails() {
  }

  public BookDetails(String bookId, Integer quantity, String title, String author, String img_link, Integer price) {
    this.bookId = bookId;
    this.quantity = quantity;
    this.title = title;
    this.author = author;
    this.img_link = img_link;
    this.price = price;
  }
  private String bookId;
  private Integer quantity;
  private Integer price;
  private String title;
  private String img_link;
  private String author;

  public Integer getQuantity() {
    return quantity;
  }

  public Integer getPrice() {
    return price;
  }

  public void setPrice(Integer price) {
    this.price = price;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getImg_link() {
    return img_link;
  }

  public void setImg_link(String img_link) {
    this.img_link = img_link;
  }

  public String getAuthor() {
    return author;
  }

  public void setAuthor(String author) {
    this.author = author;
  }

  public void setQuantity(Integer quantity) {
    this.quantity = quantity;
  }

  public String getBookId() {
    return bookId;
  }

  public void setBookId(String bookId) {
    this.bookId = bookId;
  }

}
