import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';
import { getCookie } from '../helpers/cookie';

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const initializeSocket = async () => {
      const token = await getCookie('token');
      
      if (!socketRef.current) {
        socketRef.current = io(process.env.NEXT_PUBLIC_SOCKET_URL || '', {
          reconnectionAttempts: 5,
          reconnectionDelay: 3000,
          timeout: 10000,
          auth: token ? { token } : undefined,
          extraHeaders: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          autoConnect: false
        });
      }

      if (!socketRef.current.connected) {
        socketRef.current.connect();
      }
      
      const onConnect = () => {
        setIsConnected(true);
        console.log('Socket connected');
      };
      
      const onDisconnect = () => {
        setIsConnected(false);
        console.log('Socket disconnected');
      };
      
      const onError = (err: Error) => {
        setError(err);
        console.error('Socket error:', err);
      };
      
      socketRef.current.on('connect', onConnect);
      socketRef.current.on('disconnect', onDisconnect);
      socketRef.current.on('error', onError);
      
      // Check if already connected
      if (socketRef.current.connected) {
        setIsConnected(true);
      }
    };

    initializeSocket();
    
    return () => {
      // Remove all listeners on component unmount
      if (socketRef.current) {
        socketRef.current.off('connect');
        socketRef.current.off('disconnect');
        socketRef.current.off('error');
      }
    };
  }, []);

  return {
    socket: socketRef.current,
    isConnected,
    error,
  };
};
