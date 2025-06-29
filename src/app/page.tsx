"use client";

import FeaturesSection from "@/components/layout/FeaturesSection";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import HeroSection from "@/components/layout/HeroSection";
import HowItWorksSection from "@/components/layout/HowItWorksSection";
import LoanCalculatorSection from "@/components/layout/LoanCalculatorSection";
import NewsSection from "@/components/layout/NewsSection";
import TestimonialsSection from "@/components/layout/TestimonialsSection";
import SaeedPayChatBot from "@/components/module/ChatBot";
import ReviewModal from "@/components/ui/ReviewModal";
import { useState } from "react";

export default function HomePage() {
  const [showReviewModal, setShowReviewModal] = useState(false);

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
          <NewsSection />
        </main>

        <Footer />
      </div>

      <SaeedPayChatBot />
      <ReviewModal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
      />
    </>
  );
}
