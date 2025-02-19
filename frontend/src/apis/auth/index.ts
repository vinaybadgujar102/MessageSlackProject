import { AxiosError } from "axios";

import axios from "@/config/axiosConfig";

export const signUpRequest = async ({
  email,
  password,
  username,
}: {
  email: string;
  password: string;
  username: string;
}) => {
  try {
    const response = await axios.post("/users/signup", {
      email,
      password,
      username,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data;
    }
    throw error;
  }
};

export const signInRequest = async ({
  email,
  password,
}: {
  email: string;
  password: string;
  username: string;
}) => {
  try {
    const response = await axios.post("/users/signin", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data;
    }
    throw error;
  }
};
