import React from 'react'
import Footer from '../Footer/Footer'
import './HomeHOC.css'
function HomeHOC(props) {
    return (
        <div>
            <div className="row parentHocDiv hocDiv">
                <div className="col-xs-12">{props.text}</div>
            </div>
            {props.data}
            <Footer />
        </div>
    )
}
export default HomeHOC