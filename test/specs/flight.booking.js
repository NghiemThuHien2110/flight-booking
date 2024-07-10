import HomePage from '../pageobjects/home.page.js'

describe('', () => {
    it('should booking flight success', async () => {
        await HomePage.open();
        await HomePage.booking("HAN", "Ho Chi");
    })
})
