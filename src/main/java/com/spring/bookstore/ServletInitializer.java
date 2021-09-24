package com.spring.bookstore;

import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

public class ServletInitializer extends SpringBootServletInitializer {
//This class is only needed if you are building a war file and
// deploying it. If you prefer to run an embedded web server then you won't need this at
// all.

@Override
protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
    return application.sources(TechtalkApplication.class); //registers TechtalkApplication class as a configuration class of the application:
}

}
