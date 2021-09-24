import React from 'react'
import './BookWithInfoImage.css'
function BookWithInfoImage(props) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
            <center><img src={props.imageLink} alt="" className="coverImage" /></center>
            <p className="publishing_price_info" style={{ marginTop: '16px' }}>PUBLISHED : <strong>{props.publishedYear}</strong></p>
            <p className="publishing_price_info">PUBLISHER : <strong>{props.publisher}</strong></p>
            <p className="publishing_price_info">PAGES : <strong>{props.pageCount}</strong></p>
            <p className="publishing_price_info">PRICE : <strong><span style={{ color: '#17a288', fontWeight: 'bold' }}>Rs {props.retailPrice}</span></strong></p>

        </div>
    )

}
export default BookWithInfoImage;