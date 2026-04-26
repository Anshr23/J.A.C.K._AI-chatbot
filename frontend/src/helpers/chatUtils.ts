export const getConversationLabel = (title?: string) => {
  const normalized = (title || '').trim();
  if (!normalized) {
    return 'New Chat';
  }
  return normalized.length > 36 ? `${normalized.slice(0, 36)}...` : normalized;
};

export const getUserInitials = (name?: string) => {
  const normalized = (name || '').trim();
  if (!normalized) {
    return 'U';
  }

  const [first, second] = normalized.split(/\s+/);
  return `${first?.[0] ?? 'U'}${second?.[0] ?? ''}`.toUpperCase();
};
