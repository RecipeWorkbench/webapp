var ViewModels =
webpackJsonpViewModels([0],[
/* 0 */
/***/ (function(module, exports) {

﻿class BasePageViewModel {
    constructor() {
        this.pages = ko.observableArray([{
            url: "home",
            name: "Home"
        },
        {
            url: "recipes",
            name: "Filter recipes"
        },
        /*{
            url: "statistics",
            name: "Statistics"
        }*/]);

        this.currentPage = ko.observable();
        this.pageTitle = ko.observable();
        this.contentTemplate = ko.observable("");
    }
}

module.exports = exports = BasePageViewModel;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

﻿const HTTP_METHOD = {
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


/***/ }),
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_base___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__pages_base__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_restservice__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_restservice___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__services_restservice__);
﻿


function recipeFetched(viewModel) {
    return function (recipes) {
        viewModel.recipes(JSON.parse(recipes));

        //if (viewModel.recipes.peek().length > 0) {
        //    viewModel.contentTemplate("recipes-template");
        //}
        //else {
        //    viewModel.contentTemplate("no-data-template");
        //}
    };
}

function recipeFetchedError(viewModel) {
    return function (error) {
        //viewModel.contentTemplate("no-data-template");
        console.log(error.statusText);
    };
}

class TransformRecipePageViewModel extends __WEBPACK_IMPORTED_MODULE_0__pages_base___default.a {
    constructor(id) {
        super();
        this.currentPage("transform-recipe");
        this.pageTitle("Recipes");
        //this.contentTemplate("no-data-template");
        this.recipes = ko.observableArray([]);
        console.log(id);

        this.id = ko.observable(parseInt(id));
        this.services = new RecipeRestService();
        this.services.getRecipe({ id: this.id.peek() }).then(recipeFetched(this), recipeFetchedError(this));
    }
}
/* harmony export (immutable) */ __webpack_exports__["TransformRecipePageViewModel"] = TransformRecipePageViewModel;


class RecipeRestService extends __WEBPACK_IMPORTED_MODULE_1__services_restservice___default.a {
    constructor() {
        super();
        this.endpoint = this.hostUrl + "recipe/";
    }

    getRecipe(options) {
        return this.request({
            method: __WEBPACK_IMPORTED_MODULE_1__services_restservice___default.a.method.GET,
            url: this.endpoint + options.id
        });
    }
}


/***/ })
],[7]);