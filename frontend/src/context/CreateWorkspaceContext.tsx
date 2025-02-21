import { createContext, useState } from "react";

interface CreateWorkspaceContextType {
  openCreateWorkspaceModal: boolean;
  setOpenCreateWorkspaceModal: (open: boolean) => void;
}

const CreateWorkspaceContext = createContext<CreateWorkspaceContextType>({
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
