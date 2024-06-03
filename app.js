import { JSDOM } from 'jsdom';
import { firefox } from 'playwright';

const url = 'https://www.workana.com/jobs?category=it-programming&language=pt';

export const getHtmlPage = async (url) => {
  try {
    const browser = await firefox.launch({ headless: true });
    const context = await browser.newContext({
      timezoneId: 'America/Sao_Paulo', // Define o fuso horário para São Paulo, Brasil
      geolocation: { latitude: -23.5505, longitude: -46.6333 }, // Coordenadas de São Paulo, Brasil
      permissions: ['geolocation'], // Permissão para acessar a geolocalização
      locale: 'pt-BR', // Define o local para português do Brasil
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' // Define o User-Agent para um navegador padrão
    });
    const page = await context.newPage();


    await context.clearCookies();


    await page.goto(url, { waitUntil: 'networkidle' });

    await page.reload();
    await page.waitForTimeout(4000);

    const html = await page.content();
    await browser.close(); // Fechar o navegador após pegar o conteúdo
    return html;
  } catch (error) {
    console.error('Error fetching page:', error);
    throw error;
  }
};

let lastProjectTitle = '';

const checkForNewProjects = async () => {
  try {
    const html = await getHtmlPage(url);
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Selecionar apenas elementos com a classe 'project-item js-project' que não tenham 'project-item-featured'
    const latestProject = document.querySelector('.project-item.js-project:not(.project-item-featured)');

    if (latestProject) {
      const titulo = latestProject.querySelector('h2.project-title span span').getAttribute('title').trim();
      const dataPostagem = latestProject.querySelector('h5.date.visible-xs strong').textContent.trim();
      const budget = latestProject.querySelector('.project-actions.floating .budget .values span').textContent.trim();
      const url = latestProject.querySelector('h2.project-title span a').getAttribute('href').trim();

      let descricao = latestProject.querySelector('div.html-desc.project-details span').textContent.trim();
      descricao = descricao.split('<br>')[0];

      if (titulo !== lastProjectTitle) {
        console.log('Novo Projeto Encontrado!');
        console.log(`Título: ${titulo}`);
        console.log(`Descrição: ${descricao}`);
        console.log(`Preço: ${budget}`);
        console.log(`Data de Postagem: ${dataPostagem}`);
        console.log(`Link da Postagem: https://www.workana.com${url}`);

        console.log('-'.repeat(40));
        lastProjectTitle = titulo;
      } else {
        console.log('Nenhum novo projeto encontrado.');
      }
    } else {
      console.log('Nenhum projeto correspondente encontrado.');
    }
  } catch (error) {
    console.error(`Erro ao acessar a página: ${error}`);
  }
};

setInterval(checkForNewProjects, 60000);

checkForNewProjects();
