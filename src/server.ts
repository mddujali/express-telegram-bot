import dotenv from 'dotenv';
import { expand } from 'dotenv-expand';

const env = dotenv.config();
expand(env);

import { Bot } from 'grammy';
import { Ray, ray } from 'node-ray';

await Ray.initSettings();

const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN!);

bot.command('start', async (ctx) => {
  ray(ctx);

  await ctx.reply('Welcome! Up and running.');
});

bot.on('message', async (ctx) => {
  ray(ctx);

  await ctx.reply('Got another message!');
});

async function main() {
  await bot.start();
}

main().catch((err) => {
  ray(err).red();

  console.error('Error starting the bot:', err);

  process.exit(1);
});
