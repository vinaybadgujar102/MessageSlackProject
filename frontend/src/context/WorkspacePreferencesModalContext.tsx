/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState } from "react";

const WorkspacePreferencesModalContext = createContext<{
  openPreferences: boolean;
  setOpenPreferences: (open: boolean) => void;
  initialValue: any;
  setInitialValue: (value: any) => void;
}>({
  openPreferences: false,
  setOpenPreferences: () => {},
  initialValue: null,
  setInitialValue: () => {},
});

export const WorkspacePreferencesModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [openPreferences, setOpenPreferences] = useState(false);
  const [initialValue, setInitialValue] = useState<any>(null);

  return (
    <WorkspacePreferencesModalContext.Provider
      value={{
        openPreferences,
        setOpenPreferences,
        initialValue,
        setInitialValue,
      }}
    >
      {children}
    </WorkspacePreferencesModalContext.Provider>
  );
};

export default WorkspacePreferencesModalContext;
