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
import { createBot } from '#bot/webhook';
import { getChatIdByUsername, listKnownUsers } from '#bot/userDirectory';

const bot = createBot(process.env.TELEGRAM_BOT_TOKEN!);

const app = express();

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ message: 'Service is running.' });
});

app.get('/known-users', (_req, res) => {
  res.json({ users: listKnownUsers() });
});

app.post('/send-message', async (req, res) => {
  const { chatId, username, text } = req.body as {
    chatId?: number | string;
    username?: string;
    text?: string;
  };

  if (!text || typeof text !== 'string') {
    return res.status(400).json({ message: 'Field "text" is required.' });
  }

  let resolvedChatId: number | undefined;

  if (typeof chatId === 'number') resolvedChatId = chatId;
  if (typeof chatId === 'string' && chatId.trim()) resolvedChatId = Number(chatId);

  if (!resolvedChatId && username) {
    resolvedChatId = getChatIdByUsername(username);
  }

  if (!resolvedChatId || Number.isNaN(resolvedChatId)) {
    return res.status(400).json({
      message:
        'No chatId resolved. Provide "chatId" directly or use "username" after the user has messaged the bot at least once.',
    });
  }

  const data = await bot.api.sendMessage(resolvedChatId, text);

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
