import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import PrivateLayout from "./PrivateLayout";
import PublicLayout from "./PublicLayout";

import Auth from "./components/auth/page";
import Home from "./components/home/page";
import Feed from "./components/feed/page";
import Profile from "./components/profile/page";
import NotFound from "./components/common/non-found";
import Container from "./components/common/container";
import CreatePost from "./components/common/create-post";
import React from "react";

export default function App() {
  const [createPostOpen, setCreatePostOpen] = React.useState(false);

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          <Container>
            <Routes>
              <Route element={<PublicRoute />}>
                <Route element={<PublicLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/auth" element={<Auth />} />
                </Route>
              </Route>
              <Route element={<PrivateRoute />}>
                <Route
                  element={
                    <PrivateLayout setCreatePostOpen={setCreatePostOpen} />
                  }
                >
                  <Route path="/feed" element={<Feed />} />
                  <Route path="/profile" element={<Profile />} />
                </Route>
              </Route>
              <Route path="/*" element={<NotFound />} />
            </Routes>
            {createPostOpen && (
              <CreatePost setCreatePostOpen={setCreatePostOpen} />
            )}
          </Container>
        </BrowserRouter>
      </ThemeProvider>
      <Toaster />
    </>
  );
}
