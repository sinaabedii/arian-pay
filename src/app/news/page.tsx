"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  Clock,
  User,
  ArrowRight,
  Search,
  TrendingUp,
  Eye,
  BookOpen,
  Tag,
  ChevronRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Sample news data - در محیط واقعی از API دریافت می‌شود
const featuredNews = {
  id: 1,
  title: "آینده پرداخت‌های دیجیتال در ایران: روندها و فرصت‌ها",
  excerpt: "بررسی جامع تحولات صنعت پرداخت‌های دیجیتال در ایران و تأثیر آن بر اقتصاد کشور. نگاهی به آمار و ارقام جدید و پیش‌بینی روندهای آینده.",
  content: "صنعت پرداخت‌های دیجیتال در ایران طی سال‌های اخیر رشد چشمگیری داشته است...",
  image: "/news/3cosc5wx.png",
  author: "تیم تحلیل سعید پی",
  date: "۱۴۰۳/۰۸/۱۵",
  readTime: "۸ دقیقه",
  views: "۲۱,۴۳۰",
  category: "تحلیل بازار",
  tags: ["پرداخت دیجیتال", "فینتک", "اقتصاد", "تکنولوژی"],
  slug: "digital-payments-future-iran"
};

const newsCategories = [
  { name: "همه", count: 156, active: true },
  { name: "تحلیل بازار", count: 45 },
  { name: "اخبار شرکت", count: 32 },
  { name: "راهنمای کاربری", count: 28 },
  { name: "فینتک", count: 51 },
];

const newsArticles = [
  {
    id: 2,
    title: "راهنمای کامل استفاده از خدمات اعتباری سعید پی",
    excerpt: "آموزش گام به گام نحوه استفاده از تمامی خدمات اعتباری ارائه شده توسط سعید پی برای کاربران جدید و باتجربه.",
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
    excerpt: "گزارش آماری از رشد چشمگیر پرداخت‌های آنلاین در کشور و تأثیر پلتفرم‌های نوین بر این رشد.",
    image: "/news/z4gw6bi6.png",
    author: "علی رضایی",
    date: "۱۴۰۳/۰۸/۱۰",
    readTime: "۳ دقیقه",
    views: "۱۵,۶۴۰",
    category: "تحلیل بازار",
    slug: "online-transactions-growth"
  },
  {
    id: 4,
    title: "معرفی قابلیت‌های جدید پنل کاربری سعید پی",
    excerpt: "بررسی امکانات تازه اضافه شده به پنل کاربری و نحوه استفاده بهینه از آنها برای مدیریت بهتر امور مالی.",
    image: "/news/saeed-pay.png",
    author: "سارا کریمی",
    date: "۱۴۰۳/۰۸/۰۸",
    readTime: "۶ دقیقه",
    views: "۶,۸۹۰",
    category: "اخبار شرکت",
    slug: "new-dashboard-features"
  },
  {
    id: 5,
    title: "امنیت در تراکنش‌های آنلاین: نکات طلایی",
    excerpt: "راهکارها و توصیه‌های امنیتی برای انجام تراکنش‌های مالی ایمن در فضای دیجیتال و محافظت از اطلاعات شخصی.",
    image: "/news/psda4341.png",
    author: "محمد نوری",
    date: "۱۴۰۳/۰۸/۰۵",
    readTime: "۷ دقیقه",
    views: "۱۲,۴۵۰",
    category: "راهنمای کاربری",
    slug: "online-security-tips"
  },
  {
    id: 6,
    title: "همکاری سعید پی با بانک‌های معتبر کشور",
    excerpt: "اعلام شراکت استراتژیک با مهم‌ترین بانک‌های کشور برای ارائه خدمات بهتر و گسترده‌تر به کاربران.",
    image: "/news/j87t3q03.png",
    author: "فاطمه موسوی",
    date: "۱۴۰۳/۰۸/۰۲",
    readTime: "۴ دقیقه",
    views: "۱۸,۷۲۰",
    category: "اخبار شرکت",
    slug: "banking-partnerships"
  }
];

