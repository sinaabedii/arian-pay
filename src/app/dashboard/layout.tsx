"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  CreditCard,
  Wallet,
  Home,
  Store,
  User,
  QrCode,
  Bell,
  Menu,
  X,
  BarChart3,
  LogOut,
  Download,
  Search,
  Crown,
  Sparkles,
  TreePine,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/store/auth-store";
import { Toaster } from "@/components/ui/toaster";
import SmartSearch from "@/components/search/smart-search";

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  exact?: boolean;
  badge?: string;
  isNew?: boolean;
}

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  // Keyboard shortcut for search (Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const openSearch = () => {
    setIsSearchOpen(true);
    setIsMobileMenuOpen(false); // Close mobile menu if open
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  // Main navigation items (shown always)
  const mainNavItems: NavItem[] = [
    {
      id: "dashboard",
      label: "داشبورد",
      icon: Home,
      href: "/dashboard",
      exact: true,
    },
    { id: "wallet", label: "کیف پول", icon: Wallet, href: "/dashboard/wallet" },
    {
      id: "credit",
      label: "اعتبار",
      icon: CreditCard,
      href: "/dashboard/credit-request",
      badge: "15M",
    },
    {
      id: "installments",
      label: "اقساط",
      icon: CreditCard,
      href: "/dashboard/installments",
    },
    {
      id: "stores",
      label: "فروشگاه‌ها",
      icon: Store,
      href: "/dashboard/stores",
    },
  ];

  // Secondary navigation items (shown in dropdown/menu)
  const secondaryNavItems: NavItem[] = [
    {
      id: "transactions",
      label: "تراکنش‌ها",
      icon: BarChart3,
      href: "/dashboard/transactions",
    },
    {
      id: "qr-payment",
      label: "پرداخت QR",
      icon: QrCode,
      href: "/dashboard/qr-payment",
    },
    { id: "profile", label: "پروفایل", icon: User, href: "/dashboard/profile" },
  ];

  // New features (highlighted)
  const newFeatures: NavItem[] = [
    {
      id: "saeed-club",
      label: "سعید کلاب",
      icon: Crown,
      href: "/dashboard/saeed-club",
      badge: "جدید",
      isNew: true,
    },
    {
      id: "ar-shopping",
      label: "خرید AR",
      icon: Sparkles,
      href: "/dashboard/ar-shopping",
      badge: "جدید",
      isNew: true,
    },
    {
      id: "green-saeed",
      label: "سعید سبز",
      icon: TreePine,
      href: "/dashboard/green-saeed",
      badge: "جدید",
      isNew: true,
    },
  ];

  const allNavItems = [...mainNavItems, ...secondaryNavItems, ...newFeatures];

  const isActive = (item: NavItem) => {
    if (item.exact) {
      return pathname === item.href;
    }
    return pathname.startsWith(item.href);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
        {/* Top Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 text-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline">
                📞 پشتیبانی ۲۴/۷: ۰۲۱-۱۲۳۴۵۶۷۸
              </span>
              <span className="sm:hidden">☎️ ۰۲۱-۱۲۳۴۵۶۷۸</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline">🚀 اعتبار ۱۰ دقیقه‌ای!</span>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 p-1"
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <Link href="/">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                  <CreditCard className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">سعید پی</h1>
                  <p className="text-xs text-gray-500 hidden sm:block">
                    سیستم پرداخت اعتباری
                  </p>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation - Only Main Items */}
            <nav className="hidden lg:flex items-center bg-gray-100 rounded-xl p-1">
              {mainNavItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="focus:outline-none"
                >
                  <div
                    className={`relative flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive(item)
                        ? "bg-white shadow-sm text-blue-600"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="hidden xl:inline">{item.label}</span>
                    {item.badge && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
              
              {/* More Button for Additional Items */}
              <div className="relative group">
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
                
                {/* Dropdown Menu */}
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="p-2 space-y-1">
                    {[...secondaryNavItems, ...newFeatures].map((item) => (
                      <Link
                        key={item.id}
                        href={item.href}
                        className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                        {item.badge && (
                          <span 
                            className={`mr-auto text-white text-xs rounded-full px-2 py-1 ${
                              item.isNew ? 'bg-green-500' : 'bg-red-500'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </nav>

            {/* Right Section */}
            <div className="flex items-center gap-2">
              {/* Search Button */}
              <Button 
                variant="outline" 
                size="sm" 
                onClick={openSearch}
                className="relative group"
              >
                <Search className="h-4 w-4 sm:ml-2" />
                <span className="hidden sm:inline">جستجو</span>
                <span className="hidden lg:inline-flex items-center gap-1 mr-2 px-1.5 py-0.5 bg-gray-100 text-gray-500 text-xs rounded">
                  ⌘K
                </span>
              </Button>

              <Link href="/dashboard/notifications">
                <Button variant="outline" size="sm" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    3
                  </span>
                </Button>
              </Link>

              {/* User Menu */}
              <div className="hidden sm:flex items-center gap-3">
                <Link href="/dashboard/profile">
                  <div className="flex items-center bg-gray-100 gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                      {user.name?.charAt(0) || "ک"}
                    </div>
                    <span className="text-sm text-gray-700 font-medium">
                      {user.name || "کاربر"}
                    </span>
                  </div>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => router.push("/")}
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">خروج</span>
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <Button
                variant="outline"
                size="sm"
                className="lg:hidden"
                onClick={toggleMobileMenu}
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-4 space-y-2 max-h-96 overflow-y-auto">
              {/* Mobile Search */}
              <Button
                variant="ghost"
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 justify-start"
                onClick={openSearch}
              >
                <Search className="h-5 w-5" />
                <span>جستجو در سایت</span>
                <span className="mr-auto text-xs text-gray-400">⌘K</span>
              </Button>

              {/* Mobile Navigation Items */}
              {allNavItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="focus:outline-none"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive(item)
                        ? "bg-blue-50 text-blue-600 border border-blue-200"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span 
                        className={`mr-auto text-white text-xs rounded-full px-2 py-1 ${
                          item.isNew ? 'bg-green-500' : 'bg-red-500'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                </Link>
              ))}

              <div className="pt-4 border-t border-gray-200">
                <Button
                  variant="outline"
                  className="w-full flex items-center gap-2 justify-center"
                  onClick={() => router.push("/")}
                >
                  <LogOut className="h-4 w-4" />
                  خروج از حساب کاربری
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="pb-20 pt-6 px-4 max-w-7xl mx-auto">{children}</main>

      {/* Bottom Navigation - Mobile Only */}
      <nav className="fixed bottom-0 right-0 left-0 bg-white border-t border-gray-200 h-16 z-40 md:hidden">
        <div className="grid grid-cols-5 h-full">
          {/* Dashboard */}
          <Link
            href="/dashboard"
            className="flex flex-col items-center justify-center relative"
          >
            <div
              className={`flex flex-col items-center justify-center ${
                pathname === "/dashboard" ? "text-blue-600" : "text-gray-500"
              }`}
            >
              <Home
                className={`h-5 w-5 ${
                  pathname === "/dashboard" ? "text-blue-600" : "text-gray-500"
                }`}
              />
              <span className="text-xs mt-1">داشبورد</span>
            </div>
          </Link>

          {/* Wallet */}
          <Link
            href="/dashboard/wallet"
            className="flex flex-col items-center justify-center relative"
          >
            <div
              className={`flex flex-col items-center justify-center ${
                pathname.startsWith("/dashboard/wallet") ? "text-blue-600" : "text-gray-500"
              }`}
            >
              <Wallet
                className={`h-5 w-5 ${
                  pathname.startsWith("/dashboard/wallet") ? "text-blue-600" : "text-gray-500"
                }`}
              />
              <span className="text-xs mt-1">کیف پول</span>
            </div>
          </Link>

          {/* Search Button */}
          <button
            onClick={openSearch}
            className="flex flex-col items-center justify-center relative"
          >
            <div className="flex flex-col items-center justify-center text-gray-500 hover:text-blue-600 transition-colors">
              <Search className="h-5 w-5" />
              <span className="text-xs mt-1">جستجو</span>
            </div>
          </button>

          {/* Saeed Club */}
          <Link
            href="/dashboard/saeed-club"
            className="flex flex-col items-center justify-center relative"
          >
            <div
              className={`flex flex-col items-center justify-center ${
                pathname.startsWith("/dashboard/saeed-club") ? "text-blue-600" : "text-gray-500"
              }`}
            >
              <Crown
                className={`h-5 w-5 ${
                  pathname.startsWith("/dashboard/saeed-club") ? "text-blue-600" : "text-gray-500"
                }`}
              />
              <span className="text-xs mt-1">سعید کلاب</span>
              <span className="absolute -top-1 right-1/4 bg-green-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                جدید
              </span>
            </div>
          </Link>

          {/* Profile */}
          <Link
            href="/dashboard/profile"
            className="flex flex-col items-center justify-center relative"
          >
            <div
              className={`flex flex-col items-center justify-center ${
                pathname.startsWith("/dashboard/profile") ? "text-blue-600" : "text-gray-500"
              }`}
            >
              <User
                className={`h-5 w-5 ${
                  pathname.startsWith("/dashboard/profile") ? "text-blue-600" : "text-gray-500"
                }`}
              />
              <span className="text-xs mt-1">پروفایل</span>
            </div>
          </Link>
        </div>
      </nav>
      
      {/* Smart Search Component */}
      <SmartSearch isOpen={isSearchOpen} onClose={closeSearch} />
      
      <Toaster />
    </div>
  );
}
