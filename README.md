# Instalação e Configuração do Playwright
## Instruções de Instalação:
Node.js: Se ainda não tiver o Node.js instalado, você pode baixá-lo e instalá-lo em nodejs.org.

Instalação do Playwright: No terminal, execute o seguinte comando para instalar o Playwright como uma dependência do projeto:

<pre>npm install playwright</pre>

Configuração do Navegador: Abra o arquivo playwright.config.js (ou crie um se ainda não existir) e defina o navegador desejado para os testes automatizados. Por exemplo, para usar o Chromium:
<pre>javascript

module.exports = {
  browsers: ['chromium'],
};</pre>

Teste da Configuração:
Criação do Teste de Exemplo: Crie um arquivo de teste de exemplo usando o Playwright para verificar a configuração. Por exemplo, test-example.js.

Conteúdo do Teste de Exemplo:
<pre>javascript

const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await browser.close();
})();</pre>

Execução do Teste de Exemplo: No terminal, execute o seguinte comando para executar o teste de exemplo:
<pre>bash

npx playwright test test-example.js
Verificação do Teste: Verifique se o teste é </pre>

executado com sucesso e se o navegador correto é aberto.

Verificação:
Verificação da Instalação: No terminal, execute o seguinte comando para verificar se o Playwright está instalado corretamente no projeto:

<pre>npm list playwright</pre>

