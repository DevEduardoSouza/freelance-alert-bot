import { chatIdToMonitor, bot } from "../bot.js";

export const configureStopCommand = () => {
  bot.onText(/\/stop/, (msg) => {
    const chatId = msg.chat.id;
    chatIdToMonitor.delete(chatId);
    bot.sendMessage(chatId, "O bot foi desativado.");
  });
};
