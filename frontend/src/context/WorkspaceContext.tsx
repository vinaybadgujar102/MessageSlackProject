import { createContext, useState } from "react";

const WorkspaceContext = createContext<{
  currentWorkspace: any;
  setCurrentWorkspace: (currentWorkspace: any) => void;
}>({
  currentWorkspace: null,
  setCurrentWorkspace: () => {},
});

export const WorkspaceContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentWorkspace, setCurrentWorkspace] = useState(null);

  return (
    <WorkspaceContext.Provider
      value={{ currentWorkspace, setCurrentWorkspace }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};

export default WorkspaceContext;
