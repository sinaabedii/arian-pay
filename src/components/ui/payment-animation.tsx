"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { PaymentAnimation } from "@/components/ui/animation";

interface PaymentProcessingProps {
  status: "processing" | "success" | "error";
  message?: string;
  autoHideDelay?: number;
  onStatusChange?: (status: "processing" | "success" | "error") => void;
}

export function PaymentProcessing({
  status,
  message,
  autoHideDelay = 3000,
  onStatusChange,
}: PaymentProcessingProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [currentStatus, setCurrentStatus] = useState(status);
  const [statusMessage, setStatusMessage] = useState(message);

  useEffect(() => {
    setCurrentStatus(status);
    if (message) {
      setStatusMessage(message);
    }

    // Automatically hide success or error states after delay
    if (status !== "processing" && autoHideDelay > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onStatusChange) {
          onStatusChange("processing");
        }
      }, autoHideDelay);

      return () => clearTimeout(timer);
    }
  }, [status, message, autoHideDelay, onStatusChange]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md px-4">
        <Card className="border-0 shadow-card overflow-hidden">
          <div className={`h-2 ${
            currentStatus === "processing" ? "bg-gradient-to-r from-primary-300 to-primary-500" :
            currentStatus === "success" ? "bg-gradient-to-r from-success-300 to-success-500" :
            "bg-gradient-to-r from-danger-300 to-danger-500"
          }`}></div>
          
          <div className="p-6">
            <div className="flex flex-col items-center">
              {currentStatus === "processing" ? (
                <div className="w-full h-60 flex items-center justify-center">
                  <PaymentAnimation className="w-full h-full" />
                </div>
              ) : currentStatus === "success" ? (
                <div className="w-16 h-16 rounded-full bg-success-100 text-success-500 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
              ) : (
                <div className="w-16 h-16 rounded-full bg-danger-100 text-danger-500 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                  </svg>
                </div>
              )}
              
              <h3 className={`text-xl font-bold mb-2 ${
                currentStatus === "processing" ? "text-primary" :
                currentStatus === "success" ? "text-success-700" : "text-danger-700"
              }`}>
                {currentStatus === "processing" ? "در حال پردازش..." :
                 currentStatus === "success" ? "پرداخت موفق" : "خطا در پرداخت"}
              </h3>
              
              {statusMessage && (
                <p className="text-secondary text-center">{statusMessage}</p>
              )}
              
              {currentStatus === "processing" && (
                <div className="flex items-center gap-2 mt-4 text-secondary">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">لطفاً منتظر بمانید...</span>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
} 