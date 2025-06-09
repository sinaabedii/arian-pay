import { ReactNode } from "react";
import Navbar from "./navbar";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container pt-6 pb-20 md:pt-24 md:pb-6">
        {children}
      </main>
    </div>
  );
};

export default AppLayout; 