// Advanced Features Types for Saeed Pay
export interface SaeedAI {
  id: string;
  userId: string;
  smartBudgeting: boolean;
  predictiveCredit: boolean;
  personalizedOffers: boolean;
  riskAssessment: boolean;
  chatHistory: ChatMessage[];
  insights: AIInsight[];
  recommendations: AIRecommendation[];
}

export interface ChatMessage {
  id: string;
  message: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type: 'text' | 'recommendation' | 'warning' | 'celebration';
  metadata?: Record<string, unknown>;
}

export interface AIInsight {
  id: string;
  type: 'spending' | 'saving' | 'credit' | 'investment';
  title: string;
  description: string;
  importance: 'low' | 'medium' | 'high' | 'critical';
  actionRequired: boolean;
  actionUrl?: string;
  createdAt: Date;
}

export interface AIRecommendation {
  id: string;
  category: 'product' | 'financial' | 'behavioral';
  title: string;
  description: string;
  confidence: number; // 0-100
  potentialSaving: number;
  validUntil: Date;
  products?: Product[];
}

// Gamification & Loyalty System
export interface SaeedClub {
  userId: string;
  creditScore: number; // 0-1000
  loyaltyLevel: LoyaltyLevel;
  totalPoints: number;
  monthlyPoints: number;
  challenges: Challenge[];
  rewards: Reward[];
  achievements: Achievement[];
  socialImpact: SocialImpact;
  streaks: Streak[];
}

export interface LoyaltyLevel {
  id: string;
  name: string;
  nameEn: string;
  minPoints: number;
  maxPoints: number;
  benefits: string[];
  color: string;
  icon: string;
  nextLevel?: LoyaltyLevel;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly' | 'special';
  category: 'spending' | 'saving' | 'social' | 'environmental';
  target: number;
  progress: number;
  reward: number; // points
  bonus?: number;
  startDate: Date;
  endDate: Date;
  completed: boolean;
  icon: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  type: 'discount' | 'cashback' | 'product' | 'experience' | 'donation';
  value: number;
  cost: number; // in points
  category: string;
  validUntil: Date;
  limitations?: string[];
  partnerLogo?: string;
  redeemed: boolean;
  redeemedAt?: Date;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  category: string;
  earnedAt: Date;
  shareText: string;
  nftToken?: string;
}

export interface SocialImpact {
  totalDonated: number;
  treesPlanted: number;
  carbonReduced: number; // in kg
  localBusinessSupported: number;
  educationSupported: number; // hours
}

export interface Streak {
  type: 'payment' | 'saving' | 'green' | 'local';
  count: number;
  bestStreak: number;
  lastAction: Date;
  rewardMultiplier: number;
}

// Social Commerce
export interface GroupBuying {
  id: string;
  productId: string;
  organizerId: string;
  title: string;
  description: string;
  targetMembers: number;
  currentMembers: number;
  members: GroupMember[];
  discount: number; // percentage
  pricePerUnit: number;
  originalPrice: number;
  endDate: Date;
  status: 'active' | 'completed' | 'cancelled' | 'failed';
  familyOnly: boolean;
  friendsOnly: boolean;
  requirements?: string[];
}

export interface GroupMember {
  userId: string;
  name: string;
  avatar?: string;
  joinedAt: Date;
  contribution: number;
  confirmed: boolean;
}

export interface FamilyPool {
  id: string;
  adminId: string;
  name: string;
  description: string;
  members: FamilyMember[];
  totalCredit: number;
  monthlyBudget: number;
  spentThisMonth: number;
  rules: PoolRule[];
  notifications: PoolNotification[];
}

export interface FamilyMember {
  userId: string;
  role: 'admin' | 'parent' | 'child' | 'spouse';
  name: string;
  avatar?: string;
  spendingLimit: number;
  monthlySpent: number;
  permissions: string[];
  joinedAt: Date;
  lastActive: Date;
}

export interface PoolRule {
  id: string;
  type: 'spending_limit' | 'category_restriction' | 'time_restriction' | 'approval_required';
  title: string;
  description: string;
  value: string | number | boolean;
  appliesToRoles: string[];
  isActive: boolean;
}

export interface InfluencerDeal {
  id: string;
  influencerId: string;
  influencerName: string;
  influencerAvatar: string;
  followerCount: number;
  productId: string;
  discountCode: string;
  discountPercent: number;
  commission: number;
  validUntil: Date;
  usageCount: number;
  maxUsage: number;
  categories: string[];
  description: string;
  videoUrl?: string;
  verified: boolean;
}

// AR/VR Features
export interface SaeedAR {
  userId: string;
  virtualTryOn: boolean;
  priceComparison: boolean;
  creditVisualization: boolean;
  smartShopping: boolean;
  preferences: ARPreferences;
  sessions: ARSession[];
}

