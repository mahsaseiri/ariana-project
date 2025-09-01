import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";
import { closeIcon, exclamationMarkIcon, logoutIcon } from "../icons";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName?: string;
}

const LogoutModal: React.FC<LogoutModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  userName = "User",
}) => {
  // Handle escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Handle backdrop click
  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white rounded-lg  w-[423px] p-6">
        <div className="flex justify-end">
          <img
            src={closeIcon}
            alt=""
            className="cursor-pointer"
            onClick={onClose}
          />
        </div>
        <div className="flex flex-col items-center gap-2 mt-[10px]">
          <img src={exclamationMarkIcon} alt="" className="" />
          <h2 className="text-sm font-semibold text-black">Log out</h2>
          <p className="text-sm text-gray">
            Are you sure you want to sign out of your account?
          </p>
        </div>

        <div className="flex w-full gap-4 mt-10">
          <Button
            name="Logout"
            onClick={onConfirm}
            className="w-full bg-white !text-primary  border border-sidebar-border"
          />
          <Button name="Cancel" onClick={onClose} className="w-full " />
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default LogoutModal;
