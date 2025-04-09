
import Link from 'next/link';

export default function ChatHomePage() {
   

  return (
    <div className="flex flex-col items-center justify-center h-full bg-[#17212b] rounded-md overflow-hidden shadow-lg m-2">
      <div className="w-24 h-24 bg-[#4082bc] rounded-full flex items-center justify-center mb-6">
        <svg className="h-14 w-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </div>
      <h1 className="text-3xl font-bold text-white mb-2">Welcome to Telegram</h1>
      <p className="text-gray-300 text-center max-w-md">
        Fast, simple, and secure messaging for connecting with friends and colleagues
      </p>
      
      <div className="mt-8 flex flex-col space-y-4">
        <Link 
          href="/new-chat" 
          className="bg-[#4082bc] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#3a6999] transition-colors flex items-center"
        >
          <span className="mr-2">Start New Chat</span>
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </Link>
        
        <Link 
          href="/users" 
          className="bg-[#242f3d] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#2b3a4a] transition-colors flex items-center"
        >
          <span className="mr-2">View Users</span>
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </Link>
      </div>
    </div>
  );
} 