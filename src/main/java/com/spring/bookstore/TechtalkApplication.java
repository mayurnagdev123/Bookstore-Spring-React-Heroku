package com.spring.bookstore;

import com.spring.bookstore.Model.User;
import com.spring.bookstore.Repository.UserRepository;

import java.util.ArrayList;
import java.util.List;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;

@SpringBootApplication //This is a convenience annotation that is equivalent to declaring  @Configuration,  @EnableAutoConfiguration and @ComponentScan
public class TechtalkApplication {

public static void main(String[] args) {
    SpringApplication.run(TechtalkApplication.class, args); // Static helper that can be used to run a  SpringApplication from the specified source using default settings.
}

}
