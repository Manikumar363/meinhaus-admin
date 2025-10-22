import React, { useEffect, useState, useRef } from "react";
import { useAdminSigninMutation } from "../../stores/api/auth/authApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

const CloseXButton = ({ closeToast }) => (
  <button onClick={closeToast} className="toast-close-btn" aria-label="Close">
    ×
  </button>
);

const BaseToast = ({ iconClass, iconSvg, message, closeToast }) => (
  <div className="toast-card">
    <div className={`toast-icon-circle ${iconClass}`}>{iconSvg}</div>
    <div className="flex-1 font-medium">{message}</div>
    <CloseXButton closeToast={closeToast} />
  </div>
);

const LoadingToast = ({ message, closeToast }) => (
  <div className="toast-card">
    <div className="toast-icon-circle toast-icon-gray">
      <div className="spinner" />
    </div>
    <div className="flex-1 font-medium">{message}</div>
    <CloseXButton closeToast={closeToast} />
  </div>
);

const SuccessToast = ({ message, closeToast }) => (
  <BaseToast
    iconClass="toast-icon-green"
    message={message}
    closeToast={closeToast}
    iconSvg={
      <svg
        viewBox="0 0 24 24"
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    }
  />
);

const ErrorToast = ({ message, closeToast }) => (
  <BaseToast
    iconClass="toast-icon-red"
    message={message}
    closeToast={closeToast}
    iconSvg={
      <svg
        viewBox="0 0 24 24"
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    }
  />
);

const Login = () => {
  const navigate = useNavigate();
  const token = useSelector((s) => s.auth.accessToken);
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [adminSignin, { isLoading, error, isError }] = useAdminSigninMutation();
  const loadingToastId = useRef(null);
  const slowTimerRef = useRef(null);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const validate = () => {
    const errs = { email: "", password: "" };
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Invalid email format";

    if (!form.password) errs.password = "Password is required";
    else if (form.password.length < 8) errs.password = "Minimum 8 characters";
    else if (
      !/[A-Z]/.test(form.password) ||
      !/[a-z]/.test(form.password) ||
      !/[0-9]/.test(form.password) ||
      !/[!@#$%^&*_.-]/.test(form.password)
    ) {
      errs.password = "Must include upper, lower, number & symbol";
    }
    setErrors(errs);
    return !errs.email && !errs.password;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      toast(<ErrorToast message="Fix validation errors" />, {
        autoClose: 4000,
        closeButton: false,
        icon: false,
        className: "toast-shell",
      });
      return;
    }
    // Create loading toast (custom component)
    if (!loadingToastId.current) {
      loadingToastId.current = toast(
        <LoadingToast message="Signing you in…" />,
        {
          autoClose: false,
          closeButton: false,
          icon: false,
          className: "toast-shell",
        }
      );
    } else {
      toast.update(loadingToastId.current, {
        render: <LoadingToast message="Signing you in…" />,
        isLoading: false,
        closeButton: false,
        icon: false,
        autoClose: false,
        className: "toast-shell",
      });
    }
    // Slow notice after 8s only if still pending
    slowTimerRef.current = setTimeout(() => {
      if (loadingToastId.current && !token) {
        toast(<LoadingToast message="Still working… please wait" />, {
          toastId: "slow-login",
          autoClose: 3000,
          closeButton: false,
          icon: false,
          className: "toast-shell",
        });
      }
    }, 8000);
    adminSignin(form);
  };

  // React to mutation state
  useEffect(() => {
    if (isLoading) return;
    // clear slow timer when not loading
    if (slowTimerRef.current) {
      clearTimeout(slowTimerRef.current);
      slowTimerRef.current = null;
    }
    if (isError && loadingToastId.current) {
      toast.update(loadingToastId.current, {
        render: <ErrorToast message={error?.data?.message || "Login failed"} />,
        isLoading: false,
        autoClose: 5000,
        closeButton: false,
        icon: false,
        className: "toast-shell",
        progressClassName: "toast-progress-red",
      });
      loadingToastId.current = null;
    }
  }, [isLoading, isError, error]);

  useEffect(() => {
    if (token) {
      if (slowTimerRef.current) {
        clearTimeout(slowTimerRef.current);
        slowTimerRef.current = null;
      }
      if (loadingToastId.current) {
        toast.update(loadingToastId.current, {
          render: (
            <SuccessToast message="Signed in successfully. Redirecting…" />
          ),
          isLoading: false,
          autoClose: 3000,
          closeButton: false,
          icon: false,
          className: "toast-shell",
          progressClassName: "toast-progress-green",
        });
        loadingToastId.current = null;
      } else {
        toast(<SuccessToast message="Signed in successfully. Redirecting…" />, {
          autoClose: 3000,
          closeButton: false,
          icon: false,
          className: "toast-shell",
          progressClassName: "toast-progress-green",
        });
      }
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div className="h-screen bg-gray-50 flex w-full">
      {/* Left Panel - 60% width */}
      <div className="hidden lg:flex lg:w-2/5 bg-white">
        <img
          src="/assets/images/auth/login.png"
          alt="MEINHAUS Illustration"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Panel - 40% width */}
      <div className=" w-full lg:w-2/5 flex items-center justify-center p-2 lg:p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="flex h-24 lg:hidden">
            <img
              src="/assets/images/main-logo.png"
              alt="Short Logo"
              className="w-full h-full"
            />
          </div>

          {/* Login Form */}
          <div className="bg-white p-2 lg:p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Sign In to Access the Admin Panel
              </h2>
            </div>

            <form onSubmit={onSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="text-slate-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={onChange}
                    className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.email
                        ? "border-red-400 focus:ring-red-400"
                        : "border-gray-300 focus:ring-blue-500"
                    }`}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-slate-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={onChange}
                    className={`block w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.password
                        ? "border-red-400 focus:ring-red-400"
                        : "border-gray-300 focus:ring-blue-500"
                    }`}
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <Eye className="w-5 h-5" />
                    ) : (
                      <EyeOff className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-xs text-red-600">{errors.password}</p>
                )}
              </div>

              {/* Remember Me and Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <button
                    type="button"
                    className="font-medium text-blue-600 hover:text-blue-500"
                    onClick={() => navigate("/auth/forgot-password")}
                  >
                    Forgot Password?
                  </button>
                </div>
              </div>

              {/* reCAPTCHA */}
              <div className="flex items-center justify-center p-4 border border-gray-300 rounded-lg bg-gray-50">
                <input
                  id="recaptcha"
                  name="recaptcha"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-3"
                />
                <label
                  htmlFor="recaptcha"
                  className="text-sm text-gray-700 mr-2"
                >
                  I'm not a robot
                </label>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  </div>
                  <span className="text-xs text-gray-500">reCAPTCHA</span>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </button>
            </form>
            {isError && (
              <div className="text-red-600 text-sm">
                {error?.data?.message || "Login failed"}
              </div>
            )}

            {/* Footer Links */}
            <div className="mt-6 text-center text-xs text-gray-500">
              <button type="button" className="hover:text-gray-700 mr-4">
                Privacy
              </button>
              <button type="button" className="hover:text-gray-700">
                Terms
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
