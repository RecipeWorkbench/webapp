import BasePageViewModel from '../../pages/base'

export class RecipesPageViewModel extends BasePageViewModel {
    constructor() {
        super();
        this.currentPage("recipes");
        console.log(this.pages());

        this.cards = ko.observableArray(["aladdin", "king"]);
    }
}
