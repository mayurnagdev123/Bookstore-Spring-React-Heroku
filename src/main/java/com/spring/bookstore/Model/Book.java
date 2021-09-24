/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spring.bookstore.Model;

import com.spring.bookstore.templates.BookDetails;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.Min;

/**
 *
 * @author mnagdev
 */
@Entity
public class Book implements Serializable {

  public Book() {
  }

  public Book(BookDetails bookDetails) {
    this.bookId = bookDetails.getBookId();
    this.quantity = bookDetails.getQuantity();
    this.title = bookDetails.getTitle();
    this.author = bookDetails.getAuthor();
    this.price = bookDetails.getPrice();
    this.img_link = bookDetails.getImg_link();
  }

  public Book(String bookId, Integer quantity) {
    this.bookId = bookId;
    this.quantity = quantity;
  }

  @Id
  @Column
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Integer id;
  @Column
  private String bookId;

  @Column
  @Min(1)
  private Integer quantity;

  @Column
  private Integer price;
  @Column
  private String title;
  @Column(length = 400)
  private String img_link;
  @Column
  private String author;

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

  public Integer getQuantity() {
    return quantity;
  }

  public void setQuantity(Integer quantity) {
    this.quantity = quantity;
  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getBookId() {
    return bookId;
  }

  public void setBookId(String bookId) {
    this.bookId = bookId;
  }
}
