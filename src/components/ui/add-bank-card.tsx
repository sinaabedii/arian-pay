"use client";

import { useState } from "react";
import { IRAN_BANKS, BankType } from "./bank-card";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./dialog";
import { Check } from "lucide-react";

export interface BankCardFormData {
  bank: BankType;
  cardNumber: string;
  accountNumber?: string;
  sheba?: string;
  cardHolderName: string;
  expiryDate?: string;
}

interface AddBankCardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: BankCardFormData) => void;
  isProcessing?: boolean;
}

export function AddBankCard({ open, onOpenChange, onSubmit, isProcessing = false }: AddBankCardProps) {
  const [formData, setFormData] = useState<BankCardFormData>({
    bank: "default",
    cardNumber: "",
    accountNumber: "",
    sheba: "",
    cardHolderName: "",
    expiryDate: "",
  });
  
  const [step, setStep] = useState<'form' | 'confirm' | 'success'>('form');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 'form') {
      setStep('confirm');
    } else if (step === 'confirm') {
      onSubmit(formData);
      // بعد از ارسال، به مرحله موفقیت برویم
      // در حالت واقعی، این مرحله بعد از پاسخ موفق از سرور اتفاق می‌افتد
      setStep('success');
      
      // بعد از چند ثانیه، دیالوگ را ببندیم
      setTimeout(() => {
        onOpenChange(false);
        // ریست کردن فرم و مرحله برای استفاده بعدی
        setFormData({
          bank: "default",
          cardNumber: "",
          accountNumber: "",
          sheba: "",
          cardHolderName: "",
          expiryDate: "",
        });
        setStep('form');
      }, 2000);
    }
  };
  
  const formatCardNumber = (value: string) => {
    return value
      .replace(/\s/g, '')
      .replace(/(\d{4})/g, '$1 ')
      .trim();
  };
  
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 16) value = value.slice(0, 16);
    
    setFormData(prev => ({ 
      ...prev, 
      cardNumber: value
    }));
  };
  
  const banks = Object.entries(IRAN_BANKS).map(([key, value]) => ({
    value: key,
    label: value.name,
    logo: value.logo
  }));
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {step === 'form' && 'افزودن کارت بانکی جدید'}
            {step === 'confirm' && 'تایید اطلاعات کارت بانکی'}
            {step === 'success' && 'کارت بانکی با موفقیت افزوده شد'}
          </DialogTitle>
          <DialogDescription>
            {step === 'form' && 'اطلاعات کارت بانکی خود را وارد کنید'}
            {step === 'confirm' && 'لطفا صحت اطلاعات وارد شده را بررسی نمایید'}
            {step === 'success' && 'کارت بانکی شما با موفقیت به حساب کاربری اضافه شد'}
          </DialogDescription>
        </DialogHeader>
        
        {step === 'form' && (
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="bank">بانک</Label>
              <select
                id="bank"
                name="bank"
                value={formData.bank}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              >
                {banks.map((bank) => (
                  <option key={bank.value} value={bank.value}>
                    {bank.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cardNumber">شماره کارت</Label>
              <Input
                id="cardNumber"
                name="cardNumber"
                value={formatCardNumber(formData.cardNumber)}
                onChange={handleCardNumberChange}
                placeholder="مثال: 6037 9970 0000 0000"
                className="text-left font-medium"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cardHolderName">نام دارنده کارت</Label>
              <Input
                id="cardHolderName"
                name="cardHolderName"
                value={formData.cardHolderName}
                onChange={handleChange}
                placeholder="نام و نام خانوادگی"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="expiryDate">تاریخ انقضا</Label>
              <Input
                id="expiryDate"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                placeholder="مثال: 1404/06"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="accountNumber">شماره حساب (اختیاری)</Label>
              <Input
                id="accountNumber"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                placeholder="شماره حساب"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="sheba">شماره شبا بدون IR (اختیاری)</Label>
              <Input
                id="sheba"
                name="sheba"
                value={formData.sheba}
                onChange={handleChange}
                placeholder="مثال: 000000000000000000000000"
                className="text-left"
              />
            </div>
            
            <div className="pt-4 flex justify-end">
              <Button type="submit" disabled={isProcessing}>
                ادامه
              </Button>
            </div>
          </form>
        )}
        
        {step === 'confirm' && (
          <div className="py-4 space-y-4">
            <div className="space-y-4 bg-secondary-light p-4 rounded-lg">
              <div className="flex justify-between">
                <span className="text-secondary">بانک:</span>
                <span className="font-medium">{IRAN_BANKS[formData.bank as BankType]?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">شماره کارت:</span>
                <span className="font-medium">{formatCardNumber(formData.cardNumber)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">نام دارنده کارت:</span>
                <span className="font-medium">{formData.cardHolderName}</span>
              </div>
              {formData.expiryDate && (
                <div className="flex justify-between">
                  <span className="text-secondary">تاریخ انقضا:</span>
                  <span className="font-medium">{formData.expiryDate}</span>
                </div>
              )}
              {formData.accountNumber && (
                <div className="flex justify-between">
                  <span className="text-secondary">شماره حساب:</span>
                  <span className="font-medium">{formData.accountNumber}</span>
                </div>
              )}
              {formData.sheba && (
                <div className="flex justify-between">
                  <span className="text-secondary">شماره شبا:</span>
                  <span className="font-medium">IR{formData.sheba}</span>
                </div>
              )}
            </div>
            
            <div className="pt-4 flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => setStep('form')}
                disabled={isProcessing}
              >
                ویرایش اطلاعات
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={isProcessing}
              >
                {isProcessing ? 'در حال پردازش...' : 'تایید و ذخیره'}
              </Button>
            </div>
          </div>
        )}
        
        {step === 'success' && (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-success/10 text-success flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>
            <p className="text-secondary">
              کارت بانکی با موفقیت به حساب کاربری شما اضافه شد و می‌توانید از آن برای تراکنش‌های مالی استفاده کنید.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
} 