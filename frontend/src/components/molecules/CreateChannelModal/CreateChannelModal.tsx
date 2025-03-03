import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAddChannelToWorkspace } from "@/hooks/apis/workspaces/useAddChannelToWorkspace";
import { useCreateChannelModal } from "@/hooks/context/useCreateChannelModal";
import { useCurrentWorkspace } from "@/hooks/context/useCurrentWorkspace";
import { useToast } from "@/hooks/use-toast";
export const CreateChannelModal = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { openCreateChannelModal, setOpenCreateChannelModal } =
    useCreateChannelModal();

  const [channelName, setChannelName] = useState<string>("");

  const { addChannelToWorkspace } = useAddChannelToWorkspace();

  const { currentWorkspace } = useCurrentWorkspace();

  function handleClose() {
    setOpenCreateChannelModal(false);
  }

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await addChannelToWorkspace({
      workspaceId: currentWorkspace?._id,
      channelName: channelName,
    });

    queryClient.invalidateQueries({
      queryKey: [`workspace-${currentWorkspace?._id}`],
    });

    toast({
      title: "Channel created",
      description: "Channel created successfully",
    });
  }

  return (
    <Dialog open={openCreateChannelModal} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Channel</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleFormSubmit}>
          <Input
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            placeholder="Channel Name"
            minLength={3}
            maxLength={20}
            required
          />
          <div className="flex justify-end mt-4">
            <Button type="submit">Create Channel</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
