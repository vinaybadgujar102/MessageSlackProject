/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState } from "react";

const ChannelMessages = createContext({
  messageList: [],
  setMessageList: (messageList: any) => {},
});

export const ChannelMessagesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [messageList, setMessageList] = useState([]);

  return (
    <ChannelMessages.Provider value={{ messageList, setMessageList }}>
      {children}
    </ChannelMessages.Provider>
  );
};

export default ChannelMessages;
