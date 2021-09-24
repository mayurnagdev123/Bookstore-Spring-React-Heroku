import { axios_register_login_user, axios_secured_delete_requests, axios_secured_get_requests, axios_secured_post_requests } from "../axios/axios";

let mypromise = function checkImageResolution(url) {
    return new Promise((resolve, reject) => {
        var img = new Image();
        img.src = url;
        img.onload = function () {
            //  console.log("image dimensions", this.width, this.height);
            if (this.width < 125 || this.height < 100) //if either of these is true, reject the image
                reject("low quality image");
            else
                resolve("high quality ,let's have this one");
        }
    });
}
export function addToLocalStorage(key, value) {
    try {
        localStorage.setItem(key, value);
    }
    catch (err) {
        console.error("error setting values in local storage");
    }
}

export async function register(username, name, email, password, callback) {
    var finalResponse = "no request made yet!";
    axios_register_login_user.post('/register', {
        'username': username,
        'name': name,
        'email': email,
        'password': password
    })
        .then(response => {
            finalResponse = "Registration Successful. You'll be redirected to login shortly";
            callback(finalResponse);
        })
        .catch(error => {
            var errorStatus = error.response.status;
            var errorMsg = error?.response?.data?.error?.toString() || error.toString();
            var errorToDisplay = null;
            if (errorMsg.includes("Email exists"))
                errorToDisplay = "CONFLICT - This email is already taken!";
            else if (errorMsg.includes("Username exists"))
                errorToDisplay = "CONFLICT - This username is already taken!";
            else
                errorToDisplay = errorMsg + "\t" + errorStatus;

            finalResponse = errorToDisplay;
            callback(finalResponse)
        });

}

export async function login(username, password, callback) {

    axios_register_login_user.post("/authenticate", {
        'username': username,
        'password': password
    }).then(response => {

        callback(response.data, response.headers);

    }).catch(error => {
        console.log("failed", error);
        callback("Failed");
    })
}
export function addToCart(bookId, title, author, img_link, price, callback) {
    if (isTokenExpired()) {
        clearLocalStorage();
        callback(false, "You have been logged out!");
        document.getElementById("hiddenBtn").click();
        alert("You have been logged out!, Please re-login to continue")
    } else {

        axios_secured_post_requests.post("addToCart", {
            "bookId": bookId,
            "quantity": "1",
            "title": title,
            "author": author,
            "img_link": img_link,
            "price": price
        }).then(response => {
            callback(true, "");
        }).catch(error => {
            console.log("error", error);
            callback(false, error.toString());
        })
    }
}
export function placeOrder(data, callback) {
    if (isTokenExpired()) {
        clearLocalStorage();
        callback(false, "You have been logged out!");
        document.getElementById("hiddenBtn").click();
        alert("You have been logged out!, Please re-login to continue")
    } else {

        axios_secured_post_requests.post("/placeOrder", data)
            .then(response => {

                callback(true, "");

            }).catch(error => {
                console.log("placing order failed", error);
                callback(false, error.toString());
            })
    }
}
export function updateCart(bookId, updatedQuantity, callback) {
    if (isTokenExpired()) {
        clearLocalStorage();
        callback(false, "You have been logged out!");
        document.getElementById("hiddenBtn").click();
        alert("You have been logged out!, Please re-login to continue")
    } else {
        axios_secured_post_requests.post("/updateCart", {

            "bookId": bookId,
            "quantity": updatedQuantity
        }).then(response => {
            callback(true, "");
        }).catch(error => {
            console.log("error updating cart", error);
            callback(false, error.toString());
        })
    }
}
export function deleteBookFromCart(bookId, callback) {
    if (isTokenExpired()) {
        clearLocalStorage();
        callback(false, "You have been logged out!");
        document.getElementById("hiddenBtn").click();
        alert("You have been logged out!, Please re-login to continue")
    } else {
        axios_secured_delete_requests.delete("deleteBookFromCart", {
            data: { "uniqueBookId": bookId }
        }).then(response => {

            callback(true, "")
        }).catch(error => {
            console.log("deletion failed", error);
            callback(false, error.toString());
        })
    }
}
export function fetchOrders(callback) {
    if (isTokenExpired()) {
        clearLocalStorage();
        callback(false, "You have been logged out!");
        document.getElementById("hiddenBtn").click();
        alert("You have been logged out!, Please re-login to continue")
    } else {
        axios_secured_get_requests.get("/fetchOrders")
            .then(response => {

                callback(true, response.data);
            }).catch(error => {
                console.log("fetching orders failed", error.response);
                callback(false, error.toString())
            })
    }
}
export function showCartItems(callback) {
    if (isTokenExpired()) {
        clearLocalStorage();
        callback(false, "You have been logged out!");
        document.getElementById("hiddenBtn").click();
        alert("You have been logged out!, Please re-login to continue")

    }
    else {
        axios_secured_get_requests.get("/showCart")
            .then(response => {

                callback(true, response.data);
            }).catch(err => {
                console.log("fetching items in cart failed", err.response);
                callback(false, err.toString())
            })
    }
}
export function getBookQuantity(bookId, callback) {
    if (isTokenExpired()) {
        clearLocalStorage();
        callback(true, 0); //a user who is not logged in should still see the quantity as 0
        document.getElementById("hiddenBtn").click();
        //  alert("You have been logged out!, Please re-login to continue")

    }
    else {
        axios_secured_get_requests.get(`getBookQuantity?bookId=${bookId}`)
            .then(response => {

                callback(true, response.data)
            })
            .catch(err => {
                console.log("fetching book quantity failed", err.response)
                callback(false, err.toString())
            })
    }
}

export function logoutUser(callback) {
    if (isTokenExpired()) {
        clearLocalStorage();
        callback(false, "You have been logged out!");
        document.getElementById("hiddenBtn").click();
        alert("You have been logged out!, Please re-login to continue")
    } else {
        axios_secured_post_requests.post("/logout").then(response => {

            callback(true, response.data);
        }).catch(error => {
            console.log("error logging out", error, "---", error.response);
            callback(false, error.toString());
        })
    }
}
export function clearLocalStorage() {
    try {
        localStorage.clear();
    }
    catch (err) {
        console.log("error occured clearing local storage", err);
        return false;
    }
    return true;
}
export function checkRequisiteItemsInLocalStorage() {
    if (localStorage.getItem("name") && localStorage.getItem("email") && localStorage.getItem("username") && localStorage.getItem("expiry")) {
        return true;
    }
    else {
        console.log("Local Storage does not have all the requisite items")
        return false;
    }
}
function isTokenExpired() {
    if (checkRequisiteItemsInLocalStorage()) {
        let remainingTime = localStorage.getItem("expiry") - Date.now();
        let isExpired = remainingTime > 0 ? false : true;
        console.log("remaining milliseconds", remainingTime, isExpired);
        return isExpired;
    }
    else
        return true;

}




export default mypromise