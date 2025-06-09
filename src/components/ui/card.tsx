import * as React from "react";
import { cn } from "@/utils/cn";

// کارت اصلی با افکت‌های جدید
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  gradient?: boolean;
  glassEffect?: boolean;
  hoverable?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, gradient, glassEffect, hoverable = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border border-border bg-card text-card-foreground shadow-sm",
        gradient && "bg-gradient-to-br from-primary/5 to-secondary/5",
        glassEffect && "glass-effect",
        hoverable && "hover-float card-hover transition-all duration-200",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

// هدر کارت با پشتیبانی از آیکون و بج
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  badge?: {
    text: string;
    variant: "primary" | "secondary" | "accent" | "success" | "warning" | "danger";
  };
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, icon, badge, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    >
      {(icon || badge) && (
        <div className="flex items-center justify-between mb-2">
          {icon && (
            <div className="p-2 rounded-full bg-primary-light text-primary">
              {icon}
            </div>
          )}
          {badge && (
            <div className={`badge badge-${badge.variant}`}>
              {badge.text}
            </div>
          )}
        </div>
      )}
      {props.children}
    </div>
  )
);
CardHeader.displayName = "CardHeader";

// عنوان کارت با پشتیبانی از آیکون
export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  icon?: React.ReactNode;
  gradientText?: boolean;
}

const CardTitle = React.forwardRef<HTMLParagraphElement, CardTitleProps>(
  ({ className, icon, gradientText, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        "text-2xl font-semibold leading-none tracking-tight",
        gradientText && "gradient-text",
        className
      )}
    >
      {icon && (
        <span className="inline-block mr-2 align-middle">
          {icon}
        </span>
      )}
      <span>{props.children}</span>
    </h3>
  )
);
CardTitle.displayName = "CardTitle";

// توضیحات کارت
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-secondary", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

// محتوای کارت
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

// فوتر کارت
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

// کارت قابلیت با پشتیبانی از آیکون گرادیانی
export interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description: string;
  gradient?: "primary" | "secondary" | "accent";
  action?: React.ReactNode;
}

const FeatureCard = React.forwardRef<HTMLDivElement, FeatureCardProps>(
  ({ className, icon, title, description, gradient = "primary", action, ...props }, ref) => {
    const gradientClasses = {
      primary: "gradient-bg",
      secondary: "bg-secondary",
      accent: "accent-gradient-bg"
    };
    
    return (
      <Card
        ref={ref}
        className={cn("feature-card", className)}
        hoverable
        {...props}
      >
        <div className="flex flex-col h-full">
          {icon && (
            <div className={`w-12 h-12 rounded-full ${gradientClasses[gradient]} flex items-center justify-center text-white mb-4`}>
              {icon}
            </div>
          )}
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-secondary text-sm flex-grow">{description}</p>
          {action && (
            <div className="mt-4 pt-4 border-t border-border">
              {action}
            </div>
          )}
        </div>
      </Card>
    );
  }
);
FeatureCard.displayName = "FeatureCard";

// کارت آمار با نمایش مقدار و روند تغییرات
export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  value: string | number;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  badge?: {
    text: string;
    variant: "primary" | "secondary" | "accent" | "success" | "warning" | "danger";
  };
}

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  ({ className, icon, title, value, trend, badge, ...props }, ref) => (
    <Card
      ref={ref}
      className={cn("hover-float card-hover", className)}
      {...props}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          {icon && <div className="p-2 rounded-full bg-primary-light">{icon}</div>}
          {badge && (
            <div className={`badge badge-${badge.variant}`}>
              {badge.text}
            </div>
          )}
        </div>
        <div className="space-y-1">
          <p className="text-sm text-secondary">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          {trend && (
            <div className="flex items-center text-xs">
              <span className={trend.isPositive ? "text-success" : "text-danger"}>
                {trend.isPositive ? "↗" : "↘"} {trend.value}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
);
StatCard.displayName = "StatCard";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  FeatureCard,
  StatCard
}; 