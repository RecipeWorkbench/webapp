import BasePageViewModel from '../../pages/base'
import RestService from '../../services/restservice'

export class RecipePageViewModel extends BasePageViewModel {
    constructor(id) {
        super();
        this.currentPage("recipe");
        console.log(id);

        this.id = ko.observable(parseInt(id));
        this.cards = ko.observableArray(["aladdin", "king"]);
    }
}
