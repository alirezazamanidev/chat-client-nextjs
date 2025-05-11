'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

import ChatContainer from '@/components/chat/ChatBox';
import { Chat, ChatTypeEnum } from '@/libs/models/chat';
import { Message } from '@/libs/models/message';
import { formatDateNow, formatImageUrl } from '@/libs/utils/functions';
import { useSocket } from '@/libs/hooks/useSocket';

export default function ChatPage() {
  const params = useParams();
  const { id } = params;
  const { socket, isConnected } = useSocket();
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  // هندلر دریافت چت و پیام‌ها
  const handleJoinRoom = useCallback((chat: Chat) => {
    setChat(chat);
    setLoading(false);
  }, []);

  // هندلر آنلاین شدن کاربر
  const handleUserOnline = useCallback((data: any) => {
    setChat((prevChat) =>
      prevChat && data.userId === prevChat.receiver?.id
        ? { ...prevChat, receiver: { ...prevChat.receiver, ...data } }
        : prevChat,
    );
  }, []);

  // هندلر دریافت پیام‌ها
  const handleMessages = useCallback((msgs: Message[]) => {
    setMessages(msgs);
  }, []);

  useEffect(() => {
    if (!socket) return;
    // joinRoom
    socket.emit('joinRoom', { reciverId: id }, handleJoinRoom);
    // رویدادها
    socket.on('userOnline', handleUserOnline);
    socket.on('messages', handleMessages);

    return () => {
      if (chat?.id) {
        socket.emit('leaveRoom', { roomId: chat.id });
      }
      socket.off('userOnline', handleUserOnline);
      socket.off('messages', handleMessages);
    };
    // وابستگی به chat?.id برای cleanup صحیح
  }, [id, socket, handleJoinRoom, handleUserOnline, handleMessages, chat?.id]);

  // Memorized avatar component to prevent re-renders
  const ChatAvatar = useMemo(() => {
    if (!chat) return null;

    return (
      <div className="relative">
        {chat.type === ChatTypeEnum.PV && chat.receiver?.avatar ? (
          <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 mr-3 border-2 border-[#4082bc] shadow-lg transform hover:scale-105 transition-transform duration-300">
            <Image
              width={48}
              height={48}
              alt={chat.receiver.username}
              src={formatImageUrl(chat.receiver.avatar)}
              className="object-cover w-full h-full"
            />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#4082bc] to-[#2b5278] flex-shrink-0 flex items-center justify-center text-white font-bold mr-3 shadow-lg transform hover:scale-105 transition-transform duration-300">
            {chat.receiver?.username?.charAt(0).toUpperCase()}
            {chat.receiver?.isOnline && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#17212b]"></div>
            )}
          </div>
        )}
      </div>
    );
  }, [chat]);

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
      <div className="px-4 py-3 bg-[#17212b] border-b border-[#0e1621] flex items-center sticky top-0 z-10 shadow-md">
        {ChatAvatar}

        <div className="overflow-hidden">
          <h2 className="font-semibold text-white truncate">
            {chat?.type === ChatTypeEnum.PV
              ? chat?.receiver?.fullName
              : chat?.name}
          </h2>
          <p
            className={`text-xs ${
              chat?.type === ChatTypeEnum.PV && chat?.receiver?.isOnline
                ? 'text-[#64b3f6]'
                : 'text-gray-400'
            } truncate`}
          >
            {chat?.type === ChatTypeEnum.PV &&
              (chat?.receiver?.isOnline
                ? 'Online'
                : formatDateNow(chat?.receiver?.lastSeen))}
          </p>
        </div>

        <div className="ml-auto flex space-x-2">
          <button className="p-2 rounded-full hover:bg-[#242f3d] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#6ab2f2] focus:ring-opacity-50">
            <svg
              className="h-5 w-5 text-[#6ab2f2]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          <button className="p-2 rounded-full hover:bg-[#242f3d] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#6ab2f2] focus:ring-opacity-50">
            <svg
              className="h-5 w-5 text-[#6ab2f2]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          </button>
          <button className="p-2 rounded-full hover:bg-[#242f3d] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#6ab2f2] focus:ring-opacity-50">
            <svg
              className="h-5 w-5 text-[#6ab2f2]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Chat Content */}
      <ChatContainer chatId={chat?.id || ''} initMessages={messages} />
    </div>
  );
}
