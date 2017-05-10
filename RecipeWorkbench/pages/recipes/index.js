import BasePageViewModel from '../../pages/base'
import RestService from '../../services/restservice'

function getPager() {
    var pages = this.count() / this.take();
    if (this.count() % this.take() !== 0) {
        pages = pages + 1;
    }

    var pager = [];
    for (var i = 0; i < pages; pages++) {
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

export class RecipesPageViewModel extends BasePageViewModel {
    constructor() {
        super();
        this.currentPage("recipes");
        this.pageTitle("Recipes");

        this.ingredients = ko.observableArray([]);
        this.ingredientFilter = ko.observable("");
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
        this.services.getRecipesStartingWith("Can", this.getRecipesQueryParams()).then(this.recipesFetched(this), this.recipesFetchedError(this));
    }

    onNextPage(e,d,a,f) {
    }

    onPreviousPage(e,d,a,f) {
    }

    getRecipesQueryParams() {
        return {
            skip: this.skip.peek(),
            take: this.take.peek()
        };
    }

    recipesFetched(viewModel) {
        return function (recipes) {
            viewModel.recipes(JSON.parse(recipes));
        };
    }

    recipesFetchedError(viewModel) {
        return function (error) {
            console.log(error.statusText);
        };
    }
}

class RecipesRestService extends RestService {
    constructor() {
        super();
        this.endpoint = this.hostUrl + "recipe/";
    }

    getRecipesStartingWith(name, options) {
        return this.request({
            method: RestService.method.GET,
            url: this.endpoint + "startswith/" + name,
            params: {
                skip: options.skip,
                take: options.take
            }
        });
    }

    getIngredientsStartingWith(name, options) {
        return this.request({
            method: RestService.method.GET,
            url: this.hostUrl + "ingredients/startswith/" + name
        });
    }
}
