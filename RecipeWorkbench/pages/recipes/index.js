import BasePageViewModel from '../../pages/base'
import RestService from '../../services/restservice'

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

function triggerGetRecipesFromRecipeFilter() {
    var params = {
        name: this.recipeFilter(),
        ingredient: 0,
        cuisine: 0,
        skip: this.skip(),
        take: this.take()
    };

    this.contentTemplate("loader-template");
    this.services.getRecipes(params).then(recipesFetched(this), recipesFetchedError(this));
    this.services.getRecipesCount(params).then(countFetched(this), countFetchedError(this));
}

export class RecipesPageViewModel extends BasePageViewModel {
    constructor() {
        super();
        this.currentPage("recipes");
        this.pageTitle("Recipes");
        this.contentTemplate("no-data-template");

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

        ko.computed(triggerGetRecipesFromRecipeFilter, this).extend({
            rateLimit: {
                method: "notifyWhenChangesStop",
                timeout: 400
            }
        });
    }

    onNextPage(e, d, a, f) {
        var vv = a;
    }

    onPreviousPage(e, d, a, f) {
        var vv = a;
    }
}

class RecipesRestService extends RestService {
    constructor() {
        super();
        this.endpoint = this.hostUrl + "recipe/";
    }

    getRecipes(options) {
        return this.request({
            method: RestService.method.GET,
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
            method: RestService.method.GET,
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

    getIngredientsStartingWith(name, options) {
        return this.request({
            method: RestService.method.GET,
            url: this.hostUrl + "ingredients/startswith/" + name
        });
    }
}
