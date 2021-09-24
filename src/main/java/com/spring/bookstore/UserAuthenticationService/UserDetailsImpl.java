/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spring.bookstore.UserAuthenticationService;

import com.spring.bookstore.Model.Authority;
import com.spring.bookstore.Model.User;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

/**
 *
 * @author mnagdev
 */
public class UserDetailsImpl implements UserDetails {

  private User user;

  public UserDetailsImpl(User user) {
    System.out.println("setting user!");
    this.user = user;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
//    return user.getAuthorities().stream().map(authority -> new SimpleGrantedAuthority(authority.getName().toString())).collect(Collectors.toList());
//    Set<Authority> authorities = user.getAuthorities();
//    System.out.println("authorities granter to this user are:" + authorities.iterator().next().getName().name());
//    List<SimpleGrantedAuthority> simpleGrantedAuthorities = new ArrayList<>();
//    for (Authority authority : authorities) {
//        simpleGrantedAuthorities.add(new SimpleGrantedAuthority(authority.getName().name()));
//    }
//    return simpleGrantedAuthorities;
    return null;
  }

  @Override
  public String getPassword() {
    return user.getPassword();
  }

  @Override
  public String getUsername() {
    return user.getUsername();
  }

  @Override
  public boolean isAccountNonExpired() {
    //our custom logic here
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

}
