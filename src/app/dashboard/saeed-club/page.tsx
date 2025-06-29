"use client";

import { useState } from "react";
import Image from "next/image";
import { 
  Trophy, 
  Gift, 
  Clock, 
  Users, 
  Heart, 
  TreePine,
  Star,
  Crown,
  Flame,
  CheckCircle2,
  Share2,
  Download,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  SaeedClub, 
  Challenge, 
  Achievement
} from "@/types/advanced-features";
import { 
  MOCK_SAEED_CLUB
} from "@/json/advanced-features-mock";

export default function SaeedClubPage() {
  const [clubData] = useState<SaeedClub>(MOCK_SAEED_CLUB);
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fa-IR').format(amount) + ' تومان';
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('fa-IR');
  };

  const getDaysRemaining = (endDate: Date) => {
    const now = new Date();
    const diff = new Date(endDate).getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const getDifficultyColor = (difficulty: Challenge['difficulty']) => {
    switch (difficulty) {
      case 'easy': return 'text-green-500 bg-green-50';
      case 'medium': return 'text-yellow-500 bg-yellow-50';
      case 'hard': return 'text-red-500 bg-red-50';
    }
  };

  const getRarityGlow = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common': return 'shadow-gray-200';
      case 'rare': return 'shadow-blue-200';
      case 'epic': return 'shadow-purple-200';
      case 'legendary': return 'shadow-yellow-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-3 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 lg:space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3 sm:space-y-4">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">سعید کلاب</h1>
              <p className="text-sm sm:text-base text-gray-600">باشگاه وفاداری و گیمیفیکیشن</p>
            </div>
          </div>
        </div>

        {/* Current Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {/* Credit Score */}
          <Card className="text-center bg-white border border-gray-200 shadow-sm">
            <CardContent className="p-4 sm:p-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{clubData.creditScore}</h3>
              <p className="text-sm sm:text-base text-gray-700 font-medium">امتیاز اعتباری</p>
              <Progress value={(clubData.creditScore / 1000) * 100} className="mt-2 sm:mt-3" />
            </CardContent>
          </Card>

          {/* Loyalty Level */}
          <Card className="text-center bg-white border border-gray-200 shadow-sm">
            <CardContent className="p-4 sm:p-6">
              <div 
                className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center text-xl sm:text-2xl"
                style={{ backgroundColor: clubData.loyaltyLevel.color }}
              >
                {clubData.loyaltyLevel.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">{clubData.loyaltyLevel.name}</h3>
              <p className="text-sm sm:text-base text-gray-700 font-medium">سطح عضویت</p>
              <div className="mt-2 sm:mt-3 space-y-1">
                <Progress 
                  value={((clubData.totalPoints - clubData.loyaltyLevel.minPoints) / (clubData.loyaltyLevel.maxPoints - clubData.loyaltyLevel.minPoints)) * 100} 
                />
                <p className="text-xs text-gray-700 font-medium">
                  {clubData.totalPoints} / {clubData.loyaltyLevel.maxPoints} امتیاز
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Points */}
          <Card className="text-center sm:col-span-2 lg:col-span-1 bg-white border border-gray-200 shadow-sm">
            <CardContent className="p-4 sm:p-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                <Star className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{clubData.monthlyPoints.toLocaleString('fa-IR')}</h3>
              <p className="text-sm sm:text-base text-gray-700 font-medium">امتیاز این ماه</p>
              <p className="text-sm text-green-600 mt-2 font-medium">
                +{((clubData.monthlyPoints / clubData.totalPoints) * 100).toFixed(1)}% نسبت به کل
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="challenges" className="space-y-4 sm:space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-1 bg-gray-100 p-1 rounded-xl">
            <TabsTrigger value="challenges" className="text-xs sm:text-sm text-gray-600 font-medium data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm data-[state=inactive]:hover:text-gray-800 data-[state=inactive]:hover:bg-gray-50 transition-all duration-200 rounded-lg">چالش‌ها</TabsTrigger>
            <TabsTrigger value="rewards" className="text-xs sm:text-sm text-gray-600 font-medium data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm data-[state=inactive]:hover:text-gray-800 data-[state=inactive]:hover:bg-gray-50 transition-all duration-200 rounded-lg">جوایز</TabsTrigger>
            <TabsTrigger value="achievements" className="text-xs sm:text-sm text-gray-600 font-medium data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm data-[state=inactive]:hover:text-gray-800 data-[state=inactive]:hover:bg-gray-50 transition-all duration-200 rounded-lg">دستاوردها</TabsTrigger>
            <TabsTrigger value="impact" className="text-xs sm:text-sm text-gray-600 font-medium data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm data-[state=inactive]:hover:text-gray-800 data-[state=inactive]:hover:bg-gray-50 transition-all duration-200 rounded-lg">تأثیر اجتماعی</TabsTrigger>
          </TabsList>

          {/* Challenges */}
          <TabsContent value="challenges" className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {clubData.challenges.map((challenge) => (
                <Card key={challenge.id} className="hover:shadow-lg transition-shadow bg-white border border-gray-200 shadow-sm">
                  <CardHeader className="p-4 sm:p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="text-xl sm:text-2xl">{challenge.icon}</div>
                        <div className="min-w-0 flex-1">
                          <CardTitle className="text-base sm:text-lg text-gray-900">{challenge.title}</CardTitle>
                          <p className="text-xs sm:text-sm text-gray-700 font-medium mt-1">{challenge.description}</p>
                        </div>
                      </div>
                      <Badge className={`${getDifficultyColor(challenge.difficulty)} text-xs shrink-0`}>
                        {challenge.difficulty === 'easy' && 'آسان'}
                        {challenge.difficulty === 'medium' && 'متوسط'}
                        {challenge.difficulty === 'hard' && 'سخت'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <div className="space-y-3 sm:space-y-4">
                      {/* Progress */}
                      <div>
                        <div className="flex justify-between text-xs sm:text-sm mb-2">
                          <span className="text-gray-700 font-medium">پیشرفت</span>
                          <span className="text-gray-800 font-medium">{challenge.progress} / {challenge.target}</span>
                        </div>
                        <Progress value={(challenge.progress / challenge.target) * 100} />
                      </div>

                      {/* Reward & Time */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm">
                        <div className="flex items-center gap-2">
                          <Gift className="w-4 h-4 text-green-500 shrink-0" />
                          <span className="text-gray-800 font-medium">{challenge.reward} امتیاز</span>
                          {challenge.bonus && (
                            <Badge variant="secondary" className="text-xs">
                              +{challenge.bonus} بونوس
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-blue-500 shrink-0" />
                          <span className="text-gray-800 font-medium">{getDaysRemaining(challenge.endDate)} روز باقی</span>
                        </div>
                      </div>

                      {/* Action Button */}
                      {!challenge.completed && (
                        <Button className="w-full text-sm">
                          ادامه چالش
                        </Button>
                      )}
                      {challenge.completed && (
                        <div className="flex items-center justify-center gap-2 py-2 bg-green-100 border border-green-200 rounded-lg">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-green-700 font-medium">تکمیل شده</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Rewards */}
          <TabsContent value="rewards" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clubData.rewards.map((reward) => (
                <Card key={reward.id} className="hover:shadow-lg transition-shadow bg-white border border-gray-200 shadow-sm">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg text-gray-900">{reward.title}</CardTitle>
                        <p className="text-sm text-gray-700 font-medium">{reward.description}</p>
                      </div>
                      {reward.partnerLogo && (
                        <Image src={reward.partnerLogo} alt="Partner" width={32} height={32} className="rounded-full" />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Value & Cost */}
                      <div className="flex justify-between items-center">
                        <div>
                          {reward.type === 'discount' && (
                            <span className="text-lg font-bold text-green-600">{reward.value}% تخفیف</span>
                          )}
                          {reward.type === 'cashback' && (
                            <span className="text-lg font-bold text-blue-600">{formatCurrency(reward.value)}</span>
                          )}
                          {reward.type === 'donation' && (
                            <span className="text-lg font-bold text-purple-600">{formatCurrency(reward.value)}</span>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-700 font-medium">قیمت</p>
                          <p className="font-bold text-gray-900">{reward.cost} امتیاز</p>
                        </div>
                      </div>

                      {/* Valid Until */}
                      <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                        <Clock className="w-4 h-4" />
                        <span>تا {formatDate(reward.validUntil)}</span>
                      </div>

                      {/* Action Button */}
                      {!reward.redeemed && clubData.totalPoints >= reward.cost && (
                        <Button className="w-full">
                          دریافت جایزه
                        </Button>
                      )}
                      {!reward.redeemed && clubData.totalPoints < reward.cost && (
                        <Button className="w-full" variant="outline" disabled>
                          امتیاز کافی نیست
                        </Button>
                      )}
                      {reward.redeemed && (
                        <Button className="w-full bg-green-500 hover:bg-green-600" disabled>
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          دریافت شده
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Achievements */}
          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clubData.achievements.map((achievement) => (
                <Card 
                  key={achievement.id} 
                  className={`hover:shadow-lg transition-all ${getRarityGlow(achievement.rarity)} border-2 bg-white`}
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-6xl mb-4">{achievement.icon}</div>
                    <h3 className="text-lg font-bold mb-2 text-gray-900">{achievement.title}</h3>
                    <p className="text-sm text-gray-700 font-medium mb-4">{achievement.description}</p>
                    
                    <Badge 
                      className={`mb-4 ${
                        achievement.rarity === 'legendary' ? 'bg-yellow-500' :
                        achievement.rarity === 'epic' ? 'bg-purple-500' :
                        achievement.rarity === 'rare' ? 'bg-blue-500' : 'bg-gray-500'
                      }`}
                    >
                      {achievement.rarity === 'common' && 'معمولی'}
                      {achievement.rarity === 'rare' && 'نادر'}
                      {achievement.rarity === 'epic' && 'حماسی'}
                      {achievement.rarity === 'legendary' && 'افسانه‌ای'}
                    </Badge>

                    <p className="text-xs text-gray-700 font-medium mb-4">
                      دریافت شده در {formatDate(achievement.earnedAt)}
                    </p>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Share2 className="w-4 h-4 mr-1" />
                        اشتراک
                      </Button>
                      {achievement.nftToken && (
                        <Button size="sm" variant="outline" className="flex-1">
                          <Download className="w-4 h-4 mr-1" />
                          NFT
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Social Impact */}
          <TabsContent value="impact" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center bg-white border border-gray-200 shadow-sm">
                <CardContent className="p-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-green-50 border border-green-200 rounded-full flex items-center justify-center">
                    <TreePine className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{clubData.socialImpact.treesPlanted}</h3>
                  <p className="text-gray-700 font-medium">درخت کاشته شده</p>
                </CardContent>
              </Card>

              <Card className="text-center bg-white border border-gray-200 shadow-sm">
                <CardContent className="p-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-blue-50 border border-blue-200 rounded-full flex items-center justify-center">
                    <Heart className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{formatCurrency(clubData.socialImpact.totalDonated)}</h3>
                  <p className="text-gray-700 font-medium">مبلغ خیریه</p>
                </CardContent>
              </Card>

              <Card className="text-center bg-white border border-gray-200 shadow-sm">
                <CardContent className="p-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-purple-50 border border-purple-200 rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{clubData.socialImpact.localBusinessSupported}</h3>
                  <p className="text-gray-700 font-medium">کسب‌وکار محلی</p>
                </CardContent>
              </Card>

              <Card className="text-center bg-white border border-gray-200 shadow-sm">
                <CardContent className="p-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-orange-50 border border-orange-200 rounded-full flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{clubData.socialImpact.carbonReduced} کیلوگرم</h3>
                  <p className="text-gray-700 font-medium">کاهش کربن</p>
                </CardContent>
              </Card>
            </div>

            {/* Streaks */}
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Flame className="w-5 h-5 text-orange-500" />
                  استریک‌های فعال
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {clubData.streaks.map((streak, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {streak.type === 'payment' && 'پرداخت منظم'}
                          {streak.type === 'saving' && 'پس‌انداز'}
                          {streak.type === 'green' && 'خرید سبز'}
                          {streak.type === 'local' && 'حمایت محلی'}
                        </h4>
                        <p className="text-sm text-gray-700 font-medium">
                          بهترین: {streak.bestStreak} روز
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-orange-500">{streak.count}</div>
                        <div className="text-xs text-gray-700 font-medium">روز متوالی</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 