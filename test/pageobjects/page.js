import { browser } from '@wdio/globals'

export default class Page {
    open () {
        browser.maximizeWindow();
        return browser.url(`https://www.bestprice.vn/`)
    }
}
