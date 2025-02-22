import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogContent } from "@/components/ui/dialog";

export const useConfirm = ({
  title,
  message,
}: {
  title: string;
  message: string;
}) => {
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  async function confirmation() {
    return new Promise<boolean>((resolve) => {
      setPromise({ resolve });
    });
  }

  const handleClose = () => {
    setPromise(null);
  };

  const handleConfirm = () => {
    if (!promise) return;

    promise.resolve(true);
    setPromise(null);
  };

  const ConfirmationModal = () => {
    return (
      <Dialog open={promise !== null} onOpenChange={handleClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{message}</DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleConfirm}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  return { confirmation, ConfirmationModal };
};
