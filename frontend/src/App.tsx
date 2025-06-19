import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
const NotFound = lazy(() => import("./pages/404/NotFound"));
const Admin = lazy(() => import("./pages/admin/Admin"));
import AdminProviderWrapper from "./pages/admin/providers/Admin-Provider-Wrapper";
const Album = lazy(() => import("./pages/album/Album"));
import AuthCallback from "./pages/auth/AuthCallback";
const Chat = lazy(() => import("./pages/chat/Chat"));
import Home from "./pages/home/Home";
import AuthProvider from "./providers/AuthProvider";
import { lazy, Suspense } from "react";

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
              <Route
                path="/admin"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <Admin />
                  </Suspense>
                }
              />
            </Route>
            <Route element={<MainLayout />}>
              <Route path="/" index element={<Home />} />
              <Route
                path="/chat"
                index
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <Chat />
                  </Suspense>
                }
              />
              <Route
                path="/albums/:albumId"
                index
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <Album />
                  </Suspense>
                }
              />
              <Route
                path="/*"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <NotFound />
                  </Suspense>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
        <Toaster />
      </AuthProvider>
    </>
  );
}

export default App;
