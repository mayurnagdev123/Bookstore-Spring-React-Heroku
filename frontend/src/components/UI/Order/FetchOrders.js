import { useEffect, useState } from "react";
import ShowOrders from "./ShowOrders";
import './FetchOrders.css'
import { checkRequisiteItemsInLocalStorage, fetchOrders } from "../../../functions/util";
import Spinner from "../Spinner/Spinner";

const FetchOrders = (props) => {
    const [allOrders, setAllOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!checkRequisiteItemsInLocalStorage()) {
            props.history.replace("/");
        }
        else {
            let orderItems = [];
            let fetchedOrders = [];
            fetchOrders(function (returnVal, returnData) {
                if (returnVal)//orders fetched successfully
                {
                    fetchedOrders = returnData;
                    fetchedOrders?.forEach(order => {
                        orderItems.push(<ShowOrders key={order.orderId} id={order.orderId} orderPlacedDate={order.orderPlacedDate} books={order.books} deliveryDetails={order.deliveryDetails} totalAmount={order.totalAmount} />);
                    })
                    if (orderItems.length === fetchedOrders.length) {
                        setAllOrders(orderItems);
                        setLoading(false);
                    }

                }
                else//order fetch failed{
                {
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
            <div className="showOrdersMargin">
                <div className="showOrdersHeading">{allOrders.length > 0 ? 'Your Orders' : 'Nothing here :('}  </div>
                {allOrders}
            </div>
        )
    }

}
export default FetchOrders;