"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  Smartphone,
  Shield,
  Zap
} from "lucide-react";

// Import animation data
import paymentAnimation from "@/json/Animation - payment.json";
import successAnimation from "@/json/Animation - succes.json";
import scanPaperAnimation from "@/json/Animation - scan-paper.json";

// Type definitions for our animations
export type AnimationName = "payment" | "success" | "scan-paper";

interface AnimationProps {
  name: AnimationName;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
  width?: number | string;
  height?: number | string;
  style?: React.CSSProperties;
  onComplete?: () => void;
}

// Type for lottie animation instance
interface LottieAnimation {
  destroy: () => void;
  addEventListener: (event: string, callback: () => void) => void;
  removeEventListener: (event: string, callback: () => void) => void;
}

// Static variable to track if lottie is loaded
let isLottieLoaded = false;

// Declare the lottie type for global window object
declare global {
  interface Window {
    lottie: {
      loadAnimation: (params: {
        container: HTMLElement;
        renderer: string;
        loop: boolean;
        autoplay: boolean;
        animationData: unknown;
      }) => LottieAnimation;
    };
  }
}

// A simple animation player using browser's Web Animations API
export function Animation({
  name,
  className = "",
  loop = true,
  autoplay = true,
  width = "100%",
  height = "100%",
  style = {},
  onComplete,
}: AnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<LottieAnimation | null>(null);

  // Function to load animation - wrapped in useCallback to fix dependency warning
  const loadAnimation = useCallback(() => {
    if (!containerRef.current || !window.lottie) return;
    
    // Clear previous animations in the container
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }

    // Select the appropriate animation data
    let animationData;
    switch(name) {
      case "payment":
        animationData = paymentAnimation;
        break;
      case "success":
        animationData = successAnimation;
        break;
      case "scan-paper":
        animationData = scanPaperAnimation;
        break;
      default:
        animationData = paymentAnimation;
    }

    // Create a new animation
    const anim = window.lottie.loadAnimation({
      container: containerRef.current,
      renderer: "svg",
      loop: loop,
      autoplay: autoplay,
      animationData: animationData,
    });

    animRef.current = anim;

    if (onComplete && !loop) {
      anim.addEventListener("complete", onComplete);
    }
  }, [name, loop, autoplay, onComplete]);

  useEffect(() => {
    // Cleanup previous animation if exists
    if (animRef.current) {
      if (onComplete && !loop) {
        animRef.current.removeEventListener("complete", onComplete);
      }
      animRef.current.destroy();
      animRef.current = null;
    }

    // If lottie is already loaded
    if (isLottieLoaded && window.lottie) {
      loadAnimation();
      return;
    }

    // Load lottie script if not already loaded
    if (!isLottieLoaded) {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.9.6/lottie.min.js";
      script.async = true;
      script.onload = () => {
        isLottieLoaded = true;
        loadAnimation();
      };
      
      document.body.appendChild(script);
      
      return () => {
        if (script.parentNode && !isLottieLoaded) {
          script.parentNode.removeChild(script);
        }
      };
    }
    
    return () => {
      // Cleanup on unmount
      if (animRef.current) {
        if (onComplete && !loop) {
          animRef.current.removeEventListener("complete", onComplete);
        }
        animRef.current.destroy();
        animRef.current = null;
      }
    };
  }, [loadAnimation, loop, onComplete]);
  
  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width,
        height,
        ...style,
      }}
    />
  );
}

// Specific Lottie animation components for easier use
export function LottiePaymentAnimation(props: Omit<AnimationProps, "name">) {
  return <Animation name="payment" {...props} />;
}

export function SuccessAnimation(props: Omit<AnimationProps, "name">) {
  return <Animation name="success" {...props} />;
}

export function ScanPaperAnimation(props: Omit<AnimationProps, "name">) {
  return <Animation name="scan-paper" {...props} />;
}

// Custom interactive payment animation component
interface PaymentAnimationProps {
  className?: string;
}

