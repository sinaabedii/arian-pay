"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  Clock,
  User,
  ArrowRight,
  ArrowLeft,
  Share2,
  Tag,
  ChevronRight,
  Home,
  Eye,
  ThumbsUp,
  MessageCircle,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Simple notification function to replace toast
const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
  // Create a simple notification element
  const notification = document.createElement('div');
  notification.className = `fixed top-4 right-4 z-50 px-4 py-2 rounded-lg text-white text-sm transition-all duration-300 ${
    type === 'success' ? 'bg-green-500' : 'bg-red-500'
  }`;
  notification.textContent = message;
  document.body.appendChild(notification);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.remove();
  }, 3000);
};

// Sample article data - در محیط واقعی از API دریافت می‌شود
const articlesData = {
  "digital-payments-future-iran": {
    id: 1,
    title: "آینده پرداخت‌های دیجیتال در ایران: روندها و فرصت‌ها",
    excerpt: "بررسی جامع تحولات صنعت پرداخت‌های دیجیتال در ایران و تأثیر آن بر اقتصاد کشور. نگاهی به آمار و ارقام جدید و پیش‌بینی روندهای آینده.",
    content: `
      <p>صنعت پرداخت‌های دیجیتال در ایران طی سال‌های اخیر رشد چشمگیری داشته است. با توجه به افزایش استفاده از اینترنت و تلفن‌های همراه، این صنعت به یکی از مهم‌ترین بخش‌های اقتصاد دیجیتال کشور تبدیل شده است.</p>

      <h2>رشد چشمگیر تراکنش‌های دیجیتال</h2>
      <p>طبق آمار بانک مرکزی، حجم تراکنش‌های پرداخت الکترونیک در سال ۱۴۰۲ نسبت به سال قبل ۴۵ درصد رشد داشته است. این رشد نشان‌دهنده تغییر رفتار مصرف‌کنندگان و پذیرش بیشتر تکنولوژی‌های پرداخت نوین است.</p>

      <h3>عوامل موثر بر رشد</h3>
      <ul>
        <li>افزایش دسترسی به اینترنت پرسرعت</li>
        <li>گسترش استفاده از گوشی‌های هوشمند</li>
        <li>بهبود زیرساخت‌های پرداخت الکترونیک</li>
        <li>افزایش اعتماد مردم به پرداخت‌های دیجیتال</li>
        <li>تأثیر پاندمی کووید-۱۹ بر تغییر عادات خرید</li>
      </ul>

      <h2>چالش‌ها و فرصت‌ها</h2>
      <p>علی‌رغم رشد قابل توجه، صنعت پرداخت‌های دیجیتال در ایران همچنان با چالش‌هایی مواجه است:</p>

      <h3>چالش‌های اصلی:</h3>
      <ul>
        <li>مسائل امنیتی و حریم خصوصی</li>
        <li>عدم آگاهی کافی برخی از کاربران</li>
        <li>نیاز به بهبود زیرساخت‌های فناوری</li>
        <li>مقررات و قوانین پیچیده</li>
      </ul>

      <h3>فرصت‌های پیش رو:</h3>
      <ul>
        <li>بازار بزرگ و پتانسیل بالای رشد</li>
        <li>پشتیبانی دولت از اقتصاد دیجیتال</li>
        <li>علاقه‌مندی جوانان به استفاده از تکنولوژی</li>
        <li>رشد تجارت الکترونیک</li>
      </ul>

      <h2>نقش سعید پی در توسعه این صنعت</h2>
      <p>سعید پی با ارائه خدمات نوآورانه پرداخت اعتباری و خرید اقساطی، نقش مهمی در توسعه اکوسیستم پرداخت‌های دیجیتال کشور ایفا می‌کند. این پلتفرم با تمرکز بر تجربه کاربری مطلوب و امنیت بالا، به کاهش موانع استفاده از پرداخت‌های دیجیتال کمک می‌کند.</p>

      <h2>پیش‌بینی آینده</h2>
      <p>کارشناسان پیش‌بینی می‌کنند که تا سال ۱۴۰۵، بیش از ۷۰ درصد از تراکنش‌های پرداخت در ایران به صورت دیجیتال انجام خواهد شد. این موضوع نیاز به سرمایه‌گذاری بیشتر در حوزه فناوری و آموزش کاربران را نشان می‌دهد.</p>

      <blockquote>
        <p>"آینده پرداخت‌ها دیجیتال است و ایران با پتانسیل بالای خود می‌تواند در این حوزه پیشرو باشد."</p>
        <cite>- تیم تحلیل سعید پی</cite>
      </blockquote>
    `,
    image: "/news/3cosc5wx.png",
    author: "تیم تحلیل سعید پی",
    date: "۱۴۰۳/۰۸/۱۵",
    readTime: "۸ دقیقه",
    views: "۲۱,۴۳۰",
    likes: "۳۴۵",
    comments: "۲۸",
    category: "تحلیل بازار",
    tags: ["پرداخت دیجیتال", "فینتک", "اقتصاد", "تکنولوژی"],
    slug: "digital-payments-future-iran",
    publishedAt: "2024-11-06T10:30:00Z",
    updatedAt: "2024-11-06T10:30:00Z",
  },
  "credit-services-guide": {
    id: 2,
    title: "راهنمای کامل استفاده از خدمات اعتباری سعید پی",
    excerpt: "آموزش گام به گام نحوه استفاده از تمامی خدمات اعتباری ارائه شده توسط سعید پی، از ثبت‌نام تا تسویه حساب.",
    content: `
      <p>خدمات اعتباری سعید پی به شما امکان خرید اقساطی و پرداخت اعتباری محصولات و خدمات مختلف را فراهم می‌کند. در این راهنما با تمامی مراحل استفاده از این خدمات آشنا خواهید شد.</p>

      <h2>مرحله اول: ثبت‌نام و احراز هویت</h2>
      <p>برای استفاده از خدمات اعتباری سعید پی، ابتدا باید در پلتفرم ثبت‌نام کرده و هویت خود را احراز کنید:</p>

      <h3>مراحل ثبت‌نام:</h3>
      <ol>
        <li>ورود به سایت یا اپلیکیشن سعید پی</li>
        <li>کلیک بر روی دکمه "ثبت‌نام"</li>
        <li>وارد کردن شماره موبایل و تایید کد ارسالی</li>
        <li>تکمیل اطلاعات شخصی (نام، نام خانوادگی، کد ملی)</li>
        <li>آپلود تصاویر کارت ملی و کارت بانکی</li>
        <li>انجام احراز هویت ویدیویی (سلفی ویدیویی)</li>
      </ol>

      <h2>مرحله دوم: بررسی و تایید اعتبار</h2>
      <p>پس از تکمیل فرآیند ثبت‌نام، سیستم هوشمند سعید پی اعتبارسنجی شما را انجام می‌دهد:</p>

      <h3>معیارهای اعتبارسنجی:</h3>
      <ul>
        <li>تاریخچه پرداخت و بازپرداخت قبلی</li>
        <li>میزان درآمد ماهانه</li>
        <li>وضعیت اشتغال</li>
        <li>سابقه بانکی</li>
        <li>امتیاز اعتباری</li>
      </ul>

      <h2>مرحله سوم: استفاده از خدمات</h2>
      <p>پس از تایید اعتبار، می‌توانید از خدمات مختلف استفاده کنید:</p>

      <h3>انواع خدمات اعتباری:</h3>
      <ul>
        <li><strong>خرید اقساطی:</strong> خرید کالا با پرداخت اقساط ماهانه</li>
        <li><strong>پرداخت معوق:</strong> خرید فوری و پرداخت در تاریخ آینده</li>
        <li><strong>تسهیلات نقدی:</strong> دریافت وجه نقد با بازپرداخت اقساطی</li>
        <li><strong>پرداخت قبوض:</strong> پرداخت قبوض با امکان تعویق</li>
      </ul>

      <h2>مرحله چهارم: مدیریت بازپرداخت</h2>
      <p>مدیریت صحیح بازپرداخت‌ها برای حفظ اعتبار بسیار مهم است:</p>

      <h3>روش‌های بازپرداخت:</h3>
      <ul>
        <li>پرداخت خودکار از کارت بانکی</li>
        <li>پرداخت دستی از طریق اپلیکیشن</li>
        <li>واریز به حساب سعید پی</li>
        <li>پرداخت در شعب همکار</li>
      </ul>

      <h2>نکات مهم برای استفاده بهینه</h2>
      
      <h3>توصیه‌های کلیدی:</h3>
      <ul>
        <li>همیشه قبل از خرید، میزان اقساط را محاسبه کنید</li>
        <li>از تاریخ‌های بازپرداخت اطلاع داشته باشید</li>
        <li>در صورت مشکل در پرداخت، سریع با پشتیبانی تماس بگیرید</li>
        <li>اعتبار خود را به تدریج افزایش دهید</li>
        <li>از خریدهای غیرضروری خودداری کنید</li>
      </ul>

      <h2>مزایای استفاده از خدمات اعتباری سعید پی</h2>
      <ul>
        <li>فرآیند سریع و آسان ثبت‌نام</li>
        <li>عدم نیاز به ضامن</li>
        <li>نرخ سود رقابتی</li>
        <li>امکان افزایش تدریجی سقف اعتبار</li>
        <li>پشتیبانی ۲۴ ساعته</li>
        <li>امنیت بالا در تراکنش‌ها</li>
      </ul>

      <blockquote>
        <p>"سعید پی با ارائه خدمات اعتباری مطمئن و سریع، زندگی روزمره شما را آسان‌تر می‌کند."</p>
        <cite>- مریم احمدی، مشاور مالی سعید پی</cite>
      </blockquote>

      <h2>سوالات متداول</h2>
      
      <h3>چقدر طول می‌کشد تا اعتبارم تایید شود؟</h3>
      <p>معمولاً ظرف ۲۴ ساعت پس از تکمیل مدارک، نتیجه اعتبارسنجی اعلام می‌شود.</p>

      <h3>آیا می‌توانم سقف اعتبارم را افزایش دهم؟</h3>
      <p>بله، با پرداخت منظم اقساط و استفاده مثبت از خدمات، سقف اعتبار شما به تدریج افزایش می‌یابد.</p>

      <h3>در صورت تاخیر در پرداخت چه اتفاقی می‌افتد؟</h3>
      <p>تاخیر در پرداخت منجر به اعمال جریمه و کاهش امتیاز اعتباری می‌شود. توصیه می‌کنیم در صورت مشکل، سریع با ما تماس بگیرید.</p>
    `,
    image: "/news/saeed-pay.png",
    author: "مریم احمدی",
    date: "۱۴۰۳/۰۸/۱۲",
    readTime: "۵ دقیقه",
    views: "۸,۲۳۰",
    likes: "۱۲۳",
    comments: "۱۵",
    category: "راهنمای کاربری",
    tags: ["خدمات اعتباری", "راهنما", "آموزش", "خرید اقساطی"],
    slug: "credit-services-guide",
    publishedAt: "2024-11-03T08:15:00Z",
    updatedAt: "2024-11-03T08:15:00Z",
  },
  "online-transactions-growth": {
    id: 3,
    title: "افزایش ۴۰ درصدی تراکنش‌های آنلاین در شهریور ۱۴۰۳",
    excerpt: "گزارش آماری از رشد چشمگیر پرداخت‌های آنلاین در کشور و تأثیر پلتفرم‌های نوین پرداخت بر این رشد.",
    content: `
      <p>طبق جدیدترین گزارش شرکت‌های ارائه‌دهنده خدمات پرداخت الکترونیک، ماه شهریور ۱۴۰۳ شاهد رشد ۴۰ درصدی تراکنش‌های آنلاین نسبت به ماه مشابه سال قبل بوده است. این رشد قابل توجه نشان‌دهنده تغییرات بنیادین در رفتار مصرف‌کنندگان ایرانی است.</p>

      <h2>آمار و ارقام رشد تراکنش‌ها</h2>
      <p>بر اساس آمار منتشر شده، حجم کل تراکنش‌های آنلاین در شهریور ۱۴۰۳ به رقم ۲۸۵ میلیارد تومان رسیده که نسبت به شهریور ۱۴۰۲ معادل ۴۰.۲ درصد رشد را نشان می‌دهد.</p>

      <h3>تفکیک آمار به تفکیک بخش‌ها:</h3>
      <ul>
        <li><strong>خرید آنلاین کالا:</strong> ۱۲۰ میلیارد تومان (۴۲% کل تراکنش‌ها)</li>
        <li><strong>پرداخت قبوض:</strong> ۸۵ میلیارد تومان (۳۰% کل تراکنش‌ها)</li>
        <li><strong>خدمات اعتباری:</strong> ۴۵ میلیارد تومان (۱۶% کل تراکنش‌ها)</li>
        <li><strong>خدمات مالی:</strong> ۳۵ میلیارد تومان (۱۲% کل تراکنش‌ها)</li>
      </ul>

      <h2>عوامل موثر بر رشد</h2>
      <p>چندین عامل در این رشد چشمگیر تراکنش‌های آنلاین نقش داشته‌اند:</p>

      <h3>عوامل فناورانه:</h3>
      <ul>
        <li>بهبود زیرساخت‌های اینترنت پرسرعت</li>
        <li>توسعه اپلیکیشن‌های موبایل کاربرپسند</li>
        <li>افزایش امنیت پرداخت‌های الکترونیک</li>
        <li>ورود تکنولوژی‌های نوین مانند QR Code</li>
      </ul>

      <h3>عوامل اجتماعی-اقتصادی:</h3>
      <ul>
        <li>افزایش آگاهی مردم از مزایای پرداخت دیجیتال</li>
        <li>تغییر سبک زندگی به سمت دیجیتالی شدن</li>
        <li>رشد تجارت الکترونیک</li>
        <li>کاهش استفاده از پول نقد</li>
      </ul>

      <h2>نقش پلتفرم‌های نوین در رشد</h2>
      <p>پلتفرم‌های نوین پرداخت مانند سعید پی نقش بسیار مهمی در این رشد ایفا کرده‌اند:</p>

      <h3>مزایای ارائه شده:</h3>
      <ul>
        <li>سادگی فرآیند پرداخت</li>
        <li>ارائه خدمات اعتباری نوآورانه</li>
        <li>پشتیبانی از انواع مختلف پرداخت</li>
        <li>ایجاد اکوسیستم جامع مالی</li>
      </ul>

      <h2>تحلیل بازار بر اساس سن و جنسیت</h2>
      
      <h3>توزیع سنی کاربران:</h3>
      <ul>
        <li><strong>۱۸-۳۰ سال:</strong> ۴۵% از کل تراکنش‌ها</li>
        <li><strong>۳۱-۴۵ سال:</strong> ۳۵% از کل تراکنش‌ها</li>
        <li><strong>۴۶-۶۰ سال:</strong> ۱۵% از کل تراکنش‌ها</li>
        <li><strong>بالای ۶۰ سال:</strong> ۵% از کل تراکنش‌ها</li>
      </ul>

      <h3>توزیع جنسیتی:</h3>
      <ul>
        <li><strong>زنان:</strong> ۵۲% از کل تراکنش‌ها</li>
        <li><strong>مردان:</strong> ۴۸% از کل تراکنش‌ها</li>
      </ul>

      <h2>روندهای محبوب پرداخت</h2>
      
      <h3>محبوب‌ترین زمان‌های پرداخت:</h3>
      <ul>
        <li><strong>ساعت ۲۰ تا ۲۲:</strong> ۳۰% از تراکنش‌های روزانه</li>
        <li><strong>ساعت ۱۲ تا ۱۴:</strong> ۲۵% از تراکنش‌های روزانه</li>
        <li><strong>ساعت ۱۶ تا ۱۸:</strong> ۲۰% از تراکنش‌های روزانه</li>
      </ul>

      <h3>محبوب‌ترین روزهای هفته:</h3>
      <ol>
        <li>شنبه و یکشنبه: ۳۵% کل تراکنش‌های هفتگی</li>
        <li>دوشنبه و سه‌شنبه: ۳۰% کل تراکنش‌های هفتگی</li>
        <li>چهارشنبه و پنج‌شنبه: ۲۵% کل تراکنش‌های هفتگی</li>
        <li>جمعه: ۱۰% کل تراکنش‌های هفتگی</li>
      </ol>

      <h2>چالش‌ها و موانع موجود</h2>
      <p>علی‌رغم رشد چشمگیر، هنوز چالش‌هایی در مسیر توسعه پرداخت‌های آنلاین وجود دارد:</p>

      <ul>
        <li>نگرانی‌های امنیتی برخی کاربران</li>
        <li>عدم دسترسی کامل به اینترنت در برخی مناطق</li>
        <li>نیاز به آموزش بیشتر کاربران مسن</li>
        <li>محدودیت‌های قانونی و نظارتی</li>
      </ul>

      <h2>پیش‌بینی آینده</h2>
      <p>براساس روند فعلی و عوامل مؤثر، پیش‌بینی می‌شود:</p>

      <ul>
        <li>رشد ۶۰% تراکنش‌های آنلاین تا پایان سال ۱۴۰۳</li>
        <li>افزایش سهم پرداخت موبایلی به ۷۰% کل تراکنش‌ها</li>
        <li>توسعه خدمات اعتباری دیجیتال</li>
        <li>ورود تکنولوژی‌های نوین مانند هوش مصنوعی</li>
      </ul>

      <blockquote>
        <p>"رشد ۴۰ درصدی تراکنش‌های آنلاین نشان‌دهنده بلوغ دیجیتالی جامعه ایران و آمادگی آن برای پذیرش تکنولوژی‌های مالی نوین است."</p>
        <cite>- علی رضایی، تحلیلگر بازار فینتک</cite>
      </blockquote>

      <h2>نقش سعید پی در این رشد</h2>
      <p>سعید پی با ارائه خدمات نوآورانه و کاربرپسند، سهم قابل توجهی در این رشد داشته است. پلتفرم ما با تمرکز بر تجربه کاربری بهینه و امنیت بالا، به تسریع فرآیند دیجیتالی شدن پرداخت‌ها کمک کرده است.</p>

      <h3>دستاوردهای سعید پی در شهریور ۱۴۰۳:</h3>
      <ul>
        <li>ثبت ۱۲% از کل تراکنش‌های اعتباری کشور</li>
        <li>جذب ۵۰,۰۰۰ کاربر جدید</li>
        <li>پردازش بیش از ۵ میلیارد تومان تراکنش</li>
        <li>حفظ رضایت ۹۵% کاربران</li>
      </ul>
    `,
    image: "/news/z4gw6bi6.png",
    author: "علی رضایی",
    date: "۱۴۰۳/۰۸/۱۰",
    readTime: "۳ دقیقه",
    views: "۱۵,۶۴۰",
    likes: "۲۱۷",
    comments: "۳۴",
    category: "تحلیل بازار",
    tags: ["آمار", "تراکنش آنلاین", "رشد بازار", "پرداخت دیجیتال"],
    slug: "online-transactions-growth",
    publishedAt: "2024-11-01T14:20:00Z",
    updatedAt: "2024-11-01T14:20:00Z",
  },
  "new-dashboard-features": {
    id: 4,
    title: "معرفی قابلیت‌های جدید پنل کاربری سعید پی",
    excerpt: "بررسی امکانات تازه اضافه شده به پنل کاربری و نحوه استفاده بهینه از آنها برای مدیریت بهتر امور مالی شخصی.",
    content: `
      <p>پنل کاربری سعید پی به‌روزرسانی جامعی دریافت کرده و قابلیت‌های جدید و کاربردی زیادی به آن اضافه شده است. این بهبودها با هدف ارائه تجربه بهتر و مدیریت آسان‌تر امور مالی طراحی شده‌اند.</p>

      <h2>رابط کاربری جدید</h2>
      <p>طراحی جدید پنل با الهام از آخرین اصول UX/UI و با تمرکز بر سادگی و زیبایی ایجاد شده است:</p>

      <h3>ویژگی‌های طراحی:</h3>
      <ul>
        <li>رنگ‌بندی مدرن و چشم‌نواز</li>
        <li>فونت‌های خوانا و استاندارد</li>
        <li>آیکون‌های واضح و قابل فهم</li>
        <li>طراحی ریسپانسیو برای همه دستگاه‌ها</li>
        <li>انیمیشن‌های نرم و دلپذیر</li>
      </ul>

      <h2>داشبورد هوشمند</h2>
      <p>داشبورد جدید اطلاعات مهم را به صورت خلاصه و قابل درک نمایش می‌دهد:</p>

      <h3>اجزای داشبورد:</h3>
      <ul>
        <li><strong>موجودی کل:</strong> نمایش موجودی حساب در یک نگاه</li>
        <li><strong>آخرین تراکنش‌ها:</strong> فهرست آخرین عملیات انجام شده</li>
        <li><strong>اقساط پیش رو:</strong> یادآوری پرداخت‌های آتی</li>
        <li><strong>نمودار خرج:</strong> تحلیل الگوی خرج ماهانه</li>
        <li><strong>پیشنهادات هوشمند:</strong> توصیه‌های شخصی‌سازی شده</li>
      </ul>

      <h2>مدیریت اعتبار پیشرفته</h2>
      <p>ابزارهای جدید برای مدیریت و کنترل اعتبار:</p>

      <h3>امکانات جدید:</h3>
      <ul>
        <li>نمایش سقف اعتبار به‌صورت گرافیکی</li>
        <li>تاریخچه تغییرات اعتبار</li>
        <li>پیش‌بینی تاریخ افزایش اعتبار</li>
        <li>راهنمای بهبود امتیاز اعتباری</li>
        <li>شبیه‌ساز محاسبه اقساط</li>
      </ul>

      <h2>گزارش‌گیری پیشرفته</h2>
      <p>سیستم گزارش‌گیری کاملاً بازطراحی شده و امکانات جدیدی دریافت کرده:</p>

      <h3>انواع گزارش‌ها:</h3>
      <ul>
        <li><strong>گزارش ماهانه:</strong> خلاصه عملیات هر ماه</li>
        <li><strong>تحلیل خرج:</strong> دسته‌بندی هزینه‌ها</li>
        <li><strong>گزارش اقساط:</strong> وضعیت پرداخت‌های اقساطی</li>
        <li><strong>صورتحساب دیجیتال:</strong> ارسال خودکار صورتحساب</li>
        <li><strong>گزارش سالانه:</strong> خلاصه عملیات سالانه</li>
      </ul>

      <h2>تنظیمات شخصی‌سازی</h2>
      <p>کاربران حالا می‌توانند پنل خود را کاملاً شخصی‌سازی کنند:</p>

      <h3>گزینه‌های شخصی‌سازی:</h3>
      <ul>
        <li>انتخاب تم رنگی (روشن، تیره، خودکار)</li>
        <li>تنظیم اولویت نمایش اطلاعات</li>
        <li>تنظیم یادآوری‌ها و اعلان‌ها</li>
        <li>انتخاب زبان رابط کاربری</li>
        <li>سفارشی‌سازی داشبورد</li>
      </ul>

      <h2>امنیت پیشرفته</h2>
      <p>قابلیت‌های امنیتی جدید برای محافظت بهتر از حساب کاربری:</p>

      <h3>ویژگی‌های امنیتی:</h3>
      <ul>
        <li>احراز هویت دو مرحله‌ای (2FA)</li>
        <li>نمایش دستگاه‌های متصل</li>
        <li>هشدار ورود مشکوک</li>
        <li>قفل موقت حساب</li>
        <li>رمزعبور یکبار مصرف (OTP)</li>
      </ul>

      <h2>اعلان‌های هوشمند</h2>
      <p>سیستم اعلان‌رسانی بهبود یافته با قابلیت‌های جدید:</p>

      <h3>انواع اعلان‌ها:</h3>
      <ul>
        <li>یادآوری پرداخت اقساط</li>
        <li>اطلاع از تراکنش‌های جدید</li>
        <li>تغییرات اعتبار</li>
        <li>پیشنهادات ویژه</li>
        <li>به‌روزرسانی‌های امنیتی</li>
      </ul>

      <h2>ابزار بودجه‌بندی</h2>
      <p>ابزار جدید برای مدیریت بودجه شخصی:</p>

      <h3>قابلیت‌های بودجه‌بندی:</h3>
      <ul>
        <li>تنظیم بودجه ماهانه</li>
        <li>دسته‌بندی هزینه‌ها</li>
        <li>هشدار تجاوز از بودجه</li>
        <li>پیشنهاد صرفه‌جویی</li>
        <li>هدف‌گذاری پس‌انداز</li>
      </ul>

      <blockquote>
        <p>"هدف ما ارائه بهترین تجربه کاربری ممکن است. قابلیت‌های جدید با نظر کاربران طراحی شده‌اند."</p>
        <cite>- سارا کریمی، مدیر تجربه کاربری سعید پی</cite>
      </blockquote>

      <h2>نحوه دسترسی به قابلیت‌های جدید</h2>
      <p>همه کاربران به‌طور خودکار به قابلیت‌های جدید دسترسی دارند:</p>

      <ol>
        <li>وارد پنل کاربری خود شوید</li>
        <li>از منوی تنظیمات، گزینه "قابلیت‌های جدید" را انتخاب کنید</li>
        <li>راهنمای تعاملی را دنبال کنید</li>
        <li>تنظیمات دلخواه خود را انجام دهید</li>
        <li>از تجربه جدید لذت ببرید!</li>
      </ol>

      <h2>بازخورد کاربران</h2>
      <p>در صورت داشتن پیشنهاد یا مشکل، از طریق بخش پشتیبانی با ما در ارتباط باشید. نظرات شما برای بهبود مستمر محصول بسیار ارزشمند است.</p>
    `,
    image: "/news/saeed-pay.png",
    author: "سارا کریمی",
    date: "۱۴۰۳/۰۸/۰۸",
    readTime: "۶ دقیقه",
    views: "۶,۸۹۰",
    likes: "۱۸۹",
    comments: "۲۲",
    category: "اخبار شرکت",
    tags: ["پنل کاربری", "به‌روزرسانی", "UX/UI", "قابلیت جدید"],
    slug: "new-dashboard-features",
    publishedAt: "2024-10-29T09:30:00Z",
    updatedAt: "2024-10-29T09:30:00Z",
  },
  "online-security-tips": {
    id: 5,
    title: "امنیت در تراکنش‌های آنلاین: نکات طلایی",
    excerpt: "راهکارها و توصیه‌های امنیتی برای انجام تراکنش‌های مالی ایمن در فضای دیجیتال و محافظت از اطلاعات شخصی.",
    content: `
      <p>امنیت در تراکنش‌های آنلاین یکی از مهم‌ترین دغدغه‌های کاربران فضای دیجیتال است. در این راهنما، مهم‌ترین نکات و توصیه‌های امنیتی را برای انجام تراکنش‌های مالی ایمن بررسی می‌کنیم.</p>

      <h2>اصول پایه امنیت دیجیتال</h2>
      <p>قبل از ورود به جزئیات، درک اصول پایه امنیت دیجیتال ضروری است:</p>

      <h3>سه رکن اصلی امنیت:</h3>
      <ul>
        <li><strong>محرمانگی (Confidentiality):</strong> حفظ اطلاعات از دسترسی غیرمجاز</li>
        <li><strong>یکپارچگی (Integrity):</strong> جلوگیری از تغییر غیرمجاز اطلاعات</li>
        <li><strong>دسترسی (Availability):</strong> دسترسی مطمئن به اطلاعات در زمان نیاز</li>
      </ul>

      <h2>رمز عبور قوی</h2>
      <p>رمز عبور اولین خط دفاعی شما در برابر تهدیدات سایبری است:</p>

      <h3>ویژگی‌های رمز عبور قوی:</h3>
      <ul>
        <li>حداقل ۱۲ کاراکتر طول</li>
        <li>ترکیب حروف بزرگ و کوچک</li>
        <li>استفاده از اعداد و علائم خاص</li>
        <li>عدم استفاده از اطلاعات شخصی</li>
        <li>منحصر به فرد برای هر سرویس</li>
      </ul>

      <h3>نکات مهم:</h3>
      <ul>
        <li>هیچ‌گاه رمز عبور خود را با دیگران به اشتراک نگذارید</li>
        <li>از مدیر رمز عبور معتبر استفاده کنید</li>
        <li>رمز عبور را به‌طور منظم تغییر دهید</li>
        <li>از رمزهای قابل حدس اجتناب کنید</li>
      </ul>

      <h2>احراز هویت دومرحله‌ای (2FA)</h2>
      <p>احراز هویت دومرحله‌ای یک لایه امنیتی اضافی فراهم می‌کند:</p>

      <h3>روش‌های 2FA:</h3>
      <ul>
        <li><strong>SMS:</strong> دریافت کد از طریق پیامک</li>
        <li><strong>اپلیکیشن احراز هویت:</strong> Google Authenticator یا Authy</li>
        <li><strong>ایمیل:</strong> دریافت کد از طریق ایمیل</li>
        <li><strong>کلید امنیتی:</strong> دستگاه‌های فیزیکی امنیتی</li>
      </ul>

      <h2>تشخیص فیشینگ</h2>
      <p>فیشینگ یکی از رایج‌ترین روش‌های کلاهبرداری آنلاین است:</p>

      <h3>علائم هشدار فیشینگ:</h3>
      <ul>
        <li>آدرس ایمیل مشکوک یا نامشخص</li>
        <li>درخواست فوری برای ارائه اطلاعات</li>
        <li>لینک‌های مشکوک</li>
        <li>املای غلط یا گرامر نادرست</li>
        <li>طراحی غیرحرفه‌ای</li>
      </ul>

      <h3>نحوه مقابله:</h3>
      <ul>
        <li>همیشه آدرس سایت را بررسی کنید</li>
        <li>مستقیماً وارد سایت رسمی شوید</li>
        <li>هیچ‌گاه اطلاعات حساس را از طریق ایمیل ارسال نکنید</li>
        <li>با شرکت تماس بگیرید تا درستی پیام را تأیید کنید</li>
      </ul>

      <h2>امنیت شبکه</h2>
      <p>استفاده از شبکه امن برای تراکنش‌های مالی ضروری است:</p>

      <h3>توصیه‌های شبکه:</h3>
      <ul>
        <li>از شبکه‌های Wi-Fi عمومی برای تراکنش‌های مالی استفاده نکنید</li>
        <li>از VPN معتبر استفاده کنید</li>
        <li>اتصال امن (HTTPS) را تأیید کنید</li>
        <li>فایروال دستگاه خود را فعال کنید</li>
        <li>از آنتی‌ویروس به‌روز استفاده کنید</li>
      </ul>

      <h2>امنیت مرورگر</h2>
      <p>مرورگر وب نقطه ورود اصلی به سرویس‌های آنلاین است:</p>

      <h3>تنظیمات امنیتی مرورگر:</h3>
      <ul>
        <li>همیشه آخرین نسخه مرورگر را داشته باشید</li>
        <li>از افزونه‌های امنیتی معتبر استفاده کنید</li>
        <li>پس از استفاده از تراکنش‌های مالی، خروج کامل انجام دهید</li>
        <li>تاریخچه مرورگر را به‌طور منظم پاک کنید</li>
        <li>کوکی‌ها را مدیریت کنید</li>
      </ul>

      <h2>مراقبت از اطلاعات شخصی</h2>
      <p>محافظت از اطلاعات شخصی اهمیت بالایی دارد:</p>

      <h3>اطلاعاتی که باید محافظت شوند:</h3>
      <ul>
        <li>شماره کارت بانکی</li>
        <li>CVV2 و تاریخ انقضا</li>
        <li>رمز دوم (رمز اینترنتی)</li>
        <li>کد ملی</li>
        <li>شماره حساب</li>
      </ul>

      <h3>نکات مهم:</h3>
      <ul>
        <li>هیچ‌گاه اطلاعات کارت را در تصاویر ذخیره نکنید</li>
        <li>از نوشتن رمز عبور در جایی قابل دسترس خودداری کنید</li>
        <li>مراقب دوربین‌های مخفی در هنگام وارد کردن رمز باشید</li>
      </ul>

      <h2>نکات ویژه برای موبایل</h2>
      <p>تراکنش‌های موبایلی نکات امنیتی خاص خود را دارند:</p>

      <h3>امنیت موبایل:</h3>
      <ul>
        <li>قفل صفحه قوی تنظیم کنید</li>
        <li>از فروشگاه‌های رسمی اپلیکیشن دانلود کنید</li>
        <li>مجوزهای اپلیکیشن‌ها را بررسی کنید</li>
        <li>از شبکه‌های ناشناس اجتناب کنید</li>
        <li>به‌روزرسانی‌های امنیتی را نصب کنید</li>
      </ul>

      <h2>مراقبت از حساب بانکی</h2>
      <p>نظارت مستمر بر حساب بانکی ضروری است:</p>

      <h3>اقدامات پیشگیرانه:</h3>
      <ul>
        <li>به‌طور منظم صورتحساب بانکی را بررسی کنید</li>
        <li>تراکنش‌های مشکوک را فوراً گزارش دهید</li>
        <li>SMS بانک را فعال کنید</li>
        <li>حد مجاز تراکنش روزانه تنظیم کنید</li>
        <li>کارت‌های غیرضروری را مسدود کنید</li>
      </ul>

      <blockquote>
        <p>"امنیت یک فرآیند مستمر است، نه یک هدف نهایی. همیشه هوشیار و آگاه باشید."</p>
        <cite>- محمد نوری، کارشناس امنیت سایبری</cite>
      </blockquote>

      <h2>اقدامات اضطراری</h2>
      <p>در صورت مشکوک شدن به نفوذ، فوراً اقدام کنید:</p>

      <h3>مراحل اضطراری:</h3>
      <ol>
        <li>رمز عبور همه حساب‌ها را تغییر دهید</li>
        <li>کارت‌های بانکی را موقتاً مسدود کنید</li>
        <li>با بانک و شرکت پرداخت تماس بگیرید</li>
        <li>گزارش کلاهبرداری ثبت کنید</li>
        <li>سیستم خود را اسکن کنید</li>
      </ol>

      <h2>خدمات امنیتی سعید پی</h2>
      <p>سعید پی برای تضمین امنیت شما اقدامات زیر را انجام داده:</p>

      <ul>
        <li>رمزگذاری پیشرفته اطلاعات</li>
        <li>مانیتورینگ ۲۴ ساعته تراکنش‌ها</li>
        <li>سیستم تشخیص تقلب</li>
        <li>اعلان‌های امنیتی فوری</li>
        <li>پشتیبانی تخصصی امنیت</li>
      </ul>
    `,
    image: "/news/psda4341.png",
    author: "محمد نوری",
    date: "۱۴۰۳/۰۸/۰۵",
    readTime: "۷ دقیقه",
    views: "۱۲,۴۵۰",
    likes: "۲۹۳",
    comments: "۴۱",
    category: "راهنمای کاربری",
    tags: ["امنیت سایبری", "تراکنش آنلاین", "حریم خصوصی", "راهنمای امنیت"],
    slug: "online-security-tips",
    publishedAt: "2024-10-26T11:45:00Z",
    updatedAt: "2024-10-26T11:45:00Z",
  },
  "banking-partnerships": {
    id: 6,
    title: "همکاری سعید پی با بانک‌های معتبر کشور",
    excerpt: "اعلام شراکت استراتژیک با مهم‌ترین بانک‌های کشور برای ارائه خدمات بهتر و گسترده‌تر به کاربران سراسر ایران.",
    content: `
      <p>سعید پی با افتخار اعلام می‌کند که توافقنامه‌های همکاری استراتژیک با شش بانک معتبر کشور امضا کرده است. این همکاری‌ها زمینه ارائه خدمات گسترده‌تر و بهتر به میلیون‌ها کاربر در سراسر ایران را فراهم می‌کند.</p>

      <h2>بانک‌های همکار</h2>
      <p>لیست بانک‌هایی که با سعید پی همکاری می‌کنند:</p>

      <h3>بانک‌های دولتی:</h3>
      <ul>
        <li><strong>بانک ملی ایران:</strong> بزرگ‌ترین بانک کشور</li>
        <li><strong>بانک سپه:</strong> یکی از قدیمی‌ترین بانک‌های ایران</li>
        <li><strong>بانک صادرات ایران:</strong> متخصص در امور بازرگانی</li>
      </ul>

      <h3>بانک‌های خصوصی:</h3>
      <ul>
        <li><strong>بانک پاسارگاد:</strong> پیشرو در خدمات دیجیتال</li>
        <li><strong>بانک سرمایه:</strong> متمرکز بر بازار سرمایه</li>
        <li><strong>بانک کارآفرین:</strong> حامی کسب‌وکارهای نوپا</li>
      </ul>

      <h2>مزایای همکاری برای کاربران</h2>
      <p>این شراکت‌ها مزایای قابل توجهی برای کاربران به همراه دارد:</p>

      <h3>خدمات مالی گسترده‌تر:</h3>
      <ul>
        <li>دسترسی به تسهیلات اعتباری با نرخ‌های ترجیحی</li>
        <li>امکان پرداخت اقساط از طریق همه بانک‌های همکار</li>
        <li>واریز فوری وجه به حساب‌های بانکی</li>
        <li>استفاده از شبکه عابر بانک</li>
        <li>ارائه کارت‌های اعتباری مشترک</li>
      </ul>

      <h3>کاهش کارمزد:</h3>
      <ul>
        <li>حذف کارمزد تراکنش‌های درون‌بانکی</li>
        <li>تخفیف ویژه برای تراکنش‌های پرحجم</li>
        <li>کارمزد ترجیحی برای کاربران وفادار</li>
        <li>بسته‌های ویژه خدمات ترکیبی</li>
      </ul>

      <h2>خدمات نوآورانه مشترک</h2>
      <p>با همکاری بانک‌ها، خدمات جدیدی طراحی و ارائه شده است:</p>

      <h3>محصولات مشترک:</h3>
      <ul>
        <li><strong>حساب پس‌انداز دیجیتال:</strong> بازدهی بالا با دسترسی آسان</li>
        <li><strong>وام سریع آنلاین:</strong> تصویب در کمتر از ۲۴ ساعت</li>
        <li><strong>کارت اعتباری هوشمند:</strong> تنظیم خودکار سقف</li>
        <li><strong>بیمه تراکنش:</strong> محافظت از تراکنش‌های آنلاین</li>
        <li><strong>سرمایه‌گذاری کوتاه‌مدت:</strong> صندوق‌های سرمایه‌گذاری</li>
      </ul>

      <h2>فناوری‌های پیشرفته</h2>
      <p>همکاری با بانک‌ها امکان استفاده از جدیدترین فناوری‌ها را فراهم کرده:</p>

      <h3>نوآوری‌های فناورانه:</h3>
      <ul>
        <li><strong>Open Banking:</strong> اتصال امن به سیستم‌های بانکی</li>
        <li><strong>API یکپارچه:</strong> ادغام خدمات مختلف</li>
        <li><strong>هوش مصنوعی:</strong> تحلیل رفتار مالی کاربران</li>
        <li><strong>Blockchain:</strong> تضمین امنیت تراکنش‌ها</li>
        <li><strong>Real-time Processing:</strong> پردازش آنی تراکنش‌ها</li>
      </ul>

      <h2>گسترش دسترسی جغرافیایی</h2>
      <p>همکاری با بانک‌ها دسترسی جغرافیایی سعید پی را گسترش داده:</p>

      <h3>پوشش سراسری:</h3>
      <ul>
        <li>دسترسی از طریق بیش از ۱۰,۰۰۰ شعبه بانکی</li>
        <li>استفاده از ۵۰,۰۰۰ دستگاه خودپرداز</li>
        <li>خدمات‌رسانی در تمام شهرها و روستاها</li>
        <li>پشتیبانی ۲۴ ساعته در سراسر کشور</li>
      </ul>

      <h2>امنیت تقویت شده</h2>
      <p>استانداردهای امنیتی بانک‌ها با سیستم‌های سعید پی ادغام شده:</p>

      <h3>لایه‌های امنیتی:</h3>
      <ul>
        <li>رمزگذاری چندلایه اطلاعات</li>
        <li>احراز هویت پیشرفته</li>
        <li>مانیتورینگ مستمر تراکنش‌ها</li>
        <li>سیستم تشخیص تقلب</li>
        <li>پشتیبان‌گیری خودکار</li>
      </ul>

      <h2>تأثیر بر بازار فینتک</h2>
      <p>این همکاری‌ها تحولی در صنعت فینتک کشور ایجاد کرده:</p>

      <h3>تغییرات مثبت:</h3>
      <ul>
        <li>افزایش رقابت سالم در بازار</li>
        <li>بهبود کیفیت خدمات مالی</li>
        <li>کاهش هزینه‌های تراکنش</li>
        <li>نوآوری در محصولات مالی</li>
        <li>دسترسی آسان‌تر به سرمایه</li>
      </ul>

      <h2>برنامه‌های آینده</h2>
      <p>سعید پی و بانک‌های همکار برنامه‌های جاه‌طلبانه‌ای دارند:</p>

      <h3>اهداف کوتاه‌مدت (۶ ماه آینده):</h3>
      <ul>
        <li>راه‌اندازی کارت اعتباری مشترک</li>
        <li>ارائه خدمات وام آنلاین</li>
        <li>گسترش شبکه پذیرندگان</li>
        <li>بهبود سرعت تراکنش‌ها</li>
      </ul>

      <h3>اهداف بلندمدت (۲ سال آینده):</h3>
      <ul>
        <li>ایجاد اکوسیستم مالی یکپارچه</li>
        <li>ورود به بازارهای منطقه‌ای</li>
        <li>توسعه خدمات بیمه دیجیتال</li>
        <li>پلتفرم سرمایه‌گذاری آنلاین</li>
      </ul>

      <blockquote>
        <p>"همکاری با بانک‌های معتبر کشور، گامی مهم برای دیجیتالی کردن صنعت بانکداری ایران است."</p>
        <cite>- فاطمه موسوی، مدیر توسعه کسب‌وکار سعید پی</cite>
      </blockquote>

      <h2>نظرات کاربران</h2>
      <p>واکنش‌های مثبت کاربران به این همکاری‌ها:</p>

      <h3>بازخوردهای دریافتی:</h3>
      <ul>
        <li>افزایش ۳۵% رضایت کاربران</li>
        <li>کاهش ۴۰% زمان تراکنش‌ها</li>
        <li>رشد ۲۵% استفاده از خدمات</li>
        <li>بهبود ۵۰% تجربه کاربری</li>
      </ul>

      <h2>نحوه استفاده از خدمات جدید</h2>
      <p>کاربران فعلی می‌توانند به راحتی از خدمات جدید استفاده کنند:</p>

      <ol>
        <li>به‌روزرسانی اپلیکیشن سعید پی</li>
        <li>ورود به بخش "خدمات بانکی"</li>
        <li>انتخاب بانک مورد نظر</li>
        <li>تکمیل فرآیند احراز هویت</li>
        <li>شروع استفاده از خدمات جدید</li>
      </ol>

      <h2>پشتیبانی و خدمات مشتریان</h2>
      <p>برای ارائه بهترین خدمات، تیم پشتیبانی تقویت شده:</p>

      <h3>کانال‌های پشتیبانی:</h3>
      <ul>
        <li>تماس تلفنی ۲۴ ساعته</li>
        <li>چت آنلاین در اپلیکیشن</li>
        <li>پشتیبانی در شعب بانک‌های همکار</li>
        <li>راهنمای تصویری در سایت</li>
        <li>وبینارهای آموزشی رایگان</li>
      </ul>
    `,
    image: "/news/j87t3q03.png",
    author: "فاطمه موسوی",
    date: "۱۴۰۳/۰۸/۰۲",
    readTime: "۴ دقیقه",
    views: "۱۸,۷۲۰",
    likes: "۴۵۶",
    comments: "۶۳",
    category: "اخبار شرکت",
    tags: ["همکاری بانکی", "شراکت استراتژیک", "خدمات مالی", "گسترش خدمات"],
    slug: "banking-partnerships",
    publishedAt: "2024-10-23T13:20:00Z",
    updatedAt: "2024-10-23T13:20:00Z",
  }
};

