import { LogOutIcon, PencilIcon, SettingsIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/context/useAuth";
import { useCreateWorkspaceModal } from "@/hooks/context/useCreateWorkspaceModal";
import { useToast } from "@/hooks/use-toast";

export const UserButton = () => {
  const { auth, logOut } = useAuth();

  const { toast } = useToast();

  const navigate = useNavigate();

  const { setOpenCreateWorkspaceModal } = useCreateWorkspaceModal();

  function openWorkspaceCreateModal() {
    setOpenCreateWorkspaceModal(true);
  }

  const handleLogout = () => {
    logOut();
    toast({
      title: "Logged out",
      variant: "default",
    });
    navigate("/auth/signin");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none relative">
        <Avatar className="size-10 hover:opacity-75 transition">
          <AvatarImage src={auth?.user?.avatar} />
          <AvatarFallback>
            {auth?.user?.username[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={openWorkspaceCreateModal}>
          <PencilIcon className="size-4 mr-2 h-10" />
          Create Workspace
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SettingsIcon className="size-4 mr-2 h-10" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>
          <LogOutIcon className="size-4 mr-2 h-10" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
