import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  nationalId?: string;
  creditLimit?: number;
  walletBalance: number;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: { phone: string; password: string }) => Promise<boolean>;
  logout: () => void;
  setUser: (user: User) => void;
  register: (user: User) => void;
}

// در حالت واقعی این باید از API دریافت شود
const MOCK_USER: User = {
  id: "1",
  name: "کاربر آرین پی",
  phone: "09123456789",
  email: "user@arianpay.com",
  nationalId: "0123456789",
  creditLimit: 10000000, // 10 میلیون تومان
  walletBalance: 2500000, // 2.5 میلیون تومان
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (credentials) => {
        // چک کردن اطلاعات کاربر ثابت
        if (credentials.phone === "09123456789" && credentials.password === "password") {
          set({ user: MOCK_USER, isAuthenticated: true });
          return true;
        }
        return false;
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      setUser: (user) => {
        set({ user, isAuthenticated: true });
      },
      register: (user) => {
        set({ user, isAuthenticated: true });
      },
    }),
    {
      name: "auth-storage",
    }
  )
); 