import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import AnnouncementBanner from "./components/AnnouncementBanner";
import Chatbot from "./components/Chatbot";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Services from "./pages/Services";
import Pricing from "./pages/Pricing";
import UseCases from "./pages/UseCases";
import UseCasePost from "./pages/UseCasePost";
import AboutUs from "./pages/AboutUs";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Admin from "./pages/Admin";
import AISolutions from "./pages/services/AISolutions";
import MarketingAutomation from "./pages/services/MarketingAutomation";
import CustomSoftware from "./pages/services/CustomSoftware";
import SystemsIntegration from "./pages/services/SystemsIntegration";
import AIAutomationWorkshopAustin from "./pages/events/ai-automation-workshop-austin";
import ThankYouEvent from "./pages/events/thank-you-event";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ContentDisclaimer from "./pages/ContentDisclaimer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        {/* <AnnouncementBanner /> */}
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/ai-solutions" element={<AISolutions />} />
          <Route path="/services/marketing-automation" element={<MarketingAutomation />} />
          <Route path="/services/custom-software" element={<CustomSoftware />} />
          <Route path="/services/systems-integration" element={<SystemsIntegration />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/use-cases" element={<UseCases />} />
          <Route path="/use-cases/:slug" element={<UseCasePost />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/events/ai-automation-workshop-austin" element={<AIAutomationWorkshopAustin />} />
          <Route path="/events/thank-you-event" element={<ThankYouEvent />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/content-disclaimer" element={<ContentDisclaimer />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Chatbot />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
