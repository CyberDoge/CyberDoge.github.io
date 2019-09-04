class Api {
    constructor(host, isHttps) {
        this.host = new URL(protocol ? 'http' : 'https' + '://' + host);
    }
    /**
     * 
     * @param {string} path 
     * @param {JSON} requestBody 
     * @param {requestCallback} func 
     */
    getRequest(path, requestBody, func) {
        let urlOfRequest = new URL(path, this.host) 
        fetch(urlOfRequest,
            {
                method: 'GET', mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: requestBody,
            }).then(response=>func(response));
    }
}