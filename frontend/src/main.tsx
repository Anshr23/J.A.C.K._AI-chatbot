import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.tsx';

import axios from 'axios';
const isDev = import.meta.env.VITE_NODE_ENV === "development";

const apiBaseUrl = isDev
  ? (import.meta.env.VITE_IN_LOCALHOST || "http://localhost:5001") + "/api/v1"
  : (import.meta.env.VITE_BACKEND_URL || "") + "/api/v1";

axios.defaults.baseURL = apiBaseUrl;
axios.defaults.withCredentials = true;

import { Toaster } from 'react-hot-toast';

const theme = createTheme({ 
  typography: {
  fontFamily: "Roboto Slab, serif",
  allVariants: { color: "white" },
},
});

createRoot(document.getElementById('root')!).render(
    <AuthProvider>
    <BrowserRouter>
    <ThemeProvider theme={theme}>
      <Toaster position="top-right" />
      <App />
    </ThemeProvider>
    </BrowserRouter>
    </AuthProvider>
)