export default function NewsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("همه");

  const filteredArticles = newsArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "همه" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      {/* SEO Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "مجله سعید پی",
            "description": "آخرین اخبار و مقالات در زمینه فینتک، پرداخت‌های دیجیتال و خدمات مالی",
            "url": "https://saeedpay.com/news",
            "publisher": {
              "@type": "Organization",
              "name": "سعید پی",
              "logo": {
                "@type": "ImageObject",
                "url": "https://saeedpay.com/logo.png"
              }
            },
            "blogPost": newsArticles.map(article => ({
              "@type": "BlogPosting",
              "headline": article.title,
              "description": article.excerpt,
              "author": {
                "@type": "Person",
                "name": article.author
              },
              "datePublished": article.date,
              "url": `https://saeedpay.com/news/${article.slug}`
            }))
          })
        }}
      />

      {/* Header Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              مجله 
              <span className="text-blue-200"> سعید پی</span>
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8 leading-relaxed">
              آخرین اخبار، تحلیل‌ها و راهنماهای عملی در زمینه فینتک و پرداخت‌های دیجیتال
            </p>
            
            {/* Search Box */}
            <div className="max-w-lg mx-auto relative">
              <div className="relative">
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="جستجو در مقالات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pr-12 pl-4 py-3 sm:py-4 rounded-xl bg-white/10 backdrop-blur border border-white/20 text-white placeholder:text-blue-200 focus:bg-white focus:text-gray-900 focus:placeholder:text-gray-500 transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="border-b bg-white sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-4 overflow-x-auto scrollbar-hide">
            {newsCategories.map((category) => (
              <Button
                key={category.name}
                variant={selectedCategory === category.name ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.name)}
                className={`whitespace-nowrap transition-all ${
                  selectedCategory === category.name
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "hover:bg-blue-50"
                }`}
              >
                {category.name}
                <Badge variant="secondary" className="mr-2 text-xs">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Featured Article */}
        <section className="mb-12 sm:mb-16">
          <div className="flex items-center gap-2 mb-6 sm:mb-8">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">مقاله ویژه</h2>
          </div>

          <article className="bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
              <div className="relative overflow-hidden">
                <Image
                  src={featuredNews.image}
                  alt={featuredNews.title}
                  width={800}
                  height={400}
                  className="w-full h-64 sm:h-80 lg:h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-blue-600 hover:bg-blue-700 text-white">
                    {featuredNews.category}
                  </Badge>
                </div>
              </div>
              
              <div className="p-6 sm:p-8 flex flex-col justify-center">
                <div className="space-y-4 sm:space-y-6">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight hover:text-blue-600 transition-colors">
                    <Link href={`/news/${featuredNews.slug}`}>
                      {featuredNews.title}
                    </Link>
                  </h3>
                  
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    {featuredNews.excerpt}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{featuredNews.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{featuredNews.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{featuredNews.readTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{featuredNews.views}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {featuredNews.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        <Tag className="w-3 h-3 ml-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Link href={`/news/${featuredNews.slug}`}>
                    <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                      <BookOpen className="w-4 h-4 ml-2" />
                      مطالعه کامل مقاله
                      <ArrowRight className="w-4 h-4 mr-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </section>

        {/* Articles Grid */}
        <section>
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">آخرین مقالات</h2>
            <div className="text-sm text-gray-500">
              {filteredArticles.length} مقاله
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    width={400}
                    height={250}
                    className="w-full h-48 sm:h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-blue-600/90 backdrop-blur text-white text-xs">
                      {article.category}
                    </Badge>
                  </div>
                </div>

                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
                    <Link href={`/news/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h3>

                  <p className="text-gray-600 text-sm sm:text-base mb-4 leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{article.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{article.readTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span>{article.views}</span>
                      </div>
                    </div>
                  </div>

                  <Link href={`/news/${article.slug}`}>
                    <Button
                      variant="outline"
                      className="w-full text-blue-600 border-blue-200 hover:bg-blue-50 hover:border-blue-300 rounded-lg transition-all"
                    >
                      ادامه مطلب
                      <ChevronRight className="w-4 h-4 mr-1" />
                    </Button>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-8 sm:mt-12">
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-3 text-blue-600 border-blue-200 hover:bg-blue-50 hover:border-blue-300 rounded-xl transition-all"
            >
              مشاهده مقالات بیشتر
              <ArrowRight className="w-4 h-4 mr-2" />
            </Button>
          </div>
        </section>
      </div>
    </>
  );
} 