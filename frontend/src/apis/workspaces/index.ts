/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosConfig from "@/config/axiosConfig";

export const createWorkspaceRequest = async ({
  name,
  description,
  token,
}: {
  name: string;
  description: string;
  token: string;
}) => {
  try {
    const response = await axiosConfig.post(
      "/workspaces",
      {
        name,
        description,
      },
      {
        headers: {
          "x-access-token": token,
        },
      }
    );

    return response?.data;
  } catch (error: any) {
    console.log("Error in create workspace request", error);
    throw error.response.data;
  }
};

export const fetchWorkspacesRequest = async ({ token }: { token: string }) => {
  try {
    const response = await axiosConfig.get("/workspaces", {
      headers: {
        "x-access-token": token,
      },
    });

    return response?.data;
  } catch (error: any) {
    console.log("Error in fetch workspaces request", error);
    throw error.response.data;
  }
};
