import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useCreateChannelModal } from "@/hooks/context/useCreateChannelModal";

export const CreateChannelModal = () => {
  const { openCreateChannelModal, setOpenCreateChannelModal } =
    useCreateChannelModal();

  const [channelName, setChannelName] = useState<string>("");

  function handleClose() {
    setOpenCreateChannelModal(false);
  }

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(channelName);
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
