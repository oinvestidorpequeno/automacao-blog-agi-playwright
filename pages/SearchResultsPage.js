// /home/ubuntu/automacao-blog-agi-playwright/pages/SearchResultsPage.js
const BasePage = require("./BasePage");

class SearchResultsPage extends BasePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        super(page);
        // Seletor para os títulos dos artigos na página de resultados
        // Este seletor pode precisar de ajuste conforme a estrutura real do blog
        this.articleTitles = page.locator("h2.entry-title a");
        // Seletor para a mensagem de "nenhum resultado encontrado"
        // Este seletor é uma suposição e precisa ser verificado no blog real
        this.noResultsMessage = page.locator("//div[contains(@class, 'ast-row')]//h1[contains(text(),'Não encontramos nada') or contains(text(),'Nenhum resultado encontrado')]"); // XPath mais flexível
        this.searchResultsContainer = page.locator("div#main"); // Um container geral para os resultados
    }

    async getResultCount() {
        await this.articleTitles.first().waitFor({ state: "visible", timeout: 10000 }).catch(() => {}); // Espera o primeiro título aparecer
        return await this.articleTitles.count();
    }

    async getAllArticleTitles() {
        await this.articleTitles.first().waitFor({ state: "visible", timeout: 10000 }).catch(() => {}); // Espera o primeiro título aparecer
        const titles = [];
        const count = await this.articleTitles.count();
        for (let i = 0; i < count; i++) {
            titles.push(await this.articleTitles.nth(i).textContent());
        }
        return titles;
    }

    async isNoResultsMessageVisible() {
        try {
            // Espera um pouco para a mensagem aparecer, se for o caso.
            await this.noResultsMessage.waitFor({ state: "visible", timeout: 5000 });
            return await this.noResultsMessage.isVisible();
        } catch (error) {
            // Se o elemento não for encontrado ou não ficar visível dentro do timeout, consideramos que a mensagem não está visível.
            return false;
        }
    }

    async getNoResultsMessageText() {
        if (await this.isNoResultsMessageVisible()) {
            return await this.noResultsMessage.textContent();
        }
        return null;
    }

    async waitForResultsToLoad() {
        // Espera que o container principal de resultados esteja presente.
        // Pode ser necessário um seletor mais específico ou uma condição de espera diferente.
        await this.searchResultsContainer.waitFor({ state: "visible", timeout: 10000 });
    }
}

module.exports = SearchResultsPage;
