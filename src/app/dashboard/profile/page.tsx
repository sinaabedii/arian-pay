"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  Shield,
  Lock,
  Bell,
  Settings,
  Upload,
  Phone,
  Mail
} from "lucide-react";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  
  // مقادیر اولیه فرم
  const [formData, setFormData] = useState({
    firstName: "امیرحسین",
    lastName: "محمدی",
    email: "user@example.com",
    phone: "09123456789",
    nationalId: "0123456789",
    birthday: "1370/05/12"
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSave = () => {
    // در اینجا می‌توان منطق ذخیره اطلاعات را اضافه کرد
    setIsEditing(false);
  };
  
  return (
    <div className="space-y-8">
      {/* هدر صفحه */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">پروفایل کاربری</h1>
        <p className="text-gray-600 mt-1">مدیریت اطلاعات شخصی و تنظیمات حساب</p>
      </div>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="profile">اطلاعات شخصی</TabsTrigger>
          <TabsTrigger value="security">امنیت و حریم خصوصی</TabsTrigger>
          <TabsTrigger value="notifications">اعلان‌ها</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* کارت پروفایل */}
            <Card className="md:col-span-1 border-0 shadow-sm hover:shadow-md transition-shadow overflow-hidden rounded-xl">
              <div className="h-1.5 bg-gradient-to-r from-blue-400 to-blue-600"></div>
              <CardContent className="p-6 flex flex-col items-center">
                <div className="relative group">
                  <Avatar className="w-24 h-24 border-4 border-white shadow-md">
                    <AvatarFallback className="text-xl bg-blue-600 text-white">
                      {formData.firstName.charAt(0) + formData.lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute inset-0 bg-black/30 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                    <Upload className="h-6 w-6 text-white" />
                  </div>
                </div>
                
                <h2 className="text-xl font-bold mt-4 text-gray-900">
                  {formData.firstName} {formData.lastName}
                </h2>
                <p className="text-gray-500 text-sm mt-1">{formData.phone}</p>
                
                <div className="grid grid-cols-2 gap-4 w-full mt-6">
                  <div className="p-3 bg-blue-50 rounded-lg text-center">
                    <p className="text-xs text-gray-500">کیف پول</p>
                    <p className="font-bold text-blue-700 mt-1">۳,۵۰۰,۰۰۰</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg text-center">
                    <p className="text-xs text-gray-500">اعتبار</p>
                    <p className="font-bold text-purple-700 mt-1">۱۵,۰۰۰,۰۰۰</p>
                  </div>
                </div>
                
                <div className="w-full mt-6 space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-500">ایمیل</span>
                    </div>
                    <span className="text-sm font-medium">{formData.email}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-500">موبایل</span>
                    </div>
                    <span className="text-sm font-medium">{formData.phone}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* کارت اطلاعات شخصی */}
            <Card className="md:col-span-2 border-0 shadow-sm hover:shadow-md transition-shadow overflow-hidden rounded-xl">
              <div className="h-1.5 bg-gradient-to-r from-blue-400 to-blue-600"></div>
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-600" />
                  اطلاعات شخصی
                </CardTitle>
                {!isEditing ? (
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                    ویرایش اطلاعات
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>
                      انصراف
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700" size="sm" onClick={handleSave}>
                      ذخیره تغییرات
                    </Button>
                  </div>
                )}
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">نام</label>
                    {isEditing ? (
                      <Input 
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <div className="p-2.5 bg-gray-50 rounded-md text-gray-900">{formData.firstName}</div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">نام خانوادگی</label>
                    {isEditing ? (
                      <Input 
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <div className="p-2.5 bg-gray-50 rounded-md text-gray-900">{formData.lastName}</div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ایمیل</label>
                    {isEditing ? (
                      <Input 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <div className="p-2.5 bg-gray-50 rounded-md text-gray-900">{formData.email}</div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">شماره موبایل</label>
                    {isEditing ? (
                      <Input 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <div className="p-2.5 bg-gray-50 rounded-md text-gray-900">{formData.phone}</div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">کد ملی</label>
                    {isEditing ? (
                      <Input 
                        name="nationalId"
                        value={formData.nationalId}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <div className="p-2.5 bg-gray-50 rounded-md text-gray-900">{formData.nationalId}</div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">تاریخ تولد</label>
                    {isEditing ? (
                      <Input 
                        name="birthday"
                        value={formData.birthday}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <div className="p-2.5 bg-gray-50 rounded-md text-gray-900">{formData.birthday}</div>
                    )}
                  </div>
                </div>
                
                {isEditing && (
                  <Button className="mt-6 w-full bg-blue-600 hover:bg-blue-700" onClick={handleSave}>
                    ذخیره تغییرات
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="security">
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow overflow-hidden rounded-xl">
            <div className="h-1.5 bg-gradient-to-r from-blue-400 to-blue-600"></div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                امنیت و حریم خصوصی
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">تغییر رمز عبور</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">رمز عبور فعلی</label>
                      <Input type="password" placeholder="رمز عبور فعلی خود را وارد کنید" />
                    </div>
                    <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">رمز عبور جدید</label>
                        <Input type="password" placeholder="رمز عبور جدید را وارد کنید" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">تکرار رمز عبور جدید</label>
                        <Input type="password" placeholder="رمز عبور جدید را تکرار کنید" />
                      </div>
                    </div>
                  </div>
                  <Button className="mt-4 bg-blue-600 hover:bg-blue-700">تغییر رمز عبور</Button>
                </div>
                
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">احراز هویت دو مرحله‌ای</h3>
                  <p className="text-gray-600 mb-4">
                    با فعال‌سازی احراز هویت دو مرحله‌ای، امنیت حساب کاربری خود را افزایش دهید.
                    در هر بار ورود، علاوه بر رمز عبور، کد تأیید به شماره موبایل شما ارسال خواهد شد.
                  </p>
                  <Button variant="outline" className="gap-2">
                    <Lock className="h-4 w-4" />
                    فعال‌سازی احراز هویت دو مرحله‌ای
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow overflow-hidden rounded-xl">
            <div className="h-1.5 bg-gradient-to-r from-blue-400 to-blue-600"></div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Bell className="h-5 w-5 text-blue-600" />
                تنظیمات اعلان‌ها
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
                  <p className="text-gray-700">
                    با تنظیم اعلان‌ها، از آخرین وضعیت حساب، تراکنش‌ها و اقساط خود مطلع شوید.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">اعلان‌های پیامکی</h3>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-800">اعلان تراکنش‌ها</h4>
                      <p className="text-sm text-gray-500 mt-1">دریافت پیامک برای هر تراکنش</p>
                    </div>
                    <div className="form-switch">
                      <input type="checkbox" id="sms-transactions" className="hidden" defaultChecked />
                      <label htmlFor="sms-transactions" className="relative inline-block w-10 h-5 bg-gray-300 rounded-full cursor-pointer transition-colors duration-200 ease-in-out">
                        <span className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out transform translate-x-5"></span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-800">یادآوری اقساط</h4>
                      <p className="text-sm text-gray-500 mt-1">دریافت پیامک یادآوری قبل از سررسید اقساط</p>
                    </div>
                    <div className="form-switch">
                      <input type="checkbox" id="sms-installments" className="hidden" defaultChecked />
                      <label htmlFor="sms-installments" className="relative inline-block w-10 h-5 bg-gray-300 rounded-full cursor-pointer transition-colors duration-200 ease-in-out">
                        <span className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out transform translate-x-5"></span>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4 pt-6 border-t border-gray-200">
                  <h3 className="font-medium text-gray-900">اعلان‌های ایمیلی</h3>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-800">گزارش ماهانه</h4>
                      <p className="text-sm text-gray-500 mt-1">دریافت گزارش ماهانه تراکنش‌ها و اقساط</p>
                    </div>
                    <div className="form-switch">
                      <input type="checkbox" id="email-monthly" className="hidden" defaultChecked />
                      <label htmlFor="email-monthly" className="relative inline-block w-10 h-5 bg-gray-300 rounded-full cursor-pointer transition-colors duration-200 ease-in-out">
                        <span className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out transform translate-x-5"></span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-800">خبرنامه و پیشنهادات</h4>
                      <p className="text-sm text-gray-500 mt-1">دریافت اخبار، پیشنهادات و تخفیف‌های ویژه</p>
                    </div>
                    <div className="form-switch">
                      <input type="checkbox" id="email-newsletter" className="hidden" />
                      <label htmlFor="email-newsletter" className="relative inline-block w-10 h-5 bg-gray-300 rounded-full cursor-pointer transition-colors duration-200 ease-in-out">
                        <span className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out"></span>
                      </label>
                    </div>
                  </div>
                </div>
                
                <Button className="mt-4 bg-blue-600 hover:bg-blue-700">ذخیره تنظیمات</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 