import HomePage from '../pageobjects/home.page.js';
import flightPage from '../pageobjects/flight.page.js';

describe('Search for flights', () => {
    it('should booking flight success', async () => {
        await HomePage.open();
        await HomePage.selectFlightFromTo("HAN", "SGN");
        await HomePage.selectFlightDate();
        await HomePage.selecPassengers(1, 1);
        await HomePage.findFlightsBtn.click();
        await expect(driver).toHaveUrl(/tim-kiem-ve/);
        await flightPage.waitForFlightsLoad();
        await expect(flightPage.loadFlight).toBeDisplayed();
        await expect(flightPage.contentFlight).toBeDisplayed();
    })
})
