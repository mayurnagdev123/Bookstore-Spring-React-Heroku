/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spring.bookstore.Repository;

import com.spring.bookstore.Model.Book;
import com.spring.bookstore.Model.Cart;
import java.util.Set;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author mnagdev
 */
public interface CartRepository extends CrudRepository<Cart, Integer> {
//update book set quantity=4 where id in (select book_id from cart_books where cart_id=35) and (book_id='book123');

  @Transactional
  @Modifying
  @Query(value = "update book b set quantity = ?3 where b.id in (select cb.book_id from cart_books cb where cb.cart_id = ?1) and (b.book_id=?2)", nativeQuery = true)
  void updateBookQuantity(Integer cartId, String bookId, Integer updatedQuantity);

}
