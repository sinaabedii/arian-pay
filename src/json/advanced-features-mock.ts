import {
  SaeedAI,
  SaeedClub,
  SaeedGreen,
  SaeedCultural,
  GroupBuying,
  FamilyPool,
  InfluencerDeal,
  SaeedAR,
  InvestmentProduct,
  MicroInvestment,
  LoyaltyLevel,
} from '@/types/advanced-features';

// AI Assistant Mock Data
export const MOCK_SAEED_AI: SaeedAI = {
  id: 'ai_001',
  userId: 'user_001',
  smartBudgeting: true,
  predictiveCredit: true,
  personalizedOffers: true,
  riskAssessment: true,
  chatHistory: [
    {
      id: 'msg_001',
      message: 'سلام! چطور می‌تونم کمکتون کنم؟',
      sender: 'ai',
      timestamp: new Date(),
      type: 'text'
    },
    {
      id: 'msg_002',
      message: 'خرید این ماه چطور بوده؟',
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    },
    {
      id: 'msg_003',
      message: 'خرید شما این ماه ۱۵% کمتر از ماه قبل بوده! 🎉 می‌تونید ۵۰۰ هزار تومان پس‌انداز کنید.',
      sender: 'ai',
      timestamp: new Date(),
      type: 'celebration'
    }
  ],
  insights: [
    {
      id: 'insight_001',
      type: 'spending',
      title: 'الگوی خرید شما',
      description: 'بیشترین خرید شما در روزهای پنج‌شنبه انجام می‌شود',
      importance: 'medium',
      actionRequired: false,
      createdAt: new Date()
    },
    {
      id: 'insight_002',
      type: 'credit',
      title: 'افزایش اعتبار',
      description: 'با پرداخت به‌موقع قسط‌ها، می‌تونید اعتبارتون رو ۲۰% افزایش بدید',
      importance: 'high',
      actionRequired: true,
      actionUrl: '/dashboard/credit-request',
      createdAt: new Date()
    }
  ],
  recommendations: [
    {
      id: 'rec_001',
      category: 'product',
      title: 'گوشی موبایل پیشنهادی',
      description: 'بر اساس سلیقه شما، این گوشی مناسب است',
      confidence: 85,
      potentialSaving: 500000,
      validUntil: new Date('2024-02-15'),
      products: []
    }
  ]
};

// Loyalty Levels
export const LOYALTY_LEVELS: LoyaltyLevel[] = [
  {
    id: 'bronze',
    name: 'برنزی',
    nameEn: 'Bronze',
    minPoints: 0,
    maxPoints: 999,
    benefits: ['تخفیف ۵%', 'پشتیبانی اولیه'],
    color: '#CD7F32',
    icon: '🥉'
  },
  {
    id: 'silver',
    name: 'نقره‌ای',
    nameEn: 'Silver',
    minPoints: 1000,
    maxPoints: 4999,
    benefits: ['تخفیف ۱۰%', 'پشتیبانی سریع', 'دسترسی به محصولات ویژه'],
    color: '#C0C0C0',
    icon: '🥈'
  },
  {
    id: 'gold',
    name: 'طلایی',
    nameEn: 'Gold',
    minPoints: 5000,
    maxPoints: 14999,
    benefits: ['تخفیف ۱۵%', 'پشتیبانی VIP', 'ارسال رایگان', 'پیش‌نمایش محصولات'],
    color: '#FFD700',
    icon: '🥇'
  },
  {
    id: 'platinum',
    name: 'پلاتینی',
    nameEn: 'Platinum',
    minPoints: 15000,
    maxPoints: 50000,
    benefits: ['تخفیف ۲۰%', 'مشاور اختصاصی', 'دسترسی به رویدادها', 'هدایای ویژه'],
    color: '#E5E4E2',
    icon: '💎'
  }
];