export interface ARPreferences {
  enableFaceDetection: boolean;
  saveVirtualTryOns: boolean;
  shareWithFriends: boolean;
  qualityPreference: 'low' | 'medium' | 'high';
  enableLocationServices: boolean;
}

export interface ARSession {
  id: string;
  type: 'virtual_try_on' | 'price_comparison' | 'product_info' | 'store_navigation';
  productId?: string;
  storeId?: string;
  duration: number; // seconds
  interactions: number;
  result: 'purchased' | 'saved' | 'shared' | 'dismissed';
  timestamp: Date;
  satisfactionScore?: number; // 1-5
}

export interface VirtualTryOn {
  id: string;
  productId: string;
  userId: string;
  imageUrl: string;
  result: string; // base64 or URL
  liked: boolean;
  shared: boolean;
  purchased: boolean;
  createdAt: Date;
  metadata: {
    bodyMeasurements?: Record<string, number>;
    skinTone?: string;
    faceShape?: string;
    preferences?: string[];
  };
}

// Sustainability & Green Features
export interface SaeedGreen {
  userId: string;
  carbonTracking: boolean;
  ecoRewards: boolean;
  recyclingProgram: boolean;
  localSupport: boolean;
  carbonFootprint: CarbonFootprint;
  greenScore: number; // 0-100
  greenAchievements: Achievement[];
  recyclingHistory: RecyclingRecord[];
}

export interface CarbonFootprint {
  totalCarbon: number; // kg CO2
  monthlyCarbon: number;
  carbonByCategory: Record<string, number>;
  reductionGoal: number;
  offsetActions: OffsetAction[];
  lastCalculated: Date;
}

export interface OffsetAction {
  id: string;
  type: 'tree_planting' | 'renewable_energy' | 'carbon_credit' | 'local_purchase' | 'recycling';
  amount: number; // carbon offset in kg
  cost: number;
  date: Date;
  verified: boolean;
  certificate?: string;
}

export interface RecyclingRecord {
  id: string;
  itemType: string;
  quantity: number;
  points: number;
  carbonSaved: number;
  date: Date;
  location: string;
  verified: boolean;
}

export interface GreenProduct {
  productId: string;
  ecoRating: number; // 1-5
  carbonFootprint: number;
  recyclable: boolean;
  sustainableMaterials: string[];
  localProducer: boolean;
  certifications: string[];
  environmentalImpact: string;
  alternativeSuggestions: string[];
}

// Cultural & Persian Features
export interface SaeedCultural {
  userId: string;
  persianCalendar: boolean;
  religiousEvents: boolean;
  regionalCustoms: boolean;
  familyValues: boolean;
  preferences: CulturalPreferences;
  events: CulturalEvent[];
  customizations: CulturalCustomization[];
}

export interface CulturalPreferences {
  language: 'fa' | 'en';
  calendar: 'persian' | 'gregorian' | 'both';
  timeFormat: '12' | '24';
  currency: 'toman' | 'rial';
  region: string;
  religiousObservance: boolean;
  familyNotifications: boolean;
}

export interface CulturalEvent {
  id: string;
  name: string;
  nameEn: string;
  date: Date;
  type: 'religious' | 'national' | 'cultural' | 'seasonal';
  description: string;
  traditions: string[];
  offers: EventOffer[];
  reminder: boolean;
  significance: 'low' | 'medium' | 'high';
}

export interface EventOffer {
  id: string;
  title: string;
  description: string;
  discount: number;
  categories: string[];
  validFrom: Date;
  validTo: Date;
  specialMessage: string;
  culturalNote?: string;
}

export interface CulturalCustomization {
  element: 'theme' | 'font' | 'layout' | 'greetings' | 'notifications';
  value: string;
  isDefault: boolean;
  appliedAt: Date;
}

