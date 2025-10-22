import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Dashboard from "./pages/Dashboard";
import RootLayout from "./components/RootLayout";
import { useSelector } from "react-redux";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import SetNewPassword from "./pages/auth/SetNewPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BookingSection from "./components/Booking";
import CreateBooking from "./components/Booking/New/CreateBooking";
import BookingDetailsPage from "./components/Booking/Details";
import SliderSection from "./components/ContentManagement/SliderSection/SliderSection";
import ArticlesSection from "./components/ContentManagement/ArticleSection/ArticlesSection";
import TestimonialsSection from "./components/ContentManagement/ClientTestimonials/TestimonialsSection";
import ComplimentarySection from "./components/ContentManagement/ComplimentaryServices/ComplimentarySection";
import PriceFeedback from "./components/PriceFeedback/PriceFeedback";
import QueryPageSection from "./components/Query/QueryPageSection";
import Invoices from "./components/Invoices/Invoices";
import CreateEstimate from "./components/CreateEstimate/createEstimate";
import AllEstimates from "./components/EstimateSection/allEstimate";
import DraftEstimateSection from "./components/DraftEstimate/DraftEstimateSection";
import PaidDetails from "./components/EstimateSection/PaidDetails";
import CreateSend from "./components/EstimateSection/createSend";
import DirectAssign from "./components/EstimateSection/DirectAssign";
import DirectAssignDetails from "./components/EstimateSection/DirectAssignDetails";
import Bidding from "./components/EstimateSection/Bidding";
import BiddingDetails from "./components/EstimateSection/BiddingDetails";
import AboutPageSection from "./components/AboutPage/AboutPageSection";
import { EducationPageSection } from "./components/EducationPage";
import { GalleryPageSection } from "./components/GalleryPage";
import { Toaster } from "sonner";

const RequireAuth = ({ children }) => {
  const token = useSelector((state) => state.auth.accessToken);
  return token ? children : <Navigate to="/auth/signin" replace />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="auth">
          <Route path="signin" element={<Login />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="set-new-password" element={<SetNewPassword />} />
        </Route>

        <Route
          path="/"
          element={
            // <RequireAuth>
            <RootLayout />
            // </RequireAuth>
          }
        >
          <Route index element={<Dashboard />} />

          <Route path="content">
            <Route path="sliders" element={<SliderSection />} />
            <Route path="articles" element={<ArticlesSection />} />
            <Route path="testimonials" element={<TestimonialsSection />} />
            <Route
              path="complementary-services"
              element={<ComplimentarySection />}
            />
          </Route>

          <Route path="bookings">
            <Route index element={<BookingSection />} />
            <Route path="new" element={<CreateBooking />} />
            <Route path="details/:id" element={<BookingDetailsPage />} />
          </Route>

          <Route path="price-feedback" element={<PriceFeedback />} />

          <Route path="create-estimate" element={<CreateEstimate />} />
          <Route path="all-estimates" element={<AllEstimates />} />
          <Route path="draft-estimates" element={<DraftEstimateSection />} />
          <Route path="paid-details/:id" element={<PaidDetails />} />
          <Route path="create-send" element={<CreateSend />} />
          <Route path="direct-assign" element={<DirectAssign />} />
          <Route path="direct-assign/:id" element={<DirectAssignDetails />} />
          <Route path="bidding" element={<Bidding />} />
          <Route path="bidding/:id" element={<BiddingDetails />} />

          <Route path="query" element={<QueryPageSection />} />
          <Route path="invoices/:id" element={<Invoices />} />

          <Route path="about" element={<AboutPageSection />} />
          <Route path="education" element={<EducationPageSection />} />
          <Route path="gallery" element={<GalleryPageSection />} />
        </Route>
      </Routes>
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
      <Toaster />
    </BrowserRouter>
  );
}
