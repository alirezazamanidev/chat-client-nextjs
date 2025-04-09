'use client';
import ChatContainer from '@/components/chat/ChatContainer';

import { useState, useEffect } from 'react';
import { Chat } from '@/libs/models/chat';
import { useParams } from 'next/navigation';
import { Message } from '@/libs/models/message';
import Image from 'next/image';
import { formatImageUrl } from '@/libs/utils/functions';
import { useSocket } from '@/libs/hooks/useSocket';

export default function ChatPage() {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [chat, setChat] = useState<Chat>();
  const [messages, setMessages] = useState<Message[]>([]);
  const { id } = params;
  const { socket, isConnected } = useSocket();

  useEffect(() => {
    setLoading(true);

    // Join the chat room
    socket?.emit('joinRoom', { roomId: id }, (chatData: Chat) => {
      setChat(chatData);
      console.log(chatData);
      
      setLoading(false);
    });
   
    socket?.on('messages',(messagesData:Message[])=>{
 
      setMessages(messagesData);
    })
    // socket?.on('userStatusChange', (data: any) => {
    //   setChat((prevChat) => {
    //     if (!prevChat) return prevChat;

    //     if (prevChat.receiver.id === data.userId) {
    //       return {
    //         ...prevChat,
    //         receiver: {
    //           ...prevChat.receiver,
    //           isOnline: data.isOnline,
    //         },
    //       };
    //     }
    //     return prevChat;
    //   });
    // });
    // // Listen for message status updates
    // socket.on('messageStatusUpdate', ({ messageId, isRead }: { messageId: string, isRead: boolean }) => {
    //   setMessages(prev =>
    //     prev.map(msg =>
    //       msg.id === messageId ? { ...msg, isRead } : msg
    //     )
    //   );
    // });

    // Cleanup function
    return () => {
      socket?.off('messages');
      // socket.off('messageStatusUpdate');
      socket?.emit('leaveRoom', { roomId: id });
    };
  }, [socket, id, isConnected]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6ab2f2]"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      {/* <div className="px-4 py-3 bg-[#17212b] border-b border-[#0e1621] flex items-center rounded-t-md mx-2 mt-2">
        <div className="relative">
          {chat?.receiver.avatar ? (
            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 mr-3 border-2 border-[#4082bc] shadow-lg transform hover:scale-105 transition-transform duration-300">
              <Image
                width={48}
                height={48}
                alt={chat.receiver.username}
                src={formatImageUrl(chat.receiver.avatar)}
                className="object-cover w-full h-full"
              />
              {chat?.receiver?.isOnline && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#17212b]"></div>
              )}
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#4082bc] to-[#2b5278] flex-shrink-0 flex items-center justify-center text-white font-bold mr-3 shadow-lg transform hover:scale-105 transition-transform duration-300">
              {chat?.receiver?.username?.charAt(0).toUpperCase()}
              {chat?.receiver?.isOnline && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#17212b]"></div>
              )}
            </div>
          )}
        </div>
        <div>
          <h2 className="font-semibold text-white">
            {chat?.receiver?.fullName || 'User'}
          </h2>
          <p className="text-xs text-[#64b3f6]">
            {chat?.receiver?.isOnline ? 'Online' : 'Offline'}
          </p>
        </div>
        <div className="ml-auto flex space-x-3">
          <button className="p-2 rounded-full hover:bg-[#242f3d] transition-colors duration-200">
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
          <button className="p-2 rounded-full hover:bg-[#242f3d] transition-colors duration-200">
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
          <button className="p-2 rounded-full hover:bg-[#242f3d] transition-colors duration-200">
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
      </div> */}

      {/* Chat Content */}
      <ChatContainer chatId={chat?.id || ''} initMessages={messages} />
    </div>
  );
}
