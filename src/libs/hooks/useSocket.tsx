'use client'
import { createContext, useContext, useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';
import { getCookie } from '../helpers/cookie';

// Singleton سوکت
let socketInstance: Socket | null = null;

const initializeSocket = async (): Promise<Socket> => {
  if (!socketInstance || socketInstance.disconnected) {
    const token = await getCookie('token');
    socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 10000,
      extraHeaders: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
  }
  return socketInstance;
};

// تایپ برای Context
interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextType | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    let mounted = true;

    const setupSocket = async () => {
      const sock = await initializeSocket(); // صبر می‌کنیم تا سوکت آماده بشه
      if (!mounted) return;

      setSocket(sock);

      const handleConnect = () => {
        console.log('socket connected');
        
        if (mounted) setIsConnected(true);
      };
      const handleDisconnect = () => {
        console.log('socket disConnected');

        if (mounted) setIsConnected(false);
      };

      sock.on('connect', handleConnect);
      sock.on('disconnect', handleDisconnect);

      if (sock.connected) {
        setIsConnected(true);
      }

      return () => {
        sock.off('connect', handleConnect);
        sock.off('disconnect', handleDisconnect);
      };
    };

    setupSocket().catch((err) => {
      console.error('Failed to initialize socket:', err);
    });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket باید داخل SocketProvider استفاده شود');
  }
  return context;
};