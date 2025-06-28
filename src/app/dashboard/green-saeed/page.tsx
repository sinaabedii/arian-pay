"use client";

import { useState } from "react";
import { 
  TreePine, 
  Leaf, 
  Recycle, 
  MapPin, 
  TrendingDown,
  Heart,
  Target,
  Shield,
  Zap,
  Globe,
  CheckCircle,
  Star,
  BadgeCheck,
  Lightbulb,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  SaeedGreen, 
} from "@/types/advanced-features";
import { MOCK_SAEED_GREEN } from "@/json/advanced-features-mock";

export default function GreenSaeedPage() {
  const [greenData] = useState<SaeedGreen>(MOCK_SAEED_GREEN);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fa-IR').format(amount) + ' تومان';
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('fa-IR');
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    if (score >= 40) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getGoalProgress = () => {
    const current = greenData.carbonFootprint.totalCarbon;
    const goal = greenData.carbonFootprint.reductionGoal;
    return Math.max(0, Math.min(100, ((goal - current) / goal) * 100));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
              <TreePine className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">سعید سبز</h1>
              <p className="text-gray-600">پلتفرم پایداری و مسئولیت اجتماعی</p>
            </div>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Green Score */}
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                <Leaf className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{greenData.greenScore}</h3>
              <p className="text-gray-600">امتیاز سبز</p>
              <Badge className={`mt-2 ${getScoreColor(greenData.greenScore)}`}>
                {greenData.greenScore >= 80 ? 'عالی' :
                 greenData.greenScore >= 60 ? 'خوب' :
                 greenData.greenScore >= 40 ? 'متوسط' : 'نیاز به بهبود'}
              </Badge>
            </CardContent>
          </Card>

          {/* Carbon Footprint */}
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <Globe className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{greenData.carbonFootprint.totalCarbon} کیلوگرم</h3>
              <p className="text-gray-600">ردپای کربن</p>
              <div className="flex items-center justify-center gap-1 mt-2">
                <TrendingDown className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600">-۱۲% این ماه</span>
              </div>
            </CardContent>
          </Card>

          {/* Trees Planted */}
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
                <TreePine className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{greenData.carbonFootprint.offsetActions.filter(a => a.type === 'tree_planting').length}</h3>
              <p className="text-gray-600">درخت کاشته شده</p>
              <p className="text-sm text-emerald-600 mt-2">
                {greenData.carbonFootprint.offsetActions.reduce((sum, a) => a.type === 'tree_planting' ? sum + a.amount : sum, 0)} کیلوگرم CO₂ جذب
              </p>
            </CardContent>
          </Card>

          {/* Recycling Points */}
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                <Recycle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{greenData.recyclingHistory.reduce((sum, r) => sum + r.points, 0)}</h3>
              <p className="text-gray-600">امتیاز بازیافت</p>
              <p className="text-sm text-purple-600 mt-2">
                {greenData.recyclingHistory.length} آیتم بازیافت شده
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="carbon" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="carbon">ردپای کربن</TabsTrigger>
            <TabsTrigger value="recycling">بازیافت</TabsTrigger>
            <TabsTrigger value="rewards">جوایز سبز</TabsTrigger>
            <TabsTrigger value="local">حمایت محلی</TabsTrigger>
          </TabsList>

          {/* Carbon Footprint Tab */}
          <TabsContent value="carbon" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Carbon Goal */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-green-500" />
                    هدف کاهش کربن
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>هدف سالانه</span>
                      <span className="font-bold">{greenData.carbonFootprint.reductionGoal} کیلوگرم</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>وضعیت فعلی</span>
                      <span className="font-bold">{greenData.carbonFootprint.totalCarbon} کیلوگرم</span>
                    </div>
                    <Progress value={getGoalProgress()} className="h-3" />
                    <p className="text-sm text-gray-600">
                      شما {getGoalProgress().toFixed(1)}% به هدف خود رسیده‌اید
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Carbon by Category */}
              <Card>
                <CardHeader>
                  <CardTitle>کربن بر اساس دسته‌بندی</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(greenData.carbonFootprint.carbonByCategory).map(([category, amount]) => (
                      <div key={category} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>
                            {category === 'transportation' && 'حمل و نقل'}
                            {category === 'shopping' && 'خرید'}
                            {category === 'food' && 'غذا'}
                            {category === 'utilities' && 'خدمات'}
                          </span>
                          <span>{amount} کیلوگرم</span>
                        </div>
                        <Progress 
                          value={(amount / greenData.carbonFootprint.totalCarbon) * 100} 
                          className="h-2"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Offset Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-500" />
                  اقدامات جبران‌سازی
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {greenData.carbonFootprint.offsetActions.map((action) => (
                    <Card key={action.id} className="border-l-4 border-l-green-500">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {action.type === 'tree_planting' && <TreePine className="w-4 h-4 text-green-500" />}
                            {action.type === 'renewable_energy' && <Zap className="w-4 h-4 text-yellow-500" />}
                            {action.type === 'carbon_credit' && <Badge className="w-4 h-4 text-blue-500" />}
                            {action.type === 'local_purchase' && <MapPin className="w-4 h-4 text-purple-500" />}
                            {action.type === 'recycling' && <Recycle className="w-4 h-4 text-emerald-500" />}
                            <span className="text-sm font-medium">
                              {action.type === 'tree_planting' && 'کاشت درخت'}
                              {action.type === 'renewable_energy' && 'انرژی تجدیدپذیر'}
                              {action.type === 'carbon_credit' && 'اعتبار کربن'}
                              {action.type === 'local_purchase' && 'خرید محلی'}
                              {action.type === 'recycling' && 'بازیافت'}
                            </span>
                          </div>
                          {action.verified && (
                            <BadgeCheck className="w-4 h-4 text-green-500" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {action.amount} کیلوگرم CO₂ جبران شده
                        </p>
                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <span>{formatDate(action.date)}</span>
                          <span>{formatCurrency(action.cost)}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Recycling Tab */}
          <TabsContent value="recycling" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recycling Stats */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Recycle className="w-5 h-5 text-green-500" />
                    آمار بازیافت
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {greenData.recyclingHistory.length}
                    </div>
                    <p className="text-sm text-gray-600">آیتم بازیافت شده</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {greenData.recyclingHistory.reduce((sum, r) => sum + r.carbonSaved, 0)} کیلوگرم
                    </div>
                    <p className="text-sm text-gray-600">کربن صرفه‌جویی شده</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {greenData.recyclingHistory.reduce((sum, r) => sum + r.points, 0)}
                    </div>
                    <p className="text-sm text-gray-600">امتیاز دریافتی</p>
                  </div>
                </CardContent>
              </Card>

              {/* Recycling History */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>تاریخچه بازیافت</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {greenData.recyclingHistory.map((record) => (
                      <div key={record.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <Recycle className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">{record.itemType}</h4>
                            <p className="text-sm text-gray-600">
                              {record.quantity} عدد • {record.location}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1">
                            <span className="text-sm font-medium">+{record.points}</span>
                            <Star className="w-4 h-4 text-yellow-500" />
                          </div>
                          <p className="text-xs text-gray-500">
                            {record.carbonSaved} کیلوگرم CO₂ کمتر
                          </p>
                          <p className="text-xs text-gray-400">
                            {formatDate(record.date)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* New Recycling Request */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  درخواست بازیافت جدید
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { icon: "📱", title: "موبایل و تبلت", points: "100-500 امتیاز" },
                    { icon: "💻", title: "لپ‌تاپ و کامپیوتر", points: "200-800 امتیاز" },
                    { icon: "📺", title: "تلویزیون", points: "150-600 امتیاز" },
                    { icon: "🔋", title: "باتری", points: "50-200 امتیاز" },
                  ].map((item, index) => (
                    <Card key={index} className="text-center cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="text-3xl mb-2">{item.icon}</div>
                        <h4 className="font-medium text-sm mb-1">{item.title}</h4>
                        <p className="text-xs text-green-600">{item.points}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <Button className="w-full mt-4 bg-green-500 hover:bg-green-600">
                  درخواست جمع‌آوری
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Green Rewards Tab */}
          <TabsContent value="rewards" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  id: "reward_tree",
                  title: "کاشت درخت",
                  description: "یک نهال به نام شما کاشته می‌شود",
                  points: 1000,
                  impact: "10 کیلوگرم CO₂ در سال",
                  icon: <TreePine className="w-6 h-6 text-green-600" />,
                  color: "bg-green-100"
                },
                {
                  id: "reward_solar",
                  title: "انرژی خورشیدی",
                  description: "سهم شما در پنل خورشیدی",
                  points: 2000,
                  impact: "50 کیلوگرم CO₂ کاهش",
                  icon: <Zap className="w-6 h-6 text-yellow-600" />,
                  color: "bg-yellow-100"
                },
                {
                  id: "reward_ocean",
                  title: "پاکسازی اقیانوس",
                  description: "حذف پلاستیک از اقیانوس",
                  points: 1500,
                  impact: "5 کیلوگرم زباله کمتر",
                  icon: <Globe className="w-6 h-6 text-blue-600" />,
                  color: "bg-blue-100"
                },
                {
                  id: "reward_education",
                  title: "آموزش محیط زیست",
                  description: "حمایت از آموزش کودکان",
                  points: 800,
                  impact: "۱ کودک، ۱ ماه آموزش",
                  icon: <Lightbulb className="w-6 h-6 text-purple-600" />,
                  color: "bg-purple-100"
                },
                {
                  id: "reward_water",
                  title: "آب پاک",
                  description: "تامین آب آشامیدنی سالم",
                  points: 1200,
                  impact: "100 لیتر آب پاک",
                  icon: <Heart className="w-6 h-6 text-cyan-600" />,
                  color: "bg-cyan-100"
                },
                {
                  id: "reward_local",
                  title: "حمایت از کسب‌وکار محلی",
                  description: "تخفیف ویژه محصولات محلی",
                  points: 500,
                  impact: "15% تخفیف",
                  icon: <MapPin className="w-6 h-6 text-orange-600" />,
                  color: "bg-orange-100"
                }
              ].map((reward) => (
                <Card key={reward.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 ${reward.color} rounded-lg flex items-center justify-center mb-4`}>
                      {reward.icon}
                    </div>
                    <h3 className="font-bold mb-2">{reward.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{reward.description}</p>
                    <div className="flex items-center gap-2 text-sm text-green-600 mb-4">
                      <CheckCircle className="w-4 h-4" />
                      <span>{reward.impact}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold">{reward.points} امتیاز</span>
                      <Button size="sm" className="bg-green-500 hover:bg-green-600">
                        دریافت
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Local Support Tab */}
          <TabsContent value="local" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Local Impact */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-purple-500" />
                    تأثیر محلی شما
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-purple-600">۸</div>
                      <p className="text-sm text-gray-600">کسب‌وکار محلی</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">۲۵</div>
                      <p className="text-sm text-gray-600">محصول محلی</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">۱۲۰ کیلومتر</div>
                      <p className="text-sm text-gray-600">کاهش حمل و نقل</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-orange-600">۳.۵ میلیون</div>
                      <p className="text-sm text-gray-600">حمایت اقتصادی</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Local Businesses */}
              <Card>
                <CardHeader>
                  <CardTitle>کسب‌وکارهای محلی</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: "قنادی سنتی احمد", category: "شیرینی", discount: "10%", distance: "۲ کیلومتر" },
                      { name: "کارگاه چرم دوزی پارس", category: "چرم", discount: "15%", distance: "۵ کیلومتر" },
                      { name: "مزرعه ارگانیک سبز", category: "محصولات کشاورزی", discount: "20%", distance: "۱۵ کیلومتر" },
                      { name: "کافه محلی نیما", category: "کافه", discount: "5%", distance: "۱ کیلومتر" }
                    ].map((business, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-sm">{business.name}</h4>
                          <p className="text-xs text-gray-600">{business.category} • {business.distance}</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          {business.discount} تخفیف
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Carbon Saved Map */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-blue-500" />
                  نقشه کربن صرفه‌جویی شده
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <MapPin className="w-12 h-12 mx-auto mb-2" />
                    <p>نقشه تعاملی خریدهای محلی</p>
                    <p className="text-sm">مجموع کاهش کربن: ۴۵.۲ کیلوگرم</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 