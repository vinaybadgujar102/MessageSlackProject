import { Link, useParams } from "react-router-dom";
import VerificationInput from "react-verification-input";

import { Button } from "@/components/ui/button";
export const JoinPage = () => {
  const { workspaceId } = useParams();

  async function handleAddMemberToWorkspace(code: string) {
    console.log(code);
  }

  return (
    <div className="h-[100vh] flex flex-col gap-y-8 items-center justify-center bg-white rounded-lg">
      <div className="flex flex-col gap-y-4 items-center justify-center">
        <div className="flex flex-col gap-y-2 items-center justify-center">
          <h1 className="text-4xl font-bold">Join Workspace</h1>
          <p className="text-sm text-gray-500">
            Enter the join code to join the workspace
          </p>
        </div>
        <VerificationInput
          onComplete={handleAddMemberToWorkspace}
          length={6}
          classNames={{
            container: "flex gap-x-2",
            character:
              "w-10 h-10 rounded-md border border-gray-300 flex items-center justify-center text-lg font-medium text-gray-500",
            characterFilled: "bg-gray-500 text-white",
            characterInactive: "bg-muted",
            characterSelected: "bg-primary text-primary-foreground",
          }}
          autoFocus
        />
      </div>
      <div className="flex gap-x-4">
        <Button size="lg" variant="outline">
          <Link to={`/workspaces/${workspaceId}`}>Back to the workspace</Link>
        </Button>
      </div>
    </div>
  );
};
