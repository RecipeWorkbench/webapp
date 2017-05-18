import BasePageViewModel from '../../pages/base'
import RestService from '../../services/restservice'

function recipeFetched(viewModel) {
    return function (recipe) {
        viewModel.recipe(JSON.parse(recipe));
        viewModel.expandedIngredient(0);
        viewModel.contentTemplate("recipe-content-template");
    };
}

function recipeFetchedError(viewModel) {
    return function (error) {
        viewModel.recipe(null);
        viewModel.expandedIngredient(0);
        viewModel.contentTemplate("no-data-template");
        console.log(error.statusText);
    };
}

export class RecipePageViewModel extends BasePageViewModel {
    constructor(id) {
        super();
        this.currentPage("create-recipe");
        this.contentTemplate("loader-template");
        this.recipe = ko.observable(null);
        this.expandedIngredient = ko.observable(0);

        this.id = ko.observable(parseInt(id));
        this.services = new RecipeRestService();
        this.services.getRecipe({ id: this.id.peek() }).then(recipeFetched(this), recipeFetchedError(this));
    }

    onIngredientSelection(ingredient, event) {
        if (ingredient.id === pageVM.expandedIngredient()) {
            pageVM.expandedIngredient(0);
        }
        else {
            pageVM.expandedIngredient(ingredient.id);
        }
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
