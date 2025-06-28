"use client";


import FeaturesSection from "@/components/layout/FeaturesSection";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import HeroSection from "@/components/layout/HeroSection";
import HowItWorksSection from "@/components/layout/HowItWorksSection";
import LoanCalculatorSection from "@/components/layout/LoanCalculatorSection";
import TestimonialsSection from "@/components/layout/TestimonialsSection";
import SaeedPayChatBot from "@/components/module/ChatBot";
import LiveActivityNotification from "@/components/ui/LiveActivityNotification";
import ReviewModal from "@/components/ui/ReviewModal";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  // Exit intent detector
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setShowExitIntent(true);
        // Auto-close after 10 seconds
        setTimeout(() => setShowExitIntent(false), 10000);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="pb-16">
          <HeroSection />
          <FeaturesSection />
          <LoanCalculatorSection />
          <HowItWorksSection />
          <TestimonialsSection onReviewClick={() => setShowReviewModal(true)} />
        </main>

        <Footer />
      </div>

      {/* Interactive Components */}
      <SaeedPayChatBot />
      <LiveActivityNotification />
      
      {/* Modals */}
      <ReviewModal 
        isOpen={showReviewModal} 
        onClose={() => setShowReviewModal(false)} 
      />
      
      
    </>
  );
} 