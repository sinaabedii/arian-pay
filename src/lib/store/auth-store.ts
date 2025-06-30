import { create } from "zustand";
import { persist } from "zustand/middleware";

// انواع نقش‌ها
export type UserRole = "customer" | "store" | "admin";

// اطلاعات کاربر
interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  role: UserRole;
  // اطلاعات مشتری
  nationalId?: string;
  creditLimit?: number;
  walletBalance?: number;
  // اطلاعات فروشگاه
  storeId?: string;
  storeName?: string;
  storeCategory?: string;
  storeAddress?: string;
  businessLicense?: string;
  commissionRate?: number;
  isVerified?: boolean;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: { phone: string; password: string }) => Promise<boolean>;
  logout: () => void;
  setUser: (user: User) => void;
  register: (user: User) => void;
  isCustomer: () => boolean;
  isStore: () => boolean;
  isAdmin: () => boolean;
}

// کاربر مشتری نمونه
const MOCK_CUSTOMER: User = {
  id: "customer_1",
  name: "علی احمدی",
  phone: "09123456789",
  email: "customer@saeedpay.com",
  role: "customer",
  nationalId: "0123456789",
  creditLimit: 10000000, // 10 میلیون تومان
  walletBalance: 2500000, // 2.5 میلیون تومان
};

// کاربر فروشگاه نمونه
const MOCK_STORE: User = {
  id: "store_1",
  name: "مدیر فروشگاه دیجی کالا",
  phone: "09987654321",
  email: "store@saeedpay.com",
  role: "store",
  storeId: "store_digikala_001",
  storeName: "دیجی کالا",
  storeCategory: "فروشگاه آنلاین",
  storeAddress: "تهران، خیابان گاندی جنوبی",
  businessLicense: "123456789",
  commissionRate: 2.5, // 2.5 درصد کمیسیون
  isVerified: true,
  walletBalance: 15000000, // 15 میلیون تومان درآمد فروشگاه
};

// کاربر ادمین نمونه
const MOCK_ADMIN: User = {
  id: "admin_1",
  name: "مدیر سیستم سعید پی",
  phone: "09111111111",
  email: "admin@saeedpay.com",
  role: "admin",
  walletBalance: 0,
};

// لیست کاربران برای mock authentication
const MOCK_USERS = [
  { ...MOCK_CUSTOMER, password: "customer123" },
  { ...MOCK_STORE, password: "store123" },
  { ...MOCK_ADMIN, password: "admin123" },
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      
      login: async (credentials) => {
        // شبیه‌سازی درخواست API
        const foundUser = MOCK_USERS.find(
          user => user.phone === credentials.phone && user.password === credentials.password
        );
        
        if (foundUser) {
          // حذف پسورد از اطلاعات کاربر
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { password: _, ...userWithoutPassword } = foundUser;
          set({ user: userWithoutPassword, isAuthenticated: true });
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
      
      isCustomer: () => {
        const { user } = get();
        return user?.role === "customer";
      },
      
      isStore: () => {
        const { user } = get();
        return user?.role === "store";
      },
      
      isAdmin: () => {
        const { user } = get();
        return user?.role === "admin";
      },
    }),
    {
      name: "auth-storage",
    }
  )
); 

// Export کردن کاربران نمونه برای استفاده در کامپوننت‌ها
export { MOCK_CUSTOMER, MOCK_STORE, MOCK_ADMIN }; 