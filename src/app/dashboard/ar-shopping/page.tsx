"use client";

import { useState, useRef } from "react";
import { 
  Camera, 
  Scan, 
  Eye, 
  Star, 
  RefreshCw,
  Settings,
  MapPin,
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  Heart,
  ShoppingCart,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { 
  SaeedAR, 
} from "@/types/advanced-features";
import { MOCK_SAEED_AR } from "@/json/advanced-features-mock";

export default function ARShoppingPage() {
  const [arData] = useState<SaeedAR>(MOCK_SAEED_AR);
  const [isARActive, setIsARActive] = useState(false);
  const [currentMode, setCurrentMode] = useState<'try_on' | 'compare' | 'info' | 'navigate'>('try_on');
  const [isRecording, setIsRecording] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);



  // Map ARSession types to component types
  const mapSessionType = (sessionType: 'virtual_try_on' | 'price_comparison' | 'product_info' | 'store_navigation'): 'try_on' | 'compare' | 'info' | 'navigate' => {
    switch (sessionType) {
      case 'virtual_try_on': return 'try_on';
      case 'price_comparison': return 'compare';
      case 'product_info': return 'info';
      case 'store_navigation': return 'navigate';
    }
  };

  const getModeIcon = (mode: 'try_on' | 'compare' | 'info' | 'navigate') => {
    switch (mode) {
      case 'try_on': return <Eye className="w-5 h-5" />;
      case 'compare': return <TrendingUp className="w-5 h-5" />;
      case 'info': return <Scan className="w-5 h-5" />;
      case 'navigate': return <MapPin className="w-5 h-5" />;
    }
  };

  const getModeTitle = (mode: 'try_on' | 'compare' | 'info' | 'navigate') => {
    switch (mode) {
      case 'try_on': return 'پروو مجازی';
      case 'compare': return 'مقایسه قیمت';
      case 'info': return 'اطلاعات محصول';
      case 'navigate': return 'راهیابی فروشگاه';
    }
  };

  const startAR = () => {
    setIsARActive(true);
    // Start camera access
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(err => console.error('Camera access denied:', err));
    }
  };

  const stopAR = () => {
    setIsARActive(false);
    setIsRecording(false);
    // Stop camera
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-3 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 lg:space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3 sm:space-y-4">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">خرید هوشمند AR</h1>
              <p className="text-sm sm:text-base text-gray-600">تجربه خرید با واقعیت افزوده</p>
            </div>
          </div>
        </div>

        {!isARActive ? (
          // AR Not Active - Dashboard
          <>
            {/* Features Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer" onClick={() => {startAR(); setCurrentMode('try_on')}}>
                <CardContent className="p-4 sm:p-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center">
                    <Eye className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900">پروو مجازی</h3>
                  <p className="text-xs sm:text-sm text-gray-600">لباس و اکسسوری را امتحان کنید</p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer" onClick={() => {startAR(); setCurrentMode('compare')}}>
                <CardContent className="p-4 sm:p-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900">مقایسه قیمت</h3>
                  <p className="text-xs sm:text-sm text-gray-600">بهترین قیمت را پیدا کنید</p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer" onClick={() => {startAR(); setCurrentMode('info')}}>
                <CardContent className="p-4 sm:p-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <Scan className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900">اسکن محصول</h3>
                  <p className="text-xs sm:text-sm text-gray-600">اطلاعات کامل محصول</p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer" onClick={() => {startAR(); setCurrentMode('navigate')}}>
                <CardContent className="p-4 sm:p-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900">راهیابی فروشگاه</h3>
                  <p className="text-xs sm:text-sm text-gray-600">مسیر تا محصول مورد نظر</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Sessions */}
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Camera className="w-5 h-5" />
                  جلسات اخیر AR
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="space-y-3 sm:space-y-4">
                  {arData.sessions.map((session) => (
                    <div key={session.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg gap-3 sm:gap-0">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-100 rounded-full flex items-center justify-center shrink-0">
                          {getModeIcon(mapSessionType(session.type))}
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-medium text-sm sm:text-base">{getModeTitle(mapSessionType(session.type))}</h4>
                          <p className="text-xs sm:text-sm text-gray-600">
                            {session.duration} ثانیه • {session.interactions} تعامل
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col sm:items-end gap-1">
                        <Badge variant={
                          session.result === 'purchased' ? 'default' :
                          session.result === 'saved' ? 'secondary' : 'outline'
                        } className="text-xs self-start sm:self-auto">
                          {session.result === 'purchased' && 'خریداری شد'}
                          {session.result === 'saved' && 'ذخیره شد'}
                          {session.result === 'shared' && 'اشتراک گذاشته شد'}
                          {session.result === 'dismissed' && 'رد شد'}
                        </Badge>
                        {session.satisfactionScore && (
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
                            <span className="text-xs sm:text-sm">{session.satisfactionScore}/5</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  تنظیمات AR
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">تشخیص چهره</label>
                      <Switch checked={arData.preferences.enableFaceDetection} />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">ذخیره پروو‌های مجازی</label>
                      <Switch checked={arData.preferences.saveVirtualTryOns} />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">اشتراک با دوستان</label>
                      <Switch checked={arData.preferences.shareWithFriends} />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">خدمات مکانی</label>
                      <Switch checked={arData.preferences.enableLocationServices} />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium block mb-2">کیفیت AR</label>
                      <div className="space-y-2">
                        {['low', 'medium', 'high'].map((quality) => (
                          <label key={quality} className="flex items-center gap-2">
                            <input 
                              type="radio" 
                              name="quality" 
                              value={quality}
                              checked={arData.preferences.qualityPreference === quality}
                              className="w-4 h-4 text-indigo-600"
                            />
                            <span className="text-sm">
                              {quality === 'low' && 'پایین (سریع)'}
                              {quality === 'medium' && 'متوسط (توصیه شده)'}
                              {quality === 'high' && 'بالا (دقیق)'}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          // AR Active - Camera View
          <div className="relative">
            {/* AR Camera View */}
            <Card className="overflow-hidden">
              <div className="relative bg-black aspect-video">
                <video 
                  ref={videoRef}
                  autoPlay 
                  playsInline 
                  muted
                  className="w-full h-full object-cover"
                />
                
                {/* AR Overlay */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Mode-specific overlays */}
                  {currentMode === 'try_on' && (
                    <div className="absolute top-4 left-4 bg-pink-500/80 text-white px-3 py-1 rounded-full text-sm font-medium">
                      حالت پروو مجازی
                    </div>
                  )}
                  {currentMode === 'compare' && (
                    <div className="absolute top-4 left-4 bg-blue-500/80 text-white px-3 py-1 rounded-full text-sm font-medium">
                      مقایسه قیمت
                    </div>
                  )}
                  {currentMode === 'info' && (
                    <div className="absolute top-4 left-4 bg-green-500/80 text-white px-3 py-1 rounded-full text-sm font-medium">
                      اسکن محصول
                    </div>
                  )}
                  {currentMode === 'navigate' && (
                    <div className="absolute top-4 left-4 bg-orange-500/80 text-white px-3 py-1 rounded-full text-sm font-medium">
                      راهیابی فروشگاه
                    </div>
                  )}

                  {/* Recording indicator */}
                  {isRecording && (
                    <div className="absolute top-4 right-4 flex items-center gap-2 bg-red-500/80 text-white px-3 py-1 rounded-full text-sm">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      در حال ضبط
                    </div>
                  )}

                  {/* AR Content based on mode */}
                  {currentMode === 'try_on' && (
                    <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 max-w-sm">
                        <h3 className="font-bold text-gray-900">کت چرم مشکی</h3>
                        <p className="text-sm text-gray-600">سایز: L • قیمت: ۲,۵۰۰,۰۰۰ تومان</p>
                        <div className="flex gap-2 mt-2">
                          <Button size="sm" className="bg-pink-500 hover:bg-pink-600">
                            <Heart className="w-4 h-4 mr-1" />
                            دوست دارم
                          </Button>
                          <Button size="sm" variant="outline">
                            <ShoppingCart className="w-4 h-4 mr-1" />
                            خرید
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentMode === 'compare' && (
                    <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 max-w-md">
                        <h3 className="font-bold text-gray-900 mb-3">مقایسه قیمت</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">فروشگاه الف</span>
                            <span className="font-bold text-green-600">۲,۳۰۰,۰۰۰ تومان</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">فروشگاه ب</span>
                            <span className="font-bold">۲,۵۰۰,۰۰۰ تومان</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">فروشگاه ج</span>
                            <span className="font-bold text-red-600">۲,۸۰۰,۰۰۰ تومان</span>
                          </div>
                        </div>
                        <Button size="sm" className="w-full mt-3">
                          خرید از بهترین قیمت
                        </Button>
                      </div>
                    </div>
                  )}

                  {currentMode === 'info' && (
                    <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 max-w-sm">
                        <h3 className="font-bold text-gray-900">اطلاعات محصول</h3>
                        <div className="space-y-1 text-sm mt-2">
                          <p><strong>برند:</strong> نایک</p>
                          <p><strong>مدل:</strong> Air Force 1</p>
                          <p><strong>جنس:</strong> چرم طبیعی</p>
                          <p><strong>رنگ:</strong> سفید</p>
                          <p><strong>امتیاز:</strong> ⭐ 4.8/5</p>
                        </div>
                        <Badge className="mt-2 bg-green-500">
                          محصول اصل
                        </Badge>
                      </div>
                    </div>
                  )}

                  {currentMode === 'navigate' && (
                    <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 max-w-sm">
                        <h3 className="font-bold text-gray-900">راهیابی</h3>
                        <p className="text-sm text-gray-600 mt-1">قفسه B-۱۲ • طبقه دوم</p>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                          <span className="text-sm">۲۰ متر تا مقصد</span>
                        </div>
                        <Progress value={75} className="mt-2" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Scanning animation */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-32 h-32 border-2 border-white/50 rounded-lg">
                      <div className="absolute inset-0 border-2 border-indigo-500 rounded-lg animate-pulse"></div>
                      <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-indigo-500"></div>
                      <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-indigo-500"></div>
                      <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-indigo-500"></div>
                      <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-indigo-500"></div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* AR Controls */}
            <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-10">
              <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                <div className="flex items-center gap-4">
                  {/* Mode Selector */}
                  <div className="flex gap-1">
                    {(['try_on', 'compare', 'info', 'navigate'] as const).map((mode) => (
                      <Button
                        key={mode}
                        size="icon"
                        variant={currentMode === mode ? "default" : "ghost"}
                        onClick={() => setCurrentMode(mode)}
                        className="w-12 h-12 rounded-full"
                      >
                        {getModeIcon(mode)}
                      </Button>
                    ))}
                  </div>

                  {/* Main Controls */}
                  <div className="flex items-center gap-2 border-l pl-4">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={toggleRecording}
                      className={`w-12 h-12 rounded-full ${isRecording ? 'bg-red-500 text-white' : ''}`}
                    >
                      {isRecording ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                    </Button>

                    <Button
                      size="icon"
                      variant="ghost"
                      className="w-16 h-16 rounded-full bg-white border-4 border-gray-300"
                    >
                      <Camera className="w-8 h-8" />
                    </Button>

                    <Button
                      size="icon"
                      variant="ghost"
                      className="w-12 h-12 rounded-full"
                    >
                      <RotateCcw className="w-6 h-6" />
                    </Button>
                  </div>

                  {/* Exit AR */}
                  <div className="border-l pl-4">
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={stopAR}
                      className="w-12 h-12 rounded-full"
                    >
                      <RefreshCw className="w-6 h-6" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 