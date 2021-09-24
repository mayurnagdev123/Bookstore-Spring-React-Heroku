import React from "react"
import { Link } from "react-router-dom"
import './BookDetailsOnHover.css'
function BookDetailsOnHover(props) {

    let bookData = props.bookData;
    return (
        <div style={{ backgroundColor: 'white', color: 'black !important', zIndex: '10', width: '100%', height: '100%', boxShadow: '5px 10px 10px 10px #888888' }}>
            <div className="row" style={{ margin: '0px', height: '100%' }}>
                <div className="col-xs-6" style={{ padding: '0', border: '3px solid black', height: '100%' }}>
                    <img src={props.img} style={{ height: '100%', width: '100%', verticalAlign: 'bottom' }} alt="" />
                </div>
                <div className="col-xs-6" style={{ padding: '5px', height: '100%' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', height: '100%' }}>
                        <div style={{ minHeight: '80%', whiteSpace: 'nowrap' }}>
                            <p className="ptext" title={props.title}>{props.title}</p>
                            <p style={{ marginTop: '10px' }} className="ptext">by</p>
                            <p className="ptext" title={props.author}>{props.author}</p>
                        </div>
                        <Link to={{ pathname: "/bookDetails", search: `?id=${bookData.id}` }}>
                            <button className="btn btn-block readMoreBtn" >READ MORE</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div >
    )


}
export default BookDetailsOnHover