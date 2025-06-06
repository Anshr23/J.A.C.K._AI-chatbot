import React, { useRef, useState } from 'react'
import { Box , Avatar, Button , Typography, IconButton } from '@mui/material'
import { useAuth } from '../context/AuthContext'
import { red } from "@mui/material/colors/"
import Chatitem from '../components/chats/Chatitem';
import { IoMdSend } from 'react-icons/io';

//type ChatRole = "user" | "assistant";
// const chatMessages: { role: ChatRole; content: string }[] = [
//   { role: "user", content: "Hey JACK, can you summarize this article for me?" },
//   { role: "assistant", content: "Sure! Please upload or paste the article you'd like summarized." },
  
//   { role: "user", content: "Done. Also, what's the weather like in Mumbai today?" },
//   { role: "assistant", content: "Currently in Mumbai, it's 32°C with scattered clouds. Would you like a 3-day forecast too?" },
  
//   { role: "user", content: "Yes, please. Also can you debug this JS code?" },
//   { role: "assistant", content: "Absolutely! Send over the code snippet and I'll check it right away." },
  
//   { role: "user", content: "One more thing — translate this paragraph to French." },
//   { role: "assistant", content: "Of course. Please provide the paragraph, and I'll translate it for you instantly." },
  
//   { role: "user", content: "You're awesome, JACK." },
//   { role: "assistant", content: "Thanks! I'm here for whatever you need — anytime, any topic." }
// ];

type Messages = {
  role: "user" | "assistant" ;
  content: string;
}

const Chat = () => {
  const auth = useAuth();
  const inputRef = useRef <HTMLInputElement| null>(null);
  const [chatMessages, setChatMessages] = useState<Messages[]>([])
  const handleSubmit = async () =>{
    //console.log(inputRef.current?.value);
    const content = inputRef.current?.value as string;
    if(inputRef && inputRef.current){
      inputRef.current.value = "";
    }
    const newMessage: Messages = { role: "user", content};
    setChatMessages((prev)=> [...prev, newMessage])
  };
  return (
    <Box
    sx={{
      display: "flex", flex: 1, width: "100%", height: "100%", mt: 3, gap: 3,
      px: { xs: 2, sm: 3, md: 0 }
    }}>
      <Box sx={{display: { md: "flex", xs: "none", sm: "none", flex: 0.2, flexDirection: "column"}}}>
        <Box 
        sx={{
          display:"flex", 
          width: "100%", 
          height: "60vh", 
          bgcolor: "rgb(17,29,29)", 
          borderRadius: 5, 
          flexDirection: "column",
          mx: 3,
        }}>
          <Avatar
          sx={{
            mx: "auto",
            my: 2, 
            bgcolor: "white", 
            color: "black",
            fontweight: 700,
          }}
          >
            {auth?.user?.name[0]}
            {auth?.user?.name.split(" ")[1][0]}
          </Avatar>
          < Typography sx={{ mx: "auto", fontFamily: "work sans" }}>
            You are talking to a ChatBOT
          </Typography>
          <Typography sx={{ mx: "auto", fontFamily: "work sans" , my: 4, p: 3 }}>
            You can ask some questions related to Knowledge, Business, Advices, Education, etc. 
            But avoid sharing personal information
          </Typography>
          <Button 
          sx={{
            width: "208px",
            my: 'auto',
            color: 'white', 
            fontweight: "700",
            borderRadius: 3,
            mx: "auto",
            bgcolor: red[300],
            ":hover": {
              bgcolor: red.A400,
            }
          }}>
            Clear Conversation 
            </Button>
        </Box>
      </Box>
      <Box sx={{display: "flex", flex: {md: 0.8, xs: 1, sm: 1, flexDirection: "column"} }}>
        <Typography
        sx={{textAlign: "center", fontSize: "48px", color: "white", mb: 2, mx: "auto"}}
        >
          Model - GPT 3.5 Turbo
        </Typography>
        <Box
        sx={{
          width: "100%", 
          height: "60vh", 
          borderRadius: 3, 
          mx: "auto", 
          display: "flex", 
          flexDirection: "column",
          overflow: "scroll",
          overflowX: "hidden",
          overflowY: "auto",
          scrollBehavior: "smooth",
          px: 1,
        }}
        >
          {chatMessages.map((chat, index) => ( 
            <Chatitem content={chat.content} role={chat.role} key={index} />
          ))}
        </Box>
        <div 
        style={{
          width: "100%", 
          boxSizing: "border-box",
          padding: "12px 20px",
          borderRadius: 8, 
          backgroundColor: "rgb(17,29,39)",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          margin: "auto",
          marginTop: "20px",
        }}>
          { " " }
          <input
          ref={inputRef}
          type="text"
          style={{
            flex: 1,
            backgroundColor: "transparent", 
            padding: "10px 15px",
            border: "none", 
            outline: "none", 
            color: "white", 
            fontSize: "16px",
            borderRadius: "10px",
          }}/>
          <IconButton onClick={handleSubmit} sx={{ml: "auto", color: "white"}}><IoMdSend/></IconButton>
        </div>
      </Box>
    </Box>
  )
}

export default Chat