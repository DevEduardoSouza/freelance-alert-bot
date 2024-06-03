import { JSDOM } from "jsdom";
import { firefox } from "playwright";
import TelegramBot from "node-telegram-bot-api";

const url = "https://www.workana.com/jobs?category=it-programming&language=pt";

export const getHtmlPage = async (url) => {
  try {
    const browser = await firefox.launch({ headless: true });
    const context = await browser.newContext({
      timezoneId: "America/Sao_Paulo", // Define o fuso horário para São Paulo, Brasil
      geolocation: { latitude: -23.5505, longitude: -46.6333 }, // Coordenadas de São Paulo, Brasil
      permissions: ["geolocation"], // Permissão para acessar a geolocalização
      locale: "pt-BR", // Define o local para português do Brasil
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36", // Define o User-Agent para um navegador padrão
    });
    const page = await context.newPage();

    await context.clearCookies();

    await page.goto(url, { waitUntil: "networkidle" });

    await page.reload();
    await page.waitForTimeout(4000);

    const html = await page.content();
    await browser.close(); // Fechar o navegador após pegar o conteúdo
    return html;
  } catch (error) {
    console.error("Error fetching page:", error);
    throw error;
  }
};

const token = "7409457885:AAGKp1FDAdyDUbaNXAqzOB4SEGHyi3W0S0w"; // Substitua pelo token do seu bot

const bot = new TelegramBot(token, { polling: true });

let lastProjectTitle = "";
let message = {};

const checkForNewProjects = async (chatId) => {
  try {
    const html = await getHtmlPage(url);
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Selecionar apenas elementos com a classe 'project-item js-project' que não tenham 'project-item-featured'
    const latestProject = document.querySelector(
      ".project-item.js-project:not(.project-item-featured)"
    );

    if (latestProject) {
      const title = latestProject
        .querySelector("h2.project-title span span")
        .getAttribute("title")
        .trim();
      const date = latestProject
        .querySelector("h5.date.visible-xs strong")
        .textContent.trim();
      const budget = latestProject
        .querySelector(".project-actions.floating .budget .values span")
        .textContent.trim();
      const url = latestProject
        .querySelector("h2.project-title span a")
        .getAttribute("href")
        .trim();

      let description = latestProject
        .querySelector("div.html-desc.project-details span")
        .innerHTML.trim();
      description = description.split("<br>")[0];

      message.title = title;
      message.date = date;
      message.budget = budget;
      message.url = url;
      message.description = description;

      if (title !== lastProjectTitle) {
        const msg = messageFormat(message);
        bot.sendMessage(chatId, msg, { parse_mode: "Markdown" });
        console.log(msg);
        lastProjectTitle = title;
      } else {
        console.log("Nenhum novo projeto encontrado.");
      }
    } else {
      console.log("Nenhum projeto correspondente encontrado.");
    }
  } catch (error) {
    console.error(`Erro ao acessar a página: ${error}`);
  }
};

const messageFormat = (message) => {
  return `
🚀 *Novo Projeto Encontrado!*

📝 *${message.title}*

📄 ${message.description}

💰 ${message.budget}

🗓️ *Data de Postagem:* ${message.date}
🔗 *Link da Postagem:* [Clique aqui](https://www.workana.com${message.url})
  `;
};

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "O bot está ativo e monitorando novos projetos!");
  setInterval(() => checkForNewProjects(chatId), 60000);
});
