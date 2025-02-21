import { LucideLoader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetWorkspaceById } from "@/hooks/apis/workspaces/useGetWorkspaceById";

export const WorkspaceSwitcher = () => {
  const navigate = useNavigate();

  const { workspaceId } = useParams();

  const { workspace, isFetching } = useGetWorkspaceById(workspaceId);

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
    </DropdownMenu>
  );
};
