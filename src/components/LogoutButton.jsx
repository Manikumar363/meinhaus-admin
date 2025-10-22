import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { adminLogout } from "../stores/api/authSlice";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onClick = () => {
    dispatch(adminLogout());
    navigate("/auth/signin");
  };
  return (
    <Button size={"sm"} onClick={onClick} className="text-xs bg-white text-black border hover:bg-gray-50">
      <LogOut size={16} />
      Sign out
    </Button>
  );
}
