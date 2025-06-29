"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { CreditCard, Wallet, Home, Store, User, QrCode, Bell, Menu, X } from "lucide-react";
import { cn } from "@/utils/cn";
import { AnimatedButton } from "@/components/ui/animated-button";

const Navbar = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  return (
    <>
      {/* Desktop & Tablet Navigation */}
      <nav 
        className={cn(
          "fixed top-0 right-0 left-0 z-40 transition-all duration-300 hidden md:block",
          isScrolled 
            ? "bg-card/95 backdrop-blur-md shadow-card py-3" 
            : "bg-transparent py-5"
        )}
      >
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-lg p-1">
                <Image
                  src="/Logo.png"
                  alt="سعید پی"
                  width={30}
                  height={30}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-bold gradient-text">سعید پی</span>
            </Link>
            
            <div className="hidden lg:flex items-center gap-1">
              <NavItemDesktop 
                href="/dashboard" 
                icon={<Home size={18} />} 
                label="خانه" 
                isActive={pathname === "/dashboard"} 
              />
              <NavItemDesktop 
                href="/wallet" 
                icon={<Wallet size={18} />} 
                label="کیف پول" 
                isActive={pathname === "/wallet"} 
              />
              <NavItemDesktop 
                href="/qr-payment" 
                icon={<QrCode size={18} />} 
                label="پرداخت QR" 
                isActive={pathname === "/qr-payment"} 
              />
              <NavItemDesktop 
                href="/installments" 
                icon={<CreditCard size={18} />} 
                label="اقساط" 
                isActive={pathname === "/installments"} 
              />
              <NavItemDesktop 
                href="/stores" 
                icon={<Store size={18} />} 
                label="فروشگاه‌ها" 
                isActive={pathname === "/stores"} 
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Link href="/notifications" className="p-2 rounded-full hover:bg-secondary-light transition-colors relative">
              <Bell size={20} className="text-primary" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-danger rounded-full"></span>
            </Link>
            <Link 
              href="/profile" 
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-secondary-light transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-classic-blue flex items-center justify-center text-white text-sm">
                ک
              </div>
              <span className="text-sm font-medium text-primary">کاربر سعید پی </span>
            </Link>
            <AnimatedButton variant="gradient" size="sm" animation="float" asChild>
              <Link href="/credit-request">
                درخواست اعتبار
              </Link>
            </AnimatedButton>
          </div>
        </div>
      </nav>
      
      {/* Mobile Header */}
      <nav className="fixed top-0 right-0 left-0 bg-card/95 backdrop-blur-md shadow-card py-3 z-40 md:hidden">
        <div className="container flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center shadow-lg p-0.5">
              <Image
                src="/Logo.png"
                alt="سعید پی"
                width={24}
                height={24}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-lg font-bold gradient-text">سعید پی</span>
          </Link>
          
          <div className="flex items-center gap-2">
            <Link href="/notifications" className="p-2 rounded-full hover:bg-secondary-light transition-colors relative">
              <Bell size={20} className="text-primary" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-danger rounded-full"></span>
            </Link>
            <button 
              onClick={toggleMobileMenu}
              className="p-2 rounded-full hover:bg-secondary-light transition-colors"
            >
              {isMobileMenuOpen ? <X size={20} className="text-primary" /> : <Menu size={20} className="text-primary" />}
            </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile Side Menu */}
      <div className={cn(
        "fixed inset-0 bg-black/20 backdrop-blur-sm z-50 md:hidden transition-all duration-300",
        isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}>
        <div className={cn(
          "absolute top-0 bottom-0 right-0 w-3/4 bg-card shadow-xl transition-transform duration-300 flex flex-col",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}>
          <div className="p-4 border-b border-border">
            <Link 
              href="/profile" 
              className="flex items-center gap-3"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="w-12 h-12 rounded-full bg-classic-blue flex items-center justify-center text-white text-lg">
                ک
              </div>
              <div>
                <h3 className="font-bold text-primary">کاربر سعید پی </h3>
                <p className="text-sm text-secondary">09123456789</p>
              </div>
            </Link>
          </div>
          
          <div className="flex-1 overflow-auto py-4">
            <div className="space-y-1 px-2">
              <NavItemMobile 
                href="/dashboard" 
                icon={<Home size={20} />} 
                label="خانه" 
                isActive={pathname === "/dashboard"}
                onClick={() => setIsMobileMenuOpen(false)}
              />
              <NavItemMobile 
                href="/wallet" 
                icon={<Wallet size={20} />} 
                label="کیف پول" 
                isActive={pathname === "/wallet"}
                onClick={() => setIsMobileMenuOpen(false)}
              />
              <NavItemMobile 
                href="/qr-payment" 
                icon={<QrCode size={20} />} 
                label="پرداخت QR" 
                isActive={pathname === "/qr-payment"}
                onClick={() => setIsMobileMenuOpen(false)}
              />
              <NavItemMobile 
                href="/installments" 
                icon={<CreditCard size={20} />} 
                label="اقساط" 
                isActive={pathname === "/installments"}
                onClick={() => setIsMobileMenuOpen(false)}
              />
              <NavItemMobile 
                href="/stores" 
                icon={<Store size={20} />} 
                label="فروشگاه‌ها" 
                isActive={pathname === "/stores"}
                onClick={() => setIsMobileMenuOpen(false)}
              />
              <NavItemMobile 
                href="/profile" 
                icon={<User size={20} />} 
                label="پروفایل" 
                isActive={pathname === "/profile"}
                onClick={() => setIsMobileMenuOpen(false)}
              />
            </div>
          </div>
          
          <div className="p-4 border-t border-border">
            <AnimatedButton variant="gradient" fullWidth animation="glow" asChild>
              <Link 
                href="/credit-request"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                درخواست اعتبار
              </Link>
            </AnimatedButton>
          </div>
        </div>
      </div>
      
      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 right-0 left-0 bg-card border-t border-border h-16 z-40 md:hidden">
        <div className="grid grid-cols-5 h-full">
          <NavItemBottom 
            href="/dashboard" 
            icon={<Home size={20} />} 
            label="خانه" 
            isActive={pathname === "/dashboard"} 
          />
          <NavItemBottom 
            href="/wallet" 
            icon={<Wallet size={20} />} 
            label="کیف پول" 
            isActive={pathname === "/wallet"} 
          />
          <NavItemBottom 
            href="/qr-payment" 
            icon={<QrCode size={20} />} 
            label="پرداخت" 
            isActive={pathname === "/qr-payment"} 
          />
          <NavItemBottom 
            href="/installments" 
            icon={<CreditCard size={20} />} 
            label="اقساط" 
            isActive={pathname === "/installments"} 
          />
          <NavItemBottom 
            href="/stores" 
            icon={<Store size={20} />} 
            label="فروشگاه‌ها" 
            isActive={pathname === "/stores"} 
          />
        </div>
      </nav>
    </>
  );
};

