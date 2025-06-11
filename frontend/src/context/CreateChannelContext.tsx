import { createContext, useState } from "react";

const CreateChannelContext = createContext<{
  openCreateChannelModal: boolean;
  setOpenCreateChannelModal: (openCreateChannelModal: boolean) => void;
}>({
  openCreateChannelModal: false,
  setOpenCreateChannelModal: () => {},
});

export const CreateChannelContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [openCreateChannelModal, setOpenCreateChannelModal] = useState(false);

  return (
    <CreateChannelContext.Provider
      value={{ openCreateChannelModal, setOpenCreateChannelModal }}
    >
      {children}
    </CreateChannelContext.Provider>
  );
};

export default CreateChannelContext;
