import { DialogClose } from "@radix-ui/react-dialog";
import { useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useDeleteWorkspace } from "@/hooks/apis/workspaces/useDeleteWorkspace";
import { useUpdateWorkspace } from "@/hooks/apis/workspaces/useUpdateWorkspace";
import { useWorkspacePreferencesModal } from "@/hooks/context/useWorkspacePreferencesModal";
import { useToast } from "@/hooks/use-toast";
import { useConfirm } from "@/hooks/useConfirm";

export const WorkspacePreferencesModal = () => {
  const [workspaceId, setWorkspaceId] = useState("");
  const [editOpen, setEditOpen] = useState(false);

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { toast } = useToast();
  const { initialValue, openPreferences, setOpenPreferences, workspace } =
    useWorkspacePreferencesModal();

  const { deleteWorkspace, isPending } = useDeleteWorkspace(workspaceId);

  const { updateWorkspace, isPending: isUpdating } =
    useUpdateWorkspace(workspaceId);

  const [renameValue, setRenameValue] = useState(workspace?.name);

  const handleClose = () => {
    setOpenPreferences(false);
  };

  const { ConfirmationModal, confirmation } = useConfirm({
    title: "Confirmation",
    message: "Are you sure you want to delete this item?",
  });

  const {
    confirmation: updateConfirmation,
    ConfirmationModal: UpdateConfirmationModal,
  } = useConfirm({
    title: "Confirmation",
    message: "Are you sure you want to update this item?",
  });

  const handleDelete = async () => {
    try {
      const ok = await confirmation();
      if (!ok) return;

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
    setRenameValue(workspace.name);
  }, [workspace]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const ok = await updateConfirmation();
      if (!ok) return;

      await updateWorkspace(renameValue);
      queryClient.invalidateQueries({ queryKey: ["fetchWorkspaces"] });
      setOpenPreferences(false);
      toast({
        title: "Workspace updated successfully",
      });
    } catch (err) {
      console.log("error in updating workspace", err);
      toast({
        title: "Error updating workspace",
        description: "Please try again",
      });
    }
  };

  return (
    <>
      <ConfirmationModal />
      <UpdateConfirmationModal />
      <Dialog open={openPreferences} onOpenChange={handleClose}>
        <DialogContent className="p-0 bg-gray overflow-hidden">
          <DialogHeader className="p-4 border-b bg-white">
            <DialogTitle>{initialValue}</DialogTitle>
          </DialogHeader>

          <div className="px-4 pb-4 flex flex-col gap-y-2">
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
              <DialogTrigger>
                <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-100">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">Workspace Name</p>
                    <p className="text-sm font-semibold hover:underline">
                      Edit
                    </p>
                  </div>

                  <p className="text-sm">{initialValue}</p>
                </div>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Rename Workspace</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <Input
                    value={renameValue}
                    onChange={(e) => setRenameValue(e.target.value)}
                    required
                    autoFocus
                    disabled={isUpdating}
                    minLength={3}
                    maxLength={50}
                    placeholder="Workspace Name eg. Work, Personal, etc."
                  />
                </form>
                <DialogFooter>
                  <DialogClose>
                    <Button variant="outline" disabled={isUpdating}>
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button variant="outline" type="submit" disabled={isUpdating}>
                    Save
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
    </>
  );
};
