var ViewModels =
webpackJsonpViewModels([1],[
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

function recipesFetched(viewModel) {
    return function (recipes) {
        viewModel.recipes(JSON.parse(recipes));

        if (viewModel.recipes.peek().length > 0) {
            viewModel.contentTemplate("recipes-template");
        }
        else {
            viewModel.contentTemplate("no-data-template");
        }
    };
}

function recipesFetchedError(viewModel) {
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

function ingredientsFetched(viewModel) {
    return function (ingredients) {
        viewModel.ingredients(JSON.parse(ingredients));
    };
}

function ingredientsFetchedError(viewModel) {
    return function (error) {
        console.log(error.statusText);
    };
}

function cuisinesFetched(viewModel) {
    return function (cuisines) {
        viewModel.cuisines(JSON.parse(cuisines));
    };
}

function cuisinesFetchedError(viewModel) {
    return function (error) {
        console.log(error.statusText);
    };
}

function triggerGetRecipesFromRecipeFilter() {
    var params = {
        name: this.recipeFilter(),
        ingredient: this.ingredientFilter() ? this.ingredientFilter().id : 0,
        cuisine: this.cuisineFilter() ? this.cuisineFilter().id : 0,
        skip: this.skip(),
        take: this.take()
    };

    this.contentTemplate("loader-template");
    this.services.getRecipes(params).then(recipesFetched(this), recipesFetchedError(this));
    this.services.getRecipesCount(params).then(countFetched(this), countFetchedError(this));
}

class RecipesPageViewModel extends __WEBPACK_IMPORTED_MODULE_0__pages_base___default.a {
    constructor() {
        super();
        this.currentPage("/recipes");
        this.pageTitle("Recipes");
        this.contentTemplate("no-data-template");

        this.ingredients = ko.observableArray([]);
        this.ingredientFilter = ko.observable(null);
        this.cuisines = ko.observableArray([]);
        this.cuisineFilter = ko.observable(null);
        this.recipes = ko.observableArray([]);
        this.recipeFilter = ko.observable("");
        this.take = ko.observable(20);
        this.skip = ko.observable(0);
        this.count = ko.observable(0);
        this.pager = ko.pureComputed(getPager, this);
        this.pagerLength = ko.pureComputed(getPagerLength, this);
        this.selectedPage = ko.observable(this.pager()[0]);
        this.previousPageButtonEnabled = ko.pureComputed(previousPageButtonEnabled, this);
        this.nextPageButtonEnabled = ko.pureComputed(nextPageButtonEnabled, this);

        this.services = new RecipesRestService();

        ko.computed(triggerGetRecipesFromRecipeFilter, this).extend({
            rateLimit: {
                method: "notifyWhenChangesStop",
                timeout: 400
            }
        });

        this.services.getIngredients().then(ingredientsFetched(this), ingredientsFetchedError(this));
        this.services.getCuisines().then(cuisinesFetched(this), cuisinesFetchedError(this));
    }

    onNextPage(viewModel, event) {
        var vv = a;
    }

    onPreviousPage(viewModel, event) {
        var vv = a;
    }
}
/* harmony export (immutable) */ __webpack_exports__["RecipesPageViewModel"] = RecipesPageViewModel;


class RecipesRestService extends __WEBPACK_IMPORTED_MODULE_1__services_restservice___default.a {
    constructor() {
        super();
        this.endpoint = this.hostUrl + "recipe/";
    }

    getRecipes(options) {
        return this.request({
            method: __WEBPACK_IMPORTED_MODULE_1__services_restservice___default.a.method.GET,
            url: this.endpoint + "filter",
            params: {
                name: options.name,
                ingredient: options.ingredient,
                cuisine: options.cuisine,
                skip: options.skip,
                take: options.take
            }
        });
    }

    getRecipesCount(options) {
        return this.request({
            method: __WEBPACK_IMPORTED_MODULE_1__services_restservice___default.a.method.GET,
            url: this.endpoint + "count",
            params: {
                name: options.name,
                ingredient: options.ingredient,
                cuisine: options.cuisine,
                skip: options.skip,
                take: options.take
            }
        });
    }

    getIngredients() {
        return this.request({
            method: __WEBPACK_IMPORTED_MODULE_1__services_restservice___default.a.method.GET,
            url: this.hostUrl + "ingredient"
        });
    }

    getCuisines() {
        return this.request({
            method: __WEBPACK_IMPORTED_MODULE_1__services_restservice___default.a.method.GET,
            url: this.hostUrl + "cuisine"
        });
    }
}


/***/ })
],[7]);