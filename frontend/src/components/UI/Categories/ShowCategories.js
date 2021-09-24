import React from 'react'
import './ShowCategories.css'
import { Link } from 'react-router-dom'
const ShowCategories = ({ imageData }) => {

    return (
        <div className="parentDivShowCategories row">
            {
                imageData.map((currentImage, index) => {

                    var imagePic = require(`../../../assets/${currentImage.image}`).default
                    return (

                        <div className="col-md-3 col-xs-12 mobileMargin" key={index}>
                            <Link className="childLink" to={{ pathname: "/search", search: `?name=${currentImage.name}&type=genre` }}>
                                <img src={imagePic} alt={currentImage.name} className="imagePic" />
                                <p className="centeredText">{currentImage.name}</p>
                            </Link>

                        </div>
                    )
                })
            }
        </div>
    )


}

export default ShowCategories;