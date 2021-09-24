import axios from 'axios';
import React, { useEffect, useState } from 'react'
import SimilarBooks from '../SimilarBooks/SimilarBooks';
import Spinner from '../Spinner/Spinner';
import BookDescription from '../Templates/BookDescription';
import BookWithInfoImage from '../Templates/BookWithInfoImage';
import { withRouter } from 'react-router';
function BookDetails(props) {
    const [bookDetails, setBookDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [uniqueBookId, setUniqueBookId] = useState(null);



    useEffect(() => {
        const urlParams = new URLSearchParams(props.location.search);
        var bookId = urlParams.get('id') || undefined;
        setUniqueBookId(bookId);
        if (bookId === undefined)
            props.history.replace("/");

        axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}`).then(response => {
            setBookDetails(response.data);
            setLoading(false);
        }).catch(error => {
            console.log("data fetch failed", error);
            setError(error);
            setLoading(false);
        })
    }, [props]);

    let imageLink = bookDetails?.volumeInfo?.imageLinks?.smallThumbnail;
    let description = bookDetails?.volumeInfo?.description;
    let publisher = bookDetails?.volumeInfo?.publisher;
    let authors = bookDetails?.volumeInfo?.authors?.toString();
    let title = bookDetails?.volumeInfo?.title;
    let retailPrice = Math.floor(bookDetails?.saleInfo?.retailPrice?.amount) || 400;
    let pageCount = bookDetails?.volumeInfo?.pageCount;
    let publishedYear = bookDetails?.volumeInfo?.publishedDate?.toString().trim().substring(0, 4);

    if (loading) {
        return <Spinner />
    }
    else if (error)
        return <h2 className="text-center">{error.toString()} </h2>
    else {
        return (
            <div>
                <div className="row" style={{ marginTop: '50px', overflow: 'auto' }} >
                    <div className="col-md-2 hidden-xs">

                    </div>
                    <div className="col-md-2 col-xs-12 text-center">
                        <BookWithInfoImage retailPrice={retailPrice} imageLink={imageLink} publisher={publisher} pageCount={pageCount} publishedYear={publishedYear} />
                    </div>
                    <div className="col-xs-12 col-md-6">
                        <BookDescription id={uniqueBookId} title={title} authors={authors} description={description} retailPrice={retailPrice} imageLink={imageLink} scrollTopHandler={props.scrollTopHandler} />
                    </div>
                    <div className="col-md-2 hidden-xs">

                    </div>

                </div>
                {!loading && !error ? <SimilarBooks title={title} /> : null}
            </div>
        )
    }
}
export default withRouter(BookDetails);
