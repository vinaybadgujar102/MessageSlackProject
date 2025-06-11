import { createContext, useState } from "react";

const CreateWorkspaceContext = createContext<{
  openCreateWorkspaceModal: boolean;
  setOpenCreateWorkspaceModal: (openCreateWorkspaceModal: boolean) => void;
}>({
  openCreateWorkspaceModal: false,
  setOpenCreateWorkspaceModal: () => {},
});

export const CreateWorkspaceContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [openCreateWorkspaceModal, setOpenCreateWorkspaceModal] =
    useState(false);

  return (
    <CreateWorkspaceContext.Provider
      value={{ openCreateWorkspaceModal, setOpenCreateWorkspaceModal }}
    >
      {children}
    </CreateWorkspaceContext.Provider>
  );
};

export default CreateWorkspaceContext;
