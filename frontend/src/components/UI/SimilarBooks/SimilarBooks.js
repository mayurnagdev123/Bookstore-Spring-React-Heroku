import React, { useEffect, useState } from 'react'
import { axios_book_instance } from '../../../axios/axios';
import Spinner from '../Spinner/Spinner';
import ShowSimilarResults from './ShowSimilarResults';
import './SimilarBooks.css'
function SimilarBooks(props) {
    const [similarBooks, setSimilarBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios_book_instance.get(`?q=${props.title}&maxResults=20`)
            .then(response => {
                //  console.log("request success", response.data.items);
                setSimilarBooks(response.data.items);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
                console.log(error);
            })
    }, [props.title]);
    let data = null;
    if (loading)
        data = <Spinner />
    else if (error)
        data = (<h3 className="text-center">{error.toString()}</h3>)
    else
        data = <ShowSimilarResults similarResults={similarBooks} />




    return (
        <div style={{ marginTop: '50px' }}>
            <div className="row">
                <div className="col-md-2 hidden-xs"></div>
                <div className="col-xs-10 col-md-2 text-center similarText">
                    Similar Books
                </div>
                <div className="col-md-8"></div>
            </div>
            <div className="row">
                <div className="col-xs-12">
                    {data}
                </div>
            </div>



        </div>
    )


}
export default SimilarBooks;