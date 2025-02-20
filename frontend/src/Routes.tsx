import { Route, Routes } from "react-router-dom";

import { ProtectedRoute } from "./components/molecules/ProtectedRoute/ProtectedRoute";
import { SigninContainer } from "./components/organisms/Auth/SigninContainer";
import { SignupContainer } from "./components/organisms/Auth/SignupContainer";
import { Auth } from "./pages/Auth/Auth";
import { Home } from "./pages/Home/Home";
import { Notfound } from "./pages/Notfound/Notfound";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/auth/signup"
        element={
          <Auth>
            <SignupContainer />
          </Auth>
        }
      />
      <Route
        path="/auth/signin"
        element={
          <Auth>
            <SigninContainer />
          </Auth>
        }
      />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Auth>
              <Home />
            </Auth>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
};
