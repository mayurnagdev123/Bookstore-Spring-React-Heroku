/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spring.bookstore.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *
 * @author mnagdev
 */
@Controller
public class RouteController {

  @RequestMapping(value = "/{path:[^\\.]*}")
  public String redirect() {
    return "forward:/";
  }
}
