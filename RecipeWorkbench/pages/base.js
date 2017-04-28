class BasePageViewModel {
    constructor() {
        this.pages = ko.observableArray([{ link: "", name: "Home" }, { link: "", name: "Recipes" }]);
        this.currentPage = ko.observable();
    }
}

module.exports = exports = BasePageViewModel;
