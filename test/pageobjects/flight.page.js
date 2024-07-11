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
        // await this.loadFlight.waitUntil(async function () {
        //     return (await this.loadFlight).isExisting() === true;
        // });

    }
}

export default new FligtPage();
