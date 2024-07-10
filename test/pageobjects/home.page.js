import { $ } from '@wdio/globals'
import Page from './page.js';

class HomePage extends Page {
    get btnFlightFrom () {
        return $('//*[contains(@class, "mktnd_frm_flight_departure")]');
    }
    
    get inputFlightFrom () {
        return $('//*[contains(@class, "flight_from_destination")]//input[@data-id="flight_from"]');
    }

    get optFlightFrom () {
        return $("//strong[text()='HAN']");
    }
    
    get inputFlightTo () {
        return $('//*[contains(@class, "flight_to_autocomplete")]');
    }

    get optFlightTo () {
        return $('//strong[text()="SGN"]');
    }
    
    get inputDepart () {
        return $('#departure_date_flight');
    }

    get inputReturningDate() {
        return $('#returning_date_flight');
    }

    get selectFlightPassenger() {
        return $('//*[contains(@class, "mktnd_frm_flight_passenger")]');
    }

    get selectChild() {
        return $('(//div[contains(@class, "mktnd_btn_children_adult_plus")])[2]');
    }
    
    get btnSubmit () {
        return $('//button[contains(@class, "mktnd_btn_flight_search_flight ")]');
    }

    get tittleFlight() {
        return $('//a[contains(text(),"Hà Nội - Sài Gòn (TP.HCM)")]');
    }

    get lstFlight() {
        return $('#flight_data_content_depart');
    }

    async booking (flightFrom, flightTo) {
        //set flight from
        await this.btnFlightFrom.click();
        await this.inputFlightFrom.setValue(flightFrom);
        await this.optFlightFrom.click();
        //set flight to
        await browser.waitUntil(
            async () => (await this.inputFlightTo).isExisting(),
            {
              timeout: 10000, // Wait for up to 10 seconds
              timeoutMsg: 'Expected element FlightTo to be present within 10 seconds',
              interval: 500 // Check every 500 milliseconds
            }
          );
        await this.inputFlightTo.setValue(flightTo);
        await this.optFlightTo.click();
        //set depart date
        await this.inputDepart.click();
        await this.setDate(true);
        await this.inputReturningDate.click();
        await this.setDate();
        //select flight passenger and child
        await this.selectFlightPassenger.click();
        await this.selectChild.click();
        //submit booking form and check if flight list is displayed
        await this.btnSubmit.click();
        await this.tittleFlight.isExisting();
        await this.lstFlight.isExisting();
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
