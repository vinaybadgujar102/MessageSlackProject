/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useCreateWorkspace } from "@/hooks/apis/workspaces/useCreateWorkspace";
import { useCreateWorkspaceModal } from "@/hooks/context/useCreateWorkspaceModal";

export const CreateWorkspaceModal = () => {
  const navigate = useNavigate();
  const { openCreateWorkspaceModal, setOpenCreateWorkspaceModal } =
    useCreateWorkspaceModal();

  const { isPending, isSuccess, createWorkspaceMutation } =
    useCreateWorkspace();

  console.log(isSuccess);

  const [workspaceName, setWorkspaceName] = useState("");

  function handleClose() {
    setOpenCreateWorkspaceModal(false);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const data = await createWorkspaceMutation({
        name: workspaceName,
        description: "",
      });
      // @ts-expect-error
      navigate(`/workspace/${data._id}`);
    } catch (error) {
      console.error("Not able to create a new workspace", error);
    } finally {
      setWorkspaceName("");
      setOpenCreateWorkspaceModal(false);
    }
  }

  return (
    <Dialog open={openCreateWorkspaceModal} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Workspace</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <Input
            required
            disabled={isPending}
            minLength={3}
            placeholder="Put your workspace name here (e.g. 'My Workspace')"
            value={workspaceName}
            onChange={(e) => setWorkspaceName(e.target.value)}
          />

          <div className="flex justify-end mt-5">
            <Button type="submit" disabled={isPending}>
              Create Workspace
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
