package com.spring.bookstore.SecurityConfig;

import com.spring.bookstore.JWT.JwtRequestFilter;
import com.spring.bookstore.Redirects.NoRedirectStrategy;
import com.spring.bookstore.UserAuthenticationService.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.NegatedRequestMatcher;
import org.springframework.security.web.util.matcher.OrRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;

/**
 *
 * @author mnagdev
 */
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

  @Autowired
  JwtRequestFilter jwtRequestFilter;

  RequestMatcher PUBLIC_URLS;
  RequestMatcher PROTECTED_URLS;
  RequestMatcher BASE_URL;

  public WebSecurityConfig() {
    this.PROTECTED_URLS = new OrRequestMatcher(new AntPathRequestMatcher("/protected/**"), new AntPathRequestMatcher("/error/**"), new AntPathRequestMatcher("/Error/**"));
    this.PUBLIC_URLS = new NegatedRequestMatcher(PROTECTED_URLS);
  }

  @Override
  protected void configure(AuthenticationManagerBuilder auth) throws Exception {

    //   auth.authenticationProvider(customAuthenticationProvider());
    auth.userDetailsService(userDetailsService()).passwordEncoder(custompasswordEncoder()); //set UserDetailsService and the PasswordEncoder to use
  }

  @Override
  public void configure(WebSecurity web) throws Exception {
    web.ignoring().requestMatchers(PUBLIC_URLS); //do not authenticate PUBLIC URLs
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http.cors().and().csrf().disable(). //disable cors and csrf
           authorizeRequests().antMatchers("/protected/**", "/error/**", "/Error/**").authenticated(). //add /protected/** in the first place  here once testing is done
           anyRequest().permitAll(). // do not authenticate any other requests
           and().exceptionHandling(). //allows us to configure exception handling. 
           defaultAuthenticationEntryPointFor(unauthorizedEntryPoint(), new AntPathRequestMatcher("/**")). //when the authentication fails or an exception is thrown (eg: BadCredentialsException),
           //by default take the user to the unauthorized entry point     
           and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // no session creation needed, we'll use JWT
           //Stateless Session : no session management needed, every request can be understood in isolation, that is without reference to session state from previous requests
           .and().addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class). //apply the JWT request filter before applying the UsernamePasswordAuthenticationFilter
           //(UsernamePasswordAuthenticationFilter is a default filter provided by Spring Security)
           formLogin().
           //failureHandler(failureHandler()).
           disable() //disable default form login provided by Spring Security
           .logout().disable(); //disable default form logout provided by Spring Security
  }

  @Override
  @Bean
  public AuthenticationManager authenticationManagerBean() throws Exception {
    return super.authenticationManagerBean();
  }

  @Bean
  @Override
  protected UserDetailsService userDetailsService() {

    return new UserDetailsServiceImpl();
  }

//@Bean
//public Exception exceptionBean() {
//    return new Exception();
//}
//@Bean
//public DaoAuthenticationProvider customAuthenticationProvider() {
//
//    DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
//    daoAuthenticationProvider.setUserDetailsService(userDetailsService());
//    daoAuthenticationProvider.setPasswordEncoder(custompasswordEncoder());
//    return daoAuthenticationProvider;
//
//}
  @Bean
  public BCryptPasswordEncoder custompasswordEncoder() {
    return new BCryptPasswordEncoder(); //Implementation of PasswordEncoder that uses the BCrypt strong hashing function
  }

//@Bean
//public AuthenticationFailureHandler failureHandler() {
//    SimpleUrlAuthenticationFailureHandler failureHandler = new SimpleUrlAuthenticationFailureHandler();
//custom logic to increment the no.of failed login attempts by 1
//...
//similarly , when the authentication is successful, we can reset the value for failed attempts to 0
//return failureHandler;
//}
//@Bean
//public AuthenticationSuccessHandler successHandler() {
//    SimpleUrlAuthenticationSuccessHandler successHandler = new SimpleUrlAuthenticationSuccessHandler();
//    successHandler.setRedirectStrategy(new NoRedirectStrategy());
//    return successHandler;
//}
//
//    @Bean
//    public AuthenticationFailureHandler failureHander() {
//  //      SimpleUrlAuthenticationFailureHandler failureHandler = new SimpleUrlAuthenticationFailureHandler("/public/error");
//        //   failureHandler.setRedirectStrategy(new NoRedirectStrategy());
//        return failureHandler;
//
//    }
  @Bean
  public AuthenticationEntryPoint forbiddenEntryPoint() {
    return new HttpStatusEntryPoint(HttpStatus.FORBIDDEN);//An AuthenticationEntryPoint that sends a generic
    //   HttpStatus of 403 as a response
  }

  @Bean
  public AuthenticationEntryPoint unauthorizedEntryPoint() {
    System.out.println("unauthorized entry point called");

    return new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED); //An AuthenticationEntryPoint that sends a generic
    //   HttpStatus of 401 as a response
  }

}
