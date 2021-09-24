import React from "react";
import { Link } from "react-router-dom";
import './OrderItemBook.css'
const OrderItemBook = (props) => {


    return (
        <div className="row orderBookItemRow">
            <div className="col-xs-1 col-md-3 col-lg-1">
                <img className="orderBookItem" src={props.img_link} alt="A book you ordered"></img>
            </div>
            <div className="col-xs-11 col-md-8 col-lg-11">
                <div> <Link to={{ pathname: "/bookDetails", search: `?id=${props.id}` }} style={{ color: '#17a288', fontWeight: '500' }}>{props.title}</Link></div>

                <div>Price : {props.price}</div>
                <div> Qty : {props.quantity}</div>

            </div>

        </div>
    )

}
export default OrderItemBook;