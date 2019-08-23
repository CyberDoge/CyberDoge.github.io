const emailInput = document.querySelector(".form__input_email");
const passwordInput = document.querySelector(".form__input_password");

let parseForm = () => {
    return JSON.stringify({
        "email": emailInput.value,
        "password": passwordInput.value
    });
};

const form = document.querySelector(".form");
form.onsubmit = (e) => {
    e.preventDefault();
    const request = new XMLHttpRequest();
    request.open("POST", "https://us-central1-mercdev-academy.cloudfunctions.net/login");
    request.setRequestHeader("content-type", "application/json");

    request.onreadystatechange = (e) => {
        if (request.readyState === 4) {
            if (request.status === 200) {
                console.log(request.response)
            } else if (request.status === 400) {
                emailInput.classList.add("form__input_email-wrong");
                passwordInput.classList.remove("last");
                const invalidEmail = document.querySelector(".form__invalid-email");
                invalidEmail.classList.remove("hide");
                invalidEmail.classList.add("last");
                console.log(request.responseText)
            }
        }
    };

    request.send(parseForm());
};