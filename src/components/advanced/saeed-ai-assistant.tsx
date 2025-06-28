"use client";

import { useState, useRef, useEffect } from "react";
import { 
  Brain, 
  MessageCircle, 
  TrendingUp, 
  Lightbulb, 
  Send, 
  Mic, 
  Star, 
  AlertTriangle, 
  Gift,
  Sparkles,
  Calculator,
  Target,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  SaeedAI, 
  AIInsight, 
  ChatMessage 
} from "@/types/advanced-features";
import { MOCK_SAEED_AI } from "@/json/advanced-features-mock";

interface SaeedAIAssistantProps {
  aiData?: SaeedAI;
  onSendMessage?: (message: string) => void;
  onAcceptRecommendation?: (recommendationId: string) => void;
}

export default function SaeedAIAssistant({ 
  aiData = MOCK_SAEED_AI,
  onSendMessage,
  onAcceptRecommendation 
}: SaeedAIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [aiData.chatHistory]);

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;
    
    setCurrentMessage("");
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      onSendMessage?.(message);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(currentMessage);
    }
  };

  const getMessageIcon = (type: ChatMessage['type']) => {
    switch (type) {
      case 'recommendation':
        return <Lightbulb className="w-4 h-4 text-blue-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      case 'celebration':
        return <Star className="w-4 h-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getInsightColor = (importance: AIInsight['importance']): 'destructive' | 'secondary' | 'default' => {
    switch (importance) {
      case 'critical':
        return 'destructive';
      case 'high':
        return 'secondary';
      case 'medium':
        return 'default';
      default:
        return 'secondary';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fa-IR').format(amount) + ' تومان';
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 
                     hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/25
                     text-white border-0 relative group"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 
                          opacity-0 group-hover:opacity-20 transition-opacity"></div>
          <Brain className="w-8 h-8" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full 
                          animate-pulse flex items-center justify-center">
            <span className="text-xs font-bold text-white">3</span>
          </div>
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-2xl">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="w-10 h-10">
              <AvatarImage src="/avatar-saeed.png" />
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold">
                سعید
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <h3 className="font-bold text-gray-900">سعید هوشمند</h3>
            <p className="text-sm text-gray-500">مشاور مالی شخصی</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col h-full">
        <TabsList className="grid w-full grid-cols-3 mx-4 mt-2">
          <TabsTrigger value="chat" className="text-xs">
            <MessageCircle className="w-4 h-4 mr-1" />
            چت
          </TabsTrigger>
          <TabsTrigger value="insights" className="text-xs">
            <TrendingUp className="w-4 h-4 mr-1" />
            بینش‌ها
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="text-xs">
            <Lightbulb className="w-4 h-4 mr-1" />
            پیشنهادها
          </TabsTrigger>
        </TabsList>

        {/* Chat Tab */}
        <TabsContent value="chat" className="flex-1 flex flex-col m-0 p-0">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {aiData.chatHistory.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] ${
                    message.sender === 'user' 
                      ? 'bg-blue-500 text-white rounded-l-xl rounded-tr-xl' 
                      : 'bg-gray-100 text-gray-900 rounded-r-xl rounded-tl-xl'
                  } px-4 py-2 relative`}>
                    {message.sender === 'ai' && getMessageIcon(message.type) && (
                      <div className="absolute -left-2 top-2">
                        {getMessageIcon(message.type)}
                      </div>
                    )}
                    <p className="text-sm leading-relaxed">{message.message}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {new Date(message.timestamp).toLocaleTimeString('fa-IR')}
                    </span>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-r-xl rounded-tl-xl px-4 py-2">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="p-4 border-t">
            <div className="flex items-center gap-2">
              <div className="flex-1 relative">
                <Input
                  ref={inputRef}
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="پیام خود را بنویسید..."
                  className="pl-10"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-1 top-1/2 transform -translate-y-1/2 w-8 h-8"
                >
                  <Mic className="w-4 h-4" />
                </Button>
              </div>
              <Button
                onClick={() => handleSendMessage(currentMessage)}
                disabled={!currentMessage.trim() || isTyping}
                className="bg-blue-500 hover:bg-blue-600"
                size="icon"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* Insights Tab */}
        <TabsContent value="insights" className="flex-1 m-0 p-4">
          <ScrollArea className="h-full">
            <div className="space-y-3">
              {aiData.insights.map((insight) => (
                <Card key={insight.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {insight.type === 'spending' && <TrendingUp className="w-4 h-4 text-blue-500" />}
                        {insight.type === 'saving' && <Target className="w-4 h-4 text-green-500" />}
                        {insight.type === 'credit' && <Calculator className="w-4 h-4 text-purple-500" />}
                        {insight.type === 'investment' && <Sparkles className="w-4 h-4 text-yellow-500" />}
                        <span className="font-medium text-sm">{insight.title}</span>
                      </div>
                      <Badge variant={getInsightColor(insight.importance)} className="text-xs">
                        {insight.importance === 'critical' && 'بحرانی'}
                        {insight.importance === 'high' && 'مهم'}
                        {insight.importance === 'medium' && 'متوسط'}
                        {insight.importance === 'low' && 'کم'}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{insight.description}</p>
                    {insight.actionRequired && insight.actionUrl && (
                      <Button size="sm" variant="outline" className="text-xs">
                        اقدام کنید
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        {/* Recommendations Tab */}
        <TabsContent value="recommendations" className="flex-1 m-0 p-4">
          <ScrollArea className="h-full">
            <div className="space-y-3">
              {aiData.recommendations.map((recommendation) => (
                <Card key={recommendation.id} className="border">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Gift className="w-4 h-4 text-green-500" />
                        <span className="font-medium text-sm">{recommendation.title}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {recommendation.confidence}% اطمینان
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{recommendation.description}</p>
                    
                    {recommendation.potentialSaving > 0 && (
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs text-gray-500">صرفه‌جویی احتمالی:</span>
                        <span className="text-sm font-medium text-green-600">
                          {formatCurrency(recommendation.potentialSaving)}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">
                        تا {new Date(recommendation.validUntil).toLocaleDateString('fa-IR')}
                      </span>
                      <Button
                        size="sm"
                        onClick={() => onAcceptRecommendation?.(recommendation.id)}
                        className="bg-green-500 hover:bg-green-600 text-xs"
                      >
                        پذیرش
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>

      {/* Smart Features Status */}
      <div className="p-3 border-t bg-gray-50 rounded-b-2xl">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${aiData.smartBudgeting ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <span>بودجه هوشمند</span>
          </div>
          <div className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${aiData.predictiveCredit ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <span>پیش‌بینی اعتبار</span>
          </div>
          <div className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${aiData.personalizedOffers ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <span>پیشنهادات شخصی</span>
          </div>
          <div className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${aiData.riskAssessment ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <span>ارزیابی ریسک</span>
          </div>
        </div>
      </div>
    </div>
  );
} 