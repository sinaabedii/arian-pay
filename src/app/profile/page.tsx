"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Phone, CreditCard, LogOut, Save, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import AppLayout from "@/components/layout/app-layout";
import { useAuthStore } from "@/lib/store/auth-store";

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    name: "",
    phone: "",
    email: "",
    nationalId: "",
  });
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  // اگر کاربر لاگین نکرده باشد، به صفحه ورود هدایت می‌شود
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else if (user) {
      setEditedProfile({
        name: user.name || "",
        phone: user.phone || "",
        email: user.email || "",
        nationalId: user.nationalId || "",
      });
    }
  }, [isAuthenticated, router, user]);

  if (!user) {
    return null;
  }

  const handleEditToggle = () => {
    if (isEditing) {
      // در اینجا می‌توانیم تغییرات را ذخیره کنیم
      // در حالت واقعی، با API در ارتباط خواهیم بود
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">پروفایل</h1>
          <p className="text-secondary mt-1">مدیریت اطلاعات شخصی و تنظیمات حساب کاربری</p>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                اطلاعات شخصی
              </CardTitle>
              <Button 
                variant={isEditing ? "primary" : "outline"} 
                size="sm" 
                onClick={handleEditToggle}
                className="gap-1"
              >
                {isEditing ? (
                  <>
                    <Save size={16} /> ذخیره تغییرات
                  </>
                ) : (
                  <>
                    <Edit size={16} /> ویرایش اطلاعات
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">نام و نام خانوادگی</label>
                {isEditing ? (
                  <Input 
                    name="name" 
                    value={editedProfile.name} 
                    onChange={handleInputChange} 
                  />
                ) : (
                  <div className="flex items-center gap-2 p-2 bg-secondary-light rounded">
                    <User size={16} className="text-secondary" />
                    <span>{user.name}</span>
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">شماره موبایل</label>
                {isEditing ? (
                  <Input 
                    name="phone" 
                    value={editedProfile.phone} 
                    onChange={handleInputChange} 
                  />
                ) : (
                  <div className="flex items-center gap-2 p-2 bg-secondary-light rounded">
                    <Phone size={16} className="text-secondary" />
                    <span>{user.phone}</span>
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">ایمیل</label>
                {isEditing ? (
                  <Input 
                    name="email" 
                    value={editedProfile.email} 
                    onChange={handleInputChange} 
                  />
                ) : (
                  <div className="flex items-center gap-2 p-2 bg-secondary-light rounded">
                    <Mail size={16} className="text-secondary" />
                    <span>{user.email || "تنظیم نشده"}</span>
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">کد ملی</label>
                {isEditing ? (
                  <Input 
                    name="nationalId" 
                    value={editedProfile.nationalId} 
                    onChange={handleInputChange} 
                  />
                ) : (
                  <div className="flex items-center gap-2 p-2 bg-secondary-light rounded">
                    <CreditCard size={16} className="text-secondary" />
                    <span>{user.nationalId || "تنظیم نشده"}</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              اطلاعات حساب
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">سقف اعتبار</label>
                <div className="flex items-center gap-2 p-2 bg-secondary-light rounded">
                  <span>
                    {user.creditLimit ? 
                      new Intl.NumberFormat("fa-IR").format(user.creditLimit) + " تومان" 
                      : "درخواست نشده"}
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">موجودی کیف پول</label>
                <div className="flex items-center gap-2 p-2 bg-secondary-light rounded">
                  <span>
                    {new Intl.NumberFormat("fa-IR").format(user.walletBalance)} تومان
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2 text-danger">
              <LogOut className="h-5 w-5" />
              خروج از حساب کاربری
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-secondary mb-4">
              با خروج از حساب کاربری، برای استفاده مجدد از خدمات آرین پی نیاز به ورود مجدد خواهید داشت.
            </p>
            <Button 
              variant="danger" 
              onClick={() => setIsLogoutDialogOpen(true)}
              className="gap-1"
            >
              <LogOut size={16} />
              خروج از حساب کاربری
            </Button>
          </CardContent>
        </Card>

        {/* دیالوگ تایید خروج */}
        <Dialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>خروج از حساب کاربری</DialogTitle>
              <DialogDescription>
                آیا از خروج از حساب کاربری خود اطمینان دارید؟
              </DialogDescription>
            </DialogHeader>
            <div className="flex gap-2 justify-end mt-4">
              <Button 
                variant="outline" 
                onClick={() => setIsLogoutDialogOpen(false)}
              >
                انصراف
              </Button>
              <Button 
                variant="danger" 
                onClick={handleLogout}
              >
                خروج
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
} 