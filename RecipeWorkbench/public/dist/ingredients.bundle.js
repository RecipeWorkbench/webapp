var ViewModels =
webpackJsonpViewModels([3],[
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
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_base___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__pages_base__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_restservice__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_restservice___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__services_restservice__);
﻿


function getPager() {
    var pages = Math.floor(this.count() / this.take());
    if (this.count() % this.take() !== 0) {
        pages = pages + 1;
    }

    var pager = [];
    for (var i = 0; i < pages; i++) {
        pager.push({
            page: i,
            text: (i + 1) + " / " + pages
        });
    }

    if (pager.length === 0) {
        pager.push({
            page: 0,
            text: "0 / 0"
        });
    }

    return pager;
}

function getPagerLength() {
    return this.pager().length;
}

function previousPageButtonEnabled() {
    return this.selectedPage().page !== 0;
}

function nextPageButtonEnabled() {
    return this.selectedPage().page !== (this.pagerLength() - 1);
}

function ingredientsFetched(viewModel) {
    return function (ingredients) {
        viewModel.ingredients(JSON.parse(ingredients));

        if (viewModel.ingredients.peek().length > 0) {
            viewModel.contentTemplate("ingredients-template");
        }
        else {
            viewModel.contentTemplate("no-data-template");
        }
    };
}

function ingredientsFetchedError(viewModel) {
    return function (error) {
        viewModel.contentTemplate("no-data-template");
        console.log(error.statusText);
    };
}

function countFetched(viewModel) {
    return function (count) {
        viewModel.count(parseInt(count));
    };
}

function countFetchedError(viewModel) {
    return function (error) {
        console.log(error.statusText);
    };
}

function triggerGetIngredientsFromIngredientFilter() {
    var params = {
        name: this.ingredientFilter(),
        compound: 0,
        skip: this.skip(),
        take: this.take()
    };

    this.contentTemplate("loader-template");
    this.services.getIngredients(params).then(ingredientsFetched(this), ingredientsFetchedError(this));
    this.services.getIngredientsCount(params).then(countFetched(this), countFetchedError(this));
}

class IngredientsPageViewModel extends __WEBPACK_IMPORTED_MODULE_0__pages_base___default.a {
    constructor() {
        super();
        this.currentPage("/ingredients");
        this.pageTitle("Ingredients");
        this.contentTemplate("no-data-template");

        this.ingredients = ko.observableArray([]);
        this.ingredientFilter = ko.observable("");
        this.expandedIngredient = ko.observable(0);
        this.take = ko.observable(20);
        this.skip = ko.observable(0);
        this.count = ko.observable(0);
        this.pager = ko.pureComputed(getPager, this);
        this.pagerLength = ko.pureComputed(getPagerLength, this);
        this.selectedPage = ko.observable(this.pager()[0]);
        this.previousPageButtonEnabled = ko.pureComputed(previousPageButtonEnabled, this);
        this.nextPageButtonEnabled = ko.pureComputed(nextPageButtonEnabled, this);

        this.services = new IngredientsRestService();

        ko.computed(triggerGetIngredientsFromIngredientFilter, this).extend({
            rateLimit: {
                method: "notifyWhenChangesStop",
                timeout: 400
            }
        });
    }

    onIngredientSelection(ingredient, event) {
        if (ingredient.id === pageVM.expandedIngredient()) {
            pageVM.expandedIngredient(0);
        }
        else {
            pageVM.expandedIngredient(ingredient.id);
        }
    }

    onNextPage(viewModel, event) {
        var vv = a;
    }

    onPreviousPage(viewModel, event) {
        var vv = a;
    }
}
/* harmony export (immutable) */ __webpack_exports__["IngredientsPageViewModel"] = IngredientsPageViewModel;


class IngredientsRestService extends __WEBPACK_IMPORTED_MODULE_1__services_restservice___default.a {
    constructor() {
        super();
        this.endpoint = this.hostUrl + "ingredient/";
    }

    getIngredients(options) {
        return this.request({
            method: __WEBPACK_IMPORTED_MODULE_1__services_restservice___default.a.method.GET,
            url: this.endpoint + "filter",
            params: {
                name: options.name,
                compound: options.compound,
                skip: options.skip,
                take: options.take
            }
        });
    }

    getIngredientsCount(options) {
        return this.request({
            method: __WEBPACK_IMPORTED_MODULE_1__services_restservice___default.a.method.GET,
            url: this.endpoint + "count",
            params: {
                name: options.name,
                compound: options.compound,
                skip: options.skip,
                take: options.take
            }
        });
    }
}


/***/ })
],[5]);