// Desktop navigation item
interface NavItemProps {
  href: string;
  icon?: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

const NavItemDesktop = ({ href, icon, label, isActive }: NavItemProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200 hover-float",
        isActive 
          ? "bg-primary-light text-primary font-medium" 
          : "text-secondary hover:bg-secondary-light hover:text-primary"
      )}
    >
      {icon && <span>{icon}</span>}
      <span className="text-sm">{label}</span>
    </Link>
  );
};

// Mobile navigation item (side menu)
const NavItemMobile = ({ href, icon, label, isActive, onClick }: NavItemProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
        isActive 
          ? "bg-primary-light text-primary font-medium" 
          : "text-secondary hover:bg-secondary-light hover:text-primary"
      )}
      onClick={onClick}
    >
      {icon && <span>{icon}</span>}
      <span>{label}</span>
    </Link>
  );
};

// Mobile bottom navigation item
const NavItemBottom = ({ href, icon, label, isActive }: NavItemProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "flex flex-col items-center justify-center gap-1 transition-colors",
        isActive ? "text-primary" : "text-secondary hover:text-primary"
      )}
    >
      <span className={cn(
        "transition-all duration-300",
        isActive ? "text-primary scale-110" : "text-secondary"
      )}>
        {icon}
      </span>
      <span className="text-xs">{label}</span>
    </Link>
  );
};

export default Navbar; 