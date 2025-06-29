"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  User,
  Shield,
  Lock,
  Bell,
  Upload,
  Phone,
  Mail,
  Edit,
  Save,
  X,
} from "lucide-react";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "امیرحسین",
    lastName: "محمدی",
    email: "user@example.com",
    phone: "09123456789",
    nationalId: "0123456789",
    birthday: "1370/05/12",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="space-y-6 sm:space-y-8 p-4 max-w-7xl mx-auto">
        <div className="pt-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            پروفایل کاربری
          </h1>
          <p className="text-gray-700 font-medium mt-1 text-sm sm:text-base">
            مدیریت اطلاعات شخصی و تنظیمات حساب
          </p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="w-full bg-gray-100 p-1 rounded-xl mb-4 sm:mb-6">
            <TabsTrigger
              value="profile"
              className="flex-1 text-gray-600 font-medium data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm data-[state=inactive]:hover:text-gray-800 data-[state=inactive]:hover:bg-gray-50 transition-all duration-200 rounded-lg text-xs sm:text-sm"
            >
              <User className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">اطلاعات شخصی</span>
              <span className="sm:hidden">پروفایل</span>
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="flex-1 text-gray-600 font-medium data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm data-[state=inactive]:hover:text-gray-800 data-[state=inactive]:hover:bg-gray-50 transition-all duration-200 rounded-lg text-xs sm:text-sm"
            >
              <Shield className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">امنیت و حریم خصوصی</span>
              <span className="sm:hidden">امنیت</span>
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="flex-1 text-gray-600 font-medium data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm data-[state=inactive]:hover:text-gray-800 data-[state=inactive]:hover:bg-gray-50 transition-all duration-200 rounded-lg text-xs sm:text-sm"
            >
              <Bell className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">اعلان‌ها</span>
              <span className="sm:hidden">اعلان</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
              <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-blue-400 to-blue-600"></div>
                <div className="p-4 sm:p-6 flex flex-col items-center">
                  <div className="relative group">
                    <Avatar className="w-20 h-20 sm:w-24 sm:h-24 border-4 border-white shadow-md">
                      <AvatarFallback className="text-lg sm:text-xl bg-blue-600 text-white">
                        {formData.firstName.charAt(0) +
                          formData.lastName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute inset-0 bg-black/30 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                      <Upload className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                  </div>

                  <h2 className="text-lg sm:text-xl font-bold mt-4 text-gray-900 text-center">
                    {formData.firstName} {formData.lastName}
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">{formData.phone}</p>

                  <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full mt-4 sm:mt-6">
                    <div className="p-3 bg-blue-50 rounded-xl text-center">
                      <p className="text-xs text-gray-500">کیف پول</p>
                      <p className="font-bold text-blue-700 mt-1 text-sm sm:text-base">
                        ۳,۵۰۰,۰۰۰
                      </p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-xl text-center">
                      <p className="text-xs text-gray-500">اعتبار</p>
                      <p className="font-bold text-purple-700 mt-1 text-sm sm:text-base">
                        ۱۵,۰۰۰,۰۰۰
                      </p>
                    </div>
                  </div>

                  <div className="w-full mt-4 sm:mt-6 space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-500">ایمیل</span>
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-gray-900 truncate ml-2">
                        {formData.email}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-500">موبایل</span>
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-gray-900">
                        {formData.phone}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-green-400 to-green-600"></div>
                <div className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 sm:mb-6">
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5 text-green-600" />
                      <h3 className="text-lg font-semibold text-gray-900">
                        اطلاعات شخصی
                      </h3>
                    </div>
                    {!isEditing ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(true)}
                        className="gap-1 border-gray-300 hover:border-blue-600 hover:text-blue-600"
                      >
                        <Edit className="h-4 w-4" />
                        <span className="hidden sm:inline">ویرایش اطلاعات</span>
                        <span className="sm:hidden">ویرایش</span>
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setIsEditing(false)}
                          className="gap-1 hover:bg-gray-100"
                        >
                          <X className="h-4 w-4" />
                          <span className="hidden sm:inline">انصراف</span>
                        </Button>
                        <Button
                          className="bg-blue-600 hover:bg-blue-700 gap-1"
                          size="sm"
                          onClick={handleSave}
                        >
                          <Save className="h-4 w-4" />
                          <span className="hidden sm:inline">ذخیره</span>
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        نام
                      </label>
                      {isEditing ? (
                        <Input
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl"
                        />
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-xl text-gray-900">
                          {formData.firstName}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        نام خانوادگی
                      </label>
                      {isEditing ? (
                        <Input
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl"
                        />
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-xl text-gray-900">
                          {formData.lastName}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ایمیل
                      </label>
                      {isEditing ? (
                        <Input
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl"
                        />
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-xl text-gray-900">
                          {formData.email}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        شماره موبایل
                      </label>
                      {isEditing ? (
                        <Input
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl"
                        />
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-xl text-gray-900">
                          {formData.phone}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        کد ملی
                      </label>
                      {isEditing ? (
                        <Input
                          name="nationalId"
                          value={formData.nationalId}
                          onChange={handleInputChange}
                          className="border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl"
                        />
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-xl text-gray-900">
                          {formData.nationalId}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        تاریخ تولد
                      </label>
                      {isEditing ? (
                        <Input
                          name="birthday"
                          value={formData.birthday}
                          onChange={handleInputChange}
                          className="border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl"
                        />
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-xl text-gray-900">
                          {formData.birthday}
                        </div>
                      )}
                    </div>
                  </div>

                  {isEditing && (
                    <Button
                      className="mt-6 w-full bg-blue-600 hover:bg-blue-700"
                      onClick={handleSave}
                    >
                      ذخیره تغییرات
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="security">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-orange-400 to-orange-600"></div>
              <div className="p-4 sm:p-6">
                <div className="flex items-center gap-2 mb-4 sm:mb-6">
                  <Shield className="h-5 w-5 text-orange-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    امنیت و حریم خصوصی
                  </h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4">
                      تغییر رمز عبور
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div className="lg:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          رمز عبور فعلی
                        </label>
                        <Input
                          type="password"
                          placeholder="رمز عبور فعلی خود را وارد کنید"
                          className="border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          رمز عبور جدید
                        </label>
                        <Input
                          type="password"
                          placeholder="رمز عبور جدید را وارد کنید"
                          className="border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          تکرار رمز عبور جدید
                        </label>
                        <Input
                          type="password"
                          placeholder="رمز عبور جدید را تکرار کنید"
                          className="border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl"
                        />
                      </div>
                    </div>
                    <Button className="mt-4 bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                      تغییر رمز عبور
                    </Button>
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4">
                      احراز هویت دو مرحله‌ای
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm sm:text-base">
                      با فعال‌سازی احراز هویت دو مرحله‌ای، امنیت حساب کاربری خود
                      را افزایش دهید. در هر بار ورود، علاوه بر رمز عبور، کد
                      تأیید به شماره موبایل شما ارسال خواهد شد.
                    </p>
                    <Button
                      variant="outline"
                      className="gap-2 border-gray-300 hover:border-blue-600 hover:text-blue-600 w-full sm:w-auto"
                    >
                      <Lock className="h-4 w-4" />
                      <span className="text-sm sm:text-base">
                        فعال‌سازی احراز هویت دو مرحله‌ای
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notifications">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-purple-400 to-purple-600"></div>
              <div className="p-4 sm:p-6">
                <div className="flex items-center gap-2 mb-4 sm:mb-6">
                  <Bell className="h-5 w-5 text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    تنظیمات اعلان‌ها
                  </h3>
                </div>

                <div className="space-y-6">
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-6">
                    <p className="text-gray-700 text-sm sm:text-base">
                      با تنظیم اعلان‌ها، از آخرین وضعیت حساب، تراکنش‌ها و اقساط
                      خود مطلع شوید.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-900 text-sm sm:text-base">
                      اعلان‌های پیامکی
                    </h3>
                    <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-xl">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-800 text-sm sm:text-base">
                          اعلان تراکنش‌ها
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">
                          دریافت پیامک برای هر تراکنش
                        </p>
                      </div>
                      <div className="ml-4">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            defaultChecked
                          />
                          <div className="relative w-10 h-5 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-xl">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-800 text-sm sm:text-base">
                          یادآوری اقساط
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">
                          دریافت پیامک یادآوری قبل از سررسید اقساط
                        </p>
                      </div>
                      <div className="ml-4">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            defaultChecked
                          />
                          <div className="relative w-10 h-5 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-6 border-t border-gray-200">
                    <h3 className="font-medium text-gray-900 text-sm sm:text-base">
                      اعلان‌های ایمیلی
                    </h3>
                    <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-xl">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-800 text-sm sm:text-base">
                          گزارش ماهانه
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">
                          دریافت گزارش ماهانه تراکنش‌ها و اقساط
                        </p>
                      </div>
                      <div className="ml-4">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            defaultChecked
                          />
                          <div className="relative w-10 h-5 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-xl">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-800 text-sm sm:text-base">
                          خبرنامه و پیشنهادات
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">
                          دریافت اخبار، پیشنهادات و تخفیف‌های ویژه
                        </p>
                      </div>
                      <div className="ml-4">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="relative w-10 h-5 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <Button className="mt-6 bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                    ذخیره تنظیمات
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
