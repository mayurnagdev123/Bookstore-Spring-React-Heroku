/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spring.bookstore.UserAuthenticationService;

import com.spring.bookstore.Model.User;
import com.spring.bookstore.Repository.UserRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

/**
 *
 * @author mnagdev
 */
public class UserDetailsServiceImpl implements UserDetailsService {

//UserDetailsService is an interface so we have to override all its methods
@Autowired
UserRepository userRepository;

@Override
public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    User user = userRepository.findByUsername(username);
    if (user == null) {
        throw new UsernameNotFoundException("No user exists!");
    }
    return new UserDetailsImpl(user);

}

}
