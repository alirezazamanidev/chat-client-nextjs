'use client';

import { useSocket } from '@/libs/hooks/useSocket';
import { ChatTypeEnum } from '@/libs/models/chat';
import { useParams } from 'next/navigation';
import { useState } from 'react';


export default function MessageInput() {
  const {socket}=useSocket()
  const [message, setMessage] = useState('');
    const params = useParams();
    const id = String(params?.id);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim().length < 0) return;
    socket?.emit('sendMessage', { text: message, receiverId: id });
    setMessage('');
  };

  return (
    <div className="px-4 py-3 bg-[#17212b] border-t border-[#0e1621]">
      <form onSubmit={handleSubmit} className="flex items-center">
        <button 
          type="button" 
          className="p-2 rounded-full hover:bg-[#242f3d]"
          title="Add attachment"
        >
          <svg className="h-5 w-5 text-[#6ab2f2]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
          </svg>
        </button>
        
        <div className="relative flex-1 mx-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="w-full rounded-full py-2 px-4 bg-[#242f3d] focus:outline-none focus:ring-1 focus:ring-[#6ab2f2] text-gray-200 placeholder-gray-400"
          />
        </div>
        
        <button 
          type="button"
          className="p-2 rounded-full hover:bg-[#242f3d]"
          title="Record audio"
        >
          <svg className="h-5 w-5 text-[#6ab2f2]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        </button>
     
        <button 
          type="submit"
          className="ml-2 bg-[#2b5278] text-white p-2 rounded-full hover:bg-[#3a6999]"
          disabled={!message.trim()}
          title="Send message"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </form>
      
 
    </div>
  );
} 