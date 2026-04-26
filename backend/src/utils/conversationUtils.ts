import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import { randomUUID } from 'crypto';

export const getConversationTitle = (message: string) => {
  const trimmed = message.trim();
  if (!trimmed) {
    return 'New Chat';
  }
  return trimmed.length > 40 ? `${trimmed.slice(0, 40)}...` : trimmed;
};

export const buildConversationSummaries = (conversations: any[] = []) =>
  conversations
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .map((conversation) => ({
      id: conversation.id,
      title: conversation.title,
      updatedAt: conversation.updatedAt,
    }));

export const ensureConversations = (user: any) => {
  if (!Array.isArray(user.conversations)) {
    user.conversations = [];
  }

  if (user.conversations.length === 0 && Array.isArray(user.chats) && user.chats.length > 0) {
    const firstUserMessage = user.chats.find((chat: any) => chat.role === 'user')?.content || 'Imported Chat';
    user.conversations.push({
      title: getConversationTitle(firstUserMessage),
      chats: user.chats,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    user.chats = [];
  }
};

export const normalizeConversations = (user: any, preserveConversationId?: string) => {
  ensureConversations(user);
  const idSet = new Set<string>();
  const now = new Date();

  user.conversations = user.conversations.map((conversation: any) => {
    const normalized = { ...conversation };
    if (!normalized.id || idSet.has(normalized.id)) {
      normalized.id = randomUUID();
    }
    idSet.add(normalized.id);

    if (!Array.isArray(normalized.chats)) {
      normalized.chats = [];
    }

    const firstUserMessage = normalized.chats.find((chat: any) => chat.role === 'user')?.content || '';
    if (!normalized.title || !String(normalized.title).trim()) {
      normalized.title = firstUserMessage ? getConversationTitle(firstUserMessage) : 'New Chat';
    }
    if (normalized.title === 'New Chat' && firstUserMessage) {
      normalized.title = getConversationTitle(firstUserMessage);
    }

    normalized.createdAt = normalized.createdAt || now;
    normalized.updatedAt = normalized.updatedAt || normalized.createdAt || now;
    return normalized;
  });

  const emptyConversations = user.conversations.filter((conversation: any) => conversation.chats.length === 0);
  if (emptyConversations.length > 1) {
    const preservedEmpty = emptyConversations.find((conversation: any) => conversation.id === preserveConversationId);
    const latestEmpty = [...emptyConversations].sort(
      (a: any, b: any) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )[0];
    const keepEmptyId = preservedEmpty?.id || latestEmpty?.id;
    user.conversations = user.conversations.filter(
      (conversation: any) => conversation.chats.length > 0 || conversation.id === keepEmptyId
    );
  }
};

export const findConversationById = (user: any, conversationId?: string) => {
  ensureConversations(user);
  if (!conversationId) {
    return null;
  }
  return user.conversations.find((conversation: any) => conversation.id === conversationId) || null;
};

export const getMostRecentConversation = (user: any) => {
  ensureConversations(user);
  if (user.conversations.length === 0) {
    return null;
  }
  return [...user.conversations].sort(
    (a: any, b: any) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  )[0];
};

export const createConversation = (user: any, title = 'New Chat') => {
  ensureConversations(user);
  const now = new Date();
  const conversation = {
    id: randomUUID(),
    title,
    chats: [],
    createdAt: now,
    updatedAt: now,
  };

  user.conversations.push(conversation);
  return user.conversations[user.conversations.length - 1];
};

export const mapChatsToOpenAIMessages = (conversation: any) =>
  conversation.chats.map(({ role, content }: any) => ({ role, content })) as ChatCompletionMessageParam[];
