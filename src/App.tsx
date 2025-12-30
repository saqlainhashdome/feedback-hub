import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CustomerFeedback from "./pages/CustomerFeedback";
import ThankYou from "./pages/ThankYou";
import Dashboard from "./pages/Dashboard";
import Inbox from "./pages/Inbox";
import FeedbackDetail from "./pages/FeedbackDetail";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";
import { DashboardLayout } from "./components/layout/DashboardLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/feedback" element={<CustomerFeedback />} />
          <Route path="/feedback/thank-you" element={<ThankYou />} />
          
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="inbox" element={<Inbox />} />
            <Route path="inbox/:id" element={<FeedbackDetail />} />
            <Route path="voicebox" element={<Inbox />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="reports" element={<Analytics />} />
            <Route path="settings" element={<Dashboard />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
