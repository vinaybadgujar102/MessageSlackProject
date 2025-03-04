import { WorkspaceProvider } from "@/hooks/apis/workspaces/WorkspaceContext";
import combineContext from "@/utils/combineContext";

import { AuthContextProvider } from "./authContext";
import { CreateChannelContextProvider } from "./CreateChannelContext";
import { CreateWorkspaceContextProvider } from "./CreateWorkspaceContext";
import { SocketContextProvider } from "./SocketContextProvider";
import { WorkspacePreferencesModalProvider } from "./WorkspacePreferencesModalContext";

export const AppContextProvider = combineContext(
  SocketContextProvider,
  AuthContextProvider,
  WorkspaceProvider,
  CreateWorkspaceContextProvider,
  WorkspacePreferencesModalProvider,
  CreateChannelContextProvider
);
