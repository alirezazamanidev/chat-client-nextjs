'use client';

import { Message } from '@/libs/models/message';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { formatDateNow } from '@/libs/utils/functions';

type MessageProps = {
  message: Message;
};

export default function MessageLayout({ message }: MessageProps) {
  const isMyMessage = message.senderId === localStorage.getItem('userId');
  const [formattedTime, setFormattedTime] = useState<string>('');

  useEffect(() => {
    const createdAt = new Date(message.created_at);
    const isValidDate = !isNaN(createdAt.getTime());
    setFormattedTime(isValidDate ? formatDateNow(createdAt) : 'زمان نامشخص');
  }, [message.created_at]);

  return (
    <motion.div
      className={`flex ${isMyMessage ? 'justify-end' : 'justify-start'} mb-4`}
      initial={{ opacity: 0, x: isMyMessage ? 20 : -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className={`max-w-[70%] rounded-lg px-4 py-2 ${
          isMyMessage ? 'bg-[#2b5278] text-white' : 'bg-[#182533] text-white'
        } shadow-md`}
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        <p className="break-words">{message.text}</p>

        <div
          className={`text-xs mt-1 flex items-center ${
            isMyMessage
              ? 'justify-end text-gray-300'
              : 'justify-start text-gray-400'
          }`}
        >
          {formattedTime}

          {isMyMessage && (
            <span className="ml-1">
              {message.isRead ? (
                  <svg
                  className="h-3 w-3 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7M5 13l4 4L19 7"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 13l4 4L22 7"
                  />
                </svg>
              ):(
                <svg
                className="h-3 w-3 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg> 
              )}
            
            </span>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
