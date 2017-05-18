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

export class IngredientsPageViewModel extends BasePageViewModel {
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

class IngredientsRestService extends RestService {
    constructor() {
        super();
        this.endpoint = this.hostUrl + "ingredient/";
    }

    getIngredients(options) {
        return this.request({
            method: RestService.method.GET,
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
            method: RestService.method.GET,
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
