import React, { useEffect, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Modal from '../Modal/Modal';
import DropdownLinks from './DropdownLinks';
import './Toolbar.css'

const Toolbar = (props) => {
    const [backdropAndModal, showBackdropAndModal] = useState(false);
    const [loggedInName, setLoggedInName] = useState(null);

    useEffect(() => {

        setLoggedInName(localStorage.getItem('name') || null)
        window.addEventListener('storage', storageEventHandler, false);

    }, []);

    function storageEventHandler() {

        setLoggedInName(localStorage.getItem('name') || null)
    }

    function displayBackdrop() {

        showBackdropAndModal(true);
    }
    function testFunc() {

        storageEventHandler();
    }
    function hideBackdropAndModal() {

        showBackdropAndModal(false);
    }
    const searchBook = (event) => {
        event.preventDefault();
        var searchItem = document.getElementById('searchInput').value;
        props.history.push(`/search?name=${searchItem}&type=book`)
    }

    let exhibitBackdrop = backdropAndModal ? <Modal clicked={hideBackdropAndModal} updateLoggedInUserName={storageEventHandler} /> : null;
    let cartWithBooks = (
        <div style={{ position: 'relative' }}>
            <span className="cart"></span>
            <span className="dot" style={{ position: 'absolute', left: '14px', top: '3px' }}></span>
        </div>
    )
    let emptyCart = (
        <div style={{ position: 'relative' }}>
            <span className="cart"></span>
        </div>
    )
    let cartIcon;
    if (loggedInName && localStorage.getItem("cart"))
        cartIcon = cartWithBooks;
    else
        cartIcon = emptyCart;


    let currentlyLoggedInUser = loggedInName ? <DropdownLinks updateLoggedInUserName={storageEventHandler} /> : <span onClick={displayBackdrop}>Log in</span>;
    let loggedInCart = loggedInName ? <Link style={{ textDecoration: 'none', color: 'white' }} to={{ pathname: "/showCart" }}>{cartIcon}</Link> : <span onClick={displayBackdrop}>{cartIcon}</span>
    return (
        <div className="toolbar" style={{ color: 'white' }}>
            {exhibitBackdrop}

            <div className='row toolbarPadding' >
                <div className="col-xs-1" ></div>
                <div className="col-sm-1 hidden-xs" ><Link to="/" style={{ textDecoration: 'none', color: 'white' }}><span className='book_icon'></span></Link></div>
                <div className="hidden-xs hidden-sm hidden-md col-lg-1" onClick={testFunc}>DISCOVER</div>
                <button style={{ display: 'none' }} onClick={testFunc} id="hiddenBtn">Hidden Button</button>
                <div className="col-xs-5 col-md-4">
                    <form className="form-horizontal" onSubmit={searchBook}>
                        <div className="form-group" style={{ display: 'flex' }}>
                            <input id="searchInput" type='text' style={{ height: '38px' }} placeholder='Search by title,author or keyword' className='form-control' required />
                            <button className='control-label search_icon' style={{ marginLeft: '-32px', backgroundColor: '#17a288', height: '38px' }}></button>
                        </div>
                    </form>
                </div>
                <div className="col-md-1 hidden-xs"></div>
                <div className="col-xs-1 col-sm-1">{loggedInCart}</div>
                <div className="col-xs-4 col-sm-3 col-md-2" style={{ textOverflow: 'ellipsis', textAlign: 'center' }}>{currentlyLoggedInUser}</div>
                <div className='col-xs-1  '></div>
            </div>


        </div>
    )


}
export default withRouter(Toolbar);