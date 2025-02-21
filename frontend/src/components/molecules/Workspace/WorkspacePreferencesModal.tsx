import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useWorkspacePreferencesModal } from "@/hooks/context/useWorkspacePreferencesModal";

export const WorkspacePreferencesModal = () => {
  const { initialValue, openPreferences, setOpenPreferences } =
    useWorkspacePreferencesModal();

  const handleClose = () => {
    setOpenPreferences(false);
  };

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

          <Button variant="outline" className="w-full">
            <Trash2 className="size-4 mr-2" />
            <p className="text-sm font-semibold">Delete Workspace</p>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
