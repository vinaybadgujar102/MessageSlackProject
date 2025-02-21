import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useFetchWorkspace } from "@/hooks/apis/workspaces/useFetchWorkspace";

export const Home = () => {
  const { workspaces, isFetching } = useFetchWorkspace();
  const navigate = useNavigate();
  useEffect(() => {
    if (isFetching) {
      return;
    }
    if (workspaces.length === 0 || !workspaces) {
      console.log("No workspaces found");
      return;
    }

    navigate(`/workspace/${workspaces[0].id}`);

    console.log("Workspaces", workspaces);
  }, [isFetching, workspaces, navigate]);

  return <div>Home</div>;
};
