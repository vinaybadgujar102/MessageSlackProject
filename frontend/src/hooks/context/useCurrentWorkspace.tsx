import { useContext } from "react";

import WorkspaceContext from "../apis/workspaces/WorkspaceContext";

export const useCurrentWorkspace = () => {
  return useContext(WorkspaceContext);
};
