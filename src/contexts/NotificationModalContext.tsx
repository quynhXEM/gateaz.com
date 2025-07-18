"use client"

import React, { createContext, useContext } from "react";
import { useNotificationModalContext } from "@/commons/components/NotificationModal";

const NotificationModalContext = createContext<any>(null);

export const NotificationModalProvider = ({ children }: { children: React.ReactNode }) => {
  const modal = useNotificationModalContext();
  return (
    <NotificationModalContext.Provider value={modal}>
      {children}
      <modal.NotificationModal />
    </NotificationModalContext.Provider>
  );
};

export const useNotificationModal = () => useContext(NotificationModalContext); 