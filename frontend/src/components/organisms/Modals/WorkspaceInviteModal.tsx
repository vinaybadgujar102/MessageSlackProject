/* eslint-disable @typescript-eslint/no-explicit-any */
import { Copy, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useResetJoinCode } from "@/hooks/apis/workspaces/userResetJoinCode";
import { useToast } from "@/hooks/use-toast";
export const WorkspaceInviteModal = ({
  workspaceName,
  joinCode,
  openInviteModal,
  setOpenInviteModal,
  workspaceId,
}: {
  workspaceName: string;
  joinCode: string;
  openInviteModal: boolean;
  setOpenInviteModal: (open: boolean) => void;
  workspaceId: string;
}) => {
  const { toast } = useToast();

  const { resetJoinCodeMutation } = useResetJoinCode(workspaceId);

  const handleCopy = async () => {
    const inviteLink = `${window.location.origin}/join/${joinCode}`;
    await navigator.clipboard.writeText(inviteLink);
    toast({
      title: "Copied to clipboard",
    });
  };

  const handleResetCode = async () => {
    try {
      await resetJoinCodeMutation();
      toast({
        title: "Join code reset successfully",
      });
    } catch (err: any) {
      toast({
        title: "Error in resetting join code",
        description: err.message,
      });
    }
  };
  return (
    <Dialog open={openInviteModal} onOpenChange={setOpenInviteModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite people to {workspaceName}</DialogTitle>
          <DialogDescription>
            Use the code shown below to invite people to {workspaceName}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center py-10 gap-y-4">
          <p className="font-bold text-4xl uppercase">{joinCode}</p>
          <Button size="sm" variant="ghost" onClick={handleCopy}>
            Copy Link <Copy className="size-4 ml-2" />
          </Button>
        </div>

        <div className="flex items-center justify-center w-full">
          <Button variant="outline" onClick={handleResetCode}>
            Reset Join Code <RefreshCw className="size-4 ml-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
