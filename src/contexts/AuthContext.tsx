"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "@/utils/token";
import { usePathname } from "@/i18n/navigation";

// Cấu trúc user giả định, có thể thay đổi tùy session bạn lưu
interface User {
  id: string;
  name: string;
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  setUser: any;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  loading: true,
  setUser: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const sessionData = getSession();
    const user = sessionStorage.getItem("user");
    if (sessionData && user) {
      setUser(JSON.parse(user));
      setLoading(false);
    } else {
      if (pathname !== "/home") {
        router.push("/login");
      } else {
        setLoading(false);
      }
    }
  }, [pathname]);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, loading, setUser }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
