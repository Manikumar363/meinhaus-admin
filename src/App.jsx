import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Auth Pages
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import SetNewPassword from "./pages/auth/SetNewPassword";

// Dashboard + Layout
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";

// Estimate Section
import CreateEstimate from "./components/CreateEstimate/createEstimate";
import AllEstimates from "./components/EstimateSection/allEstimate";
import PaidDetails from "./components/EstimateSection/PaidDetails";
import CreateSend from "./components/EstimateSection/createSend";
import DirectAssign from "./components/EstimateSection/DirectAssign";
import DirectAssignDetails from "./components/EstimateSection/DirectAssignDetails";
import Bidding from "./components/EstimateSection/Bidding";
import BiddingDetails from "./components/EstimateSection/BiddingDetails";

// Content Management
import SliderSection from "./components/ContentManagement/SliderSection/SliderSection";
import ArticlesSection from "./components/ContentManagement/ArticleSection/ArticlesSection";
import TestimonialsSection from "./components/ContentManagement/ClientTestimonials/TestimonialsSection";
import ComplimentarySection from "./components/ContentManagement/ComplimentaryServices/ComplimentarySection";

// Invoices
import Invoices from "./components/Invoices/Invoices";
import AboutPageSection from "./components/AboutPage/AboutPageSection";
import EducationPageSection from "./components/EducationPage/EducationPageSection";
import BookingSection from "./components/Booking/BookingSection";
import GalleryPageSection from "./components/GalleryPage/GalleryPageSection";
import PriceFeedback from "./components/PriceFeedback/PriceFeedback";
import QueryPageSection from "./components/Query/QueryPageSection";

// -----------------------------
// 🔒 RequireAuth Wrapper
// -----------------------------
const RequireAuth = ({ children }) => {
  const token = useSelector((state) => state.auth.accessToken);
  return token ? children : <Navigate to="/auth/signin" replace />;
};

// -----------------------------
// ⚙️ Main App Component
// -----------------------------
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/auth/signin" element={<Login />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth/set-new-password" element={<SetNewPassword />} />

        {/* Protected Routes (inside Layout) */}
        <Route
          path="/"
          element={
            <RequireAuth>
              <Layout />
            </RequireAuth>
          }
        >
          {/* Default redirect to dashboard */}
          <Route index element={<Navigate to="/dashboard" replace />} />

          {/* Dashboard */}
          <Route path="dashboard" element={<Dashboard />} />

          {/* Estimate Section */}
          <Route path="create-estimate" element={<CreateEstimate />} />
          <Route path="bookings" element={<BookingSection />} />
          <Route path="all-estimates" element={<AllEstimates />} />
          <Route path="price-feedback" element={<PriceFeedback />} />
          <Route path="paid-details/:id" element={<PaidDetails />} />
          <Route path="create-send" element={<CreateSend />} />
          <Route path="direct-assign" element={<DirectAssign />} />
          <Route path="direct-assign/:id" element={<DirectAssignDetails />} />
          <Route path="bidding" element={<Bidding />} />
          <Route path="bidding/:id" element={<BiddingDetails />} />
          <Route path="about" element={<AboutPageSection />} />
          <Route path="education" element={<EducationPageSection />} />
          <Route path="gallery" element={<GalleryPageSection />} />
          <Route path="query" element={<QueryPageSection />} />

          {/* Content Management */}
          <Route path="content/sliders" element={<SliderSection />} />
          <Route path="content/articles" element={<ArticlesSection />} />
          <Route
            path="content/testimonials"
            element={<TestimonialsSection />}
          />
          <Route
            path="content/complementary-services"
            element={<ComplimentarySection />}
          />

          {/* Invoices */}
          <Route path="invoices/:id" element={<Invoices />} />

          {/* 404 Fallback */}
          <Route path="*" element={<div className="p-6">404 Not Found</div>} />
        </Route>
      </Routes>

      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </BrowserRouter>
  );
}

export default App;
