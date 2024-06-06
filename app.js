import { JSDOM } from "jsdom";
import { firefox } from "playwright";
import TelegramBot from "node-telegram-bot-api";

// Configuração inicial
const token = "7409457885:AAGKp1FDAdyDUbaNXAqzOB4SEGHyi3W0S0w";
const bot = new TelegramBot(token, { polling: true });
const chatIdToMonitor = new Set();
const lastProjectTitles = {};

// Função para obter o conteúdo HTML de uma página
const getHtmlPage = async (url) => {
  try {
    const browser = await firefox.launch({ headless: true });
    const context = await browser.newContext({
      timezoneId: "America/Sao_Paulo",
      geolocation: { latitude: -23.5505, longitude: -46.6333 },
      permissions: ["geolocation"],
      locale: "pt-BR",
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    });
    const page = await context.newPage();

    await context.clearCookies();
    await page.goto(url, { waitUntil: "networkidle" });

    const html = await page.content();
    await browser.close();
    return html;
  } catch (error) {
    console.error("Error fetching page:", error);
    throw error;
  }
};

// Função para formatar a mensagem
const messageFormat = (message) => {
  return `
🚀 *Novo Projeto Encontrado!*

📝 *${message.title}*

📄 ${message.description}

💰 ${message.budget || "A Combinar"}

🗓️ *Data de Postagem:* ${message.date}
🔗 *Link da Postagem:* [Clique aqui](${message.url})
  `;
};

// Função para enviar a mensagem para o Telegram
const sendTelegramMessage = (chatId, message) => {
  const msg = messageFormat(message);
  const opts = {
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [{ text: "Ver Projeto", url: message.url }],
      ],
    },
  };

  bot.sendMessage(chatId, msg, opts);
  console.log(msg);
};

// Função genérica para buscar projetos em um site específico
const fetchProjects = async (chatId, siteConfig) => {
  try {
    const html = await getHtmlPage(siteConfig.url);
    const dom = new JSDOM(html);
    const document = dom.window.document;
    const projects = document.querySelectorAll(siteConfig.projectsSelector);

    for (let projectElement of projects) {
      if (!siteConfig.shouldIgnoreProject(projectElement)) {
        const project = siteConfig.parseProject(projectElement);
        if (project.title !== lastProjectTitles[siteConfig.name]) {
          sendTelegramMessage(chatId, project);
          lastProjectTitles[siteConfig.name] = project.title;
        } else {
          console.log("Nenhum novo projeto encontrado.");
        }
        break; // Encontramos o primeiro projeto válido, então saímos do loop
      }
    }
  } catch (error) {
    console.error(`Erro ao acessar a página: ${error}`);
  }
};

// Configurações dos sites
const sitesConfig = [
  {
    name: "workana",
    url: "https://www.workana.com/jobs?category=it-programming&language=pt",
    projectsSelector: ".project-item.js-project:not(.project-item-featured)",
    shouldIgnoreProject: (element) => element.querySelector(".label-max") !== null,
    parseProject: (element) => ({
      title: element.querySelector("h2.project-title span span").getAttribute("title").trim(),
      date: element.querySelector("h5.date.visible-xs strong").textContent.trim(),
      budget: element.querySelector(".project-actions.floating .budget .values span").textContent.trim(),
      url: `https://www.workana.com${element.querySelector("h2.project-title span a").getAttribute("href").trim()}`,
      description: element.querySelector("div.html-desc.project-details span").innerHTML.trim().split("<br>")[0],
    }),
  },
  {
    name: "99freelas",
    url: "https://www.99freelas.com.br/projects?categoria=web-mobile-e-software",
    projectsSelector: ".with-flag.result-item:not(.destaque)",
    shouldIgnoreProject: (element) => false, // No 99freelas, não precisamos ignorar nada
    parseProject: (element) => ({
      title: element.getAttribute("data-nome").trim(),
      date: element.querySelector(".item-text.information .datetime").textContent.trim(),
      url: `https://www.99freelas.com.br${element.querySelector(".title a").getAttribute("href").trim()}`,
      description: element.querySelector(".item-text.description.formatted-text").textContent.trim(),
    }),
  },
];

// Iniciar o bot e configurar os intervalos de scraping
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  chatIdToMonitor.add(chatId);
  bot.sendMessage(chatId, "O bot está ativo e monitorando novos projetos!");

  sitesConfig.forEach((siteConfig) => {
    setInterval(() => {
      if (chatIdToMonitor.has(chatId)) {
        fetchProjects(chatId, siteConfig);
      }
    }, siteConfig.name === "workana" ? 30000 : 60000);
  });
});

bot.onText(/\/stop/, (msg) => {
  const chatId = msg.chat.id;
  chatIdToMonitor.delete(chatId);
  bot.sendMessage(chatId, "O bot foi desativado.");
});
