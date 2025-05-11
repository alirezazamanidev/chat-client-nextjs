'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { User } from '@/libs/models/user';
import Image from 'next/image';
import { formatImageUrl } from '@/libs/utils/functions';

import { useSocket } from '@/libs/hooks/useSocket';
import Link from 'next/link';

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { socket,isConnected } = useSocket();

  const filteredUsers = searchQuery
    ? users.filter(
        (user) =>
          user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.username.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : users;



  // Fetch users when socket is connected
  useEffect(() => {
    if (!socket || !isConnected) return;
    socket.emit('get-user-list', (usersdata:User[])=>{
      setUsers(usersdata);
      setLoading(false);
    });

    socket.on('online-status-user',(data:{userId:string,isOnline:boolean})=>{

      setUsers((prevUsers) => 
        prevUsers.map((user) =>
          user.id === data.userId
            ? { ...user, isOnline: data.isOnline }
            : user
        )
      );
    
    })


    return ()=>{
      socket.off('online-status-user');
    }
  }, [socket, isConnected,users]);

  return (
    <div className="flex flex-col h-full bg-[#17212b] rounded-md overflow-hidden shadow-lg m-2">
      {/* Header */}
      <div className="px-4 py-3 bg-[#17212b] border-b border-[#0e1621] flex items-center">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 flex items-center justify-center mr-3 rounded-full hover:bg-[#242f3d]"
        >
          <svg
            className="h-6 w-6 text-[#6ab2f2]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </button>
        <div>
          <h2 className="font-semibold text-white text-lg">New Chat</h2>
        </div>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-[#0e1621]">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search users..."
            className="w-full p-2 pl-8 rounded-lg bg-[#242f3d] text-sm focus:outline-none focus:ring-1 focus:ring-[#6ab2f2] text-gray-200 placeholder-gray-400"
          />
          <svg
            className="absolute left-2 top-2.5 h-4 w-4 text-gray-400"
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

      {/* Create Group Chat Option */}
      <div className="flex items-center p-3 hover:bg-[#242f3d] cursor-pointer border-b border-[#0e1621]">
        <div className="w-12 h-12 rounded-full bg-[#2b5278] flex-shrink-0 flex items-center justify-center mr-3">
          <svg
            className="h-6 w-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
        <div>
          <h3 className="font-medium text-white">Create New Group</h3>
        </div>
      </div>

      {/* Create Channel Option */}
      <div className="flex items-center p-3 hover:bg-[#242f3d] cursor-pointer border-b border-[#0e1621]">
        <div className="w-12 h-12 rounded-full bg-[#2b5278] flex-shrink-0 flex items-center justify-center mr-3">
          <svg
            className="h-6 w-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
            />
          </svg>
        </div>
        <div>
          <h3 className="font-medium text-white">Create Channel</h3>
        </div>
      </div>

      {/* Section Label */}
      <div className="p-2 bg-[#0e1621]">
        <p className="text-xs text-gray-400 px-3">Contacts</p>
      </div>

      {/* Users List */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="p-4 text-center text-gray-400">Loading users...</div>
        ) : error ? (
          <div className="p-4 text-center text-red-400">{error}</div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-4 text-center text-gray-400">No users found</div>
        ) : (
          <div className="divide-y divide-[#0e1621]">
            {filteredUsers.map((user: User) => (
              <Link
                href={`/pv/${user.id}`}
                key={user.id}
                className="flex items-center p-3 hover:bg-[#242f3d] cursor-pointer"
                
              >
                <div className="relative">
                  {user.avatar ? (
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 mr-1 border-2 border-[#4082bc] shadow-lg">
                      <Image
                        width={48}
                        height={48}
                        alt={user.username}
                        src={formatImageUrl(user.avatar)}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#4082bc] to-[#2b5278] flex-shrink-0 flex items-center justify-center text-white font-bold mr-3 shadow-lg">
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                  )}
                  {user.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#17212b] animate-pulse"></div>
                  )}
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-white">{user.fullName}</h3>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[#64b3f6]">
                      {user.username}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
