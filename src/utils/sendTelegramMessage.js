import { bot } from "../bot/bot.js";
import { messageFormat } from "./messageFormat.js";

export const sendTelegramMessage = (chatId, message) => {
  const msg = messageFormat(message);
  const opts = {
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [[{ text: "Ver Projeto", url: message.url }]],
    },
  };

  bot.sendMessage(chatId, msg, opts);
  console.log(msg);
};
