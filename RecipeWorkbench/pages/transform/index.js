import BasePageViewModel from '../../pages/base'

export class TransformRecipePageViewModel extends BasePageViewModel {
    constructor() {
        super();
        this.currentPage("transform-recipe");
        console.log(this.pages());

        this.cards = ko.observableArray(["aladdin", "king"]);
    }
}