// Gamification Mock Data
export const MOCK_SAEED_CLUB: SaeedClub = {
  userId: 'user_001',
  creditScore: 750,
  loyaltyLevel: LOYALTY_LEVELS[1],
  totalPoints: 2500,
  monthlyPoints: 450,
  challenges: [
    {
      id: 'challenge_001',
      title: 'پرداخت به‌موقع',
      description: 'تمام قسط‌های این ماه را به‌موقع پرداخت کنید',
      type: 'monthly',
      category: 'spending',
      target: 3,
      progress: 2,
      reward: 200,
      bonus: 50,
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-31'),
      completed: false,
      icon: '⏰',
      difficulty: 'easy'
    },
    {
      id: 'challenge_002',
      title: 'خرید سبز',
      description: 'از ۵ محصول پایدار خرید کنید',
      type: 'weekly',
      category: 'environmental',
      target: 5,
      progress: 1,
      reward: 150,
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-01-22'),
      completed: false,
      icon: '🌱',
      difficulty: 'medium'
    }
  ],
  rewards: [
    {
      id: 'reward_001',
      title: 'تخفیف ۱۰% دیجی‌کالا',
      description: 'کد تخفیف ۱۰ درصدی برای خرید از دیجی‌کالا',
      type: 'discount',
      value: 10,
      cost: 500,
      category: 'shopping',
      validUntil: new Date('2024-02-28'),
      redeemed: false
    },
    {
      id: 'reward_002',
      title: 'کاشت درخت',
      description: 'کاشت یک درخت به نام شما',
      type: 'donation',
      value: 100000,
      cost: 1000,
      category: 'environment',
      validUntil: new Date('2024-12-31'),
      redeemed: false
    }
  ],
  achievements: [
    {
      id: 'achievement_001',
      title: 'پرداخت‌کننده منظم',
      description: '۱۰ قسط پیاپی به‌موقع پرداخت کردید',
      icon: '⭐',
      rarity: 'common',
      category: 'payment',
      earnedAt: new Date('2024-01-10'),
      shareText: 'من یک پرداخت‌کننده منظم هستم! 🌟',
      nftToken: 'nft_001'
    }
  ],
  socialImpact: {
    totalDonated: 250000,
    treesPlanted: 3,
    carbonReduced: 15.5,
    localBusinessSupported: 8,
    educationSupported: 120
  },
  streaks: [
    {
      type: 'payment',
      count: 15,
      bestStreak: 23,
      lastAction: new Date(),
      rewardMultiplier: 1.5
    }
  ]
};

// Green Features Mock Data
export const MOCK_SAEED_GREEN: SaeedGreen = {
  userId: 'user_001',
  carbonTracking: true,
  ecoRewards: true,
  recyclingProgram: true,
  localSupport: true,
  carbonFootprint: {
    totalCarbon: 125.5,
    monthlyCarbon: 12.3,
    carbonByCategory: {
      'transportation': 45.2,
      'shopping': 38.1,
      'food': 25.8,
      'utilities': 16.4
    },
    reductionGoal: 100,
    offsetActions: [
      {
        id: 'offset_001',
        type: 'tree_planting',
        amount: 5.5,
        cost: 50000,
        date: new Date('2024-01-15'),
        verified: true,
        certificate: 'cert_tree_001'
      }
    ],
    lastCalculated: new Date()
  },
  greenScore: 72,
  greenAchievements: [],
  recyclingHistory: [
    {
      id: 'recycle_001',
      itemType: 'موبایل قدیمی',
      quantity: 1,
      points: 100,
      carbonSaved: 2.5,
      date: new Date('2024-01-20'),
      location: 'تهران، ولنجک',
      verified: true
    }
  ]
};

// Cultural Features Mock Data
export const MOCK_SAEED_CULTURAL: SaeedCultural = {
  userId: 'user_001',
  persianCalendar: true,
  religiousEvents: true,
  regionalCustoms: true,
  familyValues: true,
  preferences: {
    language: 'fa',
    calendar: 'persian',
    timeFormat: '24',
    currency: 'toman',
    region: 'tehran',
    religiousObservance: true,
    familyNotifications: true
  },
  events: [
    {
      id: 'event_001',
      name: 'نوروز',
      nameEn: 'Nowruz',
      date: new Date('2024-03-20'),
      type: 'cultural',
      description: 'سال نو ایرانی',
      traditions: ['سفره هفت‌سین', 'عیدی', 'دیدونشنید'],
      offers: [
        {
          id: 'offer_001',
          title: 'تخفیف ویژه نوروز',
          description: 'تخفیف ۲۰% برای خرید لباس عید',
          discount: 20,
          categories: ['پوشاک', 'آرایشی'],
          validFrom: new Date('2024-03-15'),
          validTo: new Date('2024-04-05'),
          specialMessage: 'سال نو مبارک!',
          culturalNote: 'در ایران سنت دارند لباس نو برای عید بخرند'
        }
      ],
      reminder: true,
      significance: 'high'
    }
  ],
  customizations: [
    {
      element: 'theme',
      value: 'persian_traditional',
      isDefault: true,
      appliedAt: new Date()
    }
  ]
};

