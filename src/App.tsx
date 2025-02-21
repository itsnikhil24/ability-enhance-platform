
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import Index from "./pages/Index";
import { AbilityAssessment } from "./pages/AbilityAssessment";
import Courses from "./pages/Courses";
import Chat from "./pages/Chat";
import Mentorship from "./pages/Mentorship";
import DailyExercise from "./pages/DailyExercise";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/assessment" element={<AbilityAssessment />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/mentorship" element={<Mentorship />} />
          <Route path="/exercises" element={<DailyExercise />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
