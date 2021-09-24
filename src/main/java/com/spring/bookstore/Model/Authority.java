/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spring.bookstore.Model;

import java.io.Serializable;
import javax.persistence.*;

@Entity
@Table(name = "authority")
public class Authority implements Serializable {

@Id
@GeneratedValue(strategy = GenerationType.AUTO)
private Integer id;

@Enumerated(EnumType.STRING)
private AuthorityType name;

public Authority() {
}

public Authority(AuthorityType name) {
    this.name = name;
}
// getters and setters

public Integer getId() {
    return id;
}

public void setId(Integer id) {
    this.id = id;
}

public AuthorityType getName() {
    return name;
}

public void setName(AuthorityType name) {
    this.name = name;
}
}
