import Api from './api.js';

const api = new Api('us-central1-mercdev-academy.cloudfunctions.net', false)
const emailInput = document.querySelector(".form__input_email");
const passwordInput = document.querySelector(".form__input_password");
const page = document.querySelector(".page");
const invalidEmail = document.querySelector(".form__invalid-email");
const centralBlock = document.querySelector(".central-block");
const form = document.querySelector(".form");
const userInfo = document.querySelector("#user-info-template");
const parseForm = () => {
    return JSON.stringify({
        "email": emailInput.value,
        "password": passwordInput.value
    });
};


let wasSent = false;

form.onsubmit = (e) => {
    if (wasSent) return false;
    wasSent = true;
    e.preventDefault();
    const request = new XMLHttpRequest();
    request.open("POST", "https://us-central1-mercdev-academy.cloudfunctions.net/login");
    request.setRequestHeader("content-type", "application/json");

    request.onreadystatechange = (e) => {
        if (request.readyState === 4) {
            if (request.status === 200) {
                emailInput.classList.remove("form__input_email-wrong");
                passwordInput.classList.add("last");
                invalidEmail.classList.add("hide");
                invalidEmail.classList.remove("last");
                setUserInfo(JSON.parse(request.responseText));
            } else if (request.status === 400) {
                emailInput.classList.add("form__input_email-wrong");
                passwordInput.classList.remove("last");
                invalidEmail.classList.remove("hide");
                invalidEmail.classList.add("last");
            }
            wasSent = false;
        }
    };

    request.send(parseForm());
};

const setUserInfo = (jsonObj) => {
    centralBlock.removeChild(form);
    centralBlock.appendChild(document.importNode(userInfo.content, true));
    const userInfoDiv = document.querySelector(".user-info");
    userInfoDiv.querySelector(".user-icon").src = jsonObj.photoUrl;
    userInfoDiv.querySelector(".user-name").textContent = jsonObj.name;
};

const logout = () => {
    centralBlock.removeChild(document.querySelector(".user-info"));
    centralBlock.appendChild(form)
};

api.getRequest('login',  JSON.stringify({
    "email": emailInput.value,
    "password": passwordInput.value
}), (response)=>{
    console.log(response)
})