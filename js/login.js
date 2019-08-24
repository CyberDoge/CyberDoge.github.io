const userInfo = `
    <div class="user-info central-block">
        <img class="user-icon" alt="user icon"/>
        <div class="user-name"></div>
        <button class="btn-logout active-btn" onclick="logout()">Logout</input>
    </div>
`;


const emailInput = document.querySelector(".form__input_email");
const passwordInput = document.querySelector(".form__input_password");
const page = document.querySelector(".page");
const invalidEmail = document.querySelector(".form__invalid-email");
const form = document.querySelector(".form");

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
    page.removeChild(form);
    page.insertAdjacentHTML("beforeend", userInfo);
    const userInfoDiv = document.querySelector(".user-info");
    userInfoDiv.querySelector(".user-icon").src = jsonObj.photoUrl;
    userInfoDiv.querySelector(".user-name").textContent = jsonObj.name;
};

const logout = () => {
    page.removeChild(document.querySelector(".user-info"));
    page.appendChild(form)
};