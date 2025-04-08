'use client'
import ChatContainer from '@/components/chat/ChatContainer';
import { useSocket } from '@/libs/hooks/useSocket';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

// Define the type to match ChatContainer's expected props
type MessageData = {
  id: number;
  text: string;
  sender: 'me' | 'them';
  time: string;
  status: 'sent' | 'delivered' | 'read';
  isMedia?: boolean;
  mediaUrl?: string;
};

// Mock data for messages with proper type annotation
const mockMessages: MessageData[] = [
  { id: 1, text: 'Hello! How are you?', sender: 'them', time: '14:22', status: 'read' },
  { id: 2, text: 'Hi, I\'m good thanks. How about you?', sender: 'me', time: '14:23', status: 'read' },
  { id: 3, text: 'Doing well, thanks. What\'s new?', sender: 'them', time: '14:24', status: 'read' },
  { id: 4, text: 'Not much, just working on some projects. How about you?', sender: 'me', time: '14:25', status: 'read' },
  { id: 5, text: 'Same here. By the way, did you see the new app?', sender: 'them', time: '14:30', status: 'read' },
  { id: 6, text: 'Yes, it\'s really cool! You should try it too.', sender: 'me', time: '14:32', status: 'delivered' },
  { id: 7, text: 'Thanks for the suggestion, I\'ll check it out!', sender: 'them', time: '14:35', status: 'sent' },
  { 
    id: 8, 
    text: 'Here\'s a beautiful view I saw yesterday', 
    sender: 'me', 
    time: '14:40', 
    status: 'sent',
    isMedia: true,
    mediaUrl: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
  },
];

export default function ChatPage() {
  const params=useParams()
  const {id}=params;
  const {socket,isConnected}=useSocket();

  useEffect(()=>{
    if(socket && isConnected&&id){
      socket.emit('joinRoom',{chatId:id},(res:any)=>{
        console.log(res);
      })
    }
  },[socket,id,isConnected])

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="px-4 py-3 bg-[#17212b] border-b border-[#0e1621] flex items-center rounded-t-md mx-2 mt-2">
        <div className="w-10 h-10 rounded-full bg-[#4082bc] flex items-center justify-center text-white font-bold mr-3">
          {/* {id} */}
        </div>
        <div>
          {/* <h2 className="font-semibold text-white">User {id}</h2> */}
          <p className="text-xs text-[#64b3f6]">Online</p>
        </div>
        <div className="ml-auto flex space-x-3">
          <button className="p-2 rounded-full hover:bg-[#242f3d]">
            <svg className="h-5 w-5 text-[#6ab2f2]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button className="p-2 rounded-full hover:bg-[#242f3d]">
            <svg className="h-5 w-5 text-[#6ab2f2]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </button>
          <button className="p-2 rounded-full hover:bg-[#242f3d]">
            <svg className="h-5 w-5 text-[#6ab2f2]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Chat Content */}
      <ChatContainer chatId={'4fgkf'} initialMessages={mockMessages} />
    </div>
  );
} 