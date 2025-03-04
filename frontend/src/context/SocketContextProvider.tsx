/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState } from "react";
import { io } from "socket.io-client";

import { useChannelMessages } from "@/hooks/context/useChannelMessages";

const SocketContext = createContext({});

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
