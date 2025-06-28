"use client";

import { useState, useRef, useEffect } from "react";
import { 
  Brain, 
  MessageCircle, 
  X, 
  Send, 
  Mic, 
  TrendingUp, 
  Lightbulb, 
  Calculator,
  MinusCircle,
  PlusCircle,
  Zap,
  Target,
  ShoppingBag,
  Wallet,
  CreditCard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'text' | 'suggestion' | 'action';
  suggestions?: string[];
  actions?: {
    label: string;
    icon: React.ReactNode;
    onClick: () => void;
  }[];
}

interface InsightCard {
  id: string;
  title: string;
  description: string;
  type: 'spending' | 'saving' | 'credit' | 'recommendation';
  value?: string;
  trend?: 'up' | 'down' | 'stable';
  icon: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const MOCK_INSIGHTS: InsightCard[] = [
  {
    id: 'insight_1',
    title: 'کاهش هزینه‌ها',
    description: 'هزینه‌های شما این ماه ۱۵٪ کمتر از ماه گذشته است',
    type: 'spending',
    value: '۱۵٪',
    trend: 'down',
    icon: <TrendingUp className="w-5 h-5 text-green-600" />,
    action: {
      label: 'مشاهده جزئیات',
      onClick: () => console.log('Show spending details')
    }
  },
  {
    id: 'insight_2',
    title: 'پیشنهاد سرمایه‌گذاری',
    description: 'بر اساس الگوی خرج شما، سرمایه‌گذاری ۵۰۰,۰۰۰ تومان پیشنهاد می‌شود',
    type: 'recommendation',
    icon: <Target className="w-5 h-5 text-blue-600" />,
    action: {
      label: 'شروع سرمایه‌گذاری',
      onClick: () => console.log('Start investment')
    }
  },
  {
    id: 'insight_3',
    title: 'افزایش اعتبار',
    description: 'شما واجد شرایط افزایش اعتبار تا ۵ میلیون تومان هستید',
    type: 'credit',
    icon: <CreditCard className="w-5 h-5 text-purple-600" />,
    action: {
      label: 'درخواست افزایش',
      onClick: () => console.log('Request credit increase')
    }
  }
];

const QUICK_ACTIONS = [
  {
    id: 'check_balance',
    label: 'چک موجودی',
    icon: <Wallet className="w-4 h-4" />,
    onClick: () => console.log('Check balance')
  },
  {
    id: 'pay_installment',
    label: 'پرداخت قسط',
    icon: <CreditCard className="w-4 h-4" />,
    onClick: () => console.log('Pay installment')
  },
  {
    id: 'find_deals',
    label: 'پیدا کردن تخفیف',
    icon: <ShoppingBag className="w-4 h-4" />,
    onClick: () => console.log('Find deals')
  },
  {
    id: 'budget_advice',
    label: 'مشاوره بودجه',
    icon: <Calculator className="w-4 h-4" />,
    onClick: () => console.log('Budget advice')
  }
];

export default function FloatingAIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'insights' | 'actions'>('chat');
  const [message, setMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: 'سلام! من مشاور هوشمند سعید هستم. چطور می‌تونم کمکتون کنم؟',
      sender: 'ai',
      timestamp: new Date(),
      type: 'text',
      suggestions: ['موجودی من چقدر است؟', 'تخفیف‌های امروز چی داریم؟', 'قسط بعدی من کی است؟']
    }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(),
        sender: 'ai',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);

    setMessage('');
  };

  const getAIResponse = (): string => {
    const responses = [
      'موجودی شما ۲,۳۵۰,۰۰۰ تومان است و اعتبار شما ۸,۰۰۰,۰۰۰ تومان.',
      'امروز تخفیف ۲۰٪ در فروشگاه دیجی‌کالا و ۱۵٪ در اسنپ‌فود داریم.',
      'قسط بعدی شما ۵۰۰,۰۰۰ تومان در تاریخ ۱۵ آذر است.',
      'بر اساس تحلیل خرج شما، پیشنهاد می‌کنم هزینه‌های غذا را ۱۰٪ کاهش دهید.',
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion);
    handleSendMessage();
  };

  const toggleVoice = () => {
    setIsListening(!isListening);
    // Here you would implement speech recognition
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 left-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg border-0"
          size="icon"
        >
          <Brain className="w-6 h-6 text-white" />
        </Button>
        
        {/* Notification Dot */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-xs text-white">3</span>
        </div>
        
        {/* Floating Bubble */}
        <div className="absolute bottom-16 left-0 bg-white rounded-lg shadow-lg p-3 max-w-64 animate-pulse border">
          <p className="text-sm text-gray-700">💡 نکته: امروز ۳ تخفیف ویژه برای شما داریم!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <Card className={`w-96 transition-all duration-300 shadow-xl ${isMinimized ? 'h-16' : 'h-[600px]'}`}>
        {/* Header */}
        <CardHeader className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <CardTitle className="text-sm">مشاور هوشمند سعید</CardTitle>
                <p className="text-xs opacity-90">آنلاین و آماده کمک</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/20"
                onClick={() => setIsMinimized(!isMinimized)}
              >
                {isMinimized ? <PlusCircle className="w-4 h-4" /> : <MinusCircle className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/20"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0 h-[calc(100%-80px)] flex flex-col">
            {/* Tabs */}
            <div className="flex border-b">
              {([
                { id: 'chat' as const, label: 'گفتگو', icon: <MessageCircle className="w-4 h-4" /> },
                { id: 'insights' as const, label: 'تحلیل', icon: <Lightbulb className="w-4 h-4" /> },
                { id: 'actions' as const, label: 'اقدامات', icon: <Zap className="w-4 h-4" /> }
              ] as const).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden">
              {activeTab === 'chat' && (
                <div className="h-full flex flex-col">
                  {/* Messages */}
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                            <div className={`rounded-lg p-3 ${
                              message.sender === 'user'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-900'
                            }`}>
                              <p className="text-sm">{message.text}</p>
                            </div>
                            {message.suggestions && (
                              <div className="mt-2 space-y-1">
                                {message.suggestions.map((suggestion, index) => (
                                  <button
                                    key={index}
                                    onClick={() => handleSuggestionClick(suggestion)}
                                    className="block w-full text-left text-xs p-2 bg-blue-50 hover:bg-blue-100 rounded text-blue-700 transition-colors"
                                  >
                                    {suggestion}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                          {message.sender === 'ai' && (
                            <Avatar className="w-8 h-8 mr-2 order-1">
                              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs">
                                AI
                              </AvatarFallback>
                            </Avatar>
                          )}
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>

                  {/* Input */}
                  <div className="p-4 border-t">
                    <div className="flex gap-2">
                      <Input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="پیام خود را بنویسید..."
                        className="flex-1"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={toggleVoice}
                        className={isListening ? 'bg-red-50 text-red-600' : ''}
                      >
                        <Mic className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={handleSendMessage}
                        size="icon"
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'insights' && (
                <ScrollArea className="h-full p-4">
                  <div className="space-y-3">
                    {MOCK_INSIGHTS.map((insight) => (
                      <Card key={insight.id} className="border-l-4 border-l-blue-500 hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0">{insight.icon}</div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm mb-1">{insight.title}</h4>
                              <p className="text-xs text-gray-600 mb-2">{insight.description}</p>
                              {insight.value && (
                                <Badge variant="secondary" className="text-xs">
                                  {insight.value}
                                </Badge>
                              )}
                              {insight.action && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="mt-2 h-7 text-xs"
                                  onClick={insight.action.onClick}
                                >
                                  {insight.action.label}
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              )}

              {activeTab === 'actions' && (
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-3">
                    {QUICK_ACTIONS.map((action) => (
                      <Button
                        key={action.id}
                        variant="outline"
                        className="h-auto p-4 flex flex-col items-center gap-2 text-center"
                        onClick={action.onClick}
                      >
                        {action.icon}
                        <span className="text-xs">{action.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
} 