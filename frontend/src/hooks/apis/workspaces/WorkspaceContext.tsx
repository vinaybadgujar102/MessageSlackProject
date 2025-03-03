/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState } from "react";

const WorkspaceContext = createContext<{
  currentWorkspace: any;
  setCurrentWorkspace: (workspace: any) => void;
}>({
  currentWorkspace: null,
  setCurrentWorkspace: () => {},
});

export const WorkspaceProvider = ({
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
