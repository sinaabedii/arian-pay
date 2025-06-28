"use client";

import { Star, Quote, ThumbsUp, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface TestimonialsSectionProps {
  onReviewClick: () => void;
}

interface Testimonial {
  id: number;
  name: string;
  city: string;
  rating: number;
  comment: string;
  category: string;
  date: string;
  helpful: number;
}

const TestimonialsSection = ({ onReviewClick }: TestimonialsSectionProps) => {
  const [testimonials] = useState<Testimonial[]>([
    {
      id: 1,
      name: "علی احمدی",
      city: "تهران",
      rating: 5,
      comment: "واقعاً فوق‌العاده! اعتبار من تو ۵ دقیقه تایید شد. قیمت‌ها هم خیلی مناسب‌تر از بانک‌ها بود. حتماً پیشنهاد می‌کنم.",
      category: "موبایل و لپ‌تاپ",
      date: "۲ روز پیش",
      helpful: 23
    },
    {
      id: 2,
      name: "مریم کریمی",
      city: "اصفهان",
      rating: 5,
      comment: "خیلیمون راضی هستیم از خدمات سعید پی. لوازم خانگی با اقساط راحت خریدیم. پشتیبانی هم عالی.",
      category: "لوازم خانگی",
      date: "۵ روز پیش",
      helpful: 18
    },
    {
      id: 3,
      name: "رضا محمدی",
      city: "شیراز",
      rating: 4,
      comment: "پروسه خیلی سریع و راحت بود. فقط کاش فروشگاه‌های بیشتری طرف قرارداد بودن. به هرحال پیشنهاد می‌کنم.",
      category: "پوشاک",
      date: "۱ هفته پیش",
      helpful: 15
    },
  ]);

  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonialIndex((prev) => 
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  const averageRating = testimonials.reduce((acc, curr) => acc + curr.rating, 0) / testimonials.length;
  const totalReviews = testimonials.length;

  return (
    <section className="px-4 py-12 lg:py-16 bg-gradient-to-br from-blue-50 via-purple-50/30 to-pink-50/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-yellow-50 text-yellow-700 px-4 py-2 rounded-full mb-4">
            <Star className="h-4 w-4" />
            <span className="text-sm font-medium">نظرات مشتریان</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            مشتریان چه می‌گویند؟
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            تجربه واقعی کاربران سعید پی از خرید اقساطی آسان و سریع
          </p>

          {/* Overall Rating */}
          <div className="inline-flex items-center gap-4 bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-500 mb-1">
                {averageRating.toFixed(1)}
              </div>
              <div className="flex justify-center gap-1 mb-1">
                {renderStars(Math.round(averageRating))}
              </div>
              <div className="text-sm text-gray-600">
                از {totalReviews.toLocaleString('fa-IR')} نظر
              </div>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">98.5%</div>
              <div className="text-sm text-gray-600">رضایت مشتریان</div>
            </div>
          </div>
        </div>

        {/* Featured Testimonial */}
        <div className="mb-12">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 max-w-4xl mx-auto relative overflow-hidden">
            <div className="absolute top-4 right-4 text-blue-100">
              <Quote className="h-16 w-16" />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {testimonials[currentTestimonialIndex].name[0]}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {testimonials[currentTestimonialIndex].name}
                  </h3>
                  <p className="text-gray-600">
                    {testimonials[currentTestimonialIndex].city} • {testimonials[currentTestimonialIndex].category}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex gap-1">
                      {renderStars(testimonials[currentTestimonialIndex].rating)}
                    </div>
                    <span className="text-sm text-gray-500">
                      {testimonials[currentTestimonialIndex].date}
                    </span>
                  </div>
                </div>
              </div>

              <blockquote className="text-lg text-gray-700 leading-relaxed mb-4">
                "{testimonials[currentTestimonialIndex].comment}"
              </blockquote>

              <div className="flex items-center gap-4 text-sm text-gray-500">
                <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{testimonials[currentTestimonialIndex].helpful} نفر مفید بوده</span>
                </button>
              </div>
            </div>
          </div>

          {/* Testimonial Navigation */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonialIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentTestimonialIndex
                    ? "bg-blue-600 w-8"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* More Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {testimonials.slice(0, 6).map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-500 to-gray-600 rounded-full flex items-center justify-center text-white font-bold">
                  {testimonial.name[0]}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.city}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-3">
                {renderStars(testimonial.rating)}
              </div>

              <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
                {testimonial.comment}
              </p>

              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <span className="text-xs text-gray-500">{testimonial.category}</span>
                <span className="text-xs text-gray-500">{testimonial.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">
            شما هم تجربه خود را به اشتراک بگذارید
          </h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            نظر شما برای بهبود خدمات و کمک به سایر کاربران بسیار مهم است
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={onReviewClick}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-xl font-medium shadow-lg"
            >
              <MessageCircle className="ml-2 h-5 w-5" />
              ثبت نظر جدید
            </Button>
            
            <div className="text-sm text-blue-100">
              یا با تلفن پشتیبانی ۰۲۱-۱۲۳۴۵۶۷۸ تماس بگیرید
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 