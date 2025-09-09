import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { adminLogout } from '../stores/api/authSlice';

export default function LogoutButton({ className = 'text-sm' }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onClick = () => {
    dispatch(adminLogout());
    navigate('/auth/signin');
  };
  return (
    <button onClick={onClick} className={className}>
      Sign out
    </button>
  );
}