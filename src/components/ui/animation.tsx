"use client";

import { useEffect, useRef } from "react";

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
  
  useEffect(() => {
    if (!containerRef.current) return;
    
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
    
    // Create script element to load lottie player
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.9.6/lottie.min.js";
    script.async = true;
    script.onload = () => {
      if (typeof window.lottie !== "undefined" && containerRef.current) {
        const anim = window.lottie.loadAnimation({
          container: containerRef.current,
          renderer: "svg",
          loop: loop,
          autoplay: autoplay,
          animationData: animationData,
        });
        
        if (onComplete && !loop) {
          anim.addEventListener("complete", onComplete);
        }
        
        return () => {
          anim.destroy();
          if (onComplete && !loop) {
            anim.removeEventListener("complete", onComplete);
          }
        };
      }
    };
    
    document.body.appendChild(script);
    
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [name, loop, autoplay, onComplete]);
  
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
      }) => {
        destroy: () => void;
        addEventListener: (event: string, callback: () => void) => void;
        removeEventListener: (event: string, callback: () => void) => void;
      }
    };
  }
}

// Specific animation components for easier use
export function PaymentAnimation(props: Omit<AnimationProps, "name">) {
  return <Animation name="payment" {...props} />;
}

export function SuccessAnimation(props: Omit<AnimationProps, "name">) {
  return <Animation name="success" {...props} />;
}

export function ScanPaperAnimation(props: Omit<AnimationProps, "name">) {
  return <Animation name="scan-paper" {...props} />;
} 