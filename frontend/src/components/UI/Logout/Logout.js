import { React, useEffect, useState } from "react";
import { checkRequisiteItemsInLocalStorage, clearLocalStorage, logoutUser } from "../../../functions/util";
import Spinner from "../Spinner/Spinner";

const Logout = (props) => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (!checkRequisiteItemsInLocalStorage()) {
            props.history.replace("/");
        }
        else {
            logoutUser(function (returnVal, returnData) {
                if (returnVal) {
                    clearLocalStorage();
                    setLoading(false);
                    props?.location?.updateLoggedInUserName();
                    props.history.replace("/");
                }
                else {
                    setError(returnData);
                    setLoading(false);

                }
            })
        }
    }, [props])
    if (loading)
        return <Spinner />
    if (error)
        return <h3 className="text-center">{error.toString()}</h3>

    return (
        <div>
            <h3 className="text-center">Please wait...</h3>
        </div>
    )


}
export default Logout;