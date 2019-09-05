import Api from './api.js';
import AuthModel from "./auth-model.js";
import PageContentController from "./page-content-controller.js";

const api = new Api('us-central1-mercdev-academy.cloudfunctions.net', false);
const pageContentController = new PageContentController();

let wasSent = false;

pageContentController.setFormOnSubmit((e) => {
    if (wasSent) return false;
    wasSent = true;
    e.preventDefault();
    api.postRequest('login', new AuthModel(pageContentController.emailInput, pageContentController.passwordInput), (response) => {
        pageContentController.hideWrongEmailErrorDiv();
        pageContentController.setUserInfo(response);
        pageContentController.setLogoutOnClick((e) => {
            pageContentController.hideUserInfoAndShowForm();
        });
    }, () => {
        pageContentController.showWrongEmailErrorDiv();
    });
    wasSent = false;
});
