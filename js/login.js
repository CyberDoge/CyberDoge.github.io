import Api from './api.js';
import AuthModel from "./auth-model.js";
import PageContentController from "./page-content-controller.js";
import AuthModelValidationService from "./auth-model-validation-service.js";

const api = new Api('us-central1-mercdev-academy.cloudfunctions.net', false);
const pageContentController = new PageContentController();

let wasSent = false;

pageContentController.setFormOnSubmit((e) => {
    if (wasSent) return false;

    const authModel = new AuthModel(pageContentController.emailInput, pageContentController.passwordInput);
    let errorMessage;
    if ((errorMessage = AuthModelValidationService.validate(authModel)) !== undefined) {
        pageContentController.showWrongEmailErrorDiv(errorMessage);
        return false;
    }

    wasSent = true;

    e.preventDefault();
    api.postRequest('login', authModel, (response) => {
        pageContentController.hideWrongEmailErrorDiv();
        pageContentController.setUserInfo(response);
        pageContentController.setLogoutOnClick((e) => {
            pageContentController.hideUserInfoAndShowForm();
        });
    }, () => {
        pageContentController.showWrongEmailErrorDiv("E-Mail or password is incorrect");
    });
    wasSent = false;
});
