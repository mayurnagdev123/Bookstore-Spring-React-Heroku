import React, { useEffect, useState } from 'react'
import { addToCart, deleteBookFromCart, getBookQuantity, updateCart } from '../../../functions/util';
import Modal from '../Modal/Modal';
import './BookDescription.css'
import QuantityButtons from './QuantityButtons';
const BookDescription = (props) => {
    const [quantity, setQuantity] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {

        props.scrollTopHandler();
        getBookQuantity(props.id, function (returnVal, returnData) {
            if (returnVal) { //fetched book quantity successfully

                setQuantity(returnData);
            }
            else {
                console.log("failed to fetch book quantity", returnData)
                setError(returnData);
            }
        })
    }, [props]);

    function incrementQuantity() {
        updateCart(props.id, quantity + 1, function (returnVal, returnData) {
            if (returnVal) {
                setQuantity(prevQuantity => prevQuantity + 1)
            }
            else {
                console.log("[BookDescription] Updating cart failed", returnVal)
                setError(returnData)
            }
        })
    }
    function decrementQuantity() {
        if (quantity === 1) //quantity is 1 and now it was decreased by 1, i.e 0 ,  so remove it from cart
        {
            deleteBookFromCart(props.id, function (returnVal, returnData) {
                if (returnVal) {
                    setQuantity(prevQuantity => prevQuantity - 1);
                }
                else {
                    console.log("failed to remove book from the cart");
                    setError(returnData)
                }
            })
        }
        else if (quantity > 1) {
            updateCart(props.id, quantity - 1, function (returnVal, returnData) {
                if (returnVal) {
                    setQuantity(prevQuantity => prevQuantity - 1)
                }
                else {
                    console.log("[BookDescription] Updating cart failed", returnVal)
                    setError(returnData)
                }
            })

        }

    }//end of decrement

    const [backdropAndModal, showBackdropAndModal] = useState(false);

    function hideBackdropAndModal() {
        showBackdropAndModal(false);
    }

    const addBookToCart = (bookId, title, author, img_link, price) => {


        addToCart(bookId, title, author, img_link, price, function (returnVal, returnData) {

            if (returnVal) {

                setQuantity(1);
            }
            else {
                console.error("adding Book to cart failed");
                setError(returnData);
            }
        })

    }

    const isLoggedIn = () => {

        var loggedInUser = null;
        try {
            loggedInUser = localStorage.getItem("name");

            if (loggedInUser == null)
                showBackdropAndModal(true);
            else
                addBookToCart(props.id, props.title, props.authors, props.imageLink, props.retailPrice);
        }
        catch (err) {
            console.log("error occured trying to fetch data from local storage")
        }
    }
    let exhibitBackdrop = backdropAndModal ? <Modal clicked={hideBackdropAndModal} /> : null;
    let addToCartOrQuantity = quantity > 0 ? <QuantityButtons quantity={quantity} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} /> : <button className="btn btn-block addToCartButton" onClick={() => isLoggedIn(props)}>Add to Cart</button>;
    if (error)
        return <h3 className="text-center">{error}</h3>
    else {
        return (
            <div style={{ width: '100%' }}>
                {exhibitBackdrop}
                <div className="titleHeading">{props.title}</div>
                <div className="writtenByText">By <span className="authorText">{props.authors}</span></div>
                {addToCartOrQuantity}
                <p className="bookDescription">
                    {props.description}
                </p>
            </div>
        )
    }

}
export default BookDescription;