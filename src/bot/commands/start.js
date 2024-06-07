import { fetchProjects } from "../../scrapers/fetchProjects.js";
import { chatIdToMonitor, bot } from "../bot.js";
import { sitesConfig } from "../../config/sitesConfig.js";

export const configureStartCommand = () => {
  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    chatIdToMonitor.add(chatId);
    bot.sendMessage(chatId, "O bot está ativo e monitorando novos projetos!");

    sitesConfig.forEach((siteConfig) => {
      setInterval(
        () => {
          if (chatIdToMonitor.has(chatId)) {
            fetchProjects(chatId, siteConfig);
          }
        },
        siteConfig.name === "workana" ? 30000 : 60000
      );
    });
  });
};
