"use client";

import { CreditCard, Copy, Eye, EyeOff, Trash, PlusCircle } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// بانک‌های مهم ایران با لوگو
export const IRAN_BANKS = {
  mellat: {
    name: "بانک ملت",
    logo: "/banks/mellat.svg",
    color: "bg-gradient-to-r from-red-600 to-red-700"
  },
  melli: {
    name: "بانک ملی",
    logo: "/banks/melli.svg",
    color: "bg-gradient-to-r from-blue-800 to-blue-900"
  },
  saderat: {
    name: "بانک صادرات",
    logo: "/banks/saderat.svg",
    color: "bg-gradient-to-r from-blue-500 to-blue-600"
  },
  tejarat: {
    name: "بانک تجارت",
    logo: "/banks/tejarat.svg",
    color: "bg-gradient-to-r from-red-500 to-purple-500"
  },
  sepah: {
    name: "بانک سپه",
    logo: "/banks/sepah.svg",
    color: "bg-gradient-to-r from-yellow-600 to-yellow-700"
  },
  parsian: {
    name: "بانک پارسیان",
    logo: "/banks/parsian.svg",
    color: "bg-gradient-to-r from-teal-500 to-teal-600"
  },
  pasargad: {
    name: "بانک پاسارگاد",
    logo: "/banks/pasargad.svg",
    color: "bg-gradient-to-r from-amber-400 to-amber-500"
  },
  saman: {
    name: "بانک سامان",
    logo: "/banks/saman.svg",
    color: "bg-gradient-to-r from-blue-400 to-blue-500"
  },
  sina: {
    name: "بانک سینا",
    logo: "/banks/sina.svg",
    color: "bg-gradient-to-r from-blue-600 to-blue-700"
  },
  ayandeh: {
    name: "بانک آینده",
    logo: "/banks/ayandeh.svg",
    color: "bg-gradient-to-r from-gray-600 to-gray-700"
  },
  day: {
    name: "بانک دی",
    logo: "/banks/day.svg",
    color: "bg-gradient-to-r from-green-500 to-green-600"
  },
  shahr: {
    name: "بانک شهر",
    logo: "/banks/shahr.svg",
    color: "bg-gradient-to-r from-purple-500 to-purple-600"
  },
  keshavarzi: {
    name: "بانک کشاورزی",
    logo: "/banks/keshavarzi.svg",
    color: "bg-gradient-to-r from-green-600 to-green-700"
  },
  maskan: {
    name: "بانک مسکن",
    logo: "/banks/maskan.svg",
    color: "bg-gradient-to-r from-red-500 to-red-600"
  },
  resalat: {
    name: "بانک رسالت",
    logo: "/banks/resalat.svg",
    color: "bg-gradient-to-r from-green-500 to-emerald-600"
  },
  default: {
    name: "سایر بانک‌ها",
    logo: "/banks/default.svg",
    color: "bg-gradient-to-r from-gray-700 to-gray-800"
  },
};

export type BankType = keyof typeof IRAN_BANKS;

// تایپ ویژگی‌های کارت بانکی
export interface BankCardProps {
  id: string;
  bank: BankType;
  cardNumber: string;
  accountNumber?: string;
  sheba?: string;
  cardHolderName: string;
  expiryDate?: string;
  isDefault?: boolean;
  className?: string;
  onDelete?: (id: string) => void;
  onSetDefault?: (id: string) => void;
  onCopy?: (text: string, type: 'card' | 'sheba' | 'account') => void;
}

