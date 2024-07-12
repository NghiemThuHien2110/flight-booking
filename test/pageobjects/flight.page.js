import { $ } from '@wdio/globals'
import Page from './page.js';

class FligtPage extends Page {
    get loadFlight () {
        return $('#flight_content_return');
    }

    get contentFlight () {
        return $('#flight_content_depart');
    }

    async waitForFlightsLoad () {
        await this.contentFlight.waitForDisplayed(5000);
        await this.loadFlight.waitForDisplayed(5000);
    }
}

export default new FligtPage();
