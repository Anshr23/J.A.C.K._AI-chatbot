import { Avatar, Box, Button, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import { getConversationLabel, getUserInitials } from '../../helpers/chatUtils';
import type { ConversationSummary } from '../../types/chat';

type Props = {
  userName?: string;
  conversations: ConversationSummary[];
  activeConversationId: string | null;
  isSwitchingConversation: boolean;
  onConversationSelect: (conversationId: string) => void;
  onClearConversation: () => void;
};

const ConversationSidebar = ({
  userName,
  conversations,
  activeConversationId,
  isSwitchingConversation,
  onConversationSelect,
  onClearConversation,
}: Props) => (
  <Box sx={{ display: 'flex', flex: 0.2, flexDirection: 'column' }}>
    <Box
      sx={{
        display: 'flex',
        height: '60vh',
        bgcolor: 'rgb(17,29,29)',
        borderRadius: 5,
        flexDirection: 'column',
      }}>
      <Avatar
        sx={{ mx: 'auto', my: 2, bgcolor: 'white', color: 'black', fontWeight: 700 }}>
        {getUserInitials(userName)}
      </Avatar>
      <Typography sx={{ mx: 'auto', fontFamily: 'work sans' }}>
        You are talking to a ChatBOT
      </Typography>
      <Typography sx={{ mx: 'auto', fontFamily: 'work sans', my: 4, p: 3 }}>
        You can ask some questions related to Knowledge, Business, Advices, Education, etc.
        But avoid sharing personal information
      </Typography>
      <Box sx={{ px: 3, mb: 2 }}>
        <Typography sx={{ fontWeight: 700, mb: 1, fontFamily: 'work sans' }}>
          Conversations
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, maxHeight: '160px', overflowY: 'auto' }}>
          {conversations.length === 0 && (
            <Typography sx={{ fontSize: '13px', color: '#d6d6d6', textAlign: 'left' }}>
              No conversations yet
            </Typography>
          )}
          {conversations.map((conversation, index) => {
            const isActive = conversation.id === activeConversationId;
            return (
              <Button
                key={`${conversation.id}-${index}`}
                onClick={() => onConversationSelect(conversation.id)}
                disabled={isSwitchingConversation}
                sx={{
                  justifyContent: 'flex-start',
                  textTransform: 'none',
                  borderRadius: 2,
                  bgcolor: isActive ? 'rgba(0, 255, 252, 0.2)' : 'rgba(255,255,255,0.06)',
                  border: isActive ? '1px solid rgba(0, 255, 252, 0.6)' : '1px solid rgba(255,255,255,0.08)',
                  color: '#d6d6d6',
                  px: 1.5,
                  py: 1,
                }}>
                <Typography
                  sx={{
                    fontSize: '13px',
                    textAlign: 'left',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    width: '100%',
                  }}>
                  {getConversationLabel(conversation.title)}
                </Typography>
              </Button>
            );
          })}
        </Box>
      </Box>
      <Button
        onClick={onClearConversation}
        sx={{
          width: '208px',
          my: 'auto',
          color: 'white',
          fontWeight: 700,
          borderRadius: 3,
          mx: 'auto',
          bgcolor: red[300],
          ':hover': {
            bgcolor: red.A400,
          },
        }}>
        Clear Conversation
      </Button>
    </Box>
  </Box>
);

export default ConversationSidebar;
