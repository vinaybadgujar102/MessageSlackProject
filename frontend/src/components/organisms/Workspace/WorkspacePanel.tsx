import { AlertTriangle, LucideLoader2 } from "lucide-react";
import { useParams } from "react-router-dom";

import { WorkspacePanelHeader } from "@/components/molecules/Workspace/WorkspacePanelHeader";
import { useGetWorkspaceById } from "@/hooks/apis/workspaces/useGetWorkspaceById";

export const WorkspacePanel = () => {
  const { workspaceId } = useParams();

  const { workspace, isFetching, isSuccess } = useGetWorkspaceById(workspaceId);

  if (isFetching) {
    return (
      <div className="flex flex-col gap-y-2 text-white items-center justify-center h-full">
        <LucideLoader2 className="size-4 animate-spin" />
      </div>
    );
  }

  if (!isSuccess) {
    return (
      <div className="flex flex-col gap-y-2 text-white items-center justify-center h-full">
        <AlertTriangle className="size-6 text-white" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-slack-medium">
      <WorkspacePanelHeader workspace={workspace} />
    </div>
  );
};
