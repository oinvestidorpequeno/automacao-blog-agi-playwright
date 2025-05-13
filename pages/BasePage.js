// /home/ubuntu/automacao-blog-agi-playwright/pages/BasePage.js

class BasePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
    }

    async navigate(url) {
        await this.page.goto(url);
    }

    async getTitle() {
        return await this.page.title();
    }
}

module.exports = BasePage;
