import Image from 'next/image';

export default function ChatHomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-[#17212b] rounded-md overflow-hidden shadow-lg m-2">
      <div className="w-24 h-24 bg-[#4082bc] rounded-full flex items-center justify-center mb-6">
        <svg className="h-14 w-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </div>
      <h1 className="text-3xl font-bold text-white mb-2">Welcome to Telegram Chat</h1>
      <p className="text-gray-300 text-center max-w-md">
        Select a chat from the sidebar or start a new conversation
      </p>
      <button className="mt-8 bg-[#4082bc] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#3a6999] transition-colors">
        Start New Conversation
      </button>
    </div>
  );
} 