import { useEffect, useMemo, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useAuth } from '../context/AuthContext';
import Chatitem from '../components/chats/Chatitem';
import ChatComposer from '../components/chats/ChatComposer';
import ConversationSidebar from '../components/chats/ConversationSidebar';
import { createNewConversation, deleteUserChats, getUserChats, sendConversationChatRequest } from '../helpers/apiCommunicator';
import { useNavigate, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import type { ConversationSummary, Message } from '../types/chat';

const Chat = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const auth = useAuth();
  const hasLoadedChatsRef = useRef(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<ConversationSummary[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [isSwitchingConversation, setIsSwitchingConversation] = useState(false);
  const isEmptyConversation = chatMessages.length === 0;

  const sortedConversations = useMemo(
    () => [...conversations].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()),
    [conversations]
  );

  const handleSubmit = async () => {
    const content = inputRef.current?.value.trim() ?? '';
    if (!content) {
      return;
    }

    inputRef.current && (inputRef.current.value = '');
    setChatMessages((prev) => [...prev, { role: 'user', content }]);

    try {
      const chatData = await sendConversationChatRequest(content, activeConversationId || undefined);
      setActiveConversationId(chatData.conversationId || null);
      setConversations(chatData.conversations || []);
      setChatMessages([...chatData.chats]);
    } catch (error) {
      console.log(error);
      toast.error('Unable to send chat. Please login again.', { id: 'sendchat' });
    }
  };

  const handleDeleteChats = async () => {
    const firstConfirm = window.confirm('Are you sure you want to clear this conversation?');
    if (!firstConfirm) {
      return;
    }

    const secondConfirm = window.confirm('This will permanently delete all messages. Continue?');
    if (!secondConfirm) {
      return;
    }

    try {
      toast.loading('Deleting Chats', { id: 'deletechats' });
      const data = await deleteUserChats(activeConversationId || undefined);
      setActiveConversationId(data.conversationId || null);
      setConversations(data.conversations || []);
      setChatMessages(data.chats || []);
      toast.success('Deleted Chats Successfully', { id: 'deletechats' });
    } catch (error) {
      console.log(error);
      toast.error('Deleting chats failed', { id: 'deletechats' });
    }
  };

  const handleStartNewConversation = async () => {
    if (activeConversationId && isEmptyConversation) {
      inputRef.current?.focus();
      return;
    }

    try {
      const data = await createNewConversation();
      setConversations(data.conversations || []);
      setActiveConversationId(data.conversation?.id || null);
      setChatMessages([]);
      inputRef.current?.focus();
    } catch (error) {
      console.log(error);
      toast.error('Unable to start a new chat', { id: 'newchat' });
    }
  };

  const handleConversationSelect = async (conversationId: string) => {
    if (conversationId === activeConversationId) {
      return;
    }

    setIsSwitchingConversation(true);
    setActiveConversationId(conversationId);

    try {
      const data = await getUserChats(conversationId);
      setActiveConversationId(data.conversationId || conversationId);
      setChatMessages(data.chats || []);
      setConversations(data.conversations || []);
    } catch (error) {
      console.log(error);
      toast.error('Unable to load this conversation', { id: 'loadconversation' });
    } finally {
      setIsSwitchingConversation(false);
    }
  };

  useEffect(() => {
    if (auth?.isLoggedIn && auth.user && !hasLoadedChatsRef.current) {
      hasLoadedChatsRef.current = true;
      getUserChats()
        .then((data) => {
          setConversations(data.conversations || []);
          setActiveConversationId(data.conversationId || null);
          setChatMessages([...data.chats]);
          if ((!data.conversations || data.conversations.length === 0) && !searchParams.get('new')) {
            return handleStartNewConversation();
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error('Loading Failed', { id: 'loadchats' });
        });
    }

    if (!auth?.isLoggedIn) {
      hasLoadedChatsRef.current = false;
    }
  }, [auth?.isLoggedIn, auth?.user?.email]);

  useEffect(() => {
    if (!auth?.isLoggedIn || !auth?.user) {
      return;
    }

    if (searchParams.get('new') === '1') {
      setSearchParams({}, { replace: true });
      handleStartNewConversation();
    }
  }, [searchParams, auth?.isLoggedIn, auth?.user?.email]);

  useEffect(() => {
    if (!auth?.user) {
      navigate('/login');
    }
  }, [auth?.user, navigate]);

  return (
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        width: '100%',
        height: '100%',
        mt: 3,
        gap: 3,
        px: { xs: 2, sm: 3, md: 5 },
        boxSizing: 'border-box',
      }}>
      <Box sx={{ display: { md: 'flex', xs: 'none', sm: 'none' }, flex: 0.2 }}>
        <ConversationSidebar
          userName={auth?.user?.name}
          conversations={sortedConversations}
          activeConversationId={activeConversationId}
          isSwitchingConversation={isSwitchingConversation}
          onConversationSelect={handleConversationSelect}
          onClearConversation={handleDeleteChats}
        />
      </Box>
      <Box sx={{ display: 'flex', flex: { md: 0.8, xs: 1, sm: 1 }, flexDirection: 'column' }}>
        <Typography sx={{ textAlign: 'center', fontSize: '48px', color: 'white', mb: 2, mx: 'auto' }}>
          Model - JACK v1
        </Typography>
        {isEmptyConversation && <ChatComposer inputRef={inputRef} onSubmit={handleSubmit} maxWidth="760px" />}
        <Box
          sx={{
            height: '60vh',
            borderRadius: 3,
            mx: 'auto',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'scroll',
            overflowX: 'hidden',
            overflowY: 'auto',
            scrollBehavior: 'smooth',
            px: 1,
          }}>
          {chatMessages.map((chat, index) => (
            <Chatitem content={chat.content} role={chat.role} key={chat.id || `${chat.role}-${index}`} />
          ))}
        </Box>
        {!isEmptyConversation && <ChatComposer inputRef={inputRef} onSubmit={handleSubmit} />}
      </Box>
    </Box>
  );
};

export default Chat;