export const PaymentAnimation = ({ className = "" }: PaymentAnimationProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [amount] = useState("۲,۵۰۰,۰۰۰");

  const steps = [
    {
      icon: CreditCard,
      title: "انتخاب محصول",
      description: "کاربر محصول را انتخاب می‌کند",
      color: "bg-blue-500",
      status: "active"
    },
    {
      icon: Smartphone,
      title: "احراز هویت",
      description: "تایید هویت سریع و آنلاین",
      color: "bg-purple-500",
      status: "pending"
    },
    {
      icon: Zap,
      title: "تایید اعتبار",
      description: "بررسی و تایید فوری اعتبار",
      color: "bg-orange-500",
      status: "pending"
    },
    {
      icon: CheckCircle2,
      title: "پرداخت موفق",
      description: "تکمیل فرآیند خرید اقساطی",
      color: "bg-green-500",
      status: "pending"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [steps.length]);

  // Extract current step icon component
  const CurrentStepIcon = steps[currentStep].icon;

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="max-w-4xl w-full">
        {/* Mobile mockup */}
        <div className="relative mx-auto mb-8">
          <div className="w-64 h-96 bg-gray-900 rounded-3xl p-2 mx-auto shadow-2xl">
            <div className="w-full h-full bg-white rounded-2xl overflow-hidden relative">
              {/* Status bar */}
              <div className="bg-gray-50 h-8 flex items-center justify-between px-4 text-xs">
                <span>9:41</span>
                <div className="flex gap-1">
                  <div className="w-4 h-2 bg-green-500 rounded-sm"></div>
                  <div className="w-1 h-2 bg-gray-300 rounded-sm"></div>
                </div>
              </div>

              {/* App header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-6 w-6" />
                  <span className="font-bold">سعید پی</span>
                </div>
              </div>

              {/* Payment interface */}
              <div className="p-4 space-y-4">
                {/* Amount */}
                <div className="text-center">
                  <div className="text-gray-600 text-sm mb-1">مبلغ خرید</div>
                  <div className="text-2xl font-bold text-gray-900">{amount} ریال</div>
                </div>

                {/* Product */}
                <div className="bg-gray-50 rounded-lg p-3 flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Smartphone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">آیفون ۱۴ پرو</div>
                    <div className="text-xs text-gray-600">موبایل اپل</div>
                  </div>
                </div>

                {/* Current step indicator */}
                <div className="bg-blue-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <CurrentStepIcon className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-blue-900 text-sm">
                      {steps[currentStep].title}
                    </span>
                  </div>
                  <div className="text-xs text-blue-700">
                    {steps[currentStep].description}
                  </div>
                  
                  {/* Progress indicator */}
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>پیشرفت</span>
                      <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Security badge */}
                <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span>امنیت بانکی</span>
                </div>
              </div>
            </div>
          </div>

          {/* Floating elements */}
          <div className="absolute -top-4 -right-4 bg-green-500 text-white p-2 rounded-lg shadow-lg animate-bounce">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div className="absolute -bottom-4 -left-4 bg-blue-500 text-white p-2 rounded-lg shadow-lg">
            <Clock className="h-5 w-5" />
          </div>
        </div>

        {/* Process steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            return (
              <div
                key={index}
                className={`relative p-4 rounded-xl border-2 transition-all duration-500 ${
                  index <= currentStep
                    ? `${step.color} border-transparent text-white transform scale-105`
                    : "bg-white border-gray-200 text-gray-600"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    index <= currentStep ? "bg-white/20" : "bg-gray-100"
                  }`}>
                    <StepIcon className={`h-5 w-5 ${
                      index <= currentStep ? "text-white" : "text-gray-600"
                    }`} />
                  </div>
                  <div className="text-sm font-medium">{step.title}</div>
                </div>
                
                <div className={`text-xs ${
                  index <= currentStep ? "text-white/80" : "text-gray-500"
                }`}>
                  {step.description}
                </div>

                {/* Step connector */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2">
                    <ArrowRight className={`h-4 w-4 ${
                      index < currentStep ? "text-green-500" : "text-gray-300"
                    }`} />
                  </div>
                )}

                {/* Active indicator */}
                {index === currentStep && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                )}
              </div>
            );
          })}
        </div>

        {/* Summary stats */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-blue-600">۱۰</div>
            <div className="text-xs text-gray-600">ثانیه تایید</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-green-600">۹۸٪</div>
            <div className="text-xs text-gray-600">نرخ موفقیت</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-purple-600">۲۴/۷</div>
            <div className="text-xs text-gray-600">دسترسی</div>
          </div>
        </div>
      </div>
    </div>
  );
} 