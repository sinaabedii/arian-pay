"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 shadow-button active:shadow-md active:translate-y-0.5",
  {
    variants: {
      variant: {
        primary: "bg-classic-blue text-white hover:bg-primary-hover hover:shadow-lg",
        secondary: "bg-cream text-classic-blue hover:bg-secondary-hover hover:shadow-lg",
        accent: "bg-accent text-white hover:bg-accent-hover hover:shadow-lg",
        gradient: "text-white gradient-bg hover:opacity-90 hover:shadow-lg",
        light: "bg-secondary-light text-classic-blue hover:bg-secondary hover:shadow-lg",
        outline: "border border-input bg-transparent hover:bg-secondary-light hover:text-classic-blue hover:shadow-lg",
        ghost: "hover:bg-secondary-light hover:text-classic-blue hover:shadow-lg",
        danger: "bg-danger text-white hover:bg-danger-600 hover:opacity-90 hover:shadow-lg",
        success: "bg-success text-white hover:bg-success-600 hover:opacity-90 hover:shadow-lg",
      },
      size: {
        sm: "h-9 px-3 py-2 text-xs",
        md: "h-10 px-4 py-2",
        lg: "h-11 px-6 py-3 text-base",
        icon: "h-10 w-10 p-2.5",
      },
      animation: {
        none: "",
        scale: "hover:scale-105 active:scale-95",
        float: "hover:-translate-y-1",
        pulse: "hover:animate-pulse-soft",
        glow: "hover:shadow-lg hover:brightness-105",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      animation: "scale",
      fullWidth: false,
    },
  }
);

export interface AnimatedButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ className, variant, size, animation, fullWidth, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, animation, fullWidth, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

AnimatedButton.displayName = "AnimatedButton";

export { AnimatedButton, buttonVariants }; 