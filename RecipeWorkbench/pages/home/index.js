import BasePageViewModel from '../../pages/base'

export class HomePageViewModel extends BasePageViewModel {
    constructor() {
        super();
        this.currentPage("home");
        console.log(this.pages());

        this.cards = ko.observableArray(["aladdin", "king"]);
    }
}
