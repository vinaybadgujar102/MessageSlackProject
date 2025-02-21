import {
  BellIcon,
  HomeIcon,
  MessageSquareIcon,
  MoreHorizontalIcon,
} from "lucide-react";

import { UserButton } from "@/components/atoms/UserButton/UserButton";
import { SidebarButton } from "@/components/molecules/SidebarButton/SidebarButton";

export const WorkspaceSidebar = () => {
  return (
    <aside className="w-[70px] h-full bg-slack-dark flex flex-col fap-y-4 items-center pt-[10px] pb-[5px]">
      <SidebarButton Icon={HomeIcon} label="Home" />
      <SidebarButton Icon={MessageSquareIcon} label="DMs" />
      <SidebarButton Icon={BellIcon} label="Notifications" />
      <SidebarButton Icon={MoreHorizontalIcon} label="More" />

      <div className="flex flex-col items-center justify-center mt-auto mb-5 gap-y-1">
        <UserButton />
      </div>
    </aside>
  );
};