// Marketplace Features (Commented out until all dependencies are implemented)
/*
export interface SaeedMarket {
  id: string;
  name: string;
  description: string;
  products: MarketplaceProduct[];
  categories: MarketplaceCategory[];
  vendors: Vendor[];
  exclusiveDeals: ExclusiveDeal[];
  localArtisans: LocalArtisan[];
  sustainableProducts: SustainableProduct[];
}

export interface MarketplaceProduct {
  id: string;
  vendorId: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory: string;
  images: string[];
  videos?: string[];
  specifications: Record<string, unknown>;
  availability: 'in_stock' | 'out_of_stock' | 'pre_order' | 'limited';
  tags: string[];
  isExclusive: boolean;
  isLocal: boolean;
  isSustainable: boolean;
  sustainabilityScore?: number;
  carbonFootprint?: number;
  reviews: ProductReview[];
  rating: number;
  reviewCount: number;
  arEnabled: boolean;
  virtualTryOn: boolean;
  installmentOptions: InstallmentOption[];
}

export interface Vendor {
  id: string;
  name: string;
  description: string;
  logo: string;
  cover?: string;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  isLocal: boolean;
  isSustainable: boolean;
  specialties: string[];
  location: {
    address: string;
    city: string;
    region: string;
    coordinates: [number, number];
  };
  contact: {
    phone?: string;
    email?: string;
    website?: string;
    social?: Record<string, string>;
  };
  policies: {
    returnPolicy: string;
    shippingPolicy: string;
    warrantyPolicy: string;
  };
  stats: {
    totalSales: number;
    totalProducts: number;
    responseTime: number; // hours
    joinedAt: Date;
  };
}

export interface ExclusiveDeal {
  id: string;
  title: string;
  description: string;
  discount: number;
  productIds: string[];
  validFrom: Date;
  validTo: Date;
  limitedQuantity?: number;
  soldQuantity: number;
  requirements: DealRequirement[];
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
}

export interface LocalArtisan {
  vendorId: string;
  artform: string;
  experience: number; // years
  techniques: string[];
  materials: string[];
  culturalSignificance: string;
  storyBehind: string;
  certifications: string[];
  awardsRecognitions: string[];
  customOrdersAvailable: boolean;
  leadTime: number; // days
}
*/

// Investment Features
export interface InvestmentProduct {
  id: string;
  name: string;
  type: 'stock' | 'bond' | 'fund' | 'gold' | 'real_estate' | 'crypto' | 'startup';
  description: string;
  riskLevel: 'very_low' | 'low' | 'medium' | 'high' | 'very_high';
  expectedReturn: number; // percentage
  minimumInvestment: number;
  fees: InvestmentFee[];
  performance: PerformanceData[];
  isShariahCompliant: boolean;
  isEthical: boolean;
  sector: string;
  geography: string;
  currency: string;
  liquidity: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly' | 'illiquid';
}

export interface InvestmentFee {
  type: 'management' | 'transaction' | 'performance' | 'exit';
  rate: number; // percentage or fixed amount
  description: string;
}

export interface PerformanceData {
  date: Date;
  value: number;
  volume?: number;
  change: number;
  changePercent: number;
}

export interface MicroInvestment {
  id: string;
  userId: string;
  productId: string;
  amount: number;
  shares: number;
  date: Date;
  method: 'spare_change' | 'recurring' | 'manual' | 'rewards';
  status: 'pending' | 'completed' | 'failed';
}

export interface InvestmentGoal {
  id: string;
  name: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: Date;
  strategy: 'conservative' | 'moderate' | 'aggressive';
  autoInvest: boolean;
  monthlyContribution: number;
  products: string[]; // product IDs
  progress: number; // 0-100
}

// IoT Features (Commented out until all dependencies are implemented)
/*
export interface SaeedIoT {
  userId: string;
  connectedDevices: IoTDevice[];
  smartHome: SmartHome;
  wearables: Wearable[];
  vehicles: ConnectedVehicle[];
  automations: IoTAutomation[];
}

export interface IoTDevice {
  id: string;
  name: string;
  type: 'smart_home' | 'wearable' | 'vehicle' | 'pos' | 'sensor';
  brand: string;
  model: string;
  status: 'online' | 'offline' | 'error';
  lastSeen: Date;
  batteryLevel?: number;
  paymentEnabled: boolean;
  securityToken: string;
  permissions: string[];
}

export interface SmartHome {
  utilities: SmartUtility[];
  appliances: SmartAppliance[];
  security: SmartSecurity[];
  autoPayments: HomeAutoPayment[];
  energyUsage: EnergyUsage[];
  monthlyBudget: number;
  spentThisMonth: number;
}

export interface Wearable {
  deviceId: string;
  type: 'smartwatch' | 'fitness_band' | 'smart_ring' | 'smart_glasses';
  paymentMethods: string[];
  quickPayEnabled: boolean;
  biometricAuth: boolean;
  spendingLimit: number;
  dailySpent: number;
  healthData?: HealthMetric[];
}

export interface ConnectedVehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  vin: string;
  paymentMethods: string[];
  fuelCards: FuelCard[];
  parkingPasses: ParkingPass[];
  maintenanceSchedule: MaintenanceRecord[];
  insuranceInfo: VehicleInsurance;
}
*/

// Additional supporting interfaces
export interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: Date;
  category: string;
  autoTransfer: boolean;
  monthlyContribution: number;
}

export interface AutoPayment {
  id: string;
  name: string;
  amount: number;
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  nextDate: Date;
  category: string;
  isActive: boolean;
}

export interface BudgetCategory {
  id: string;
  name: string;
  icon: string;
  budgetAmount: number;
  spentAmount: number;
  percentage: number;
  isOverBudget: boolean;
}

export interface InsurancePolicy {
  id: string;
  type: 'health' | 'life' | 'auto' | 'home' | 'travel';
  provider: string;
  policyNumber: string;
  premium: number;
  coverage: number;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
}

