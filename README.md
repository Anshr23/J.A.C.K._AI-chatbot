# J.A.C.K. (Just A Clever Knowledge-bot)

## Live Demo
[JACK AIChatbot](https://jack-aichatbot-frontend.onrender.com)

## Project Overview

J.A.C.K. is an intelligent chatbot designed to provide information and assistance across various domains such as knowledge, business, advice, and education. This is a full-stack MERN (MongoDB, Express.js, React, Node.js) application that leverages advanced AI capabilities to offer a conversational experience.

## Features

*   **Intelligent Chatbot:** Engage in conversations and get answers on a wide range of topics.
*   **User Authentication:** Secure user registration, login, and logout functionalities.
*   **Chat History:** Maintain and retrieve past conversations for a seamless user experience.
*   **Responsive UI:** Designed to provide a user-friendly experience across different devices.
*   **Clear Conversation:** Option to delete all past chat messages.

## Technologies Used

### Frontend
*   React
*   MUI (Material-UI) for UI components
*   React Router DOM for navigation
*   Axios for API requests
*   React Hot Toast for notifications

### Backend
*   Node.js
*   Express.js
*   MongoDB (with Mongoose for ODM)
*   bcrypt for password hashing
*   jsonwebtoken for token-based authentication
*   cookies-parser for handling HTTP cookies

## Setup and Installation

Follow these steps to get J.A.C.K. up and running on your local machine.

### Prerequisites

*   Node.js (LTS version recommended)
*   npm or Yarn (package manager)
*   MongoDB (local installation or MongoDB Atlas account)

### 1. Clone the Repository

```bash
git clone https://github.com/jackofall-trades/J.A.C.K._AI-chatbot.git
cd J.A.C.K.
```

### 2. Backend Setup

Navigate to the `backend` directory:

```bash
cd backend
```

Install backend dependencies:

```bash
npm install
# or
yarn install
```

Create a `.env` file in the `backend` directory and add the following environment variables:

```
MONGO_URI=<Your_MongoDB_Connection_String>
JWT_SECRET=<A_Strong_Random_Secret_Key_for_JWT>
COOKIE_NAME=auth_token
OPEN_AI_SECRET=<Your_OpenAI_API_Key>
PORT=5001
```

Replace `<Your_MongoDB_Connection_String>`, `<A_Strong_Random_Secret_Key_for_JWT>`, and `<Your_OpenAI_API_Key>` with your actual values.

Start the backend server:

```bash
npm start
# or
yarn start
```

The backend server will run on `http://localhost:5001`.

### 3. Frontend Setup

Open a new terminal, navigate back to the root directory of the project, and then into the `frontend` directory:

```bash
cd ..
cd frontend
```

Install frontend dependencies:

```bash
npm install
# or
yarn install
```

Start the frontend development server:

```bash
npm run dev
# or
yarn dev
```

The frontend application will typically open in your browser at `http://localhost:5173` (or another available port).

## Usage

1.  **Register/Login:** Upon opening the application, you can register a new account or log in if you already have one.
2.  **Chat with J.A.C.K.:** Once logged in, navigate to the chat interface to start conversing with the AI chatbot.
3.  **Clear Conversations:** Use the "Clear Conversation" button to delete your chat history.
4.  **Sign Out:** Log out of your account when you're done.

## Improvements (Version 1 - Future Enhancements)

This is the initial version of J.A.C.K., and there are many areas for future improvement.

### UI/UX Enhancements
*   **Enhanced Responsiveness:** Further optimize the UI for seamless adaptation across a wider range of screen sizes and devices.
*   **Chat Message Styling:** Implement more visually appealing and distinct chat bubble designs for user and assistant messages.
*   **Loading Indicators:** Add subtle loading indicators while waiting for AI responses to improve user feedback.
*   **Error Handling Feedback:** Provide more informative and user-friendly error messages for network issues or API failures.
*   **User Avatars:** Allow users to upload custom avatars or display more personalized default avatars.

### Functionality Enhancements
*   **Advanced AI Model Options:** Integrate options to switch between different AI models (e.g., GPT-4, other specialized models) or allow users to fine-tune model parameters.
*   **Document Upload/Analysis:** Enable users to upload documents (PDF, TXT, DOCX) for summarization, question-answering, or content analysis.
*   **Voice Input/Output:** Add speech-to-text and text-to-speech capabilities for a hands-free conversational experience.
*   **Sophisticated Chat History Management:** Implement features like searching through chat history, tagging conversations, or exporting chats.
*   **Multi-turn Conversation Management:** Improve context retention and coherence over extended conversations.

### Backend/Performance Optimizations
*   **API Caching:** Implement caching mechanisms for frequently requested data to reduce database load and improve response times.
*   **Database Indexing:** Optimize MongoDB queries by adding appropriate indexes to frequently accessed fields.
*   **Rate Limiting:** Implement rate limiting on API endpoints to prevent abuse and ensure fair usage.
*   **Error Logging:** Set up robust error logging to monitor and diagnose issues in production.

