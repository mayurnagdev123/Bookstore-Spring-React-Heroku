import QuantityButtons from "./QuantityButtons"
import './CartItem.css'
import { useEffect, useState } from "react";
import { deleteBookFromCart, updateCart } from "../../../functions/util";
import { Link } from "react-router-dom";


const CartItem = (props) => {
    const [quantity, setQuantity] = useState(0);
    const [bookId, setBookId] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        var quantity = props?.quantity;
        var bookId = props?.bookId;
        setQuantity(parseInt(quantity));
        setBookId(bookId);
    }, [props]);

    function incrementQuantity(bookId, currentQuantity, price) {

        updateCart(bookId, currentQuantity + 1, function (returnVal, returnData) {
            if (returnVal) {
                setQuantity(prevQuantity => prevQuantity + 1);
                props.updateTotalPrice("increment", price);
            }
            else {
                console.log("[BookDescription] Updating cart failed", returnVal);
                setError(returnData);
            }
        })
    }
    function removeBook(bookId, currentQuantity, price) {
        deleteBookFromCart(bookId, function (returnVal, returnData) {
            if (returnVal) {

                var priceToDeduct = currentQuantity * price;

                setQuantity(0);
                props.updateTotalPrice("decrement", priceToDeduct);
            } else {
                console.log("deletion failed");
                setError(returnData);
            }
        })
    }
    function decrementQuantity(bookId, currentQuantity, price) {


        if (currentQuantity === 1) //quantity is 1 and now it was decreased by 1, i.e 0 ,  so remove it from cart
        {
            deleteBookFromCart(bookId, function (returnVal, returnData) {
                if (returnVal) {

                    setQuantity(0);
                    props.updateTotalPrice("decrement", price);
                }
                else {
                    console.log("failed to remove book from the cart");
                    setError(returnData);
                }
            })
        }
        else if (currentQuantity > 1) {
            updateCart(bookId, currentQuantity - 1, function (returnVal, returnData) {
                if (returnVal) {
                    setQuantity(prevQuantity => prevQuantity - 1);
                    props.updateTotalPrice("decrement", price);
                }
                else {
                    console.log("[BookDescription] Updating cart failed", returnVal);
                    setError(returnData);
                }
            })

        }

    }//end of decrement
    if (quantity === 0)
        return <div></div>
    else if (error)
        return <h3 className="text-center">{error}</h3>
    else
        return (

            <div className="row itemCard" >
                <div className="col-lg-1 col-xs-3">
                    <img src={props.imageLink} alt="A book in your cart" className="cartCoverImage"></img>
                </div>
                <div className="col-lg-5 col-xs-9 " style={{ paddingLeft: '25px' }}>
                    <div className="cartBookTitle"><Link to={{ pathname: "/bookDetails", search: `id=${props.bookId}` }}>{props.title}</Link></div>
                    <div className="cartBookAuthor">{props.authors}</div>
                    <div className="cartBookPrice">Price {props.retailPrice}</div>
                </div>


                <div className="col-lg-3 col-xs-12"><QuantityButtons price={props.retailPrice} bookId={bookId} quantity={quantity} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} /></div>
                <div className="col-xs-6 col-lg-2 "><div className="cartItemTotalPrice">Rs. {quantity * parseInt(props.retailPrice)}</div></div>
                <div className="col-xs-6 col-lg-1 "><i className="fa fa-trash trashIcon" aria-hidden="true" onClick={() => removeBook(props.bookId, quantity, props.retailPrice)}></i></div>

            </div>


        )

}

export default CartItem;