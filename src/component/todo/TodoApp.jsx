import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ErrorComponent from "./ErrorComponent";
import HeaderComponent from "./HeaderComponent";
import ListTodosComponent from "./ListTodosComponent";
import LoginComponent from "./LoginComponent";
import LogoutComponent from "./LogoutComponent";
import WelcomeComponent from "./WelcomeComponent";
import AuthProvider, { useAuth } from "./security/AuthContext";

import "./TodoApp.css";

function AuthenticationRoute({ children }) {
  const authContext = useAuth();
  return authContext.isAuthenticated ? children : <Navigate to={"/"} />;
}

export default function TodoApp() {
  return (
    <div className="TodoApp">
      <AuthProvider>
        <BrowserRouter>
          <HeaderComponent />
          <Routes>
            <Route path="/" element={<LoginComponent />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route
              path="/welcome/:username"
              element={
                <AuthenticationRoute>
                  <WelcomeComponent />
                </AuthenticationRoute>
              }
            />
            <Route
              path="/todos"
              element={
                <AuthenticationRoute>
                  <ListTodosComponent />
                </AuthenticationRoute>
              }
            />
            <Route
              path="/logout"
              element={
                <AuthenticationRoute>
                  <LogoutComponent />
                </AuthenticationRoute>
              }
            />

            <Route path="*" element={<ErrorComponent />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}
