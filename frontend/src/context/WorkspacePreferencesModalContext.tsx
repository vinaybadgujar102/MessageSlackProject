import { createContext, useState } from "react";

const WorkspacePreferencesModalContext = createContext<{
  openPreferences: boolean;
  setOpenPreferences: (openPreferences: boolean) => void;
  initialValue: string;
  setInitialValue: (initialValue: string) => void;
  workspace: any;
  setWorkspace: (workspace: any) => void;
}>({
  openPreferences: false,
  setOpenPreferences: () => {},
  initialValue: "",
  setInitialValue: () => {},
  workspace: null,
  setWorkspace: () => {},
});
export const WorkspacePreferencesModalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [openPreferences, setOpenPreferences] = useState(false);
  const [initialValue, setInitialValue] = useState("Edit Workspace");
  const [workspace, setWorkspace] = useState(null);

  return (
    <WorkspacePreferencesModalContext.Provider
      value={{
        openPreferences,
        setOpenPreferences,
        initialValue,
        setInitialValue,
        workspace,
        setWorkspace,
      }}
    >
      {children}
    </WorkspacePreferencesModalContext.Provider>
  );
};

export default WorkspacePreferencesModalContext;
