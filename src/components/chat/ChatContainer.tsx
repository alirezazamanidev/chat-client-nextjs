'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import MessageLayout from './Message';
import MessageInput from './MessageInput';
import { Message } from '@/libs/models/message';
import { useSocket } from '@/libs/hooks/useSocket';
interface ChatContainerProps {
  chatId: string;
  initMessages: Message[];
}

export default function ChatContainer({ chatId, initMessages }: ChatContainerProps) {
  const [messages, setMessages] = useState<Message[]>(initMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { socket, isConnected } = useSocket();

  // Function to handle sending a new message
  const handleSendMessage = useCallback((text: string) => {
    if (!socket || !isConnected) return;
    if (text.trim().length === 0 || !chatId) return;
    
    socket.emit('sendMessage', { roomId: chatId, text });
  }, [socket, isConnected, chatId]);
 
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle incoming messages
  useEffect(() => {
    if (!socket || !isConnected) return;
    
    const handleNewMessage = (msg: Message) => {
      
      setMessages(prevMessages => [...prevMessages, msg]);
    };
    
    socket.on('newMessage', handleNewMessage);

    return () => {
      socket.off('newMessage', handleNewMessage);
    };
  }, [socket, isConnected]);
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
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
}