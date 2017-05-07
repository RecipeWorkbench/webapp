import BasePageViewModel from '../../pages/base'
import RestService from '../../services/restservice'

export class RecipesPageViewModel extends BasePageViewModel {
    constructor() {
        super();
        this.currentPage("recipes");
        this.recipes = ko.observableArray([]);
        this.take = 20;
        this.skip = 0;
        this.selected = ko.observable();

        this.services = new RecipesRestService();
        this.services.getRecipesStartingWith().then(this.recipesFetched(this), this.recipesFetchedError(this));
    }

    recipesFetched(viewModel) {
        return function (recipes) {
            viewModel.recipes(recipes);
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

    getRecipesStartingWith(name) {
        return this.request({
            method: "GET",
            url: this.endpoint + "startswith/Can"
        });
    }
}
