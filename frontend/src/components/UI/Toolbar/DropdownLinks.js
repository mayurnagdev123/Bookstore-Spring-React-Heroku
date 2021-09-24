import { Link } from "react-router-dom";
import './DropdownLinks.css'
const DropdownLinks = (props) => {


    return (
        <div className="dropdown">
            <span className="dropbtn">{localStorage.getItem("name")}</span>
            <div className="dropdown-content">
                <Link className="dropdownItem" to={{ pathname: "/" }}>Home</Link>
                <Link className="dropdownItem" to={{ pathname: "/orders" }}>My Orders</Link>
                <Link className="dropdownItem" to={{ pathname: "/logout", updateLoggedInUserName: props.updateLoggedInUserName }}>Logout</Link>
            </div>
        </div>
    )

}
export default DropdownLinks;