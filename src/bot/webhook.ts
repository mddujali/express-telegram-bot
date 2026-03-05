import { Bot } from 'grammy';
import { ray } from 'node-ray';
import { rememberUserChat } from '#bot/userDirectory';

export function createBot(token: string) {
  const bot = new Bot(token);

  bot.command('start', async (ctx) => {
    ray(ctx).label('start');

    rememberUserChat({
      username: ctx.from?.username ?? '',
      chatId: ctx.chat.id,
    });

    await ctx.reply('Hello! Webhook is working.');
  });

  bot.on('message:text', async (ctx) => {
    ray(ctx).label('message:text');

    rememberUserChat({
      username: ctx.from?.username ?? '',
      chatId: ctx.chat.id,
    });

    await ctx.reply(`You said: ${ctx.message.text}`);
  });

  bot.catch((err) => {
    ray(err).red();

    console.error(err);
  });

  return bot;
}
