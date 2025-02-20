/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext<{
  auth: {
    user: any;
    token: string | null;
    isLoading: boolean;
  };
  setAuth: React.Dispatch<
    React.SetStateAction<{
      user: any;
      token: string | null;
      isLoading: boolean;
    }>
  >;
  logOut: () => void;
}>({
  auth: { user: null, token: null, isLoading: true },
  setAuth: () => {},
  logOut: () => {},
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [auth, setAuth] = useState<{
    user: any;
    token: string | null;
    isLoading: boolean;
  }>({
    user: null,
    token: null,
    isLoading: true,
  });

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user && token) {
      setAuth({ user: JSON.parse(user), token: token, isLoading: false });
    } else {
      setAuth({ user: null, token: null, isLoading: false });
    }
  }, []);

  async function logOut() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setAuth({ user: null, token: null, isLoading: false });
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
