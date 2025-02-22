import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useFetchWorkspace } from "@/hooks/apis/workspaces/useFetchWorkspace";
import { useCreateWorkspaceModal } from "@/hooks/context/useCreateWorkspaceModal";

export const Home = () => {
  const { workspaces, isFetching } = useFetchWorkspace();
  const { setOpenCreateWorkspaceModal } = useCreateWorkspaceModal();
  const navigate = useNavigate();
  useEffect(() => {
    if (isFetching) {
      return;
    }
    if (workspaces.length === 0 || !workspaces) {
      console.log("No workspaces found");
      setOpenCreateWorkspaceModal(true);
      return;
    }

    navigate(`/workspace/${workspaces[0]._id}`);

    console.log("Workspaces", workspaces);
  }, [isFetching, workspaces, navigate, setOpenCreateWorkspaceModal]);

  return <div>Home</div>;
};
