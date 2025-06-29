"use client";

import { useState, useEffect } from "react";
import { Star, X } from "lucide-react";
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
      } catch {
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
    } catch {
      alert('خطا در ثبت نظر. لطفاً دوباره تلاش کنید.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl p-4 sm:p-6 max-w-md w-full max-h-[90vh] overflow-y-auto relative animate-in slide-in-from-top-4 duration-300">
        <button
          onClick={onClose}
          className="absolute top-3 left-3 sm:top-4 sm:left-4 text-gray-400 hover:text-gray-600 p-1"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center mb-4 sm:mb-6">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <Star className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
            نظر شما مهم است
          </h3>
          <p className="text-gray-600 text-sm sm:text-base">
            تجربه خود را با دیگران به اشتراک بگذارید
          </p>
        </div>

        <form onSubmit={handleReviewSubmit} className="space-y-4">
          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              امتیاز شما
            </label>
            <div className="flex justify-center gap-1 sm:gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setReviewData(prev => ({ ...prev, rating: star }))}
                  className="p-1 sm:p-2 hover:scale-110 transition-transform touch-manipulation"
                >
                  <Star
                    className={`w-6 h-6 sm:w-8 sm:h-8 ${
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
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
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
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm sm:text-base"
              required
            />
            <div className="text-xs text-gray-500 mt-1">
              حداقل ۱۰ کاراکتر ({reviewData.comment.length}/200)
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="flex-1 py-3 text-sm sm:text-base"
            >
              انصراف
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 py-3 text-sm sm:text-base"
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