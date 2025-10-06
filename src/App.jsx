import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from "./pages/Dashboard";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import SetNewPassword from "./pages/auth/SetNewPassword";


const RequireAuth = ({ children }) => {
  const token = useSelector(s => s.auth.accessToken);
  return token ? children : <Navigate to="/auth/signin" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/signin" element={<Login />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth/set-new-password" element={<SetNewPassword />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>}>
        </Route>
        <Route path="*" element={<div className="p-6">404 Not Found</div>} />
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
    </BrowserRouter>
  );
}
export default App;