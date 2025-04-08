'use client';

import { useState, useRef, useEffect } from 'react';
import Message from './Message';
import MessageInput from './MessageInput';

// Type definitions
type MessageData = {
  id: number;
  text: string;
  sender: 'me' | 'them';
  time: string;
  status: 'sent' | 'delivered' | 'read';
  isMedia?: boolean;
  mediaUrl?: string;
};

type ChatContainerProps = {
  chatId: number;
  initialMessages: MessageData[];
};

export default function ChatContainer({ chatId, initialMessages }: ChatContainerProps) {
  const [messages, setMessages] = useState<MessageData[]>(initialMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Function to handle sending a new message
  const handleSendMessage = (text: string) => {
    // Create a new message
    const newMessage: MessageData = {
      id: Date.now(), // Using timestamp as a temporary ID
      text,
      sender: 'me',
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
    };
    
    // Add the new message to the list
    setMessages(prevMessages => [...prevMessages, newMessage]);
    
    // Simulate a reply after a short delay
    setTimeout(() => {
      const replyMessage: MessageData = {
        id: Date.now() + 1,
        text: 'Message received!',
        sender: 'them',
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        status: 'sent',
      };
      
      // Add the reply to the list
      setMessages(prevMessages => [...prevMessages, replyMessage]);
      
      // Update the status of the user's message to 'read'
      setMessages(prevMessages => 
        prevMessages.map(msg => 
          msg.id === newMessage.id 
            ? { ...msg, status: 'read' as const } 
            : msg
        )
      );
    }, 2000);
  };
  
  return (
    <div className="flex flex-col h-full bg-[#0e1621] rounded-md overflow-hidden shadow-lg m-2">
      {/* Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto bg-[#0e1621]">
        <div className="space-y-3">
          {messages.map((message) => (
            <Message 
              key={message.id}
              text={message.text}
              sender={message.sender}
              time={message.time}
              status={message.status}
              isMedia={message.isMedia}
              mediaUrl={message.mediaUrl}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Message Input */}
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
} 