import React from 'react'
import ShowCategories from '../Categories/ShowCategories';
import { Switch, Route } from 'react-router-dom'
import HomeHOC from './HomeHOC';
import FetchResults from '../Results/FetchResults';
import BookDetails from '../BookDetails/BookDetails';
import ShowCart from '../Cart/ShowCart';
import PlaceOrder from '../Order/PlaceOrder';
import FetchOrders from '../Order/FetchOrders';
import Logout from '../Logout/Logout';
function Home(props) {
    const imageData = [
        {
            image: 'action2.jpg',
            name: 'Adventure'
        },
        {
            image: 'adult.jpg',
            name: 'Adult'
        },
        {
            image: 'biographies.jpg',
            name: 'Biographies'
        },
        {
            image: 'mystery.jpg',
            name: 'Mystery'
        },
        {
            image: 'children.jpg',
            name: 'Children'
        },
        {
            image: 'fantasy.jpg',
            name: 'Fantasy'
        },
        {
            image: 'history.jpg',
            name: 'History'
        },
        {
            image: 'horror.jpg',
            name: 'Horror'
        },
        {
            image: 'literary.jpg',
            name: 'Manga'
        },
        {
            image: 'non-fiction.jpg',
            name: 'NonFiction'
        },
        {
            image: 'romance.jpg',
            name: 'Romance'
        },
        {
            image: 'science.jpg',
            name: 'Science'
        }

    ]
    let newArr = []
    let showArr = []
    imageData.forEach((image, index) => {
        if (index === 0 || index % 4 !== 0)
            newArr.push(image)
        else {
            showArr.push(<ShowCategories key={index} imageData={newArr} />)
            newArr = []
            newArr.push(image)
        }
        if (index === imageData.length - 1)
            showArr.push(<ShowCategories key={index + 1} imageData={newArr} />)
    });


    return (
        <div style={{ marginTop: '100px' }}>

            <Switch>
                <Route path="/search" render={() => { return <FetchResults /> }} />
                <Route path="/bookDetails" render={() => { return <BookDetails scrollTopHandler={props.scrollTopHandler} /> }} />
                <Route path="/showCart" component={ShowCart} />
                <Route path="/placeOrder" component={PlaceOrder} />
                <Route path="/orders" component={FetchOrders} />
                <Route path="/logout" component={Logout} />
                <Route path="/" render={() => { return <HomeHOC text="BROWSE GENRES" data={showArr} /> }} />

            </Switch>
        </div >
    )
}

export default Home;