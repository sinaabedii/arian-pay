import Link from "next/link";
import { CreditCard, Wallet, Home, Store, User, QrCode } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed bottom-0 right-0 left-0 bg-card border-t border-border h-16 md:h-auto md:top-0 md:bottom-auto z-40">
      <div className="container flex h-full items-center justify-between">
        <div className="hidden md:block">
          <Link href="/" className="text-xl font-bold text-primary">
            آرین پی
          </Link>
        </div>
        
        <div className="flex items-center justify-between w-full md:w-auto md:gap-1">
          <NavItem href="/dashboard" icon={<Home size={20} />} label="خانه" />
          <NavItem href="/wallet" icon={<Wallet size={20} />} label="کیف پول" />
          <NavItem href="/qr-payment" icon={<QrCode size={20} />} label="پرداخت QR" />
          <NavItem href="/installments" icon={<CreditCard size={20} />} label="اقساط" />
          <NavItem href="/stores" icon={<Store size={20} />} label="فروشگاه‌ها" />
          <NavItem href="/profile" icon={<User size={20} />} label="پروفایل" />
        </div>
        
        <div className="hidden md:block">
          <div className="flex items-center gap-4">
            <Link 
              href="/wallet" 
              className="text-sm font-medium text-secondary hover:text-primary transition-colors"
            >
              کیف پول
            </Link>
            <Link 
              href="/profile" 
              className="text-sm font-medium text-secondary hover:text-primary transition-colors"
            >
              پروفایل
            </Link>
            <Link 
              href="/logout" 
              className="text-sm font-medium text-danger hover:text-danger/80 transition-colors"
            >
              خروج
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const NavItem = ({ href, icon, label }: NavItemProps) => {
  return (
    <Link
      href={href}
      className="flex flex-col items-center justify-center gap-1 w-16 md:w-auto md:flex-row md:px-3 md:py-2 md:gap-2 text-secondary hover:text-primary transition-colors"
    >
      <span className="md:hidden">{icon}</span>
      <span className="text-xs md:text-sm font-medium">{label}</span>
    </Link>
  );
};

export default Navbar; 