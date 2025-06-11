import { createContext, useState } from "react";

const ChannelMessages = createContext<{
  messageList: any;
  setMessageList: (messageList: any) => void;
}>({
  messageList: [],
  setMessageList: () => {},
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
