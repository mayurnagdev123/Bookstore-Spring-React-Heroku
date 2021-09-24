/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spring.bookstore.Model;

import com.spring.bookstore.templates.DeliveryInfo;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.Size;
import net.bytebuddy.implementation.auxiliary.AuxiliaryType;

/**
 *
 * @author mnagdev
 */
@Entity
public class DeliveryDetails implements Serializable {

  public DeliveryDetails() {
  }

  public DeliveryDetails(DeliveryInfo deliveryInfo) {
    this.address = deliveryInfo.getAddress();
    this.mobile = deliveryInfo.getMobile();
    this.pincode = deliveryInfo.getPincode();
    this.city = deliveryInfo.getCity();
    this.name = deliveryInfo.getName();
  }

  public DeliveryDetails(Integer id, String name, String address, String city, String mobile, String pincode) {
    this.name = name;
    this.address = address;
    this.city = city;
    this.mobile = mobile;
    this.pincode = pincode;
    this.id = id;

  }

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column
  private Integer id;

  @Column
  private String name;

  @Column
  private String address;

  @Column
  private String city;

  @Column
  private String pincode;

  @Column
  @Size(min = 10, max = 10)
  private String mobile;

  @OneToOne
  // @MapsId
  private Order order;

  public Order getOrder() {
    return order;
  }

  public void setOrder(Order order) {
    this.order = order;
  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getAddress() {
    return address;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public String getCity() {
    return city;
  }

  public void setCity(String city) {
    this.city = city;
  }

  public String getPincode() {
    return pincode;
  }

  public void setPincode(String pincode) {
    this.pincode = pincode;
  }

  public String getMobile() {
    return mobile;
  }

  public void setMobile(String mobile) {
    this.mobile = mobile;
  }

}
