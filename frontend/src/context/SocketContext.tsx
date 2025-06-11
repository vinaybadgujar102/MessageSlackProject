import { createContext, useState } from "react";
import { io, Socket } from "socket.io-client";

import { useChannelMessages } from "@/hooks/context/useChannelMessages";

const SocketContext = createContext<{
  socket: Socket | null;
  joinChannel: (channelId: string) => void;
  currentChannel: any;
}>({
  socket: null as any,
  joinChannel: () => {},
  currentChannel: null,
});

export const SocketContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentChannel, setCurrentChannel] = useState(null);
  const { messageList, setMessageList } = useChannelMessages();

  const socket = io(import.meta.env.VITE_BACKEND_SOCKET_URL);

  socket.on("NewMessageReceived", (data) => {
    console.log("New message received", data);
    setMessageList([...messageList, data]);
  });

  async function joinChannel(channelId: string) {
    socket.emit("JoinChannel", { channelId }, (data: any) => {
      console.log("Successfully joined the channel", data);
      setCurrentChannel(data?.data);
    });
  }

  return (
    <SocketContext.Provider value={{ socket, joinChannel, currentChannel }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
