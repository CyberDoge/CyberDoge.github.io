export default class AuthModelValidationService {


    /**
     *
     * @param {AuthModel} authModel
     * @returns {string} Error message
     */
    static validate(authModel) {
        if (authModel.email === '' || !authModel.email.trim() || authModel.password === '') {
            return 'Email or password is blank or empty';
        }
        if (!/\S+@\S+\.\S+/.test(authModel.email)) {
            return 'Invalid email format';
        }
    }
}