export interface RiskProfile {
  score: number; // 0-100
  category: 'conservative' | 'moderate' | 'aggressive';
  factors: RiskFactor[];
  lastAssessed: Date;
  recommendations: string[];
}

export interface RiskFactor {
  factor: string;
  weight: number;
  score: number;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  vendor: string;
  rating: number;
  reviewCount: number;
  isAvailable: boolean;
  isFeatured: boolean;
  tags: string[];
}

export interface InstallmentOption {
  months: number;
  monthlyPayment: number;
  totalAmount: number;
  interestRate: number;
  processingFee: number;
  isRecommended: boolean;
}

export interface ProductReview {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  content: string;
  date: Date;
  verified: boolean;
  helpful: number;
  images?: string[];
  pros?: string[];
  cons?: string[];
}

export interface DealRequirement {
  type: 'loyalty_level' | 'spending_amount' | 'first_time' | 'referral' | 'location';
  value: string | number | boolean;
  description: string;
}

export interface HubPreferences {
  theme: 'light' | 'dark' | 'auto';
  notifications: NotificationPreference[];
  privacy: PrivacySettings;
  integrations: ServiceIntegration[];
}

export interface NotificationPreference {
  service: string;
  type: string;
  enabled: boolean;
  frequency: 'instant' | 'daily' | 'weekly';
}

export interface ServiceIntegration {
  service: string;
  enabled: boolean;
  permissions: string[];
  lastSync: Date;
}

export interface PrivacySettings {
  shareData: boolean;
  allowAnalytics: boolean;
  showInLeaderboards: boolean;
  shareAchievements: boolean;
}

// Notification System
export interface NotificationData {
  id: string;
  userId: string;
  type: 'payment' | 'achievement' | 'offer' | 'reminder' | 'social' | 'system';
  title: string;
  message: string;
  data?: Record<string, unknown>;
  read: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: Date;
  expiresAt?: Date;
  actionUrl?: string;
  actionText?: string;
  icon?: string;
  color?: string;
}

export interface PoolNotification {
  id: string;
  type: 'spending_limit' | 'approval_request' | 'budget_alert' | 'member_activity';
  title: string;
  message: string;
  memberId: string;
  amount?: number;
  category?: string;
  requiresAction: boolean;
  createdAt: Date;
  resolvedAt?: Date;
}

// Super App Features (Commented out until all dependencies are implemented)
/*
export interface SaeedHub {
  userId: string;
  banking: SaeedBank;
  insurance: SaeedInsurance;
  investment: SaeedInvest;
  utilities: SaeedUtils;
  transport: SaeedMove;
  food: SaeedFood;
  community: SaeedCommunity;
  learning: SaeedEdu;
  health: SaeedHealth;
  enabledServices: string[];
  preferences: HubPreferences;
}

export interface SaeedBank {
  accountNumber: string;
  balance: number;
  creditLimit: number;
  savingsGoals: SavingsGoal[];
  autoPayments: AutoPayment[];
  recurringTransfers: RecurringTransfer[];
  budgetCategories: BudgetCategory[];
}

export interface SaeedInsurance {
  policies: InsurancePolicy[];
  claims: InsuranceClaim[];
  recommendations: InsuranceRecommendation[];
  riskAssessment: RiskAssessment;
}

export interface SaeedInvest {
  portfolio: InvestmentPortfolio;
  goals: InvestmentGoal[];
  recommendations: InvestmentRecommendation[];
  riskProfile: RiskProfile;
  autoInvest: AutoInvestSettings;
}

export interface SaeedUtils {
  connectedServices: ConnectedUtility[];
  autoPayments: UtilityAutoPayment[];
  usageTracking: UsageTracking[];
  budgetAlerts: BudgetAlert[];
}

export interface SaeedMove {
  savedLocations: SavedLocation[];
  paymentMethods: TransportPayment[];
  rideHistory: RideRecord[];
  subscriptions: TransportSubscription[];
}

export interface SaeedFood {
  favoriteRestaurants: Restaurant[];
  dietaryPreferences: DietaryPreference[];
  orderHistory: FoodOrder[];
  mealPlanning: MealPlan[];
  nutritionTracking: NutritionData[];
}

export interface SaeedCommunity {
  groups: CommunityGroup[];
  events: CommunityEvent[];
  contributions: CommunityContribution[];
  impact: CommunityImpact;
}

export interface SaeedEdu {
  courses: EducationalCourse[];
  progress: LearningProgress[];
  certificates: Certificate[];
  recommendations: CourseRecommendation[];
}

export interface SaeedHealth {
  profile: HealthProfile;
  vitals: HealthVital[];
  appointments: HealthAppointment[];
  medications: Medication[];
  insurance: HealthInsurance;
}
*/ 