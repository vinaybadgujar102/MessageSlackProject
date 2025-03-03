import { ChevronDown, ChevronRight, PlusIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

export const WorkspacePanelSection = ({
  children,
  label,
  onIconClick,
}: {
  children: React.ReactNode;
  label: string;
  onIconClick?: () => void;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col mt-3 px-2">
      <div className="flex items-center px-3.5 group">
        <Button
          onClick={() => setOpen(!open)}
          variant="transparent"
          className="p-0.5 text-sm size-6 text-[#f9edffcc]"
        >
          {open ? (
            <ChevronDown className="size-4" />
          ) : (
            <ChevronRight className="size-4" />
          )}
        </Button>

        <Button
          variant="transparent"
          size="sm"
          className="text-sm px-1.5 text-[#f9edffcc] justify-start items-center"
        >
          <span>{label}</span>
        </Button>

        {onIconClick && (
          <Button
            variant="transparent"
            size="sm"
            className="transition ml-auto p-1.5 text-sm size-6 text-[#f9edffcc] hover:bg-slack-medium"
            onClick={onIconClick}
          >
            <PlusIcon className="size-4" />
          </Button>
        )}
      </div>

      {open && <div className="flex flex-col gap-y-2">{children}</div>}
    </div>
  );
};
