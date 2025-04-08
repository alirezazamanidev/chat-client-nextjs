'use client';

type MessageProps = {
  text: string;
  sender: 'me' | 'them';
  time: string;
  status?: 'sent' | 'delivered' | 'read';
  isMedia?: boolean;
  mediaUrl?: string;
};

export default function Message({ text, sender, time, status = 'sent', isMedia, mediaUrl }: MessageProps) {
  return (
    <div className={`flex ${sender === 'me' ? 'justify-end' : 'justify-start'} mb-4`}>
      {sender === 'them' && (
        <div className="w-8 h-8 rounded-full bg-[#4082bc] flex-shrink-0 flex items-center justify-center text-white font-bold mr-2">
          {sender === 'them' ? 'T' : 'M'}
        </div>
      )}
      
      <div 
        className={`max-w-[70%] rounded-lg px-4 py-2 ${
          sender === 'me' 
            ? 'bg-[#2b5278] text-white' 
            : 'bg-[#182533] text-white'
        }`}
      >
        {isMedia && mediaUrl && (
          <div className="mb-2 rounded overflow-hidden">
            <img src={mediaUrl} alt="Media" className="w-full h-auto" />
          </div>
        )}
        
        <p>{text}</p>
        
        <div className={`text-xs mt-1 flex items-center ${sender === 'me' ? 'justify-end text-gray-300' : 'justify-start text-gray-400'}`}>
          {time}
          
          {sender === 'me' && (
            <span className="ml-1">
              {status === 'sent' && (
                <svg className="h-3 w-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
              {status === 'delivered' && (
                <svg className="h-3 w-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7M5 13l4 4L19 7" />
                </svg>
              )}
              {status === 'read' && (
                <svg className="h-3 w-3 text-[#64b3f6]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7M5 13l4 4L19 7" />
                </svg>
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
} 