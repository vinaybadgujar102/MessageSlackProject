import { ChevronDownIcon, ListFilterIcon, SquarePen } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/context/useAuth";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const WorkspacePanelHeader = ({ workspace }: { workspace: any }) => {
  const workspaceMembers = workspace?.members;

  const { auth } = useAuth();

  const isLoggedInUserAdminOfWorkspace = workspaceMembers?.some(
    (member: any) =>
      member.memberId === auth?.user?._id && member.role === "admin"
  );

  return (
    <div className="flex items-center justify-between px-4 h-[40px] gap-0.5">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button
            variant="transparent"
            className="font-semibold text-lg w-auto p-1.5 overflow-hidden "
          >
            <span className="truncate">{workspace.name}</span>
            <ChevronDownIcon className="size-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent side="bottom" align="start" className="w-64">
          <DropdownMenuItem>
            <div className="size-9 relative overflow-hidden text-white font-semibold text-xl rounded-md flex items-center justify-center mr-2 bg-[#616061]">
              {workspace?.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col items-start">
              <p className="font-bold">{workspace?.name}</p>
              <p className="text-xs text-muted-foreground">Active Workspace</p>
            </div>
          </DropdownMenuItem>

          {isLoggedInUserAdminOfWorkspace && (
            <>
              <DropdownMenuItem className="cursor-pointer py-2">
                Preferences
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer py-2">
                Invite people to {workspace?.name}
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex items-center gap-0.5">
        <Button variant="transparent" size="icon">
          <ListFilterIcon className="size-4" />
        </Button>
        <Button variant="transparent" size="icon">
          <SquarePen className="size-4" />
        </Button>
      </div>
    </div>
  );
};
