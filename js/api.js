export default class Api {
    constructor(host, isHttps) {
        this.host = new URL(isHttps ? 'http' : 'https' + '://' + host);
    }

    /**
     *
     * @param {string} path
     * @param {Object} requestObject
     * @param {function} funcOk success response
     * @param {function} funError error response
     */
    postRequest(path, requestObject, funcOk, funError) {
        let urlOfRequest = new URL(path, this.host);
        fetch(urlOfRequest.toString(),
            {
                method: 'POST', mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestObject),
            }).then(response => {
            if (response.ok) {
                response.json().then(data => funcOk(data))
            } else {
                funError();
            }
        });
    }
}