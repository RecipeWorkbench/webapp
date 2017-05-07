var ViewModels =
webpackJsonpViewModels([2],{

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

/***/ 5:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_base___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__pages_base__);
﻿

class RecipesPageViewModel extends __WEBPACK_IMPORTED_MODULE_0__pages_base___default.a {
    constructor() {
        super();
        this.currentPage("recipes");
        console.log(this.pages());

        this.cards = ko.observableArray(["aladdin", "king"]);
    }
}
/* harmony export (immutable) */ __webpack_exports__["RecipesPageViewModel"] = RecipesPageViewModel;



/***/ })

},[5]);