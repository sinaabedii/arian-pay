"use client";

import Link from "next/link";
import Image from "next/image";
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowRight, 
  BookOpen, 
  TrendingUp,
  ChevronRight,
  Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Sample news data - در محیط واقعی از API دریافت می‌شود
const latestNews = [
  {
    id: 1,
    title: "آینده پرداخت‌های دیجیتال در ایران: روندها و فرصت‌ها",
    excerpt: "بررسی جامع تحولات صنعت پرداخت‌های دیجیتال در ایران و تأثیر آن بر اقتصاد کشور...",
    image: "/news/3cosc5wx.png",
    author: "تیم تحلیل سعید پی",
    date: "۱۴۰۳/۰۸/۱۵",
    readTime: "۸ دقیقه",
    views: "۲۱,۴۳۰",
    category: "تحلیل بازار",
    slug: "digital-payments-future-iran"
  },
  {
    id: 2,
    title: "راهنمای کامل استفاده از خدمات اعتباری سعید پی",
    excerpt: "آموزش گام به گام نحوه استفاده از تمامی خدمات اعتباری ارائه شده توسط سعید پی...",
    image: "/news/saeed-pay.png",
    author: "مریم احمدی",
    date: "۱۴۰۳/۰۸/۱۲",
    readTime: "۵ دقیقه",
    views: "۸,۲۳۰",
    category: "راهنمای کاربری",
    slug: "credit-services-guide"
  },
  {
    id: 3,
    title: "افزایش ۴۰ درصدی تراکنش‌های آنلاین در شهریور ۱۴۰۳",
    excerpt: "گزارش آماری از رشد چشمگیر پرداخت‌های آنلاین در کشور و تأثیر پلتفرم‌های نوین...",
    image: "/news/z4gw6bi6.png",
    author: "علی رضایی",
    date: "۱۴۰۳/۰۸/۱۰",
    readTime: "۳ دقیقه",
    views: "۱۵,۶۴۰",
    category: "تحلیل بازار",
    slug: "online-transactions-growth"
  }
];

export default function NewsSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            <Badge variant="outline" className="text-blue-600 border-blue-200">
              مجله سعید پی
            </Badge>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            آخرین اخبار و 
            <span className="text-blue-600"> مقالات</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            از جدیدترین تحولات صنعت فینتک، راهنماهای کاربردی و تحلیل‌های بازار با خبر شوید
          </p>
        </div>

        {/* News Grid */}
        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {/* Featured Article - First Article */}
          <div className="lg:col-span-2">
            <article className="bg-gradient-to-br from-blue-50 to-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 h-full">
              <div className="flex flex-col lg:flex-row h-full">
                <div className="lg:w-1/2 relative overflow-hidden">
                  <Image
                    src={latestNews[0].image}
                    alt={latestNews[0].title}
                    width={400}
                    height={250}
                    className="w-full h-64 lg:h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-blue-600 hover:bg-blue-700 text-white">
                      {latestNews[0].category}
                    </Badge>
                  </div>
                </div>
                
                <div className="lg:w-1/2 p-6 sm:p-8 flex flex-col justify-center">
                  <div className="space-y-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight hover:text-blue-600 transition-colors">
                      <Link href={`/news/${latestNews[0].slug}`}>
                        {latestNews[0].title}
                      </Link>
                    </h3>
                    
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed line-clamp-3">
                      {latestNews[0].excerpt}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>{latestNews[0].author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{latestNews[0].date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{latestNews[0].readTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span>{latestNews[0].views}</span>
                      </div>
                    </div>

                    <Link href={`/news/${latestNews[0].slug}`}>
                      <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                        <BookOpen className="w-4 h-4 ml-2" />
                        مطالعه مقاله
                        <ArrowRight className="w-4 h-4 mr-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          </div>

          {/* Side Articles */}
          <div className="space-y-6">
            {latestNews.slice(1, 3).map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    width={400}
                    height={200}
                    className="w-full h-40 sm:h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-blue-600/90 backdrop-blur text-white text-xs">
                      {article.category}
                    </Badge>
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                    <Link href={`/news/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h3>

                  <p className="text-gray-600 text-sm mb-3 leading-relaxed line-clamp-2">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span className="truncate max-w-20">{article.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{article.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  <Link href={`/news/${article.slug}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-blue-600 border-blue-200 hover:bg-blue-50 hover:border-blue-300 rounded-lg transition-all"
                    >
                      ادامه مطلب
                      <ChevronRight className="w-3 h-3 mr-1" />
                    </Button>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link href="/news">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <BookOpen className="w-5 h-5 ml-2" />
              مشاهده همه مقالات
              <ArrowRight className="w-5 h-5 mr-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
} 