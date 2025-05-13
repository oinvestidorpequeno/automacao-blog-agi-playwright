// /home/ubuntu/automacao-blog-agi-playwright/tests/search_blog.spec.js
const { test, expect } = require("@playwright/test");
const SearchPage = require("../pages/SearchPage");
const SearchResultsPage = require("../pages/SearchResultsPage");

test.describe("Pesquisa de artigos no Blog do Agi", () => {
    let searchPage;
    let searchResultsPage;

    test.beforeEach(async ({ page }) => {
        searchPage = new SearchPage(page);
        searchResultsPage = new SearchResultsPage(page);
        await searchPage.navigateToBlog();
    });

    test("Deve realizar uma pesquisa bem-sucedida por um termo existente", async () => {
        const searchTerm = "educação financeira";
        await searchPage.performSearch(searchTerm);
        await searchResultsPage.waitForResultsToLoad();

        const resultCount = await searchResultsPage.getResultCount();
        expect(resultCount).toBeGreaterThan(0, `Esperava encontrar resultados para "${searchTerm}"`);

        const titles = await searchResultsPage.getAllArticleTitles();
        for (const title of titles) {
            expect(title.toLowerCase()).toContain(searchTerm.toLowerCase(), `O título "${title}" não contém o termo "${searchTerm}"`);
        }
    });

    test("Deve exibir mensagem apropriada para pesquisa de termo inexistente", async () => {
        const searchTerm = "criptomoedas desconhecidas do Zimbábue";
        await searchPage.performSearch(searchTerm);
        await searchResultsPage.waitForResultsToLoad(); // Espera a página carregar, mesmo que seja para mostrar "sem resultados"

        const isMessageVisible = await searchResultsPage.isNoResultsMessageVisible();
        expect(isMessageVisible).toBe(true, "A mensagem de 'nenhum resultado encontrado' não está visível.");
        
        const messageText = await searchResultsPage.getNoResultsMessageText();
        if (messageText) { // Apenas verifica o texto se a mensagem estiver visível
             expect(messageText.toLowerCase()).toContain("não encontramos nada", `A mensagem "${messageText}" não corresponde ao esperado para busca sem resultados.`);
        }

        const resultCount = await searchResultsPage.getResultCount().catch(() => 0); // Se não houver títulos, o count pode falhar, então pegamos 0
        expect(resultCount).toBe(0, "Não deveria haver artigos listados para uma busca sem resultados.");
    });
});
