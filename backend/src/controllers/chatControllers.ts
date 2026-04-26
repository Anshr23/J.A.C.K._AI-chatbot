import { NextFunction, Request, Response } from 'express';
import User from '../models/User';
import OpenAI from 'openai';
import { configureOpenAI } from '../config/aiConfig';
import {
  buildConversationSummaries,
  createConversation,
  ensureConversations,
  findConversationById,
  getConversationTitle,
  getMostRecentConversation,
  mapChatsToOpenAIMessages,
  normalizeConversations,
} from '../utils/conversationUtils';

const getAuthorizedUser = async (res: Response) => {
  const user = await User.findById(res.locals.jwtData.id);
  if (!user) {
    res.status(401).send('User not registered OR Token malfunctioned');
    return null;
  }

  if (user._id.toString() !== res.locals.jwtData.id) {
    res.status(401).send("Permissions didn't match");
    return null;
  }

  ensureConversations(user);
  return user;
};

export const generateChatCompletion = async (req: Request, res: Response, next: NextFunction) => {
    const { message, conversationId } = req.body;

    try {

        const user = await getAuthorizedUser(res);
        if (!user) {
          return;
        }

        normalizeConversations(user, conversationId);
        let conversation = findConversationById(user, conversationId) || getMostRecentConversation(user);
        if (!conversation) {
            conversation = createConversation(user);
        }

        const chats = mapChatsToOpenAIMessages(conversation);
        chats.push({ content: message, role: 'user' });
        conversation.chats.push({ content: message, role: "user" });
        conversation.updatedAt = new Date();
        if (conversation.title === "New Chat") {
            conversation.title = getConversationTitle(message);
        }

        // send all chats with new one to openAI API
        const config = configureOpenAI();
        const openai = new OpenAI(config);
        
        // get latest response
        const chatResponse = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: chats,
        });
        conversation.chats.push(chatResponse.choices[0].message);
        conversation.updatedAt = new Date();
        await user.save();
        res.status(200).json({
            conversationId: conversation.id,
            chats: conversation.chats,
            conversations: buildConversationSummaries(user.conversations),
        });
        
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: "something went wrong" });
    }

};

export const sendChatsToUser = async(req: Request, res: Response, next: NextFunction) => {
    try {
        //user token check
        const user = await getAuthorizedUser(res);
        if (!user) {
          return;
        }
        const conversationId = (req.query.conversationId as string | undefined) || undefined;
        normalizeConversations(user, conversationId);
        const activeConversation = findConversationById(user, conversationId) || getMostRecentConversation(user);
        res.status(200).json({
            message: "OK",
            conversationId: activeConversation?.id || null,
            chats: activeConversation?.chats || [],
            conversations: buildConversationSummaries(user.conversations),
        });
    } catch (error: any) {
        console.log(error);
        res.status(200).json({message: "ERROR", cause: error.message });
    }
};

export const getConversations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await getAuthorizedUser(res);
    if (!user) {
      return;
    }

    normalizeConversations(user);
    res.status(200).json({
      message: 'OK',
      conversations: buildConversationSummaries(user.conversations),
    });
  } catch (error: any) {
    console.log(error);
    res.status(200).json({ message: 'ERROR', cause: error.message });
  }
};

export const createNewConversation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await getAuthorizedUser(res);
    if (!user) {
      return;
    }

    const title = (req.body?.title as string | undefined)?.trim() || 'New Chat';
    normalizeConversations(user);

    const latestConversation = getMostRecentConversation(user);
    if (latestConversation && Array.isArray(latestConversation.chats) && latestConversation.chats.length === 0) {
      res.status(200).json({
        message: 'OK',
        conversation: {
          id: latestConversation.id,
          title: latestConversation.title,
          updatedAt: latestConversation.updatedAt,
        },
        conversations: buildConversationSummaries(user.conversations),
      });
      return;
    }

    const conversation = createConversation(user, title);
    normalizeConversations(user, conversation.id);
    await user.save();

    res.status(201).json({
      message: 'OK',
      conversation: {
        id: conversation.id,
        title: conversation.title,
        updatedAt: conversation.updatedAt,
      },
      conversations: buildConversationSummaries(user.conversations),
    });
  } catch (error: any) {
    console.log(error);
    res.status(200).json({ message: 'ERROR', cause: error.message });
  }
};

export const deleteChats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await getAuthorizedUser(res);
    if (!user) {
      return;
    }
    const conversationId = (req.body?.conversationId as string | undefined) || undefined;
    const activeConversation = findConversationById(user, conversationId) || getMostRecentConversation(user);
    if (activeConversation) {
      activeConversation.chats = [];
      activeConversation.title = "New Chat";
      activeConversation.updatedAt = new Date();
    }
    normalizeConversations(user, activeConversation?.id);
    await user.save();
    res.status(200).json({
      message: "OK",
      conversationId: activeConversation?.id || null,
      chats: activeConversation?.chats || [],
      conversations: buildConversationSummaries(user.conversations),
    });
  } catch (error: any) {
    console.log(error);
    res.status(200).json({ message: "ERROR", cause: error.message });
  }
};