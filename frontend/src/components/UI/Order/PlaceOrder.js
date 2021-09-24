import React, { useEffect, useState } from 'react'
import { checkRequisiteItemsInLocalStorage, placeOrder } from '../../../functions/util';
import Spinner from '../Spinner/Spinner';
import './PlaceOrder.css'
const PlaceOrder = (props) => {

    const [totalPrice, setTotalPrice] = useState(0);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [pincode, setPincode] = useState("");
    const [selectedValue, setSelectedValue] = useState("Mr.");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!checkRequisiteItemsInLocalStorage() || props.location.totalPrice === undefined) {
            props.history.replace("/");
        } else {
            var totalPrice = props.location.totalPrice;
            var loggedInName = localStorage.getItem("name") || "";
            var loggedInEmail = localStorage.getItem("email") || "test@test.com";
            setTotalPrice(totalPrice);
            setName(loggedInName);
            setEmail(loggedInEmail);

        }
    }, [props.location.totalPrice, props.history]);

    const nameChangedHandler = (event) => {
        setName(event.target.value);
    }

    const mobileChangedHandler = (event) => {
        setMobile(event.target.value);
    }
    const addressChangedHandler = (event) => {
        setAddress(event.target.value);
    }
    const cityChangedHandler = (event) => {
        setCity(event.target.value);
    }
    const pincodeChangedHandler = (event) => {
        setPincode(event.target.value);
    }
    const placeOrderForm = (event) => {
        event.preventDefault();
        var nameWithTitle = selectedValue + name;
        setLoading(true);

        let data = {
            "name": nameWithTitle,
            "address": address,
            "city": city,
            "mobile": mobile,
            "pincode": pincode,
            "totalAmount": totalPrice
        }
        placeOrder(data, function (returnVal, returnData) {
            if (returnVal) {
                setLoading(false);
                props.history.push("/orders");
            }
            else {
                console.log("Failed to place order", returnVal);
                setLoading(false);
                setError(returnData);
            }
        })
    }
    const selectChangedHandler = (event) => {
        setSelectedValue(event.target.value);
    }
    if (loading)
        return <Spinner />
    else if (error)
        return <h3 className="text-center">{error.toString()}</h3>
    else {
        return (
            <div className="container placeOrderCard">
                <form onSubmit={placeOrderForm} >
                    <div className="row">
                        <div className="hidden-xs col-md-3 orderHeading" >Order Confirmation</div>
                        <div className="col-md-3 hidden-xs"></div>
                        <div className="col-xs-6 col-md-3 orderHeading">Order Total <strong>Rs {totalPrice}</strong></div>
                        <div className="col-xs-6 col-md-3"><button className="btn btn-block placeOrderBtn">Place Order</button></div>
                    </div>
                    <div className="row" style={{ marginTop: '15px' }}>
                        <div className="col-md-6 col-xs-12">
                            <div className="form-group">
                                <label htmlFor="info">Your Information</label>
                                <hr style={{ height: '2px', backgroundColor: 'black', width: '100%' }}></hr>
                                <div className="row">
                                    <div className="col-xs-5 ">
                                        <select name="title" id="title" className="placeOrderInput form-control" onChange={selectChangedHandler} value={selectedValue} >
                                            <option value="Mr.">Mr.</option>
                                            <option value="Miss.">Miss</option>
                                            <option value="Other.">Other</option>
                                        </select>
                                    </div>
                                    <div className="col-xs-7"> <input className="form-control placeOrderInput" type="text" value={name} onChange={nameChangedHandler} required></input></div>
                                </div>
                                <div className="row" style={{ marginTop: '15px' }}>
                                    <div className="col-xs-6">
                                        <input className="form-control placeOrderInput" type="email" defaultValue={email} readOnly ></input>

                                    </div>
                                    <div className="col-xs-6">
                                        <input type="number" className="placeOrderInput form-control" value={mobile} onChange={mobileChangedHandler} placeholder="Mobile" required></input>
                                    </div>
                                </div>

                            </div>
                            <div className="form-group" style={{ marginTop: '20px' }}>
                                <label htmlFor="info">Payment</label>
                                <hr style={{ height: '2px', backgroundColor: 'black', width: '100%' }}></hr>
                                <label><input type="radio" style={{ margin: '2px' }} className="placeOrderInput" name="Cash On Delivery" value="Cash On Delivery" checked readOnly />Cash On Delivery</label>

                            </div>
                        </div>{/* col-xs-6 */}

                        <div className="col-md-6 col-xs-12">
                            <div className="form-group">
                                <label htmlFor="info">Shipping Address</label>
                                <hr style={{ height: '2px', backgroundColor: 'black', width: '100%' }}></hr>
                                <textarea value={address} onChange={addressChangedHandler} className="placeOrderInput form-control" placeholder="Address" rows="3" maxLength="60" required />
                            </div>

                            <div className="row" style={{ marginTop: '15px' }}>
                                <div className="col-xs-6">
                                    <input type="text" value={city} onChange={cityChangedHandler} className="form-control placeOrderInput" placeholder="City" required></input>
                                </div>
                                <div className="col-xs-6">
                                    <input type="number" value={pincode} onChange={pincodeChangedHandler} maxLength="6" className="placeOrderInput form-control" placeholder="Pincode" required></input>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }

}
export default PlaceOrder;