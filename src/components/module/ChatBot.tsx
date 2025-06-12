"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Send,
  X,
  ArrowLeft,
  SmileIcon,
  ChevronUp,
  Bot,
  LucideCircleHelp,
  CreditCard,
} from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  time: string;
  emoji?: string;
}

const emojis = {
  greeting: "👋",
  happy: "😊",
  sad: "😔",
  money: "💰",
  credit: "💳",
  wallet: "👛",
  help: "🤔",
  thumbsUp: "👍",
  installment: "📅",
  shop: "🛍️",
  security: "🔒",
  payment: "💸",
  alert: "⚠️",
  check: "✅",
  time: "⏰",
  calculator: "🧮",
  location: "📍",
  phone: "📱",
  calendar: "📅",
  shield: "🛡️",
};

const initialMessages: Message[] = [
  {
    id: 1,
    text: `سلام ${emojis.greeting} به خانواده سعید پی خوش آمدید! من دستیار هوشمند شما هستم و آماده کمک در زمینه خدمات اعتباری، کیف پول و خرید اقساطی. چطور می‌توانم امروز کمکتان کنم؟`,
    sender: "bot",
    time: new Date().toLocaleTimeString("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    emoji: "greeting",
  },
];

const quickResponses: Array<{ text: string; emoji: string }> = [
  { text: "درخواست اعتبار", emoji: emojis.credit },
  { text: "مدیریت اقساط", emoji: emojis.installment },
  { text: "شارژ کیف پول", emoji: emojis.wallet },
  { text: "فروشگاه‌های همکار", emoji: emojis.shop },
];

const commonQuestions: Array<{ text: string; emoji: string }> = [
  { text: "چطور اعتبار درخواست کنم؟", emoji: emojis.credit },
  { text: "نحوه محاسبه اقساط", emoji: emojis.calculator },
  { text: "امنیت تراکنش‌ها", emoji: emojis.security },
  { text: "فروشگاه‌های نزدیک من", emoji: emojis.location },
  { text: "نحوه شارژ کیف پول", emoji: emojis.wallet },
  { text: "پشتیبانی تلفنی", emoji: emojis.phone },
];

const botResponses = [
  {
    keywords: ["اعتبار", "درخواست اعتبار", "وام"],
    responses: [
      `${emojis.credit} درخواست اعتبار در سعید پی بسیار آسان است! مراحل:
      
1️⃣ وارد اپلیکیشن شوید
2️⃣ بخش "درخواست اعتبار" را انتخاب کنید  
3️⃣ مدارک هویتی خود را آپلود کنید
4️⃣ منتظر تایید بمانید (معمولاً کمتر از 24 ساعت)

${emojis.check} اعتبار شما تا 50 میلیون تومان قابل تخصیص است و بدون ضامن!`,

      `${emojis.money} سعید پی اعتبار تا 50 میلیون تومان با شرایط عالی ارائه می‌دهد:

${emojis.check} بدون نیاز به ضامن
${emojis.check} تایید سریع (زیر 24 ساعت)  
${emojis.check} نرخ سود رقابتی
${emojis.check} اقساط انعطاف‌پذیر تا 24 ماه

برای شروع، کافیست روی "درخواست اعتبار" کلیک کنید.`,

      `${emojis.credit} با سعید پی، اعتبار شما در کمترین زمان تایید می‌شود! 

مزایای اعتبار ما:
• سقف اعتبار بالا (تا 50 میلیون)
• فرآیند کاملاً دیجیتال
• بررسی اعتبارسنجی هوشمند
• امکان افزایش اعتبار بر اساس عملکرد

آیا مایل به شروع فرآیند درخواست هستید؟`,
    ],
  },
  {
    keywords: ["اقساط", "قسط", "پرداخت قسط", "مدیریت اقساط"],
    responses: [
      `${emojis.installment} مدیریت اقساط در سعید پی بسیار راحت است:

${emojis.calendar} مشاهده تاریخ‌های سررسید
${emojis.payment} پرداخت آنلاین اقساط
${emojis.alert} یادآوری قبل از سررسید
${emojis.calculator} محاسبه‌گر اقساط آینده

همه این امکانات در بخش "اقساط من" در دسترس است. آیا سوال خاصی درباره اقساط دارید؟`,

      `${emojis.money} شما می‌توانید اقساط خود را به روش‌های مختلف پرداخت کنید:

• از کیف پول سعید پی
• کارت بانکی (تمام بانک‌ها)  
• اینترنت بانک
• درگاه‌های پرداخت معتبر

${emojis.time} یادآوری: پرداخت زودتر از موعد، تخفیف ویژه دارد!`,

      `${emojis.installment} محاسبه اقساط شما:

برای محاسبه دقیق اقساط، به بخش "محاسبه‌گر اقساط" در اپلیکیشن مراجعه کنید. 

${emojis.calculator} امکانات محاسبه‌گر:
• تعیین مبلغ دلخواه
• انتخاب تعداد اقساط (3-24 ماه)
• مشاهده نرخ سود
• برنامه‌ریزی پرداخت

آیا نیاز به محاسبه مبلغ خاصی دارید؟`,
    ],
  },
  {
    keywords: ["کیف پول", "شارژ", "موجودی", "برداشت"],
    responses: [
      `${emojis.wallet} کیف پول سعید پی ابزاری قدرتمند برای مدیریت مالی شماست:

${emojis.check} شارژ فوری از همه بانک‌ها
${emojis.check} برداشت سریع به حساب بانکی  
${emojis.check} پرداخت در فروشگاه‌های همکار
${emojis.check} انتقال وجه به سایر کاربران

روش‌های شارژ: کارت بانکی، انتقال بانکی، کد شارژ`,

      `${emojis.money} شارژ کیف پول بسیار آسان است:

1️⃣ بخش "کیف پول" را انتخاب کنید
2️⃣ روی "شارژ کیف پول" کلیک کنید
3️⃣ مبلغ دلخواه را وارد کنید
4️⃣ روش پرداخت را انتخاب کنید

${emojis.thumbsUp} شارژ فوری و بدون کارمزد اضافی!`,

      `${emojis.wallet} مزایای کیف پول سعید پی:

${emojis.security} امنیت بانکی
${emojis.time} تراکنش‌های فوری  
${emojis.money} بدون کارمزد شارژ
${emojis.check} قابلیت پرداخت در هزاران فروشگاه

موجودی فعلی خود را در صفحه اصلی اپلیکیشن مشاهده کنید.`,
    ],
  },
  {
    keywords: ["فروشگاه", "خرید", "فروشندگان", "همکار", "آنلاین", "حضوری"],
    responses: [
      `${emojis.shop} سعید پی با بیش از 10,000 فروشگاه همکاری دارد:

${emojis.check} فروشگاه‌های آنلاین معتبر
${emojis.check} فروشگاه‌های حضوری در سراسر کشور
${emojis.check} دسته‌بندی‌های مختلف (پوشاک، لوازم خانگی، دیجیتال و...)
${emojis.location} جستجوی فروشگاه‌های نزدیک با نقشه

برای مشاهده فروشگاه‌ها، بخش "فروشگاه‌ها" را انتخاب کنید.`,

      `${emojis.location} برای یافتن فروشگاه‌های نزدیک شما:

1️⃣ بخش "فروشگاه‌ها" > "نزدیک من"
2️⃣ اجازه دسترسی به موقعیت مکانی بدهید
3️⃣ فروشگاه‌های اطراف روی نقشه نمایش داده می‌شود

${emojis.shop} دسته‌بندی‌های محبوب:
• سوپرمارکت و هایپرمارکت
• پوشاک و کفش  
• لوازم خانگی
• موبایل و لپ‌تاپ
• رستوران و کافه`,

      `${emojis.credit} خرید اقساطی در فروشگاه‌های همکار:

${emojis.check} بدون پیش پرداخت
${emojis.check} تقسیط تا 24 ماه
${emojis.check} تایید فوری در فروشگاه
${emojis.check} امکان خرید آنلاین و حضوری

کافیست QR Code سعید پی را اسکن کنید یا شماره موبایل خود را اعلام کنید.`,
    ],
  },
  {
    keywords: ["امنیت", "امن", "حریم خصوصی", "رمزنگاری"],
    responses: [
      `${emojis.security} امنیت در سعید پی در بالاترین سطح است:

${emojis.shield} رمزنگاری 256 بیتی
${emojis.shield} تایید دو مرحله‌ای
${emojis.shield} احراز هویت بیومتریک
${emojis.shield} نظارت 24/7 بر تراکنش‌ها

تمام اطلاعات شما طبق استانداردهای بین‌المللی حفاظت می‌شود.`,

      `${emojis.check} گواهینامه‌های امنیتی سعید پی:

• مجوز رسمی از بانک مرکزی
• استاندارد PCI DSS
• گواهینامه ISO 27001
• رمزنگاری استاندارد بانکی

${emojis.security} هیچ اطلاعاتی بدون اجازه شما در اختیار اشخاص ثالث قرار نمی‌گیرد.`,
    ],
  },
  {
    keywords: ["ثبت نام", "حساب کاربری", "ورود", "فراموشی رمز"],
    responses: [
      `${emojis.phone} ثبت‌نام در سعید پی بسیار آسان است:

1️⃣ شماره موبایل خود را وارد کنید
2️⃣ کد تایید ارسالی را وارد کنید  
3️⃣ رمز عبور دلخواه تنظیم کنید
4️⃣ اطلاعات هویتی خود را تکمیل کنید

${emojis.check} پس از تایید، بلافاصله می‌توانید از خدمات استفاده کنید!`,

      `${emojis.security} رمز عبور خود را فراموش کرده‌اید؟

در صفحه ورود، روی "فراموشی رمز عبور" کلیک کنید. کد بازیابی به شماره موبایل شما ارسال می‌شود.

${emojis.shield} برای امنیت بیشتر، تایید دو مرحله‌ای را فعال کنید.`,
    ],
  },
  {
    keywords: ["محاسبه", "سود", "نرخ", "درصد"],
    responses: [
      `${emojis.calculator} محاسبه دقیق اقساط و سود:

نرخ سود سالانه ما بسته به مدت بازپرداخت:
• 3-6 ماه: 18% سالانه
• 7-12 ماه: 20% سالانه  
• 13-24 ماه: 22% سالانه

${emojis.money} مثال: برای اعتبار 10 میلیون تومان در 12 قسط، قسط ماهانه حدود 920,000 تومان خواهد بود.

برای محاسبه دقیق، از محاسبه‌گر اپلیکیشن استفاده کنید.`,
    ],
  },
  {
    keywords: ["پشتیبانی", "تماس", "تلفن", "ایمیل"],
    responses: [
      `${emojis.phone} راه‌های تماس با پشتیبانی سعید پی:

📞 تلفن: 021-91005000
📧 ایمیل: support@saeedpay.ir
💬 چت آنلاین: همین جا!
📱 تلگرام: @SaeedPaySupport

${emojis.time} ساعات کاری: شنبه تا پنج‌شنبه، 8 صبح تا 8 شب
${emojis.check} پاسخگویی فوری در چت آنلاین`,
    ],
  },
];

const getRandomResponse = (input: string): string => {
  const inputLower = input.toLowerCase();

  for (const category of botResponses) {
    if (category.keywords.some((keyword) => inputLower.includes(keyword))) {
      const randomIndex = Math.floor(Math.random() * category.responses.length);
      return category.responses[randomIndex];
    }
  }

  return `${emojis.happy} سوال جالبی پرسیدید! برای دریافت پاسخ دقیق‌تر، لطفاً با کارشناسان ما در ارتباط باشید:

📞 تلفن: 021-91005000
📧 ایمیل: support@saeedpay.ir

یا می‌توانید از گزینه‌های زیر یکی را انتخاب کنید.`;
};

export default function SaeedPayChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [minimized, setMinimized] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const emojiList = [
    "😊",
    "👍",
    "🙏",
    "❤️",
    "😍",
    "🤔",
    "😢",
    "😎",
    "🎉",
    "✨",
    "💰",
    "💳",
    "👛",
    "🛍️",
    "📱",
    "🔒",
    "⭐",
    "🚀",
    "💯",
    "🎯",
  ];

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const simulateResponse = (userMessage: string) => {
    setIsTyping(true);
    setShowSuggestions(false);

    const typingTime = Math.random() * 800 + 500;

    setTimeout(() => {
      const botResponse = getRandomResponse(userMessage);

      const newBotMessage: Message = {
        id: Date.now(),
        text: botResponse,
        sender: "bot",
        time: new Date().toLocaleTimeString("fa-IR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, newBotMessage]);
      setIsTyping(false);
      setShowSuggestions(true);
    }, typingTime);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

    const messageText = selectedEmoji
      ? `${selectedEmoji} ${inputMessage}`
      : inputMessage;

    const newUserMessage: Message = {
      id: Date.now(),
      text: messageText,
      sender: "user",
      time: new Date().toLocaleTimeString("fa-IR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputMessage("");
    setSelectedEmoji("");
    setShowEmojiPicker(false);
    simulateResponse(inputMessage);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickResponse = (response: string) => {
    const newUserMessage: Message = {
      id: Date.now(),
      text: response,
      sender: "user",
      time: new Date().toLocaleTimeString("fa-IR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setShowSuggestions(false);
    simulateResponse(response);
  };

  const selectEmoji = (emoji: string) => {
    setSelectedEmoji(emoji);
    setShowEmojiPicker(false);
  };

  useEffect(() => {
    if (!isOpen && messages.length > 1) {
      setUnreadCount((prev) => prev + 1);
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
    }
  }, [isOpen]);

  return (
    <>
      <motion.div
        className="fixed bottom-4 left-4 md:bottom-6 md:right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.5,
        }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-1 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white shadow-xl relative overflow-hidden group transition-all duration-300"
          style={{
            boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-400 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: 180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -180, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                <X className="w-5 h-5 mx-auto md:w-6 md:h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                <MessageSquare className="w-5 h-5 mx-auto md:w-6 md:h-6" />
                {unreadCount > 0 && (
                  <span className="absolute -top-2 right-1 m-1 flex h-4 w-4 md:h-4 md:w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white shadow-md animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-20 right-4 md:bottom-24 md:right-6 z-50 w-[calc(100%-2rem)] sm:w-96 max-w-[360px] md:max-w-md shadow-2xl rounded-2xl bg-white overflow-hidden border border-gray-200 dark:border-gray-700 dark:bg-gray-900"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{
              opacity: 0,
              y: 20,
              scale: 0.95,
              transition: { duration: 0.2 },
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{
              boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.25)",
            }}
          >
            <div className="relative flex items-center justify-between p-3 md:p-4 bg-gradient-to-r from-blue-600 to-purple-700 text-white overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full filter blur-2xl transform -translate-x-20 -translate-y-20"></div>
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full filter blur-2xl transform translate-x-20 translate-y-20"></div>
              </div>

              <div className="flex items-center relative z-10">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center mr-2 md:mr-3 shadow-md">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-xs md:text-sm">
                    پشتیبانی سعید پی
                  </h3>
                  <div className="flex items-center">
                    <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-400 ml-1 animate-pulse"></span>
                    <span className="text-[10px] md:text-xs text-green-200">
                      آنلاین و آماده پاسخگویی
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-1 md:gap-2 relative z-10">
                <button
                  onClick={() => setMinimized(!minimized)}
                  className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
                >
                  {minimized ? (
                    <ArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  ) : (
                    <motion.div
                      initial={{ rotate: 0 }}
                      animate={{ rotate: minimized ? 180 : 0 }}
                    >
                      <ArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4 rotate-90" />
                    </motion.div>
                  )}
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
                >
                  <X className="w-3.5 h-3.5 md:w-4 md:h-4" />
                </button>
              </div>
            </div>

            <AnimatePresence>
              {!minimized && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className="h-72 md:h-96 overflow-y-auto bg-gray-50 dark:bg-gray-800/80 p-3 md:p-4 overflow-x-hidden scroll-smooth"
                    style={{ scrollBehavior: "smooth" }}
                  >
                    <div className="flex flex-col space-y-3">
                      {messages.map((message) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ duration: 0.3 }}
                          className={`flex ${
                            message.sender === "user"
                              ? "justify-start flex-row-reverse"
                              : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[85%] rounded-xl p-2.5 md:p-3 ${
                              message.sender === "user"
                                ? "bg-gradient-to-br from-blue-600 to-purple-700 text-white rounded-tr-none shadow-md"
                                : "bg-white dark:bg-gray-700 dark:text-gray-100 rounded-tl-none shadow-md border border-gray-100 dark:border-gray-600"
                            }`}
                            style={{
                              boxShadow:
                                message.sender === "user"
                                  ? "0 4px 15px -3px rgba(59, 130, 246, 0.3)"
                                  : "0 4px 15px -3px rgba(0, 0, 0, 0.1)",
                            }}
                          >
                            <div
                              className="text-xs md:text-sm leading-relaxed whitespace-pre-line"
                              dangerouslySetInnerHTML={{
                                __html: message.text.replace(/\n/g, "<br>"),
                              }}
                            ></div>
                            <div
                              className={`text-[10px] md:text-xs mt-1 ${
                                message.sender === "user"
                                  ? "text-right text-blue-200"
                                  : "text-left text-gray-400 dark:text-gray-400"
                              }`}
                            >
                              {message.time}
                            </div>
                          </div>
                        </motion.div>
                      ))}

                      {isTyping && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex justify-start"
                        >
                          <div
                            className="bg-white dark:bg-gray-700 rounded-xl p-2.5 md:p-3 rounded-tl-none shadow-md border border-gray-100 dark:border-gray-600"
                            style={{
                              boxShadow: "0 4px 15px -3px rgba(0, 0, 0, 0.1)",
                            }}
                          >
                            <div className="flex space-x-1 rtl:space-x-reverse">
                              <div
                                className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-blue-600/40 dark:bg-blue-600/60 animate-bounce"
                                style={{ animationDelay: "0ms" }}
                              ></div>
                              <div
                                className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-blue-600/60 dark:bg-blue-600/80 animate-bounce"
                                style={{ animationDelay: "150ms" }}
                              ></div>
                              <div
                                className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-blue-600/80 dark:bg-blue-600 animate-bounce"
                                style={{ animationDelay: "300ms" }}
                              ></div>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {messages.length === 1 && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="mt-4"
                        >
                          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mb-2 mr-1">
                            خدمات محبوب:
                          </p>
                          <div className="flex flex-wrap gap-1.5 md:gap-2">
                            {quickResponses.map(({ text, emoji }, index) => (
                              <motion.button
                                key={index}
                                onClick={() => handleQuickResponse(text)}
                                className="bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 text-xs md:text-sm px-2.5 py-1.5 md:px-3 md:py-2 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all border border-blue-200 dark:border-blue-700 shadow-sm hover:shadow-md"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                {emoji} {text}
                              </motion.button>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {showSuggestions && messages.length > 2 && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-2.5 md:p-3 rounded-lg border border-blue-200 dark:border-blue-700"
                        >
                          <div className="flex items-center mb-1.5 md:mb-2">
                            <LucideCircleHelp className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-600 ml-1 md:ml-2" />
                            <p className="text-xs md:text-sm text-blue-700 dark:text-blue-300">
                              سوالات پرتکرار:
                            </p>
                          </div>
                          <div className="flex flex-col gap-1 md:gap-1.5">
                            {commonQuestions
                              .slice(0, 4)
                              .map(({ text, emoji }, index) => (
                                <motion.button
                                  key={index}
                                  onClick={() => handleQuickResponse(text)}
                                  className="text-right text-xs md:text-sm text-blue-600 dark:text-blue-400 py-1 px-1.5 md:py-1 md:px-2 hover:bg-blue-100 dark:hover:bg-blue-800/30 rounded transition-colors flex items-center"
                                  initial={{ opacity: 0, x: -5 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.4 + index * 0.1 }}
                                  whileHover={{ x: 3 }}
                                >
                                  <ArrowLeft className="w-2.5 h-2.5 md:w-3 md:h-3 ml-1 opacity-70" />
                                  {emoji} {text}
                                </motion.button>
                              ))}
                          </div>
                        </motion.div>
                      )}

                      <div ref={endOfMessagesRef} />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="p-2.5 md:p-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <AnimatePresence>
                {!minimized && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="relative mb-1">
                      {selectedEmoji && (
                        <div className="absolute top-2 right-4 text-lg z-10">
                          {selectedEmoji}
                        </div>
                      )}
                      <textarea
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="سوال خود را بپرسید..."
                        className={`w-full pl-8 ${
                          selectedEmoji ? "pr-10" : "pr-12"
                        } py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 focus:outline-none resize-none transition-all focus:shadow-md dark:focus:shadow-none text-xs md:text-sm focus:bg-white dark:focus:bg-gray-700`}
                        rows={1}
                        style={{ minHeight: "40px", maxHeight: "120px" }}
                      ></textarea>

                      <div className="absolute left-2 bottom-3 flex space-x-1 rtl:space-x-reverse">
                        <button
                          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                          className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                        >
                          <SmileIcon className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                      </div>

                      <button
                        onClick={handleSendMessage}
                        disabled={inputMessage.trim() === ""}
                        className={`absolute right-2 bottom-3 w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-full transition-all ${
                          inputMessage.trim() === ""
                            ? "bg-gray-300 text-white cursor-not-allowed"
                            : "bg-gradient-to-r from-blue-600 to-purple-700 text-white hover:from-blue-700 hover:to-purple-800 shadow-md hover:shadow-lg"
                        }`}
                      >
                        <Send className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      </button>

                      {showEmojiPicker && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute bottom-full left-2 mb-2 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-20"
                        >
                          <div className="flex flex-wrap gap-1 max-w-[200px]">
                            {emojiList.map((emoji) => (
                              <button
                                key={emoji}
                                onClick={() => selectEmoji(emoji)}
                                className="w-7 h-7 text-lg flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                              >
                                {emoji}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex items-center justify-between text-[10px] md:text-xs text-gray-400 dark:text-gray-500 pt-1">
                <div className="flex items-center">
                  <Bot className="w-2.5 h-2.5 md:w-3 md:h-3 ml-1" />
                  <span>پشتیبانی هوشمند سعید پی</span>
                </div>
                {minimized && (
                  <button
                    onClick={() => setMinimized(false)}
                    className="flex items-center text-blue-500 hover:text-blue-600 transition-colors"
                  >
                    <ChevronUp className="w-3 h-3 md:w-4 md:h-4 ml-1" />
                    <span>باز کردن گفتگو</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
