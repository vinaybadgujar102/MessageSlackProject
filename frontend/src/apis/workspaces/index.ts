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

    return response?.data?.data;
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

    return response?.data?.data;
  } catch (error: any) {
    console.log("Error in fetch workspaces request", error);
    throw error.response.data;
  }
};

export const fetchWorkspaceDetailsRequest = async ({
  workspaceId,
  token,
}: {
  workspaceId: string;
  token: string;
}) => {
  try {
    const response = await axiosConfig.get(`/workspaces/${workspaceId}`, {
      headers: {
        "x-access-token": token,
      },
    });

    return response?.data?.data;
  } catch (error: any) {
    console.log("Error in fetch workspace details request", error);
    throw error.response.data;
  }
};

export const deleteWorkspaceRequest = async ({
  workspaceId,
  token,
}: {
  workspaceId: string;
  token: string;
}) => {
  try {
    const response = await axiosConfig.delete(`/workspaces/${workspaceId}`, {
      headers: {
        "x-access-token": token,
      },
    });

    return response?.data?.data;
  } catch (error: any) {
    console.log("error in delete workspace request", error);
    throw error.response.data;
  }
};

export const updateWorkspaceRequest = async ({
  workspaceId,
  name,
  token,
}: {
  workspaceId: string;
  name: string;
  token: string;
}) => {
  try {
    const response = await axiosConfig.put(
      `/workspaces/${workspaceId}`,
      {
        name,
      },
      {
        headers: {
          "x-access-token": token,
        },
      }
    );

    return response?.data?.data;
  } catch (error: any) {
    console.log("error in update workspace request", error);
    throw error.response.data;
  }
};

export const addChannelToWorkspaceRequest = async ({
  workspaceId,
  channelName,
  token,
}: {
  workspaceId: string;
  channelName: string;
  token: string;
}) => {
  try {
    const response = await axiosConfig.post(
      `/workspaces/${workspaceId}/channels`,
      {
        channelName,
      },
      {
        headers: {
          "x-access-token": token,
        },
      }
    );

    return response?.data?.data;
  } catch (error: any) {
    console.log("error in add channel to workspace request", error);
    throw error.response.data;
  }
};

export const resetWorkspaceJoinCodeRequest = async ({
  workspaceId,
  token,
}: {
  workspaceId: string;
  token: string;
}) => {
  try {
    const response = await axiosConfig.put(
      `/workspaces/${workspaceId}/joinCode/reset`,
      {},
      {
        headers: {
          "x-access-token": token,
        },
      }
    );

    return response?.data?.data;
  } catch (error: any) {
    console.log("error in reset workspace join code request", error);
    throw error.response.data;
  }
};
