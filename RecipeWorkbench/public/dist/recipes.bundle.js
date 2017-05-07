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
            name: "Recipes"
        },
        {
            url: "transform-recipe",
            name: "Transform Recipe"
        }]);

        this.currentPage = ko.observable();
    }
}

module.exports = exports = BasePageViewModel;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

﻿class RestService {
    constructor() {
        this.hostUrl = __API__ + "api/";
    }

    request(options) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open(options.method, options.url);
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

            var params = options.params;
            // We'll need to stringify if we've been given an object
            // If we have a string, this is skipped.
            if (params && typeof params === 'object') {
                params = Object.keys(params).map(function (key) {
                    return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
                }).join('&');
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
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_base___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__pages_base__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_restservice__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_restservice___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__services_restservice__);
﻿


class RecipesPageViewModel extends __WEBPACK_IMPORTED_MODULE_0__pages_base___default.a {
    constructor() {
        super();
        this.currentPage("recipes");
        this.recipes = ko.observableArray([]);
        this.take = 20;
        this.skip = 0;
        this.selected = ko.observable();

        this.services = new RecipesRestService();
        this.services.getRecipesStartingWith().then(this.recipesFetched(this), this.recipesFetchedError(this));
    }

    recipesFetched(viewModel) {
        return function (recipes) {
            viewModel.recipes(recipes);
        };
    }

    recipesFetchedError(viewModel) {
        return function (error) {
            console.log(error.statusText);
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["RecipesPageViewModel"] = RecipesPageViewModel;


class RecipesRestService extends __WEBPACK_IMPORTED_MODULE_1__services_restservice___default.a {
    constructor() {
        super();
        this.endpoint = this.hostUrl + "recipe/";
    }

    getRecipesStartingWith(name) {
        return this.request({
            method: "GET",
            url: this.endpoint + "startswith/Can"
        });
    }
}


/***/ })
],[6]);