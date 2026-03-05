type Username = string; // stored without "@"

const usernameToChatId = new Map<Username, number>();

export function rememberUserChat(opts: { username?: string; chatId: number }) {
  const username = (opts.username ?? '').replace(/^@/, '').trim().toLowerCase();

  if (!username) {
    return;
  }

  usernameToChatId.set(username, opts.chatId);
}

export function getChatIdByUsername(username: string): number | undefined {
  const key = username.replace(/^@/, '').trim().toLowerCase();

  if (!key) {
    return undefined;
  }

  return usernameToChatId.get(key);
}

export function listKnownUsers() {
  return Array.from(usernameToChatId.entries()).map(([username, chatId]) => ({
    username,
    chatId,
  }));
}