export default function ArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const [copied, setCopied] = useState(false);
  const article = articlesData[slug as keyof typeof articlesData];

  useEffect(() => {
    if (!article) {
      // در محیط واقعی، در صورت عدم وجود مقاله به 404 redirect می‌شود
      console.log("Article not found");
    }
  }, [article]);

  const handleShare = async (platform: string) => {
    const url = `${window.location.origin}/news/${slug}`;
    const text = article?.title || "";

    switch (platform) {
      case "facebook":
        window.open(`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank");
        break;
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, "_blank");
        break;
      case "linkedin":
        window.open(`https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank");
        break;
      case "copy":
        try {
          await navigator.clipboard.writeText(url);
          setCopied(true);
          showNotification("لینک کپی شد!");
          setTimeout(() => setCopied(false), 2000);
        } catch {
          showNotification("خطا در کپی کردن لینک", "error");
        }
        break;
    }
  };

  if (!article) {
    return (
      <div className="flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">مقاله پیدا نشد</h1>
          <Link href="/news">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <ArrowRight className="w-4 h-4 mr-2" />
              بازگشت به اخبار
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* SEO Schema Markup for Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            "headline": article.title,
            "description": article.excerpt,
            "image": [
              {
                "@type": "ImageObject",
                "url": `https://saeedpay.com${article.image}`,
                "width": 800,
                "height": 400
              }
            ],
            "datePublished": article.publishedAt,
            "dateModified": article.updatedAt,
            "author": {
              "@type": "Person",
              "name": article.author
            },
            "publisher": {
              "@type": "Organization",
              "name": "سعید پی",
              "logo": {
                "@type": "ImageObject",
                "url": "https://saeedpay.com/logo.png"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://saeedpay.com/news/${article.slug}`
            },
            "articleSection": article.category,
            "keywords": article.tags.join(", "),
            "wordCount": article.content.split(" ").length,
            "timeRequired": article.readTime,
            "url": `https://saeedpay.com/news/${article.slug}`
          })
        }}
      />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-blue-600 transition-colors">
              <Home className="w-4 h-4" />
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400 rotate-180" />
            <Link href="/news" className="text-gray-500 hover:text-blue-600 transition-colors">
              اخبار و مقالات
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400 rotate-180" />
            <span className="text-gray-900 truncate">{article.title}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <header className="mb-8 sm:mb-12">
            <div className="mb-4">
              <Badge className="bg-blue-600 hover:bg-blue-700 text-white">
                {article.category}
              </Badge>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {article.title}
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
              {article.excerpt}
            </p>

            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-gray-500 mb-6">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{article.readTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span>{article.views}</span>
              </div>
            </div>

            {/* Social Share */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm text-gray-500 ml-2">اشتراک‌گذاری:</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare("facebook")}
                className="text-blue-600 border-blue-200 hover:bg-blue-50"
              >
                <Facebook className="w-4 h-4 ml-1" />
                فیسبوک
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare("twitter")}
                className="text-sky-600 border-sky-200 hover:bg-sky-50"
              >
                <Twitter className="w-4 h-4 ml-1" />
                توییتر
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare("linkedin")}
                className="text-blue-700 border-blue-200 hover:bg-blue-50"
              >
                <Linkedin className="w-4 h-4 ml-1" />
                لینکدین
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare("copy")}
                className="text-gray-600 border-gray-200 hover:bg-gray-50"
              >
                {copied ? <Check className="w-4 h-4 ml-1" /> : <Copy className="w-4 h-4 ml-1" />}
                {copied ? "کپی شد" : "کپی لینک"}
              </Button>
            </div>
          </header>

          {/* Featured Image */}
          <div className="mb-8 sm:mb-12">
            <div className="relative overflow-hidden rounded-2xl shadow-xl">
              <Image
                src={article.image}
                alt={article.title}
                width={800}
                height={400}
                className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                priority
              />
            </div>
          </div>

          {/* Article Content */}
          <article className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 lg:p-12 mb-8 sm:mb-12">
            <div 
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-ul:text-gray-700 prose-blockquote:border-r-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-lg prose-blockquote:not-italic prose-blockquote:text-gray-800"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Tags */}
            <Separator className="my-8" />
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-1 text-gray-500">
                <Tag className="w-4 h-4" />
                <span className="text-sm">برچسب‌ها:</span>
              </div>
              {article.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </article>

          {/* Article Actions */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8 sm:mb-12">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  className="text-blue-600 border-blue-200 hover:bg-blue-50"
                >
                  <ThumbsUp className="w-4 h-4 ml-2" />
                  پسندیدن ({article.likes})
                </Button>
                <Button
                  variant="outline"
                  className="text-green-600 border-green-200 hover:bg-green-50"
                >
                  <MessageCircle className="w-4 h-4 ml-2" />
                  نظر ({article.comments})
                </Button>
              </div>
              <Button
                variant="outline"
                onClick={() => handleShare("copy")}
                className="hidden sm:flex"
              >
                <Share2 className="w-4 h-4 ml-2" />
                اشتراک‌گذاری
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <Link href="/news">
              <Button variant="outline" className="w-full sm:w-auto">
                <ArrowRight className="w-4 h-4 mr-2" />
                بازگشت به اخبار
              </Button>
            </Link>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 sm:flex-none">
                <ArrowRight className="w-4 h-4 mr-2" />
                مقاله قبلی
              </Button>
              <Button variant="outline" className="flex-1 sm:flex-none">
                مقاله بعدی
                <ArrowLeft className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 