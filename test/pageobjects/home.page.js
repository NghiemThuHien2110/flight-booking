import { $ } from '@wdio/globals'
import Page from './page.js';

class HomePage extends Page {
    get btnFlightFrom () {
        return $('//*[contains(@class, "des__flight_from")]');
    }

    get btnFlightTo () {
        return $('//*[contains(@class, "des__flight_to")]');
    }
    
    get inputFlightFrom () {
        return $('//*[contains(@class, "flight_from_popup")]//input[@data-id="flight_from"]');
    }

    get inputFlightTo () {
        return $('//*[contains(@class, "flight_to_popup")]//input[@data-id="flight_to"]');
    }

    async optLocatorFlight (locator) {
        await $('//strong[text()= "' + locator + '"]').waitForClickable(5000);
        await $('//strong[text()= "' + locator + '"]').click();
    }
    
    get inputDepart () {
        return $('#departure_date_flight');
    }

    get inputReturningDate() {
        return $('#returning_date_flight');
    }

    get inputPassengers() {
        return $('input#flight_passenger');
    }

    async inputPassengersPopup(passengersType) {
        let a = await $('//*[contains(@class, "pop-flight-passenger")]//input[@data-name="nb_' + passengersType + '"]').getValue();
        return a;
    }

    get selectAdultPassengers() {
        return $('//*[contains(@class,"pop-flight-passenger")]//div[contains(@class,"mktnd_btn_flight_adult_plus")]');
    }
    
    get selectChildPassengers() {
        return $('//*[contains(@class,"pop-flight-passenger")]//div[contains(@class, "mktnd_btn_children_adult_plus")]');
    }

    get findFlightsBtn() {
        return $('button#search_button');
    }

    async selectFlightLocator(type, locator) {
        type == "From" ? await this.btnFlightFrom.click() : await this.btnFlightTo.click();
        type == "From" ? await this.inputFlightFrom.setValue(locator) : await this.inputFlightTo.setValue(locator);
        await this.optLocatorFlight(locator);
    }

    async selectFlightFromTo(from, to) {
        await this.selectFlightLocator("From", from);
        await this.selectFlightLocator("To", to);
    }

    async selectFlightDate() {
        await this.inputDepart.click();
        await this.setDate(true);
        await this.inputReturningDate.click();
        await this.setDate(false);
    }

    async selecPassengers(adults, child) {
        await this.inputPassengers.click();
        let countAdult = await this.inputPassengersPopup('adults');
        let countChild = await this.inputPassengersPopup('children');
        for(let i = 0; i < (adults - parseInt(countAdult)); i++) {
            await this.selectAdultPassengers.click();
        }
        for(let i = 0; i < (child - parseInt(countChild)); i++) {
            await this.selectChildPassengers.waitForClickable(5000);
            await this.selectChildPassengers.click();
        }
        countAdult = await this.inputPassengersPopup('adults');
        countChild = await this.inputPassengersPopup('children');
        
        expect(parseInt(countAdult)).toEqual(adults);
        expect(parseInt(countChild)).toEqual(child);
    }

    async setDate(startDate) {
        let today = new Date();
        let dd = String(today.getDate());
        let mm = String(today.getMonth() + 1);
        let returning_mm = String(today.getMonth() + 2);
        if(startDate) {
            await $("//td[@data-month='"+ mm + "']//span[@class ='ui-datepicker-day '][text() = '" + dd + "']").click();
        }else {
            await $("//td[@data-month='"+ returning_mm + "']//span[@class ='ui-datepicker-day '][text() = '" + dd + "']").click();
        }
    }

    open () {
        return super.open();
    }
}

export default new HomePage();