// Marketplace Mock Data (Commented out since interface is commented)
/*
export const MOCK_SAEED_MARKET: SaeedMarket = {
  id: 'market_001',
  name: 'سعید مارکت',
  description: 'فروشگاه اختصاصی محصولات منحصربه‌فرد',
  products: [
    {
      id: 'product_001',
      vendorId: 'vendor_001',
      name: 'کیف چرم دست‌ساز اصفهان',
      description: 'کیف چرم طبیعی با طرح‌های سنتی ایرانی',
      price: 2500000,
      originalPrice: 3000000,
      category: 'صنایع دستی',
      subcategory: 'چرم دوزی',
      images: ['/images/leather-bag-1.jpg'],
      specifications: {
        'جنس': 'چرم طبیعی',
        'اندازه': '25×35 سانتی‌متر',
        'وزن': '500 گرم'
      },
      availability: 'in_stock',
      tags: ['دست‌ساز', 'ایرانی', 'چرم طبیعی'],
      isExclusive: true,
      isLocal: true,
      isSustainable: true,
      sustainabilityScore: 4.5,
      carbonFootprint: 2.1,
      reviews: [],
      rating: 4.8,
      reviewCount: 23,
      arEnabled: true,
      virtualTryOn: false,
      installmentOptions: [
        {
          months: 3,
          monthlyPayment: 833333,
          totalAmount: 2500000,
          interestRate: 0,
          processingFee: 0,
          isRecommended: true
        }
      ]
    }
  ],
  categories: [],
  vendors: [],
  exclusiveDeals: [
    {
      id: 'deal_001',
      title: 'هفته صنایع دستی',
      description: 'تخفیف ویژه روی تمام محصولات دست‌ساز',
      discount: 25,
      productIds: ['product_001'],
      validFrom: new Date('2024-01-20'),
      validTo: new Date('2024-01-27'),
      limitedQuantity: 50,
      soldQuantity: 12,
      requirements: [],
      tier: 'gold'
    }
  ],
  localArtisans: [],
  sustainableProducts: []
};
*/

// Social Commerce Mock Data
export const MOCK_GROUP_BUYING: GroupBuying[] = [
  {
    id: 'group_001',
    productId: 'product_002',
    organizerId: 'user_001',
    title: 'خرید گروهی لپ‌تاپ',
    description: 'با خرید گروهی ۳۰% تخفیف بگیرید',
    targetMembers: 10,
    currentMembers: 7,
    members: [
      {
        userId: 'user_001',
        name: 'علی احمدی',
        joinedAt: new Date('2024-01-15'),
        contribution: 5000000,
        confirmed: true
      }
    ],
    discount: 30,
    pricePerUnit: 35000000,
    originalPrice: 50000000,
    endDate: new Date('2024-01-30'),
    status: 'active',
    familyOnly: false,
    friendsOnly: true
  }
];

export const MOCK_FAMILY_POOL: FamilyPool = {
  id: 'family_001',
  adminId: 'user_001',
  name: 'خانواده احمدی',
  description: 'حساب مشترک خانوادگی برای مدیریت هزینه‌ها',
  members: [
    {
      userId: 'user_001',
      role: 'admin',
      name: 'علی احمدی',
      spendingLimit: 10000000,
      monthlySpent: 3500000,
      permissions: ['approve_purchases', 'manage_limits', 'view_reports'],
      joinedAt: new Date('2024-01-01'),
      lastActive: new Date()
    },
    {
      userId: 'user_002',
      role: 'spouse',
      name: 'فاطمه احمدی',
      spendingLimit: 8000000,
      monthlySpent: 2100000,
      permissions: ['make_purchases', 'view_balance'],
      joinedAt: new Date('2024-01-01'),
      lastActive: new Date()
    }
  ],
  totalCredit: 20000000,
  monthlyBudget: 15000000,
  spentThisMonth: 5600000,
  rules: [
    {
      id: 'rule_001',
      type: 'spending_limit',
      title: 'حد خرید روزانه',
      description: 'حداکثر ۱ میلیون تومان در روز',
      value: 1000000,
      appliesToRoles: ['child'],
      isActive: true
    }
  ],
  notifications: []
};

// AR Features Mock Data
export const MOCK_SAEED_AR: SaeedAR = {
  userId: 'user_001',
  virtualTryOn: true,
  priceComparison: true,
  creditVisualization: true,
  smartShopping: true,
  preferences: {
    enableFaceDetection: true,
    saveVirtualTryOns: true,
    shareWithFriends: false,
    qualityPreference: 'high',
    enableLocationServices: true
  },
  sessions: [
    {
      id: 'ar_session_001',
      type: 'virtual_try_on',
      productId: 'product_003',
      duration: 120,
      interactions: 5,
      result: 'saved',
      timestamp: new Date('2024-01-20'),
      satisfactionScore: 4
    }
  ]
};

