export type Message = {
  id?: string;
  role: 'user' | 'assistant';
  content: string;
};

export type ConversationSummary = {
  id: string;
  title: string;
  updatedAt: string;
};
