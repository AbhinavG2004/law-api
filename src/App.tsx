import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster as Sonner } from "@/components/ui/sonner";
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ChatInterface from "./components/ChatInterface"; // Importing Chat Interface Component

const queryClient = new QueryClient();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      setIsLoggedIn(false);
      window.location.pathname = "/login";
    } else {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Sonner />
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/main" element={isLoggedIn ? <Index /> : <Navigate to="/login" replace />} />
          <Route path="/chat" element={isLoggedIn ? <ChatInterface /> : <Navigate to="/login" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
