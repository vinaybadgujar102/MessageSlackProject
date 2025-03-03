import { InfoIcon, LucideLoader2, SearchIcon } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useGetWorkspaceById } from "@/hooks/apis/workspaces/useGetWorkspaceById";
import { useCurrentWorkspace } from "@/hooks/context/useCurrentWorkspace";

export const WorkspaceNavbar = () => {
  const { workspaceId } = useParams();

  const { workspace, isFetching, error } = useGetWorkspaceById(workspaceId);

  const { setCurrentWorkspace } = useCurrentWorkspace();

  useEffect(() => {
    if (workspace) {
      setCurrentWorkspace(workspace);
    }
  }, [workspace, setCurrentWorkspace]);

  if (isFetching) {
    return <LucideLoader2 className="size-4 animate-spin" />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <nav className="flex items-center justify-center h-10 p-1.5 bg-slack-dark">
      <div className="flex-1" />
      <div className="flex items-center gap-x-2">
        <Button
          size="sm"
          className="bg-accent/25 hover:bg-accent/15 w-full justify-start h-7 px-2"
        >
          <SearchIcon className="size-4 text-white" />
          <span className="text-white text-sm">
            Search {workspace.name || "Workspace"}
          </span>
        </Button>
      </div>
      <div className="ml-auto flex-1 flex items-center justify-end">
        <Button size="icon" variant="transparent">
          <InfoIcon className="size-4 text-white" />
        </Button>
      </div>
    </nav>
  );
};
