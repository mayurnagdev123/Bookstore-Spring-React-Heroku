/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spring.bookstore.Model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import javax.persistence.*;

/**
 *
 * @author mnagdev
 */
@Entity
@Table(name = "orders")
public class Order implements Serializable {

  public Order() {
  }

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Integer id;

  @Column
  @Temporal(TemporalType.TIMESTAMP)
  private Date orderPlaced = new Date();
  @Column
  private Integer totalAmount;

  public Integer getTotalAmount() {
    return totalAmount;
  }

  public void setTotalAmount(Integer totalAmount) {
    this.totalAmount = totalAmount;
  }

  @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
  @JoinTable(name = "orders_books",
         joinColumns = {
           @JoinColumn(name = "order_id", referencedColumnName = "id")},
         inverseJoinColumns = {
           @JoinColumn(name = "book_id", referencedColumnName = "id")
         })
  private Set<Book> books = new HashSet<>();

  @OneToOne(cascade = CascadeType.ALL, mappedBy = "order", orphanRemoval = true, fetch = FetchType.EAGER)
  private DeliveryDetails deliveryDetails = null;

  public void addDeliveryDetails(DeliveryDetails details) {
    this.deliveryDetails = details;
    details.setOrder(this);
  }

  public void addBooks(Set<Book> books) {
    this.books = books;
  }

  public DeliveryDetails getDeliveryDetails() {
    return deliveryDetails;
  }

  public Integer getId() {
    return id;
  }

  public Date getOrderPlaced() {
    return orderPlaced;
  }

  public void setOrderPlaced(Date orderPlaced) {
    this.orderPlaced = orderPlaced;
  }

  public Set<Book> getBooks() {
    return books;
  }

  public void setBooks(Set<Book> books) {
    this.books = books;
  }

  public void setId(Integer id) {
    this.id = id;
  }
//  
//  public List<Book> getBooks() {
//    return books;
//  }
//  
//  public void setBooks(List<Book> books) {
//    this.books = books;
//  }
//
//  public void removeBook(Book book) {
//    this.books.remove(book);
//    book.setOrder(null);
//  }
}
