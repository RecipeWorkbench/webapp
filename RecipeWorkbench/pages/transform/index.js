import BasePageViewModel from '../../pages/base'
import RestService from '../../services/restservice'

function recipeFetched(viewModel) {
    return function (recipes) {
        viewModel.recipes(JSON.parse(recipes));

        //if (viewModel.recipes.peek().length > 0) {
        //    viewModel.contentTemplate("recipes-template");
        //}
        //else {
        //    viewModel.contentTemplate("no-data-template");
        //}
    };
}

function recipeFetchedError(viewModel) {
    return function (error) {
        //viewModel.contentTemplate("no-data-template");
        console.log(error.statusText);
    };
}

export class TransformRecipePageViewModel extends BasePageViewModel {
    constructor(id) {
        super();
        this.currentPage("transform-recipe");
        this.pageTitle("Recipes");
        //this.contentTemplate("no-data-template");
        this.recipes = ko.observableArray([]);
        console.log(id);

        this.id = ko.observable(parseInt(id));
        this.services = new RecipeRestService();
        this.services.getRecipe({ id: this.id.peek() }).then(recipeFetched(this), recipeFetchedError(this));
    }
}

class RecipeRestService extends RestService {
    constructor() {
        super();
        this.endpoint = this.hostUrl + "recipe/";
    }

    getRecipe(options) {
        return this.request({
            method: RestService.method.GET,
            url: this.endpoint + options.id
        });
    }
}
