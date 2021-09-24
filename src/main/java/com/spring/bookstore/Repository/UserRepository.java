/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spring.bookstore.Repository;

import com.spring.bookstore.Model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.security.access.annotation.Secured;

/**
 *
 * @author mnagdev
 */
public interface UserRepository extends CrudRepository<User, Integer> {

  public User findByUsername(String username); // implementation provided by Spring Data at run-time

  public User findByEmail(String email);

  //@Secured("ROLE_ADMIN")
  public void deleteByUsername(String username); // implementation provided by Spring Data at run-time
}
