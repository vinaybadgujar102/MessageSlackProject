import { DialogTrigger } from "@radix-ui/react-dialog";

import { Dialog, DialogContent } from "@/components/ui/dialog";

export const MessageImageThumbnail = ({ url }: { url: string }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="relative overflow-hidden cursor-zoom-in border rounded-lg max-w-[370px">
          <img src={url} className="rounded-md object-cover size-full" />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[850px] border-non bg-transparent p-0 shadow-none">
        <img src={url} className="rounded-md object-cover size-full" />
      </DialogContent>
    </Dialog>
  );
};
