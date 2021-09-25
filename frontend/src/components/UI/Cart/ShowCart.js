import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { checkRequisiteItemsInLocalStorage, showCartItems } from "../../../functions/util";
import Spinner from "../Spinner/Spinner";
import CartItem from "../Templates/CartItem";
import './ShowCart.css'

function ShowCart(props) {
    const [cartItemsData, setCartItemsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);

    function updateTotalPrice(type, price) {

        switch (type) {
            case "increment":
                setTotalPrice(prevPrice => prevPrice + price);
                break;
            case "decrement":
                setTotalPrice(prevPrice => prevPrice - price);
                break;
            default:
                console.log("invalid update price operation")
        }
    }

    useEffect(() => {
        if (!checkRequisiteItemsInLocalStorage()) {
            props.history.replace("/");
        }
        else {
            let cartData = [];
            let itemsFetched = 0;
            let cartItemsSpring = [];
            let price = 0;
            showCartItems(function (returnVal, returnData) {
                if (returnVal) {
                    cartItemsSpring = returnData;
               if (returnData.length === 0) {
                        setCartItemsData([]);
                        setTotalPrice(0);
                        setLoading(false);
                    }
                    cartItemsSpring.every(function (book) {
                        let imageLink = book.img_link;
                        let authors = book.author;
                        let title = book.title;
                        let quantity = book.quantity;
                        let retailPrice = book.price;
                        price += retailPrice * quantity;
                        cartData.push(<CartItem updateTotalPrice={updateTotalPrice} key={book.bookId} bookId={book.bookId} imageLink={imageLink} authors={authors} title={title} quantity={quantity} retailPrice={retailPrice} />);
                        ++itemsFetched;
                        if (itemsFetched === cartItemsSpring.length) {
                            //  console.log("all data fetched");
                            setCartItemsData(cartData);
                            setTotalPrice(price);
                            setLoading(false);
                            return false;
                        }
                        return true;
                    })//end of for each


                }
                else { //error fetching cart items from Spring API
                    setLoading(false);
                    setError(returnData);
                }
            })


        }
    }, [props.history]);



    if (loading)
        return <Spinner />
    else if (error)
        return <h3 className="text-center">{error}</h3>
    else {


        return (
            <div className="showCartPageMargin">
                <div className="row showCartHeading">
                    <div className="col-xs-12">Shopping Cart</div>
                </div>
                <div className="row showCartText">
                    <div className="col-xs-12">{totalPrice > 0 ? 'Your Cart' : 'Nothing here :('}</div>
                </div>
                <div>
                    {cartItemsData}
                </div>
                {
                    totalPrice > 0 ?
                        <div className="row">
                            <div className="col-md-10 col-xs-2"></div>
                            <div className="col-md-2 col-xs-10" >
                                <div className="showSummaryText ">Subtotal : <strong>Rs {totalPrice}</strong></div>
                                <div className="showSummaryText ">Shipping : <strong>Free</strong></div>
                                <div className="showSummaryText ">Taxes : <strong>Rs {parseInt(totalPrice * 0.018)}</strong></div>
                                <div className="showSummaryText ">Order Total :<strong> Rs  {parseInt(totalPrice * 0.018) + totalPrice}</strong></div>
                                <button className="btn checkoutButton"><Link style={{ color: 'white' }} to={{ pathname: '/placeOrder', totalPrice: totalPrice + parseInt(totalPrice * 0.018) }}>Proceed to Checkout</Link> </button>
                            </div>

                        </div>
                        : null
                }
            </div>
        )
    }

}
export default ShowCart;