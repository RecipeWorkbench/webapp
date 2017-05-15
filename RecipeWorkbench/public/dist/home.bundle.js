var ViewModels =
webpackJsonpViewModels([6],{

/***/ 0:
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
        {
            url: "ingredients",
            name: "Filter Ingredients"
        },
        {
            url: "compounds",
            name: "Filter compounds"
        }
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

/***/ 5:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_base___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__pages_base__);


class HomePageViewModel extends __WEBPACK_IMPORTED_MODULE_0__pages_base___default.a {
    constructor() {
        super();
        this.currentPage("home");
        this.pageTitle("Home");

        this.cards = ko.observableArray(["aladdin", "king"]);
    }
}
/* harmony export (immutable) */ __webpack_exports__["HomePageViewModel"] = HomePageViewModel;



/***/ })

},[5]);