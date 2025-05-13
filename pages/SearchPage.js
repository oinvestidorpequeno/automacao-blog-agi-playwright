// /home/ubuntu/automacao-blog-agi-playwright/pages/SearchPage.js
const BasePage = require('./BasePage');

class SearchPage extends BasePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        super(page);
        // Selector para o ícone de lupa que abre o campo de busca
        // Este seletor pode precisar de ajuste conforme a estrutura real do blog
        this.searchIcon = page.locator('button.ast-search-menu-icon'); 
        // Selector para o campo de input da busca (após clicar no ícone)
        this.searchInput = page.locator('input[type="search"].search-field');
        // O Blog do Agi parece submeter a busca ao pressionar Enter no campo, não há um botão de submit explícito visível após digitar.
    }

    async navigateToBlog() {
        await super.navigate('https://blogdoagi.com.br/');
    }

    async openSearchInput() {
        // Verifica se o campo de busca já está visível, se não, clica no ícone
        if (!await this.searchInput.isVisible()) {
            await this.searchIcon.click();
        }
        await this.searchInput.waitFor({ state: 'visible', timeout: 5000 });
    }

    async enterSearchTerm(term) {
        await this.searchInput.fill(term);
    }

    async submitSearch() {
        // Pressiona Enter para submeter a busca, comum em campos de pesquisa sem botão de submit dedicado
        await this.searchInput.press('Enter');
        // Aguarda a navegação ou a atualização da página de resultados
        await this.page.waitForLoadState('domcontentloaded');
    }

    async performSearch(term) {
        await this.openSearchInput();
        await this.enterSearchTerm(term);
        await this.submitSearch();
    }
}

module.exports = SearchPage;
