import axios from "axios";

export const loginUser = async (email: string, password: string) => {
    const res = await axios.post("/user/login",{ email, password });
    if(res.status !== 200) {
        throw new Error("Unable to login");
    }
    const data = await res.data;
    return data;
};

export const signupUser = async (name: string, email: string, password: string) => {
    try {
        const res = await axios.post("/user/signup", { name, email, password });
        if (res.status !== 201) {
            throw new Error("Unable to Signup");
        }
        return res.data;
    } catch (error: any) {
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error("Unable to Signup");
    }
};

export const checkAuthStatus = async () => {
    const res = await axios.get("/user/auth-status");
    if(res.status !== 200) {
        throw new Error("Unable to Authenticate");
    }
    const data = await res.data;
    return data;
};

export const sendChatRequest = async (message: string) => {
  return sendConversationChatRequest(message);
};

export const sendConversationChatRequest = async (message: string, conversationId?: string) => {
  const res = await axios.post("/chat/new", { message, conversationId });
  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }
  const data = await res.data;
  return data;
};

export const getUserChats = async (conversationId?: string) => {
  const res = await axios.get("/chat/all-chats", { params: { conversationId } });
  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }
  const data = await res.data;
  return data;
};

export const getUserConversations = async () => {
  const res = await axios.get("/chat/conversations");
  if (res.status !== 200) {
    throw new Error("Unable to load conversations");
  }
  const data = await res.data;
  return data;
};

export const createNewConversation = async (title?: string) => {
  const res = await axios.post("/chat/new-conversation", { title });
  if (res.status !== 201 && res.status !== 200) {
    throw new Error("Unable to create conversation");
  }
  const data = await res.data;
  return data;
};

export const deleteUserChats = async (conversationId?: string) => {
  const res = await axios.delete("/chat/delete", { data: { conversationId } });
  if (res.status !== 200) {
    throw new Error("Unable to delete chats");
  }
  const data = await res.data;
  return data;
};

export const signoutUser = async () => {
  const res = await axios.get("/user/signout");
  if (res.status !== 200) {
    throw new Error("Unable to delete chats");
  }
  const data = await res.data;
  return data;
};

