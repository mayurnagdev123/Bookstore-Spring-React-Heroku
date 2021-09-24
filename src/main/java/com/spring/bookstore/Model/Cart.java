/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spring.bookstore.Model;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Objects;
import java.util.Set;
import javax.persistence.*;

/**
 *
 * @author mnagdev
 */
@Entity
@Table(name = "cart")
public class Cart implements Serializable {

  public Cart() {
  }

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "id")
  private Integer id;

  @Column
  @Temporal(TemporalType.TIMESTAMP)
  private Date dateCreated = new Date();

  @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
  @JoinTable(name = "cart_books",
         joinColumns = {
           @JoinColumn(name = "cart_id")},
         inverseJoinColumns = {
           @JoinColumn(name = "book_id")
         })
  private Set<Book> books = new HashSet<>();

  public void addBook(Book b) {
    books.add(b);
  }

  public void removeBook(Book b) {
    Iterator<Book> iterator = books.iterator();
    while (iterator.hasNext()) {
      Book book = iterator.next();
      if (Objects.equals(book.getId(), b.getId())) {
        iterator.remove();
        break;
      }
    }
  }
  @OneToOne
  private User user;

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public Set<Book> getBooks() {
    return books;
  }

  public void setBooks(Set<Book> books) {
    this.books = books;
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

}
