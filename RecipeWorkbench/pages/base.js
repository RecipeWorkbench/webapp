class BasePageViewModel {
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
