/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spring.bookstore.Repository;

import com.spring.bookstore.Model.Book;
import java.util.Set;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author mnagdev
 */
public interface BookRepository extends CrudRepository<Book, Integer> {

  @Query(value = "select * from book b where b.id in(select cb.book_id from cart_books cb where cb.cart_id= ?1) and b.book_id= ?2", nativeQuery = true)
  Set<Book> fetchBookByBookId(Integer cartId, String bookId);

  @Query(value = "select count(*) from book b where b.id in(select cb.book_id from cart_books cb where cb.cart_id= ?1) and b.book_id= ?2", nativeQuery = true)
  Integer bookExistsInCart(Integer cartId, String bookId);

  @Query(value = "select quantity from book b where b.id in(select cb.book_id from cart_books cb where cb.cart_id= ?1) and b.book_id= ?2", nativeQuery = true)
  Integer getBookQuantity(Integer cartId, String bookId);

}
