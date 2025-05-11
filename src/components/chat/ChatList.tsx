'use client';

import { useSocket } from '@/libs/hooks/useSocket';
import { Chat, ChatTypeEnum } from '@/libs/models/chat';
import { formatDateNow, formatImageUrl } from '@/libs/utils/functions';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ChatList() {
  const [searchQuery, setSearchQuery] = useState('');
  const { socket, isConnected } = useSocket();
  const [chats, setChats] = useState<Chat[]>([]);

  const filteredChats = searchQuery
    ? chats.filter(
        (chat) =>
          chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          chat.lastMessage.text.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : chats;

  // دریافت چت‌ها از سرور از طریق WebSocket
  useEffect(() => {
    if (!socket) return;
    socket.on('chatList', (chats: Chat[]) => {
      console.log(chats);
      setChats(chats);
    });
  }, [socket]);

  return (
    <>
      {/* جستجو */}
      <div className="p-4 border-b border-[#0e1621]">
        <h1 className="text-xl font-bold text-white">Chats</h1>
        <div className="mt-3 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="w-full p-2 pr-8 rounded-lg bg-[#242f3d] text-sm focus:outline-none focus:ring-1 focus:ring-[#6ab2f2] text-gray-200 placeholder-gray-400"
          />
          <svg
            className="absolute right-2 top-2.5 h-4 w-4 text-gray-400"
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
        </div>
      </div>

      {/* لیست چت‌ها */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.length === 0 ? (
          <div className="p-4 text-center text-gray-400">No conversations found</div>
        ) : (
          filteredChats.map((chat) => {
            const isPv = chat.type === ChatTypeEnum.PV;
            const chatLink = isPv ? `/pv/${chat.reciveer.id}` : `/group/${chat.id}`;
            const displayName = isPv ? chat.reciveer.fullName : chat.name;
            const avatarText = isPv
              ? chat.reciveer.fullName.charAt(0).toUpperCase()
              : chat.name.charAt(0).toUpperCase();

            return (
              <Link href={chatLink} key={chat.id}>
                <div className="flex items-center p-3 border-b border-[#0e1621] hover:bg-[#242f3d] cursor-pointer">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-[#4082bc] flex-shrink-0 flex items-center justify-center text-white font-bold">
                      {isPv ? (
                        // استفاده از تصویر پروفایل در حالت PV
                        chat.reciveer.avatar ? (
                          <Image
                          width={100}
                          height={100}
                            src={formatImageUrl(chat.reciveer.avatar)}
                            alt="User Avatar"
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          avatarText
                        )
                      ) : (
                        avatarText
                      )}
                    </div>
                    {isPv && chat.reciveer.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#17212b]"></div>
                    )}
                  </div>
                  <div className="ml-3 flex-1 overflow-hidden">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium text-white truncate">{displayName}</h3>
                      <span className="text-xs text-gray-400">{formatDateNow(chat?.lastMessage?.created_at)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-400 truncate">{chat?.lastMessage?.text}</p>
                      {chat.unreadCount > 0 && (
                        <span className="bg-[#64b3f6] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {chat.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </>
  );
}
