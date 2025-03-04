/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AlertTriangle,
  LucideLoader2,
  MessageSquareTextIcon,
  SendHorizonalIcon,
} from "lucide-react";
import { useParams } from "react-router-dom";

import { SideBarItem } from "@/components/atoms/SideBarItem/SideBarItem";
import { WorkspacePanelHeader } from "@/components/molecules/Workspace/WorkspacePanelHeader";
import { WorkspacePanelSection } from "@/components/molecules/Workspace/WorkspacePanelSection";
import { UserItem } from "@/components/UserItem/UserItem";
import { useGetWorkspaceById } from "@/hooks/apis/workspaces/useGetWorkspaceById";
import { useCreateChannelModal } from "@/hooks/context/useCreateChannelModal";

export const WorkspacePanel = () => {
  const { workspaceId } = useParams();

  const { setOpenCreateChannelModal } = useCreateChannelModal();

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
      <div className="flex flex-col pt-2 px-2">
        <SideBarItem
          label="Threads"
          icon={MessageSquareTextIcon}
          variant="active"
          id="threads"
        />
        <SideBarItem
          label="Drafts and Sends"
          icon={SendHorizonalIcon}
          variant="default"
          id="drafts"
        />
      </div>

      <WorkspacePanelSection
        label="Channels"
        onIconClick={() => setOpenCreateChannelModal(true)}
      >
        {workspace?.channels?.map((channel: any) => {
          return (
            <SideBarItem
              key={channel.id}
              label={channel.name}
              icon={MessageSquareTextIcon}
              variant={channel.id === workspaceId ? "active" : "default"}
              id={channel._id}
            />
          );
        })}
      </WorkspacePanelSection>

      <WorkspacePanelSection label="Members">
        {workspace?.members?.map((member: any) => {
          return (
            <UserItem
              key={member.id}
              id={member.id}
              label={member.name}
              image={member.avatar}
              variant="default"
            />
          );
        })}
      </WorkspacePanelSection>
    </div>
  );
};
