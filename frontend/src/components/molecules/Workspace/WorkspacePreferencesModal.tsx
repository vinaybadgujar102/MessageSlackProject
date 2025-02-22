import { useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteWorkspace } from "@/hooks/apis/workspaces/useDeleteWorkspace";
import { useWorkspacePreferencesModal } from "@/hooks/context/useWorkspacePreferencesModal";
import { useToast } from "@/hooks/use-toast";

export const WorkspacePreferencesModal = () => {
  const [workspaceId, setWorkspaceId] = useState("");

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { toast } = useToast();
  const { initialValue, openPreferences, setOpenPreferences, workspace } =
    useWorkspacePreferencesModal();

  const { deleteWorkspace, isPending } = useDeleteWorkspace(workspaceId);

  const handleClose = () => {
    setOpenPreferences(false);
  };

  const handleDelete = async () => {
    try {
      await deleteWorkspace();
      navigate("/home");
      queryClient.invalidateQueries({ queryKey: ["fetchWorkspaces"] });
      setOpenPreferences(false);
      toast({
        title: "Workspace deleted successfully",
      });
    } catch (error) {
      console.log("error in deleting workspace", error);
      toast({
        title: "Error deleting workspace",
        description: "Please try again",
      });
    }
  };

  useEffect(() => {
    setWorkspaceId(workspace._id);
  }, [workspace]);

  return (
    <Dialog open={openPreferences} onOpenChange={handleClose}>
      <DialogContent className="p-0 bg-gray overflow-hidden">
        <DialogHeader className="p-4 border-b bg-white">
          <DialogTitle>{initialValue}</DialogTitle>
        </DialogHeader>

        <div className="px-4 pb-4 flex flex-col gap-y-2">
          <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-100">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">Workspace Name</p>
              <p className="text-sm font-semibold hover:underline">Edit</p>
            </div>

            <p className="text-sm">{initialValue}</p>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={handleDelete}
            disabled={isPending}
          >
            <Trash2 className="size-4 mr-2" />
            <p className="text-sm font-semibold">Delete Workspace</p>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
