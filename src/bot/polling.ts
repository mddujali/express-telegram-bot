import dotenv from 'dotenv';
import { expand } from 'dotenv-expand';

const env = dotenv.config();
expand(env);

import { Bot } from 'grammy';
import { Ray, ray } from 'node-ray';

await Ray.initSettings();

const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN!);

bot.command('start', async (ctx) => {
  ray(ctx).label('start');

  await ctx.reply('Welcome! Polling is working.');
});

bot.on('message', async (ctx) => {
  ray(ctx).label('message');

  await ctx.reply('Got a message!');
});

async function main() {
  await bot.start();
}

main().catch((err) => {
  ray(err).red();

  console.error(err);

  process.exit(1);
});
