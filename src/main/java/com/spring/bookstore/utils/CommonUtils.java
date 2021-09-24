package com.spring.bookstore.utils;

import com.spring.bookstore.Model.Order;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Comparator;
import java.util.Date;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 *
 * @author mnagdev
 */
public class CommonUtils implements Comparator<Order> {

  public static String convertDateToString(Date date) throws ParseException {
    String dateString = String.valueOf(date);
    SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    Date d = formatter.parse(dateString);
    return d.toString();
  }

  @Override
  public int compare(Order order1, Order order2) {
    return order2.getOrderPlaced().compareTo(order1.getOrderPlaced());
  }

}
