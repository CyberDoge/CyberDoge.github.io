export default class AuthModel {
    /**
     *
     * @param {string | Node} email
     * @param {string | Node} password
     */
    constructor(email, password) {
        if (email.constructor.name === 'HTMLInputElement') {
            this.email = email.value
        } else {
            this.email = email
        }

        if (password.constructor.name === 'HTMLInputElement') {
            this.password = password.value
        } else {
            this.password = password
        }
    }
}
