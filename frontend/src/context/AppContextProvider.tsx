import combineContext from "@/utils/combineContext";

import { AuthContextProvider } from "./authContext";
import { CreateWorkspaceContextProvider } from "./CreateWorkspaceContext";
import { WorkspacePreferencesModalProvider } from "./WorkspacePreferencesModalContext";

export const AppContextProvider = combineContext(
  AuthContextProvider,
  CreateWorkspaceContextProvider,
  WorkspacePreferencesModalProvider
);
