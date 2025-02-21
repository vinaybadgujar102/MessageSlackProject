import combineContext from "@/utils/combineContext";

import { AuthContextProvider } from "./authContext";
import { CreateWorkspaceContextProvider } from "./CreateWorkspaceContext";

export const AppContextProvider = combineContext(
  AuthContextProvider,
  CreateWorkspaceContextProvider
);
