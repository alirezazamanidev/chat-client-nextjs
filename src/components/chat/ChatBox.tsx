'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import MessageLayout from './Message';
import MessageInput from './MessageInput';
import { Message } from '@/libs/models/message';
import { useSocket } from '@/libs/hooks/useSocket';
import { ChatTypeEnum } from '@/libs/models/chat';
interface ChatContainerProps {
  roomId?: string;
  reciverId?:string
  type:ChatTypeEnum
  
}

export default function ChatBox({ type,  }: ChatContainerProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { socket, isConnected } = useSocket();


  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle incoming messages
  useEffect(() => {
    if (!socket) return;
  
    const handleNewMessage = (msg: Message) => {
      setMessages(prevMessages => [...prevMessages, msg]);
    };
    const handleMessages = (msgList: Message[]) => {
      setMessages(msgList);
    };

    socket.on('newMessage', handleNewMessage);
    socket.on('messages', handleMessages);
  
    return () => {
      socket.off('newMessage', handleNewMessage);
      socket.off('messages', handleMessages);
    };
  }, [socket]);
  
  return (
    <div className="flex flex-col h-full bg-[#0e1621] rounded-md overflow-hidden shadow-lg m-2">
      {/* Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto bg-[#0e1621]">
        <div className="space-y-3">
          {messages.map((message) => (
            <MessageLayout
              key={message.id}
              message={message}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Message Input */}
      <MessageInput type={type}/>
    </div>
  );
}