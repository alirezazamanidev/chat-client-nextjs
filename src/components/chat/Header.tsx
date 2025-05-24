'use client'

import { useSocket } from "@/libs/hooks/useSocket";
import { User } from "@/libs/models/user";
import { formatImageUrl } from "@/libs/utils/functions";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

export default function Header(){
    const {socket}=useSocket()
    const [reciver,setreciver]=useState<User>()
    useEffect(()=>{
        if(!socket) return

        socket.on('roomInfo',(receiver:User)=>{
       
            setreciver(receiver)
        })
        
        return ()=>{
            socket.off('roomInfo')
        }
    },[socket])
  const ChatAvatar = useMemo(() => {
    return (
      <div className="relative">
        {reciver?.avatar ? (
          <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 mr-3 border-2 border-[#4082bc] shadow-lg">
            <Image
              width={48}
              height={48}
              alt={reciver.username}
              src={formatImageUrl(reciver.avatar)}
              className="object-cover w-full h-full"
            />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#4082bc] to-[#2b5278] flex items-center justify-center text-white font-bold mr-3 shadow-lg">
            {reciver?.username?.charAt(0).toUpperCase()}
            {reciver?.isOnline && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#17212b]"></div>
            )}
          </div>
        )}
      </div>
    );
  }, [reciver]);

    return (
        <div className="px-4 py-3 bg-[#17212b] border-b border-[#0e1621] flex items-center sticky top-0 z-10 shadow-md">
        {ChatAvatar}
        <div className="overflow-hidden">
          <h2 className="font-semibold text-white truncate">
            {reciver?.fullName}
          </h2>
          <p
            className={`text-sm ${
              reciver?.isOnline ? 'text-green-400' : 'text-gray-400'
            }`}
          >
            {reciver?.isOnline
              ? 'Online'
              : reciver?.lastSeen
              ? `Last seen: ${new Date(reciver.lastSeen).toLocaleString()}`
              : 'Offline'}
          </p>
        </div>

        <div className="ml-auto flex space-x-2">
          {/* Action buttons here */}
        </div>
      </div>
    )
}