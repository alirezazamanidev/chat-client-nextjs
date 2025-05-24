'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams } from 'next/navigation';

import { Chat, ChatTypeEnum } from '@/libs/models/chat';
import { Message } from '@/libs/models/message';
import { formatDateNow, formatImageUrl } from '@/libs/utils/functions';
import { useSocket } from '@/libs/hooks/useSocket';
import Header from '@/components/chat/Header';
import MessageBox from '@/components/chat/messageBox';
import MessageInput from '@/components/chat/MessageInput';

export default function ChatPage() {
  const params = useParams();
  const { id } = params;
  const { socket, isConnected } = useSocket();
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);



  // // هندلر آنلاین شدن کاربر
  // const handleUserOnline = useCallback((data: any) => {
  //   setChat((prevChat) =>
  //     prevChat && data.userId === prevChat.receiver?.id
  //       ? { ...prevChat, receiver: { ...prevChat.receiver, ...data } }
  //       : prevChat,
  //   );
  // }, []);

 

  useEffect(() => {
    if (!socket) return;
    // joinRoom
    socket.emit('joinRoom', { receiverId: id });
    // رویدادها
    // socket.on('userOnline', handleUserOnline);
    setLoading(false)
    return () => {
    }
  }, [id, socket]);


  // Loading state with animation
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full bg-[#0e1621]">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6ab2f2]"></div>
          <p className="text-[#6ab2f2] mt-4">Loading chat...</p>
        </div>
      </div>
    );
  }

  // // Error state
  // if (error) {
  //   return (
  //     <div className="flex items-center justify-center h-full bg-[#0e1621]">
  //       <div className="bg-[#17212b] p-6 rounded-lg shadow-lg max-w-md w-full">
  //         <h2 className="text-red-500 text-xl font-bold mb-2">Error</h2>
  //         <p className="text-white mb-4">{error}</p>
  //         <button
  //           onClick={() => window.location.reload()}
  //           className="bg-[#4082bc] hover:bg-[#5294d2] text-white py-2 px-4 rounded transition-colors duration-300"
  //         >
  //           Try Again
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

  // // No chat data
  // if (!chat) {
  //   return (
  //     <div className="flex items-center justify-center h-full bg-[#0e1621]">
  //       <div className="bg-[#17212b] p-6 rounded-lg shadow-lg max-w-md text-center">
  //         <svg className="w-16 h-16 text-[#6ab2f2] mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  //         </svg>
  //         <h2 className="text-white text-xl font-bold">Chat Not Found</h2>
  //         <p className="text-gray-400 mt-2">The chat you're looking for doesn't exist or isn't available.</p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="flex flex-col h-full bg-[#0e1621] rounded-md shadow-lg overflow-hidden">
      {/* Chat Header */}
     <Header/>
      {/* Chat Content */}
       <div className="flex flex-col h-full bg-[#0e1621] rounded-md overflow-hidden shadow-lg m-2">
      {/* Messages Area */}
      <MessageBox/>
      {/* Message Input */}
      <MessageInput />
    </div>
    </div>
  );
}