// Investment Mock Data
export const MOCK_INVESTMENT_PRODUCTS: InvestmentProduct[] = [
  {
    id: 'invest_001',
    name: 'صندوق طلا',
    type: 'gold',
    description: 'سرمایه‌گذاری در طلای فیزیکی',
    riskLevel: 'low',
    expectedReturn: 12,
    minimumInvestment: 100000,
    fees: [
      {
        type: 'management',
        rate: 1.5,
        description: 'کارمزد مدیریت سالانه'
      }
    ],
    performance: [],
    isShariahCompliant: true,
    isEthical: true,
    sector: 'کالا',
    geography: 'ایران',
    currency: 'تومان',
    liquidity: 'daily'
  }
];

export const MOCK_MICRO_INVESTMENTS: MicroInvestment[] = [
  {
    id: 'micro_001',
    userId: 'user_001',
    productId: 'invest_001',
    amount: 50000,
    shares: 0.5,
    date: new Date('2024-01-20'),
    method: 'spare_change',
    status: 'completed'
  }
];

// Influencer Deals Mock Data
export const MOCK_INFLUENCER_DEALS: InfluencerDeal[] = [
  {
    id: 'influencer_001',
    influencerId: 'inf_001',
    influencerName: 'آرین کسرایی',
    influencerAvatar: '/avatars/aryan.jpg',
    followerCount: 250000,
    productId: 'product_004',
    discountCode: 'ARYAN20',
    discountPercent: 20,
    commission: 5,
    validUntil: new Date('2024-02-15'),
    usageCount: 45,
    maxUsage: 100,
    categories: ['پوشاک', 'مد'],
    description: 'کد تخفیف ویژه آرین برای لباس‌های ورزشی',
    videoUrl: '/videos/aryan-review.mp4',
    verified: true
  }
];

// Hub Services Mock Data (Commented out since interface is commented)
/*
export const MOCK_SAEED_HUB: SaeedHub = {
  userId: 'user_001',
  banking: {
    accountNumber: '6037991234567890',
    balance: 15000000,
    creditLimit: 10000000,
    savingsGoals: [
      {
        id: 'goal_001',
        name: 'خرید خانه',
        targetAmount: 500000000,
        currentAmount: 75000000,
        targetDate: new Date('2026-03-20'),
        category: 'مسکن',
        autoTransfer: true,
        monthlyContribution: 5000000
      }
    ],
    autoPayments: [],
    recurringTransfers: [],
    budgetCategories: []
  },
  insurance: {
    policies: [],
    claims: [],
    recommendations: [],
    riskAssessment: {
      score: 75,
      category: 'moderate',
      factors: [],
      lastAssessed: new Date(),
      recommendations: []
    }
  },
  investment: {
    portfolio: {
      totalValue: 5000000,
      totalReturn: 12.5,
      holdings: [],
      allocation: {},
      lastUpdated: new Date()
    },
    goals: [],
    recommendations: [],
    riskProfile: {
      score: 65,
      category: 'moderate',
      factors: [],
      lastAssessed: new Date(),
      recommendations: []
    },
    autoInvest: {
      enabled: true,
      amount: 500000,
      frequency: 'monthly',
      products: ['invest_001'],
      nextInvestment: new Date('2024-02-01')
    }
  },
  utilities: {
    connectedServices: [],
    autoPayments: [],
    usageTracking: [],
    budgetAlerts: []
  },
  transport: {
    savedLocations: [],
    paymentMethods: [],
    rideHistory: [],
    subscriptions: []
  },
  food: {
    favoriteRestaurants: [],
    dietaryPreferences: [],
    orderHistory: [],
    mealPlanning: [],
    nutritionTracking: []
  },
  community: {
    groups: [],
    events: [],
    contributions: [],
    impact: {
      volunteering: 0,
      donations: 0,
      localSupport: 0,
      environmentalActions: 0
    }
  },
  learning: {
    courses: [],
    progress: [],
    certificates: [],
    recommendations: []
  },
  health: {
    profile: {
      age: 28,
      weight: 75,
      height: 175,
      bloodType: 'A+',
      allergies: [],
      chronicConditions: [],
      emergencyContact: {
        name: 'فاطمه احمدی',
        phone: '09123456789',
        relationship: 'همسر'
      }
    },
    vitals: [],
    appointments: [],
    medications: [],
    insurance: {
      provider: 'بیمه ایران',
      policyNumber: 'IR123456789',
      coverage: 'کامل',
      validUntil: new Date('2024-12-31')
    }
  },
  enabledServices: ['banking', 'investment', 'insurance'],
  preferences: {
    theme: 'light',
    notifications: [],
    privacy: {
      shareData: false,
      allowAnalytics: true,
      showInLeaderboards: true,
      shareAchievements: true
    },
    integrations: []
  }
};
*/

// All mock data is already exported individually above 