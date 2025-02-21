import { WorkspaceSidebar } from "@/components/organisms/Workspace/WorkspaceSidebar";

export const WorkspaceLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="h-[100vh]">
      <div className="flex h-full">
        <WorkspaceSidebar />
        {children}
      </div>
    </div>
  );
};
