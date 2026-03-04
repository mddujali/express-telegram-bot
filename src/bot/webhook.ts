import { Bot } from 'grammy';
import { ray } from 'node-ray';

export function createBot(token: string) {
  const bot = new Bot(token);

  bot.command('start', async (ctx) => {
    ray(ctx);

    await ctx.reply('Hello! Webhook is working.');
  });

  bot.on('message:text', async (ctx) => {
    ray(ctx).label('message:text');

    await ctx.reply(`You said: ${ctx.message.text}`);
  });

  bot.catch((err) => {
    ray(err).red();

    console.error(err);
  });

  return bot;
}
