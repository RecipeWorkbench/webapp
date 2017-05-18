var ViewModels =
webpackJsonpViewModels([4],[
/* 0 */
/***/ (function(module, exports) {

﻿class BasePageViewModel {
    constructor() {
        this.pages = ko.observableArray([{
            url: "/home",
            name: "Home"
        },
        {
            url: "/recipes",
            name: "Filter recipes"
        },
        {
            url: "/ingredients",
            name: "Filter ingredients"
        },
        /*{
            url: "/compounds",
            name: "Filter compounds"
        }*/
        {
            url: "/create-recipe",
            name: "Create recipe"
        }
        /*{
            url: "/statistics",
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
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_base___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__pages_base__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_restservice__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_restservice___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__services_restservice__);
﻿


function recipeFetched(viewModel) {
    return function (recipe) {
        viewModel.recipe(JSON.parse(recipe));
        viewModel.expandedIngredient(0);
        viewModel.contentTemplate("recipe-content-template");
    };
}

function recipeFetchedError(viewModel) {
    return function (error) {
        viewModel.recipe(null);
        viewModel.expandedIngredient(0);
        viewModel.contentTemplate("no-data-template");
        console.log(error.statusText);
    };
}

class RecipePageViewModel extends __WEBPACK_IMPORTED_MODULE_0__pages_base___default.a {
    constructor(id) {
        super();
        this.currentPage("create-recipe");
        this.contentTemplate("loader-template");
        this.recipe = ko.observable(null);
        this.expandedIngredient = ko.observable(0);

        this.id = ko.observable(parseInt(id));
        this.services = new RecipeRestService();
        this.services.getRecipe({ id: this.id.peek() }).then(recipeFetched(this), recipeFetchedError(this));
    }

    onIngredientSelection(ingredient, event) {
        if (ingredient.id === pageVM.expandedIngredient()) {
            pageVM.expandedIngredient(0);
        }
        else {
            pageVM.expandedIngredient(ingredient.id);
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["RecipePageViewModel"] = RecipePageViewModel;


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
],[3]);