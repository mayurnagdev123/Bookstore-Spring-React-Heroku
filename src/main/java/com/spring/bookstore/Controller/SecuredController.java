/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spring.bookstore.Controller;

import com.spring.bookstore.Exceptions.BookAlreadyInCartException;
import com.spring.bookstore.Model.Book;
import com.spring.bookstore.Model.Cart;
import com.spring.bookstore.Model.DeliveryDetails;
import com.spring.bookstore.Model.Order;
import com.spring.bookstore.Model.User;
import com.spring.bookstore.Service.BookService;
import com.spring.bookstore.Service.CartService;
import com.spring.bookstore.Service.UserService;
import com.spring.bookstore.UserAuthenticationService.UserDetailsImpl;
import com.spring.bookstore.templates.BookDetails;
import com.spring.bookstore.templates.DeliveryInfo;
import com.spring.bookstore.templates.DisplayOrders;
import com.spring.bookstore.templates.UniqueBookId;
import com.spring.bookstore.templates.UpdatedBookQuantity;
import com.spring.bookstore.utils.CommonUtils;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author mnagdev
 */
@RestController
@RequestMapping("/protected")
public class SecuredController {

  @Autowired
  UserService userService;

  @Autowired
  CartService cartService;

  @Autowired
  BookService bookService;

  public SecuredController() {

  }

  @RequestMapping("/hello")
  public String returnHello() {
    System.out.println("Hello from a protected resource!");
    return "Hello from a protected resource";
  }

  @PostMapping(value = "/addToCart")
  public String addBookToCart(@RequestBody BookDetails bookDetails, @AuthenticationPrincipal UserDetailsImpl userDetailsImpl) {
    User loggedInUser = userDetailsImpl.getUser();
    Cart c = loggedInUser.getCart();
    Book book = new Book(bookDetails);
    if (bookService.boookExistsInCart(c.getId(), book.getBookId())) {
      throw new BookAlreadyInCartException("Book already in cart!");
    }
    c.addBook(book);
    cartService.updateCart(c);
    return "added";
  }

  @GetMapping("/getBookQuantity")
  public Integer getBookQuantity(@RequestParam(name = "bookId", required = true) String bookId, @AuthenticationPrincipal UserDetailsImpl userDetailsImpl) {
    User loggedInUser = userDetailsImpl.getUser();
    Cart c = loggedInUser.getCart();
    Integer quantity = bookService.getBookQuantity(c.getId(), bookId);
    if (quantity != null) {
      return quantity;
    }

    return 0;

  }

  @PostMapping("/updateCart")
  private void updateCart(@RequestBody UpdatedBookQuantity updatedBookQuantity, @AuthenticationPrincipal UserDetailsImpl userDetailsImpl) {
    User loggedInUser = userDetailsImpl.getUser();
    Integer cartId = loggedInUser.getCart().getId();
    cartService.updateBookQuantity(cartId, updatedBookQuantity.getBookId(), updatedBookQuantity.getQuantity());
  }

  @DeleteMapping("/deleteBookFromCart")
  private String deleteFromCart(@RequestBody UniqueBookId uniqueBookId, @AuthenticationPrincipal UserDetailsImpl userDetailsImpl) {
    User loggedInUser = userDetailsImpl.getUser();
    Cart c = loggedInUser.getCart();
    Set<Book> bookToDelete = bookService.fetchBookByBookId(c.getId(), uniqueBookId.getUniqueBookId());
    c.removeBook(bookToDelete.iterator().next());
    cartService.updateCart(c);
    bookService.deleteBookById(bookToDelete.iterator().next().getId());
    return "Deleted";
  }

  @GetMapping(value = "/showCart")
  public Set<Book> showCart(@AuthenticationPrincipal UserDetailsImpl userDetailsImpl) {
    User loggedInUser = userDetailsImpl.getUser();
    return loggedInUser.getCart().getBooks();
  }

  @PostMapping("/placeOrder")
  public String placeOrder(@RequestBody DeliveryInfo deliveryInfo, @AuthenticationPrincipal UserDetailsImpl userDetailsImpl) {
    DeliveryDetails deliveryDetails = new DeliveryDetails(deliveryInfo);
    User loggedInUser = userDetailsImpl.getUser();
    Cart c = loggedInUser.getCart();
    Set<Book> booksInCart = c.getBooks();
    Order order = new Order();
    order.setBooks(booksInCart);
    order.setTotalAmount(deliveryInfo.getTotalAmount());
    order.addDeliveryDetails(deliveryDetails);
    Set<Order> orders = loggedInUser.getOrders(); //get existing orders
    orders.add(order);//add this order to existing orders
    loggedInUser.setOrders(orders);
    userService.saveUser(loggedInUser);
    c.setBooks(new HashSet<>()); //empty the user's cart
    cartService.updateCart(c);
    return "Order placed!";

  }

  @GetMapping("/fetchOrders")
  public List<DisplayOrders> fetchUserOrders(@AuthenticationPrincipal UserDetailsImpl userDetailsImpl) throws ParseException {
    User loggedInUser = userDetailsImpl.getUser();
    Set<Order> userOrders = loggedInUser.getOrders();

    List<Order> userOrdersList = new ArrayList<>(userOrders);
    Collections.sort(userOrdersList, new CommonUtils());

    DisplayOrders displayOrders;
    DeliveryDetails deliveryDetails;
    DeliveryInfo deliveryInfo;
    List<DisplayOrders> results = new ArrayList<>();
    for (Order order : userOrdersList) {
      Integer id = order.getId();
      String orderPlacedDate = CommonUtils.convertDateToString(order.getOrderPlaced());

      displayOrders = new DisplayOrders();
      displayOrders.setBooks(order.getBooks());
      DeliveryDetails deliveryDetailsForThisOrder = order.getDeliveryDetails();  //this is a bi-directional mapping so we do not need deliveryDetails object to have order id as it results in infinite recursion
      deliveryDetails = new DeliveryDetails(deliveryDetailsForThisOrder.getId(), deliveryDetailsForThisOrder.getName(), deliveryDetailsForThisOrder.getAddress(), deliveryDetailsForThisOrder.getCity(),
             deliveryDetailsForThisOrder.getMobile(), deliveryDetailsForThisOrder.getPincode());
      displayOrders.setDeliveryDetails(deliveryDetails);
      displayOrders.setTotalAmount(order.getTotalAmount());
      displayOrders.setOrderId(id);
      displayOrders.setOrderPlacedDate(orderPlacedDate);
      results.add(displayOrders);
    }
    return results;
  }

  @DeleteMapping("/delete/{username}")
  public String deleteUser(@PathVariable("username") String username) {
    return userService.deleteUser(username);
  }

  @PostMapping("/logout")
  public String logOut(HttpServletRequest request, HttpServletResponse response) {
    Cookie[] cookies = request.getCookies();
    for (Cookie cookie : cookies) {
      if (cookie.getName().equals("jwt")) {
        cookie.setValue("");
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
      }
    }
    return "logged out";
  }

}
