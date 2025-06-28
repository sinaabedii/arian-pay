"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-blue text-white hover:bg-dark-blue",
        secondary:
          "border-transparent bg-gray-100 text-gray-900 hover:bg-gray-200",
        destructive:
          "border-transparent bg-red-500 text-white hover:bg-red-600",
        outline: "text-gray-900 border-gray-300",
        success:
          "border-transparent bg-green-500 text-white hover:bg-green-600",
        warning:
          "border-transparent bg-yellow-500 text-white hover:bg-yellow-600",
        blue:
          "border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200",
        green:
          "border-transparent bg-green-100 text-green-800 hover:bg-green-200",
        yellow:
          "border-transparent bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
        red:
          "border-transparent bg-red-100 text-red-800 hover:bg-red-200",
        purple:
          "border-transparent bg-purple-100 text-purple-800 hover:bg-purple-200",
        orange:
          "border-transparent bg-orange-100 text-orange-800 hover:bg-orange-200",
        gray:
          "border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants }; 