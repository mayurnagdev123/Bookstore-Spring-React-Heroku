import React, { useState } from 'react'
import Backdrop from '../Backdrop/Backdrop'
import './Modal.css'
import ModalLogin from './ModalLogin';
import ModalSignup from './ModalSignup';
const Modal = (props) => {

    const [login, setLogin] = useState(true);
    const toggleLoginSignup = () => {

        setLogin(prevLogin => !prevLogin);
    }


    return (
        <div>
            <Backdrop clicked={props.clicked} />
            <div className="modalStyle" >

                {login ? <ModalLogin toggleLoginSignup={toggleLoginSignup} clicked={props.clicked} updateLoggedInUserName={props.updateLoggedInUserName} /> : <ModalSignup toggleLoginSignup={toggleLoginSignup} />}

            </div>
        </div>
    )
}
export default Modal;