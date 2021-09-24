import React, { useEffect, useState } from 'react'
import BookWithTitleImage from '../Templates/BookWithTitleImage'
import './ShowResults.css'
import mypromise from '../../../functions/util'


const ShowGenreResults = ({ item, searchResults }) => {

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let lowResImage = 0;
        let dataWithoutImage = 0;
        let highResImage = 0;
        let newArr = [];
        setLoading(true);
        if (searchResults === undefined || searchResults === null || searchResults.length === 0) {
            console.log("Show Results nothing found", searchResults)
            setLoading(false);
            return <h2>No results found :( </h2>
        }

        searchResults?.forEach((book, index) => {
            if (book?.volumeInfo?.imageLinks?.smallThumbnail) { //the current book has an image
                mypromise(book.volumeInfo.imageLinks.smallThumbnail).then((res) => {
                    ++highResImage;
                    newArr.push(book)
                }).catch(error => {
                    ++lowResImage;

                }).finally(() => {
                    if (dataWithoutImage + highResImage + lowResImage === searchResults.length) {
                        console.log("---------data populated----------");
                        //  console.log("highResolutionImages", highResImage);
                        // console.log("low resolution images:", lowResImage);
                        // console.log("booksWithoutImages", dataWithoutImage);
                        // console.log("searchResults size", searchResults.length);
                        setLoading(false);
                        setBooks(newArr);
                    }
                });

            }

            else  //this book does not contain an image
                ++dataWithoutImage;

            if (dataWithoutImage + highResImage + lowResImage === searchResults.length) {
                console.log("---------data populated----------");
                //   console.log("highResolutionImages", highResImage);
                // console.log("low resolution images:", lowResImage);
                //  console.log("booksWithoutImages", dataWithoutImage);
                // console.log("searchResults size", searchResults.length);
                setLoading(false);
                setBooks(newArr);
            }
        })
    }
        , [searchResults]);  //end of useEffect


    if (loading) {
        return <h3 className="text-start">Please wait...</h3>
    }

    let finalArr = [];
    if (books.length > 0)
        finalArr.push(<BookWithTitleImage data={books} key={books.length + 1} />);
    else {
        if (!loading) {
            finalArr.push([<h2 key={1}>No results found :( </h2>])
        }
    }

    return (

        <div className="row">
            <span className="genreTitle">{item} Books</span>
            {finalArr}
        </div>
    )


}
export default ShowGenreResults;