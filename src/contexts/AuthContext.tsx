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
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const sessionData = getSession();

    if (sessionData) {
      setUser({
        id: "1",
        name: "Admin",
      });
      setLoading(false);
    } else {
      if (pathname !== "/home") router.push("/login");
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
