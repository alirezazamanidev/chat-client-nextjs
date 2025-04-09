'use client';

import { Message } from "@/libs/models/message";
import { motion } from "framer-motion";
import { formatDistanceToNow } from 'date-fns';

type MessageProps = {
  message: Message
};

export default function MessageLayout({ message }: MessageProps) {
  const isMyMessage = message.senderId === localStorage.getItem('userId');
  const formattedTime = message.created_at instanceof Date 
    ? formatDistanceToNow(message.created_at, { addSuffix: true })
    : formatDistanceToNow(new Date(message.created_at), { addSuffix: true });
  
  return (
    <motion.div 
      className={`flex ${isMyMessage ? 'justify-end' : 'justify-start'} mb-4`}
      initial={{ opacity: 0, x: isMyMessage ? 20 : -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* {!isMyMessage && (
        <div className="w-8 h-8 rounded-full bg-[#4082bc] flex-shrink-0 flex items-center justify-center text-white font-bold mr-2">
          {message.sender.id.charAt(0).toUpperCase()}
        </div>
      )} */}
      
      <motion.div 
        className={`max-w-[70%] rounded-lg px-4 py-2 ${
          isMyMessage 
            ? 'bg-[#2b5278] text-white' 
            : 'bg-[#182533] text-white'
        } shadow-md`}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        
        <p className="break-words">{message.text}</p>
        
        <div className={`text-xs mt-1 flex items-center ${isMyMessage ? 'justify-end text-gray-300' : 'justify-start text-gray-400'}`}>
          {formattedTime}
          
          {isMyMessage && (
            <span className="ml-1">
              <svg className="h-3 w-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </span>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
} 