/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spring.bookstore.JWT;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import static io.jsonwebtoken.Jwts.claims;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.DefaultJwtParser;
import io.jsonwebtoken.impl.TextCodec;
import io.jsonwebtoken.impl.crypto.DefaultJwtSignatureValidator;
import io.jsonwebtoken.impl.crypto.DefaultSignatureValidatorFactory;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class JwtUtil {

  /**
   * The BASE64 encoded String that will
   * be used as the signing key
   */
  private final String SECRET_KEY = TextCodec.BASE64URL.encode("Secret_Key_mn_Nagdev@123");

  /**
   * Extracts the "sub" claim from the
   * JWT payload which contains the
   * username
   *
   * @param token
   * @return String the username
   */
  public String extractUsername(String token) {
    String username = extractAllClaims(token).getSubject();
    return username;
  }

  /**
   * This method extracts all claims
   * from the JWT payload. Note that
   * this method does a thorough
   * validation of the JWT that includes
   * verifying the header and the
   * payload, creating a signature and
   * then validating it and also
   * verifying the expiry of the token.
   *
   * @param token
   * @return an instance of Claims,
   * which contains all claims present
   * in the JWT payload
   */
  private Claims extractAllClaims(String token) {
    return Jwts.parser(). // Returns a new {@link JwtParser} instance that can be configured and then used to parse JWT strings.
           setSigningKey(SECRET_KEY). //Sets the signing key used to verify any discovered JWS digital signature. 
           parseClaimsJws(token). //this verifies the JWT rigorously and throws different exceptions for different circumstances
           getBody(); //Returns the JWT body (the payload) 

    //  DefaultJwtParser
  }

  /**
   * This method is used to generate a
   * new token. It does not use any
   * custom claims. though we can add
   * them if we need
   *
   * @param userDetails
   * @return String the JWT token
   */
  public String generateToken(UserDetails userDetails) {
    Map<String, Object> claims = new HashMap<>();
    //to create custom claims
    //claims.put("someKey", "someValue"); 
    return createToken(claims, userDetails.getUsername());
  }

  /**
   * This method creates a token and
   * populates it with some default
   * "Reserved" claims. It also signs
   * the token with our secret key
   *
   * @param claims
   * @param subject
   * @return String the JWT token
   */
  private String createToken(Map<String, Object> claims, String subject) {

    return Jwts.builder(). //Returns a new {@link JwtBuilder} instance
           setClaims(claims). //Sets the JWT payload to be a JSON Claims instance populated by the specified name/value pairs. 
           setSubject(subject). //sets the "sub" claim to the username  
           setIssuedAt(new Date(System.currentTimeMillis())) //sets the "iat" claim to the current date
           .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) //sets the "exp" claim to 10 hours from the current date
           .signWith(SignatureAlgorithm.HS256, SECRET_KEY). //use our secret key and the HS256 algorithm to sign the token
           compact(); // finally , build the JWT and serialize it to a compact, URL-safe string

  }

}
