import TelegramBot from "node-telegram-bot-api";
import dotenv from 'dotenv';
dotenv.config();


const token = process.env.TELEGRAM_BOT_TOKEN;
export const bot = new TelegramBot(token, { polling: true });
export const chatIdToMonitor = new Set();
export const lastProjectTitles = {};

// Importar as funções de configuração dos comandos
import { configureStartCommand } from "./commands/start.js";
import { configureStopCommand } from "./commands/stop.js";

// Configurar os comandos após a inicialização do bot
configureStartCommand();
configureStopCommand();
