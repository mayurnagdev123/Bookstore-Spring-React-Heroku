import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router';
import axios from '../../../axios/axios';
import Spinner from '../Spinner/Spinner';
import { axios_book_instance } from '../../../axios/axios'
import ShowResults from './ShowResults';
import '../Categories/ShowCategories.css'
const FetchResults = (props) => {
    const [item, setItem] = useState(undefined);
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const urlParams = new URLSearchParams(props.location.search);
        var searchType = urlParams.get('type');
        var itemName = urlParams.get('name');
        setItem(decodeURIComponent(itemName));
        setLoading(true);
        if (searchType === 'genre') {

            axios.get(`volumes?q=subject:${itemName}&maxResults=40`)
                .then(response => {

                    setSearchResults(response.data.items);
                    setLoading(false);
                })
                .catch(error => {
                    console.log(error)
                    setError(error);
                    setLoading(false);
                });
        }
        else if (searchType === 'book') {

            axios_book_instance.get(`?q=${itemName}&maxResults=40`)
                .then(response => {

                    setSearchResults(response.data.items);
                    setLoading(false);
                })
                .catch(error => {
                    console.log(error)
                    setError(error);
                    setLoading(false);
                })

        }
        else {
            console.log("won't search for nothing");
            alert("invalid url");
            props.history.replace("/");
        }
    }, [props]);

    if (loading) {
        return <Spinner />
    }
    else if (error)
        return <h2 className="text-center">{error.toString()} </h2>

    return (
        <div>
            <div className="row parentDivShowCategories">
                <div className="col-xs-3"></div>
                <div className="col-xs-9">
                    {loading ? <Spinner /> : <ShowResults item={item} searchResults={searchResults} />}
                </div>
            </div>
        </div>
    )


}
export default withRouter(FetchResults);