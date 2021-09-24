import React, { useEffect, useState, useRef } from 'react'
import '../Templates/BookWithTitleImage.css';
import BookDetailsOnHover from '../Templates/BookDetailsOnHover';
import './ShowSimilarResults.css'
import leftButton from '../../../assets/leftbutton.svg'
import rightButton from '../../../assets/rightbutton.svg'
function ShowSimilarResults({ similarResults }) {
    const [finalSimilarBooks, setFinalSimilarBooks] = useState([]);
    const movieRowRef = useRef();

    const scrollLeftHandler = () => {
        movieRowRef.current.scrollLeft -= 200;

    }
    const scrollRightHandler = () => {
        movieRowRef.current.scrollLeft += 200;

    }
    const scollToInitialPosition = () => {
        movieRowRef.current.scrollLeft = 0;
    }

    useEffect(() => {
        let finalArr = []

        scollToInitialPosition();
        similarResults.forEach((book, index) => {
            if (index !== 0 && book?.volumeInfo?.imageLinks?.smallThumbnail) {

                finalArr.push(
                    <div className="col-xs-12 col-md-2 img__wrap similarImage" key={index} >
                        <img src={book.volumeInfo.imageLinks.smallThumbnail} alt="none" style={{ width: '70%', height: '70%' }} className="img__img" />
                        <p style={{ color: 'black', fontWeight: 'bold', width: '100%', textOverflow: 'ellipsis', overflow: 'hidden' }}> {book?.volumeInfo?.title}</p>
                        <div className="img__description_layer">
                            <BookDetailsOnHover bookData={book} title={book?.volumeInfo?.title} author={book?.volumeInfo?.authors?.toString()} img={book.volumeInfo.imageLinks.smallThumbnail} />
                        </div>
                    </div>
                )

            }//end of if

        });
        setFinalSimilarBooks(finalArr)
    }, [similarResults]);
    return (
        <div className="row" >
            <div className="col-md-2 hidden-xs"></div>
            <div className="col-md-10 col-xs-12">
                <div className="scroll__button left__button" onClick={scrollLeftHandler}><img src={leftButton} alt="Scroll left" /></div>
                <div className="scroll__button right__button" onClick={scrollRightHandler}><img src={rightButton} alt="Scroll right" /></div>

                <div style={{ display: 'flex', overflow: 'hidden', padding: '7% 5%' }} ref={movieRowRef} >
                    {finalSimilarBooks}


                </div>
            </div>

        </div>
    )

}

export default ShowSimilarResults;