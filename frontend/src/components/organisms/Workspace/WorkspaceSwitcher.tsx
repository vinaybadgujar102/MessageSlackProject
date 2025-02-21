/* eslint-disable @typescript-eslint/no-explicit-any */
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { LucideLoader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useFetchWorkspace } from "@/hooks/apis/workspaces/useFetchWorkspace";
import { useGetWorkspaceById } from "@/hooks/apis/workspaces/useGetWorkspaceById";

export const WorkspaceSwitcher = () => {
  const navigate = useNavigate();

  const { workspaceId } = useParams();

  const { workspace, isFetching } = useGetWorkspaceById(workspaceId);

  const { workspaces, isFetching: isFetchingWorkspaces } = useFetchWorkspace();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button className="size-9 relative overflow-hidden bg-[#ababad] hover:bg-[#ababad]/80 font-semibold text-slate-700">
          {isFetching ? (
            <LucideLoader2 className="size-4 animate-spin" />
          ) : (
            <span className="text-sm">{workspace?.name.toUpperCase()}</span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="cursor-pointer flex-col justify-start items-start">
          {workspace?.name.toUpperCase()}
          <span className="text-xs text-muted-foreground">
            (Active Workspace)
          </span>
        </DropdownMenuItem>
        {isFetchingWorkspaces ? (
          <div className="flex items-center justify-center">
            <LucideLoader2 className="size-4 animate-spin" />
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {workspaces?.map((workspace: any) => {
              if (workspace._id === workspaceId) {
                return null;
              }
              return (
                <DropdownMenuItem
                  key={workspace.id}
                  className="cursor-pointer flex-col justify-start items-start"
                  onClick={() => {
                    navigate(`/workspaces/${workspace.id}`);
                  }}
                >
                  <p className="truncate">{workspace.name.toUpperCase()}</p>
                </DropdownMenuItem>
              );
            })}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
