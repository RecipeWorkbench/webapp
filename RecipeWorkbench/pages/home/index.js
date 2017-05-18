import BasePageViewModel from '../../pages/base'

export class HomePageViewModel extends BasePageViewModel {
    constructor() {
        super();
        this.currentPage("/home");
        this.pageTitle("Home");
    }
}
