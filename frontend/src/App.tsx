import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/home/Home";
import AuthCallback from "./pages/auth/AuthCallback";
import AuthProvider from "./providers/AuthProvider";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import Chat from "./pages/chat/Chat";
function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/auth-callback" element={<AuthCallback />} />
            <Route
              path="/sso-callback"
              element={<AuthenticateWithRedirectCallback />}
            />
            <Route element={<MainLayout />}>
              <Route path="/" index element={<Home />} />
              <Route path="/chat" index element={<Chat />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
