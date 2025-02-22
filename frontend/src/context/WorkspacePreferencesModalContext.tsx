/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState } from "react";

const WorkspacePreferencesModalContext = createContext<{
  openPreferences: boolean;
  setOpenPreferences: (open: boolean) => void;
  initialValue: any;
  setInitialValue: (value: any) => void;
  workspace: any;
  setWorkspace: (workspace: any) => void;
}>({
  openPreferences: false,
  setOpenPreferences: () => {},
  initialValue: null,
  setInitialValue: () => {},
  workspace: null,
  setWorkspace: () => {},
});

export const WorkspacePreferencesModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [openPreferences, setOpenPreferences] = useState(false);
  const [initialValue, setInitialValue] = useState<any>(null);
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
