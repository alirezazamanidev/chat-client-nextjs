'use client';
import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';


import ChatContainer from '@/components/chat/ChatBox';
import { Chat, ChatTypeEnum } from '@/libs/models/chat';
import { Message } from '@/libs/models/message';
import { useSocket } from '@/libs/hooks/useSocket';
import { User } from '@/libs/models/user';

import Header from '@/components/chat/Header';
import ChatBox from '@/components/chat/ChatBox';

export default function ChatPage() {
  const params = useParams();
  const userId = String(params?.id); // تضمین تبدیل به string
  const { socket, isConnected } = useSocket();

  
  useEffect(() => {
    if (!socket || !isConnected || !userId) return;

    socket.emit('joinRoom', { type: 'PV', reciverId: userId });
    return () => {
   
    };
  }, [socket, isConnected, userId]);

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center h-full bg-[#0e1621]">
  //       <div className="flex flex-col items-center">
  //         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6ab2f2]"></div>
  //         <p className="text-[#6ab2f2] mt-4">Loading chat...</p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="flex flex-col h-full bg-[#0e1621] rounded-md shadow-lg overflow-hidden">
      {/* Chat Header */}
      <Header />

      {/* Chat Box */}
      <ChatBox type={ChatTypeEnum.PV} />

      {/* Chat Content */}
    </div>
  );
}
