import dotenv from 'dotenv';
import { expand } from 'dotenv-expand';

const env = dotenv.config();
expand(env);

import { Bot } from 'grammy';

const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN!);

bot.command('start', async (ctx) => {
  console.log(ctx);

  await ctx.reply('Welcome! Up and running.');
});

bot.on('message', async (ctx) => {
  console.log(ctx);

  await ctx.reply('Got another message!');
});

async function main() {
  await bot.start();
}

main().catch((err) => {
  console.error('Error starting the bot:', err);

  process.exit(1);
});
