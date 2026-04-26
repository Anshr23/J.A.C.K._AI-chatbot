import IconButton from '@mui/material/IconButton';
import { IoMdSend } from 'react-icons/io';
import type { RefObject } from 'react';

type Props = {
  inputRef: RefObject<HTMLInputElement | null>;
  maxWidth?: string;
  onSubmit: () => void;
};

const ChatComposer = ({ inputRef, maxWidth, onSubmit }: Props) => (
  <div
    style={{
      width: '100%',
      maxWidth: maxWidth || '100%',
      boxSizing: 'border-box',
      padding: '12px 20px',
      borderRadius: 8,
      backgroundColor: 'rgb(17,29,39)',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      margin: 'auto',
      marginTop: '20px',
    }}>
    <input
      ref={inputRef}
      type="text"
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          onSubmit();
        }
      }}
      style={{
        flex: 1,
        backgroundColor: 'transparent',
        border: 'none',
        outline: 'none',
        color: 'white',
        fontSize: '16px',
        borderRadius: '10px',
      }}
    />
    <IconButton onClick={onSubmit} sx={{ ml: 'auto', color: 'white' }}>
      <IoMdSend />
    </IconButton>
  </div>
);

export default ChatComposer;
