"use client";

import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/utils/cn";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "accent" | "gradient" | "light" | "success";
  size?: "sm" | "md" | "lg" | "icon";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    
    return (
      <Comp
        className={cn(
          "btn",
          {
            "btn-primary": variant === "primary",
            "btn-secondary": variant === "secondary",
            "btn-outline": variant === "outline",
            "btn-ghost": variant === "ghost",
            "btn-danger": variant === "danger",
            "btn-accent": variant === "accent",
            "btn-gradient": variant === "gradient",
            "btn-light": variant === "light",
            "btn-success": variant === "success",
            
            "h-9 px-3 py-2 text-xs": size === "sm",
            "h-10 px-4 py-2": size === "md",
            "h-11 px-6 py-3 text-base": size === "lg",
            "h-10 w-10 p-2.5": size === "icon",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button }; 