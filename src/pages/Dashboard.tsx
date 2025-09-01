import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import LogoutModal from "../components/LogoutModal";
import { logoutIcon, UserIcon } from "../icons";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // Get user info from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleLogoutConfirm = () => {
    // Clear login state
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");

    // Close modal and redirect to login
    setIsLogoutModalOpen(false);
    navigate("/login");
  };

  const handleLogoutCancel = () => {
    setIsLogoutModalOpen(false);
  };

  return (
    <div className="flex">
      <div className="shrink-0  w-[240px] h-screen flex flex-col justify-between bg-lightest-gray border-r border-sidebar-border py-6 px-2 ">
        <div className="flex flex-col items-center gap-2">
          <div className="rounded-full w-12 h-12 bg-muted flex items-center justify-center overflow-hidden">
            <img src={UserIcon} alt="User" />
          </div>
          <p className="text-base font-medium text-black">Shahab Hosseini </p>
          <p className="text-basse text-dark-gray ">{user.username}</p>
        </div>
        <Button
          name="Logout"
          onClick={handleLogoutClick}
          className="w-full !bg-destructive text-white justify-end"
          leftIcon={<img src={logoutIcon} alt="logout" />}
        />
      </div>
      <div className="w-full h-screen bg-white flex flex-col">
        <div className="shrink-0 h-[54px] bg-lightest-gray flex items-center p-4">
          <img src="/logo.svg" alt="logo" className="w-[118px] h-[30px]" />
        </div>
        <div className="flex items-center justify-center flex-1 ">
          <img src="/empty.png" alt="" className="" />
        </div>
      </div>

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
        userName={user.username}
      />
    </div>
  );
};
export default Dashboard;
