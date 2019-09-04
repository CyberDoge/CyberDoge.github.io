import Api from './api.js';
import AuthModel from "./auth-model.js";

const api = new Api('us-central1-mercdev-academy.cloudfunctions.net', false);
const emailInput = document.querySelector(".form__input_email");
const passwordInput = document.querySelector(".form__input_password");
const page = document.querySelector(".page");
const invalidEmail = document.querySelector(".form__invalid-email");
const centralBlock = document.querySelector(".central-block");
const form = document.querySelector(".form");
const userInfo = document.querySelector("#user-info-template");

let wasSent = false;

form.onsubmit = (e) => {
    if (wasSent) return false;
    wasSent = true;
    e.preventDefault();
    api.postRequest('login', new AuthModel(emailInput, passwordInput), (response) => {
        hideWrongEmailErrorDiv();
        setUserInfo(response);
    }, () => {
        showWrongEmailErrorDiv();
    });
    wasSent = false;
};

function hideWrongEmailErrorDiv() {
    emailInput.classList.remove("form__input_email-wrong");
    passwordInput.classList.add("last");
    invalidEmail.classList.add("hide");
    invalidEmail.classList.remove("last");
}

function showWrongEmailErrorDiv() {
    emailInput.classList.add("form__input_email-wrong");
    passwordInput.classList.remove("last");
    invalidEmail.classList.remove("hide");
    invalidEmail.classList.add("last");
}

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