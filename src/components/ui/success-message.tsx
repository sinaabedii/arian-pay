"use client";

import { ReactNode } from "react";
import { CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { AnimatedButton } from "@/components/ui/animated-button";
import { SuccessAnimation } from "@/components/ui/animation";

interface SuccessMessageProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  backUrl?: string;
  backLabel?: string;
}

export function SuccessMessage({
  title,
  description,
  actions,
  backUrl = "/dashboard",
  backLabel = "بازگشت به داشبورد",
}: SuccessMessageProps) {
  return (
    <div className="w-full flex flex-col items-center justify-center py-8 px-4 animate-fade-in">
      <div className="w-full max-w-md">
        <div className="h-32 md:h-40 mb-4 flex items-center justify-center">
          <SuccessAnimation className="w-full h-full" />
        </div>
        
        <Card className="border-0 shadow-card overflow-hidden">
          <div className="h-2 bg-gradient-to-l from-success-300 to-success-500"></div>
          <div className="p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-success-100 text-success flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={24} />
            </div>
            <h2 className="text-xl font-bold text-success-800 mb-2">{title}</h2>
            {description && <p className="text-secondary mb-6">{description}</p>}
            
            {actions ? (
              <div className="space-y-3">{actions}</div>
            ) : (
              <AnimatedButton variant="success" animation="scale" fullWidth asChild>
                <Link href={backUrl} className="inline-flex items-center justify-center gap-2">
                  <ArrowLeft size={16} />
                  {backLabel}
                </Link>
              </AnimatedButton>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
} 