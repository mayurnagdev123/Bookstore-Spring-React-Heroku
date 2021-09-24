import { useEffect, useState } from "react"
import BookDetailsOnHover from './BookDetailsOnHover'
import './BookWithTitleImage.css'

function BookWithTitleImage({ data }) {

    const [itemsToShow, setItemsToShow] = useState([])
    useEffect(() => {
        let bookItems = [];
        let count = 0;
        let rowKey = 41; //because the max number of results can be 40
        let itemsToDisplay = [];
        let row;
        data.forEach(book => {
            if (count === 0 || count % 4 !== 0) {

            }
            else {
                row = (
                    <div className="row" key={rowKey} id={rowKey}>
                        {bookItems}
                    </div>
                );
                itemsToDisplay.push(row);

                bookItems = [];
                ++rowKey;

            }
            bookItems.push(
                <div className="col-xs-12 col-md-3 img__wrap" key={count}>
                    <img src={book.volumeInfo.imageLinks.smallThumbnail} alt="" className="img__img imgSize " />
                    <p className="bookTitle"> {book?.volumeInfo?.title}</p>
                    <div className="img__description_layer">
                        <BookDetailsOnHover bookData={book} title={book?.volumeInfo?.title} author={book?.volumeInfo?.authors?.toString()} img={book.volumeInfo.imageLinks.smallThumbnail} />
                    </div>
                </div>
            );
            if (count === data.length - 1) {
                row = (
                    <div className="row" key={rowKey} id={rowKey}>
                        {bookItems}
                    </div>
                );
                itemsToDisplay.push(row);
                setItemsToShow(itemsToDisplay)

            }

            ++count;

        }//end of loop
        )
    }, [data])


    return (
        <div style={{ marginTop: '20px' }}>
            {itemsToShow}
        </div>
    )
}
export default BookWithTitleImage