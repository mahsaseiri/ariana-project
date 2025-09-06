import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import LogoutModal from "../components/LogoutModal";
import { logoutIcon, UserIcon } from "../icons";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { useUser } from "../hooks/queries";
import TweetContent from "../components/tweet/TweetContent";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const { data: user } = useUser();

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleLogoutConfirm = () => {
    // Clear login state
    dispatch(logout());

    // Close modal and redirect to login
    setIsLogoutModalOpen(false);
    navigate("/login");
  };

  const handleLogoutCancel = () => {
    setIsLogoutModalOpen(false);
  };

  return (
    <div className="flex">
      <div className="fixed left-0 top-0 w-[240px] h-screen flex flex-col justify-between bg-lightest-gray border-r border-sidebar-border py-6 px-2 overflow-y-auto">
        <div className="flex flex-col items-center gap-2">
          <div className="rounded-full w-12 h-12 bg-muted flex items-center justify-center overflow-hidden">
            <img
              src={user?.data.avatar ? user?.data.avatar : UserIcon}
              alt="User"
            />
          </div>
          <p className="text-base font-medium text-black">
            {user?.data.first_name} {user?.data.last_name}{" "}
          </p>
          <p className="text-basse text-dark-gray ">{user?.data.username}</p>
        </div>
        <Button
          name="Logout"
          onClick={handleLogoutClick}
          className="w-full !bg-destructive text-white justify-end"
          leftIcon={<img src={logoutIcon} alt="logout" />}
        />
      </div>
      <div className="w-full h-screen bg-white flex flex-col ml-[240px]">
        <div className="fixed top-0 left-[240px] right-0 h-[54px] bg-lightest-gray flex items-center p-4 z-10">
          <img src="/logo.svg" alt="logo" className="w-[118px] h-[30px]" />
        </div>
        <div className="pt-[54px]">
          <TweetContent />
        </div>
        {/* <div className="flex items-center justify-center flex-1 ">
          <img src="/empty.png" alt="" className="" />
        </div> */}
      </div>

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
      />
    </div>
  );
};
export default Dashboard;
