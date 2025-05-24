'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import MessageLayout from './Message';
import MessageInput from './MessageInput';
import { Message } from '@/libs/models/message';
import { useSocket } from '@/libs/hooks/useSocket';
import { ChatTypeEnum } from '@/libs/models/chat';

export default function MessageBox() {
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

    const handleMessages = (msgList: Message[]) => {
      setMessages(msgList);
    };

    socket.on('ٔnewMessage', (msg: Message) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });
    socket.on('messages', handleMessages);

    return () => {
      socket.off('newMessage');
      socket.off('messages');
    };
  }, [socket]);

  return (
    <div className="flex-1 p-4 overflow-y-auto bg-[#0e1621]">
      <div className="space-y-3">
        {messages.map((message,index) => (
          <MessageLayout key={index} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
