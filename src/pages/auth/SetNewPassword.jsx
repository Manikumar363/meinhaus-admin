import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import { useValidatePasswordResetTokenMutation, useResetPasswordMutation } from '../../stores/api/auth/authApi';
import { toast } from 'react-toastify';

const SetNewPassword = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const token = params.get('token') || '';
  const emailParam = params.get('email') || '';
  const [validateToken, { isLoading: validating, isSuccess: valid, isError: invalid, error: validateErr }] =
    useValidatePasswordResetTokenMutation();
  const [resetPassword, { isLoading: resetting, isSuccess: resetOk, error: resetErr }] =
    useResetPasswordMutation();

  const [form, setForm] = useState({ email: emailParam, password: '', confirm: '' });
  const [showPwd, setShowPwd] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);

  useEffect(() => {
    if (token) validateToken({ token });
  }, [token, validateToken]);

  useEffect(() => {
    if (valid) toast.success('Token valid', { className:'toast-shell', progressClassName:'toast-progress-green' });
    if (invalid) toast.error(validateErr?.data?.message || 'Invalid / expired link', { className:'toast-shell', progressClassName:'toast-progress-red' });
  }, [valid, invalid, validateErr]);

  useEffect(() => {
    if (resetOk) {
      toast.success('Password reset successfully', { className:'toast-shell', progressClassName:'toast-progress-green' });
      setTimeout(()=> navigate('/auth/signin'), 2200);
    }
  }, [resetOk, navigate]);

  useEffect(() => {
    if (resetErr) {
      toast.error(resetErr?.data?.message || 'Reset failed', { className:'toast-shell', progressClassName:'toast-progress-red' });
    }
  }, [resetErr]);

  const strongPassword = (pwd) =>
    pwd.length >= 8 && /[A-Z]/.test(pwd) && /[a-z]/.test(pwd) && /\d/.test(pwd) && /[!@#$%^&*_.-]/.test(pwd);

  const submit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      toast.error('Passwords do not match', { className:'toast-shell', progressClassName:'toast-progress-red' });
      return;
    }
    if (!strongPassword(form.password)) {
      toast.error('Weak password (need upper, lower, number, symbol, 8+ chars)', { className:'toast-shell', progressClassName:'toast-progress-red' });
      return;
    }
    if (!token) {
      toast.error('Missing token', { className:'toast-shell', progressClassName:'toast-progress-red' });
      return;
    }

    console.log('Reset payload -> token:', token.slice(0,8)+'...', 'pwdLen:', form.password.length);

    // Correct payload (backend needs newPassword)
    resetPassword({ token, newPassword: form.password });

    // If server ALSO accepts "password" and ignores extra keys you can send both:
    // resetPassword({ token, newPassword: form.password, password: form.password });
  };

  const disableInputs = resetting || validating || invalid; // <— simplified

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left (Form) */}
      <div className="flex items-center justify-center p-10 bg-white">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-semibold mb-2">Set A New Password</h1>
          <p className="text-sm text-gray-500 mb-8">Please enter your new password.</p>

          <form onSubmit={submit} className="space-y-5">
            {/* Email (display only) */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l9 6 9-6M4 6h16v12H4z"/></svg>
              </div>
              <input
                type="email"
                value={form.email}
                placeholder="Mail ID"
                disabled
                readOnly
                className="w-full pl-12 pr-4 py-3 rounded-md bg-gray-100 text-sm border border-transparent"
              />
            </div>

            {/* New Password */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.657 0 3-1.567 3-3.5S13.657 4 12 4s-3 1.567-3 3.5S10.343 11 12 11z"/><path strokeLinecap="round" strokeLinejoin="round" d="M5.5 20a6.5 6.5 0 0113 0"/></svg>
              </div>
              <input
                type={showPwd ? 'text':'password'}
                value={form.password}
                onChange={e=>setForm(f=>({...f,password:e.target.value}))}
                placeholder="New Password"
                className="w-full pl-12 pr-12 py-3 rounded-md bg-gray-100 focus:bg-white border focus:border-gray-300 focus:ring-0 text-sm disabled:opacity-60"
                disabled={disableInputs}
                required
                aria-disabled={disableInputs}
              />
              <button
                type="button"
                onClick={()=>setShowPwd(s=>!s)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 text-xs"
                tabIndex={disableInputs ? -1 : 0}
                disabled={disableInputs}
              >
                {showPwd ? 'Hide':'Show'}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.657 0 3-1.567 3-3.5S13.657 4 12 4s-3 1.567-3 3.5S10.343 11 12 11z"/><path strokeLinecap="round" strokeLinejoin="round" d="M5.5 20a6.5 6.5 0 0113 0"/></svg>
              </div>
              <input
                type={showPwd2 ? 'text':'password'}
                value={form.confirm}
                onChange={e=>setForm(f=>({...f,confirm:e.target.value}))}
                placeholder="Confirm Password"
                className="w-full pl-12 pr-12 py-3 rounded-md bg-gray-100 focus:bg-white border focus:border-gray-300 focus:ring-0 text-sm disabled:opacity-60"
                disabled={disableInputs}
                required
                aria-disabled={disableInputs}
              />
              <button
                type="button"
                onClick={()=>setShowPwd2(s=>!s)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 text-xs"
                tabIndex={disableInputs ? -1 : 0}
                disabled={disableInputs}
              >
                {showPwd2 ? 'Hide':'Show'}
              </button>
            </div>

            <button
              type="submit"
              disabled={resetting || invalid || validating}
              className="w-full bg-neutral-900 hover:bg-neutral-800 text-white py-3 rounded-md text-sm font-semibold disabled:opacity-60"
            >
              {resetting ? 'Saving…' : 'Reset Password'}
            </button>
          </form>

          {resetOk && (
            <div className="mt-6 text-center text-xs font-medium text-orange-600 bg-orange-50 border border-orange-200 rounded-md py-3">
              Your password has been successfully reset. You can now login.
            </div>
          )}

          {invalid && !valid && (
            <div className="mt-6 text-center text-xs font-medium text-red-600 bg-red-50 border border-red-200 rounded-md py-3">
              {validateErr?.data?.message || 'Invalid or expired reset link.'}
              <div className="mt-2">
                <button onClick={()=>navigate('/forgot-password')} className="text-blue-600 underline text-[11px]">
                  Request a new link
                </button>
              </div>
            </div>
          )}

          <div className="mt-8 text-center">
            <button onClick={()=>navigate('/auth/signin')} className="text-xs text-blue-600 hover:underline">
              ← Back to Login
            </button>
          </div>
        </div>
      </div>

      {/* Right (Illustration) */}
      <div className="hidden lg:flex items-center justify-center bg-gray-50">
        <div className="max-w-md px-10 text-center">
          
          <img
            src="/assets/images/auth/set-new-password.png"
            alt="Set new password"
            className="mx-auto w-full max-w-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default SetNewPassword;