export function BankCard({
  id,
  bank = "default",
  cardNumber,
  accountNumber,
  sheba,
  cardHolderName,
  expiryDate,
  isDefault = false,
  className,
  onDelete,
  onSetDefault,
  onCopy,
}: BankCardProps) {
  const [showCardNumber, setShowCardNumber] = useState(false);
  const [flipped, setFlipped] = useState(false);
  
  const toggleShowCardNumber = () => setShowCardNumber(!showCardNumber);
  const toggleFlip = () => setFlipped(!flipped);
  
  // فرمت کردن شماره کارت
  const formatCardNumber = (number: string) => {
    if (!number) return '•••• •••• •••• ••••';
    
    if (!showCardNumber) {
      return number.slice(0, 4) + ' •••• •••• ' + number.slice(-4);
    }
    
    return number.replace(/(\d{4})/g, '$1 ').trim();
  };
  
  // کپی کردن شماره کارت
  const handleCopy = (text: string, type: 'card' | 'sheba' | 'account') => {
    if (onCopy) {
      onCopy(text, type);
    } else {
      navigator.clipboard.writeText(text);
    }
  };
  
  // قالب بندی شماره شبا
  const formatSheba = (sheba?: string) => {
    if (!sheba) return '-';
    return 'IR' + sheba;
  };
  
  return (
    <div 
      className={cn(
        "relative h-56 w-full perspective group",
        className
      )}
    >
      <div 
        className={cn(
          "absolute inset-0 transition-transform duration-500 preserve-3d cursor-pointer",
          flipped ? "rotate-y-180" : ""
        )}
        onClick={toggleFlip}
      >
        {/* روی کارت */}
        <div 
          className={cn(
            "absolute inset-0 rounded-2xl shadow-card backface-hidden overflow-hidden p-6",
            IRAN_BANKS[bank]?.color || IRAN_BANKS.default.color,
            isDefault && "ring-2 ring-accent ring-offset-1"
          )}
        >
          <div className="h-full flex flex-col justify-between text-white">
            <div className="flex justify-between items-start">
              <div>
                {isDefault && (
                  <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">
                    پیش‌فرض
                  </span>
                )}
              </div>
              <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                {bank !== "default" && (
                  <Image
                    src={IRAN_BANKS[bank]?.logo || IRAN_BANKS.default.logo}
                    alt={IRAN_BANKS[bank]?.name || "Bank"}
                    width={48}
                    height={24}
                    className="w-8 h-8 object-contain"
                  />
                )}
                {bank === "default" && <CreditCard className="w-6 h-6 text-white" />}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-xl font-bold tracking-wider">
                  {formatCardNumber(cardNumber)}
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleShowCardNumber();
                  }}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {showCardNumber ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-xs text-white/70">دارنده کارت</div>
                  <div className="font-medium">{cardHolderName}</div>
                </div>
                
                {expiryDate && (
                  <div className="text-left">
                    <div className="text-xs text-white/70">تاریخ انقضا</div>
                    <div>{expiryDate}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* پشت کارت */}
        <div 
          className={cn(
            "absolute inset-0 rounded-2xl shadow-card backface-hidden overflow-hidden p-5 rotate-y-180 bg-white border border-gray-200",
          )}
        >
          <div className="h-full flex flex-col text-gray-900">
            <div className="text-lg font-semibold flex items-center gap-2 border-b border-gray-200 pb-3">
              <Image
                src={IRAN_BANKS[bank]?.logo || IRAN_BANKS.default.logo}
                alt={IRAN_BANKS[bank]?.name || "Bank"}
                width={48}
                height={24}
                className="w-6 h-6 object-contain"
              />
              {IRAN_BANKS[bank]?.name || "کارت بانکی"}
            </div>
            
            <div className="flex-1 py-3 space-y-4">
              {accountNumber && (
                <div>
                  <div className="text-xs text-gray-600 font-medium mb-1">شماره حساب</div>
                  <div className="flex items-center gap-2">
                    <div className="font-medium text-gray-900">{accountNumber}</div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy(accountNumber, 'account');
                      }}
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      <Copy size={14} />
                    </button>
                  </div>
                </div>
              )}
              
              <div>
                <div className="text-xs text-gray-600 font-medium mb-1">شماره کارت</div>
                <div className="flex items-center gap-2">
                  <div className="font-medium text-gray-900">{formatCardNumber(cardNumber)}</div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(cardNumber, 'card');
                    }}
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <Copy size={14} />
                  </button>
                </div>
              </div>
              
              {sheba && (
                <div>
                  <div className="text-xs text-gray-600 font-medium mb-1">شماره شبا</div>
                  <div className="flex items-center gap-2">
                    <div className="font-medium text-sm text-gray-900">{formatSheba(sheba)}</div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy(formatSheba(sheba), 'sheba');
                      }}
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      <Copy size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="border-t border-gray-200 pt-3 flex justify-between">
              {!isDefault && onSetDefault && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={(e) => {
                    e.stopPropagation();
                    onSetDefault(id);
                  }}
                  className="hover:bg-blue-50 hover:text-blue-600"
                >
                  تنظیم به عنوان پیش‌فرض
                </Button>
              )}
              
              {onDelete && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(id);
                  }}
                >
                  <Trash size={16} className="mr-1" />
                  حذف کارت
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AddBankCardButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="h-56 w-full rounded-2xl border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors flex flex-col items-center justify-center gap-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50"
    >
      <PlusCircle size={40} />
      <span className="font-medium">افزودن کارت بانکی جدید</span>
    </button>
  );
} 