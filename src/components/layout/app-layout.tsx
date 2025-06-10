"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./navbar";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Handle initial mount animation
  useEffect(() => {
    setMounted(true);
    
    // Simulate short loading for smooth transitions
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle page transitions
  useEffect(() => {
    if (mounted) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [pathname, mounted]);
  
  if (!mounted) {
    return null;
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-background overflow-x-hidden">
      <Navbar />
      
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <span className="loader" />
        </div>
      ) : (
        <main className="flex-1 container pt-6 pb-20 md:pt-24 md:pb-8 animate-fade-in">
          {children}
        </main>
      )}
      
      {/* Decorative Elements */}
      <div className="fixed -top-48 -left-48 w-96 h-96 rounded-full bg-primary-100/30 blur-3xl -z-10" />
      <div className="fixed -bottom-48 -right-48 w-96 h-96 rounded-full bg-secondary-300/20 blur-3xl -z-10" />
    </div>
  );
};

export default AppLayout; 