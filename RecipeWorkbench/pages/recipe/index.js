import BasePageViewModel from '../../pages/base'

export class RecipePageViewModel extends BasePageViewModel {
    constructor() {
        super();
        this.currentPage("recipe");
        console.log(this.pages());

        this.cards = ko.observableArray(["aladdin", "king"]);
    }
}
