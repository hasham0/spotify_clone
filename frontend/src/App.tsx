import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/home/Home";
import AuthCallback from "./pages/auth/AuthCallback";
import AuthProvider from "./providers/AuthProvider";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import Chat from "./pages/chat/Chat";
import Album from "./pages/album/Album";
import Admin from "./pages/admin/Admin";
import AdminProviderWrapper from "./pages/admin/providers/Admin-Provider-Wrapper";
import { Toaster } from "react-hot-toast";
import NotFound from "./pages/404/NotFound";
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
            <Route element={<AdminProviderWrapper />}>
              <Route path="/admin" element={<Admin />} />
            </Route>
            <Route element={<MainLayout />}>
              <Route path="/" index element={<Home />} />
              <Route path="/chat" index element={<Chat />} />
              <Route path="/albums/:albumId" index element={<Album />} />
              <Route path="/*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Toaster />
      </AuthProvider>
    </>
  );
}

export default App;
