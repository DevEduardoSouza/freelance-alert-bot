import { getHtmlPage } from "./getHtmlPage.js";
import { sendTelegramMessage } from "../utils/sendTelegramMessage.js";
import { lastProjectTitles } from "../bot/bot.js";
import { JSDOM } from "jsdom";

export const fetchProjects = async (chatId, siteConfig) => {
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
          console.log("Novo projeto encontrado.");
        } else {
          console.log("Nenhum novo projeto encontrado.");
        }
        break;
      }
    }
  } catch (error) {
    console.error(`Erro ao acessar a página: ${error}`);
  }
};
