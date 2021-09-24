/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spring.bookstore.Model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import javax.persistence.*;
import org.springframework.data.annotation.CreatedDate;

@Entity //defines that a class can be mapped to a table , mandatory
@Table(name = "users") //optional
public class User implements Serializable {

  public User(String username, String password, String name, String email) {
    this.username = username;
    this.password = password;
    this.name = name;
    this.email = email;
  }

  @Id //mandatory
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(nullable = false, unique = true) //optional
  private String username;
  @Column(nullable = false)
  private String password;
  @Column(nullable = false, unique = false)
  private String name;
  @Column(nullable = false, unique = true)
  private String email;
  @Column
  @Temporal(TemporalType.TIMESTAMP)
  private Date dateCreated = new Date();

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public Set<Order> getOrders() {
    return orders;
  }

  public void setOrders(Set<Order> orders) {
    this.orders = orders;
  }

  @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
  @JoinTable(name = "users_orders",
         joinColumns = {
           @JoinColumn(name = "user_id", referencedColumnName = "id")},
         inverseJoinColumns = {
           @JoinColumn(name = "order_id", referencedColumnName = "id")})
  private Set<Order> orders = new HashSet<>();

  @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
  private Cart cart;

  public void addCart(Cart cart) {
    this.cart = cart;
    cart.setUser(this);
  }

  public Cart getCart() {
    return cart;
  }

  public void setCart(Cart cart) {
    this.cart = cart;
  }

  public User() {
  }
// getters and setters

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
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

  public Date getDateCreated() {
    return dateCreated;
  }

  public void setDateCreated(Date dateCreated) {
    this.dateCreated = dateCreated;
  }

}
