export default class PageContentController {
    constructor() {
        this.emailInput = document.querySelector(".form__input_email");
        this.passwordInput = document.querySelector(".form__input_password");
        this.invalidEmail = document.querySelector(".form__invalid-email");
        this.centralBlock = document.querySelector(".central-block");
        this.form = document.querySelector(".form");
        this.userInfoTemplate = document.querySelector("#user-info-template");
    }

    setFormOnSubmit(onsubmit) {
        this.form.onsubmit = onsubmit;
    }

    showWrongEmailErrorDiv(message) {
        this.emailInput.classList.add("form__input_email-wrong");
        this.passwordInput.classList.remove("last");
        this.invalidEmail.classList.remove("hide");
        this.invalidEmail.classList.add("last");
        if (message) this.invalidEmail.innerHTML = message;
    }

    setUserInfo(jsonObj) {
        this.centralBlock.removeChild(this.form);
        this.centralBlock.appendChild(document.importNode(this.userInfoTemplate.content, true));
        const userInfoDiv = document.querySelector(".user-info");
        userInfoDiv.querySelector(".user-icon").src = jsonObj.photoUrl;
        userInfoDiv.querySelector(".user-name").textContent = jsonObj.name;
    };

    hideUserInfoAndShowForm() {
        this.centralBlock.removeChild(document.querySelector(".user-info"));
        this.centralBlock.appendChild(this.form)
    };


    hideWrongEmailErrorDiv() {
        this.emailInput.classList.remove("form__input_email-wrong");
        this.passwordInput.classList.add("last");
        this.invalidEmail.classList.add("hide");
        this.invalidEmail.classList.remove("last");
    }

    setLogoutOnClick(onclick) {
        document.querySelector(".btn-logout").onclick = onclick;
    }

}