import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () =>{
    const {targetUserId} = useParams();
    const [newMessage,setNewMessage] = useState('');
    const [messages,setMessages] = useState([]);
    const user = useSelector((store)=>{return store.user})
    const userId = user?._id;

    
    useEffect(()=>{
      if (!userId) return
      const socket = createSocketConnection();
      // as soon as the page loaded, the socket connection is made and Joinchat event emitted
      socket.emit("joinChat",{userId,targetUserId});

      socket.on("messageReceived",({firstName,newMessage,senderId})=>{

        setMessages((oldMessages)=>[...oldMessages,{firstName,newMessage,senderId}])        
      });

          const fetchPastMessages = async() => {
        const getMessages = await axios.get(`${BASE_URL}/chat/oldMessages/${targetUserId}`,{withCredentials:true});
        const pastConversationDetails = getMessages?.data.data.messages;
        const result =  pastConversationDetails.map((conversation)=>{
          const {message,senderUserId} = conversation;
          return {firstName:senderUserId.firstName,newMessage:message,senderId:senderUserId._id}
        })
        setMessages(result)
    }

    fetchPastMessages()

      return ()=>{
        socket.disconnect();
      }
    },[user,userId,targetUserId])

    const sendNewMessage = (newMessage) => {
      const socket = createSocketConnection();
      socket.emit("sendMessage",{newMessage,firstName:user.firstName,userId,targetUserId})
      setNewMessage('')
    }
    
return (
  /* Inline CSS overrides every possible external layout constraint */
  <div style={{
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100%',
    maxWidth: '448px',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#4b5563',
    overflow: 'hidden',
    zIndex: 9999
  }}>
    
    {/* Header */}
    <div className="p-4 bg-black text-white font-bold text-center" style={{ padding: '16px', backgroundColor: '#000000', color: '#ffffff', textAlign: 'center', fontWeight: 'bold' }}>
      Chat Page
    </div>

<div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
  {messages && messages.map((msg, index) => {
    // 1. Determine if the message was sent by the current logged-in user
    const isMe = msg.senderId === userId; 

    return (
      <div 
        key={index} 
        style={{ 
          // 2. self-end moves it to the right (WhatsApp style), self-start keeps it on the left
          alignSelf: isMe ? 'flex-end' : 'flex-start', 
          backgroundColor: isMe ? '#2563eb' : '#065f46', // Blue for you, Emerald for them
          color: '#ffffff', 
          padding: '12px', 
          borderRadius: '8px', 
          maxWidth: '320px',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Sender Name (Optional: usually only shown for incoming group messages) */}
        {!isMe && (
          <span style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '4px', fontWeight: 'bold' }}>
            {msg?.firstName}
          </span>
        )}
        
        {/* Message Text */}
        <div>
          {msg.message || msg.newMessage}
        </div>
      </div>
    );
  })}
</div>


    {/* Input Section - Guaranteed Inline Display */}
    <div style={{ 
      display: 'flex', 
      padding: '16px', 
      backgroundColor: '#ffffff', 
      gap: '8px', 
      flexShrink: 0,
      borderTop: '1px solid #e5e7eb'
    }}>
      <input 
        type="text" 
        placeholder="Type a message..." 
        style={{ 
          flex: 1, 
          border: '1px solid #ccc', 
          padding: '8px', 
          borderRadius: '4px', 
          color: '#000000',
          backgroundColor: '#ffffff',
          minWidth: 0
        }}
        value={newMessage}
        onChange={(e)=>{setNewMessage(e.target.value)}}
      />
      <button 
      style={{ 
        backgroundColor: '#3b82f6', 
        color: '#ffffff', 
        padding: '8px 16px', 
        borderRadius: '4px',
        border: 'none',
        cursor: 'pointer'
      }}
      onClick={()=>{sendNewMessage(newMessage)}}
      >
        Send
      </button>
    </div>

  </div>
);



}

export default Chat