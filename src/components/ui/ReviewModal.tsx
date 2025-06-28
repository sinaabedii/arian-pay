"use client";

import { useState, useEffect } from "react";
import { Star, X, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReviewModal = ({ isOpen, onClose }: ReviewModalProps) => {
  const [reviewData, setReviewData] = useState({
    rating: 5,
    comment: "",
    category: "خرید عمومی",
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Check authentication status (simulate)
  useEffect(() => {
    const authData = localStorage.getItem('saeedpay_user');
    if (authData) {
      try {
        const userData = JSON.parse(authData);
        setIsAuthenticated(true);
        setUser(userData);
      } catch (error) {
        localStorage.removeItem('saeedpay_user');
      }
    }
  }, []);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated || !user) {
      window.location.href = '/login?redirect=home&action=review';
      return;
    }

    if (!reviewData.comment.trim()) {
      alert('لطفاً نظر خود را بنویسید.');
      return;
    }

    try {
      // در اینجا API call برای ثبت نظر
      const reviewPayload = {
        ...reviewData,
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        createdAt: new Date().toISOString(),
      };
      
      console.log('Submitting review:', reviewPayload);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      alert('نظر شما با موفقیت ثبت شد! پس از بررسی منتشر خواهد شد.');
      onClose();
      setReviewData({ rating: 5, comment: "", category: "خرید عمومی" });
    } catch (error) {
      alert('خطا در ثبت نظر. لطفاً دوباره تلاش کنید.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full relative animate-in slide-in-from-top-4 duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            نظر شما مهم است
          </h3>
          <p className="text-gray-600">
            تجربه خود را با دیگران به اشتراک بگذارید
          </p>
        </div>

        <form onSubmit={handleReviewSubmit} className="space-y-4">
          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              امتیاز شما
            </label>
            <div className="flex justify-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setReviewData(prev => ({ ...prev, rating: star }))}
                  className="p-1 hover:scale-110 transition-transform"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= reviewData.rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              نوع خرید
            </label>
            <select
              value={reviewData.category}
              onChange={(e) => setReviewData(prev => ({ ...prev, category: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="خرید عمومی">خرید عمومی</option>
              <option value="موبایل و لپ‌تاپ">موبایل و لپ‌تاپ</option>
              <option value="لوازم خانگی">لوازم خانگی</option>
              <option value="پوشاک">پوشاک</option>
              <option value="خودرو">خودرو</option>
              <option value="طلا و جواهرات">طلا و جواهرات</option>
              <option value="سایر">سایر</option>
            </select>
          </div>

          {/* Comment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              نظر شما
            </label>
            <textarea
              value={reviewData.comment}
              onChange={(e) => setReviewData(prev => ({ ...prev, comment: e.target.value }))}
              placeholder="تجربه خود را با ما به اشتراک بگذارید..."
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              required
            />
            <div className="text-xs text-gray-500 mt-1">
              حداقل ۱۰ کاراکتر ({reviewData.comment.length}/200)
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="flex-1"
            >
              انصراف
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              disabled={!reviewData.comment.trim() || reviewData.comment.length < 10}
            >
              <Star className="h-4 w-4 ml-1" />
              ثبت نظر
            </Button>
          </div>

          {/* Privacy Notice */}
          <div className="text-xs text-gray-500 text-center pt-2 border-t border-gray-100">
            نظر شما پس از بررسی و تایید منتشر خواهد شد
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal; 