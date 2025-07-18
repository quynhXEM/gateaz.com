"use client";

import { useState, useEffect } from "react";
import { X, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type: boolean; // true = success, false = error
  autoClose?: boolean;
  autoCloseDelay?: number;
}

export function NotificationModal({
  isOpen,
  onClose,
  title,
  message,
  type,
  autoClose = false,
  autoCloseDelay = 3000,
}: NotificationModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const t = useTranslations("noti")
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      if (autoClose) {
        const timer = setTimeout(() => {
          handleClose();
        }, autoCloseDelay);
        return () => clearTimeout(timer);
      }
    }
  }, [isOpen, autoClose, autoCloseDelay]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className={`
          relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl 
          max-w-md w-full mx-4 transform transition-all duration-200
          ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4">
          <div className="flex items-center space-x-3">
            {type ? (
              <div className="flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
            ) : (
              <div className="flex-shrink-0 w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
            )}
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t(title)}
            </h3>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {t(message)}
          </p>
        </div>

        {/* <div className="flex justify-end space-x-3 px-6 pb-6">
          <Button
            variant="outline"
            onClick={handleClose}
            className="px-6 bg-transparent cursor-pointer"
          >
            {t("close")}
          </Button>
          <Button
            onClick={handleClose}
            className={`px-6 ${
              type
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-red-600 hover:bg-red-700 text-white"
            }`}
          >
            {t("confirm")}
          </Button>
        </div> */}
      </div>
    </div>
  );
}
// Hook để sử dụng modal dễ dàng hơn
export function useNotificationModalContext() {
  const [modal, setModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: boolean;
    autoClose?: boolean;
  }>({
    isOpen: false,
    title: "",
    message: "",
    type: true,
    autoClose: false,
  });

  const showSuccess = ({
    title,
    message,
    autoClose = false,
  }: {
    title: string;
    message: string;
    autoClose: boolean;
  }) => {
    setModal({
      isOpen: true,
      title,
      message,
      type: true,
      autoClose,
    });
  };

  const showError = ({
    title,
    message,
    autoClose = false,
  }: {
    title: string;
    message: string;
    autoClose: boolean;
  }) => {
    setModal({
      isOpen: true,
      title,
      message,
      type: false,
      autoClose,
    });
  };

  const closeModal = () => {
    setModal((prev) => ({ ...prev, isOpen: false }));
  };

  return {
    modal,
    showSuccess,
    showError,
    closeModal,
    NotificationModal: () => (
      <NotificationModal
        isOpen={modal.isOpen}
        onClose={closeModal}
        title={modal.title}
        message={modal.message}
        type={modal.type}
        autoClose={modal.autoClose}
      />
    ),
  };
}

