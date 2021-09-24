import React from "react";
import './QuantityButtons.css'
const QuantityButtons = (props) => {

    return (
        <div className="quantityAlignment">
            <button className="btn quantityBtn" onClick={() => props.decrementQuantity(props.bookId, props.quantity, props.price)}>-</button>
            <span className="quantityText">{props.quantity}</span>
            <button className="btn quantityBtn" onClick={() => props.incrementQuantity(props.bookId, props.quantity, props.price)}>+</button>
        </div>
    )

}
export default QuantityButtons;