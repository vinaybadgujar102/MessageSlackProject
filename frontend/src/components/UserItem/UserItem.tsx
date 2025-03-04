import { cva } from "class-variance-authority";
import { Link } from "react-router-dom";

import { useCurrentWorkspace } from "@/hooks/context/useCurrentWorkspace";
import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

const userItemVariants = cva(
  "flex items-center gap-1.5 justify-start font-normal h-7 mt-2 px-4 text-sm",
  {
    variants: {
      variant: {
        default: "text-[#f9edffcc]",
        active: "text-[#481350] bg-white/90 hover:bg-white/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const UserItem = ({
  id,
  label = "Member",
  image,
  variant = "default",
}: {
  id: string;
  label: string;
  image: string;
  variant: "default" | "active";
}) => {
  const { currentWorkspace } = useCurrentWorkspace();

  return (
    <Button
      className={cn(userItemVariants({ variant }))}
      variant="transparent"
      size="sm"
      asChild
    >
      <Link to={`/workspace/${currentWorkspace?._id}/members/${id}`}>
        <Avatar>
          <AvatarImage src={image} />
          <AvatarFallback>{label.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <span className="text-sm truncate">{label}</span>
      </Link>
    </Button>
  );
};
