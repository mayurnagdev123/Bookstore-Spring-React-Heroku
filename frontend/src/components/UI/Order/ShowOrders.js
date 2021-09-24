import { useEffect, useState } from "react";
import './ShowOrders.css'

import OrderItemBook from "../Templates/OrderItemBook";
import Spinner from "../Spinner/Spinner";

function ShowOrders(props) {

    const [deliveryDetails, setDeliveryDetails] = useState({})
    const [totalAmount, setTotalAmount] = useState(0);
    const [orderPlacedDate, setOrderPlacedDate] = useState("")
    const [booksArray, setBooksArray] = useState([]);
    //const [orderId, setOrderId] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        var booksForCurrentOrder = props.books;


        let booksArray = [];
        booksForCurrentOrder.forEach(book => {
            booksArray.push(<OrderItemBook title={book.title} id={book.bookId} quantity={book.quantity} price={book.price} img_link={book.img_link} key={book.bookId} />)
        });
        if (booksArray.length === booksForCurrentOrder.length) //all data populated
        {
            console.log("all stuff  populated")
            setBooksArray(booksArray);
            // setOrderId(props.orderId);
            setOrderPlacedDate(props.orderPlacedDate);
            setTotalAmount(props.totalAmount);
            setDeliveryDetails(props.deliveryDetails);
            setLoading(false);
        }


    }, [props])
    if (loading)
        return <Spinner />
    else {
        return (
            <div className="orderCard showOrdersText">
                <div className="row">
                    <div className="col-xs-6 col-md-4">
                        <div><strong>Order Status</strong></div>
                        <div style={{ fontWeight: '500' }}>Order Placed on {orderPlacedDate}</div>
                    </div>
                    <div className="hidden-xs col-md-5"></div>
                    <div className="col-xs-6 col-md-3">
                        <div> <strong>Order Total ({booksArray.length} items)</strong></div>
                        <div> <span className="showOrdersSubheading">Rs. {totalAmount}</span> (inclusive of 1.8% tax)</div>
                    </div>
                </div> {/*  end of 1st row */}
                <div className="row" style={{ marginTop: '15px' }}>
                    <div className="col-xs-6 col-md-8" style={{ flexDirection: 'column', display: 'flex' }}>
                        {booksArray}
                    </div>
                    <div className="col-xs-6 col-md-4">
                        <div><strong>Delivery Address</strong></div>
                        <div>{deliveryDetails.name}<br />{deliveryDetails.address}, {deliveryDetails.pincode}<br /> {deliveryDetails.city}<br />{deliveryDetails.mobile}</div>
                        <div style={{ marginTop: '20px' }}><strong>Mode of Payment</strong></div>
                        <div>Cash On Delivery</div>
                    </div>
                </div>{/*  end of 2nd row */}
            </div>
        )
    }

}
export default ShowOrders;