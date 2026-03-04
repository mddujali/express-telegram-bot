import dotenv from 'dotenv';
import { expand } from 'dotenv-expand';

const env = dotenv.config();
expand(env);

import { Ray } from 'node-ray';

await Ray.initSettings();

import express from 'express';

const APP_PORT = process.env.APP_PORT;
const APP_URL = process.env.APP_URL;

import { webhookCallback } from 'grammy';
import { createBot } from './bot/webhook.js';

const bot = createBot(process.env.TELEGRAM_BOT_TOKEN!);

const app = express();

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ message: 'Service is running.' });
});

app.post('/send-message', async (req, res) => {
  const { chatId, text } = req.body;

  const data = await bot.api.sendMessage(chatId, text);

  res.json({
    message: 'Success.',
    data,
  });
});

const webhookPath = `/telegram/${process.env.TELEGRAM_BOT_WEBHOOK_SECRET}`;

app.post(webhookPath, webhookCallback(bot, 'express'));

app.listen(APP_PORT, () => {
  console.log(`Server listening on ${APP_URL}`);

  console.log(`Webhook endpoint: ${APP_URL}${webhookPath}`);
});
