const HTTP_METHOD = {
    GET: "GET",
    POST: "POST"
};

class RestService {
    constructor() {
        this.hostUrl = __API__ + "api/";
    }

    static get method() {
        return HTTP_METHOD;
    }

    request(options) {
        return new Promise(function (resolve, reject) {
            var params = options.params;
            // We'll need to stringify if we've been given an object
            // If we have a string, this is skipped.
            if (params && typeof params === 'object') {
                params = Object.keys(params).map(function (key) {
                    return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
                }).join('&');
            }

            var url = options.url;
            if (options.method === RestService.method.GET && params) {
                url = url + "?" + params;
            }

            var xhr = new XMLHttpRequest();
            xhr.open(options.method, url);
            xhr.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    resolve(xhr.response);
                }
                else {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText
                    });
                }
            };
            xhr.onerror = function () {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            };

            if (options.headers) {
                Object.keys(options.headers).forEach(function (key) {
                    xhr.setRequestHeader(key, options.headers[key]);
                });
            }

            xhr.send(params);
        });
    }
}

module.exports = exports = RestService;
