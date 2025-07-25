"use client";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  PiggyBank,
  Zap,
  ArrowRightLeft,
  Phone,
  Receipt,
  Plane,
  Building,
  Film,
  Bus,
  ShoppingCart,
  PenTool,
  Languages,
  Globe,
  Mic,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  ChevronLeft,
  ChevronRight,
  Award,
  Star,
  Users,
} from "lucide-react";
import { useTheme } from "next-themes";
import BalanceCard from "./BalanceCard";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

const services = [
  // Dịch vụ chính
  {
    name: "Chuyển tiền",
    icon: ArrowRightLeft,
    color: "bg-blue-100 text-blue-600",
    description: "Chuyển tiền nhanh chóng",
  },
  {
    name: "Nạp thẻ điện thoại",
    icon: Phone,
    color: "bg-green-100 text-green-600",
    description: "Nạp thẻ tất cả nhà mạng",
  },
  {
    name: "Thanh toán hóa đơn",
    icon: Receipt,
    color: "bg-purple-100 text-purple-600",
    description: "Thanh toán tiện lợi",
  },
  {
    name: "Đặt vé máy bay",
    icon: Plane,
    color: "bg-sky-100 text-sky-600",
    description: "Đặt vé giá tốt",
  },
  {
    name: "Đặt phòng khách sạn",
    icon: Building,
    color: "bg-orange-100 text-orange-600",
    description: "Đặt phòng ưu đãi",
  },
  {
    name: "Đặt vé xem phim",
    icon: Film,
    color: "bg-indigo-100 text-indigo-600",
    description: "Đặt vé online",
  },
  {
    name: "Mua vé xe",
    icon: Bus,
    color: "bg-yellow-100 text-yellow-600",
    description: "Đặt vé xe khách",
  },
  {
    name: "Mua sắm online",
    icon: ShoppingCart,
    color: "bg-pink-100 text-pink-600",
    description: "Mua sắm tiết kiệm",
  },
];

const tools = [
  {
    name: "Đẩy Mạng Xã Hội",
    icon: Zap,
    color: "text-blue-600",
    description: "Tăng view, tăng like, kéo subs...",
  },
  {
    name: "AI Viết Bài",
    icon: PenTool,
    color: "text-purple-600",
    description: "Viết bài nhanh chóng, hiệu quả",
  },
  {
    name: "Dịch Văn Bản",
    icon: Languages,
    color: "text-green-600",
    description: "Dịch văn bản nhanh chóng, hiệu quả",
  },
  {
    name: "Công Cụ Tên Miền",
    icon: Globe,
    color: "text-orange-600",
    description: "Tên miền, tên miền, tên miền",
  },
  {
    name: "Voice Box",
    icon: Mic,
    color: "text-red-600",
    description: "Voice Box, Voice Box, Voice Box",
  },
];

// Site configuration
const siteConfig = {
  logo: "/placeholder.svg?height=80&width=80&text=VĐ",
  siteName: "Ví Điện Tử",
  tagline: "Thanh toán thông minh, cuộc sống tiện lợi",
  description:
    "Trải nghiệm dịch vụ tài chính toàn diện với công nghệ hiện đại và bảo mật tuyệt đối",
  backgroundImage:
    "/placeholder.svg?height=600&width=1200&text=Hero+Background",
  socialLinks: [
    {
      platform: "Facebook",
      url: "https://facebook.com",
      icon: Facebook,
      followers: "125K",
    },
    {
      platform: "Instagram",
      url: "https://instagram.com",
      icon: Instagram,
      followers: "89K",
    },
    {
      platform: "Twitter",
      url: "https://twitter.com",
      icon: Twitter,
      followers: "67K",
    },
    {
      platform: "Youtube",
      url: "https://youtube.com",
      icon: Youtube,
      followers: "234K",
    },
  ],
  contact: {
    email: "support@vielectu.com",
    phone: "+84 1900 1234",
  },
  stats: [
    { label: "Người dùng", value: "1M+", icon: Users },
    { label: "Giao dịch", value: "10M+", icon: TrendingUp },
    { label: "Bảo mật", value: "99.9%", icon: Award },
    { label: "Hỗ trợ", value: "24/7", icon: Star },
  ],
};

export default function HomePage() {
  const theme = useTheme();
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-background">
      <main className="relative pb-10 md:pb-0">
        {/* Background Sections */}
        <div className="absolute inset-0">
          {/* Top 40% - Image background */}
          <div className="h-[30vh] relative overflow-hidden">
            <img
              src="https://cdn.pixabay.com/photo/2017/12/23/02/52/technique-3034622_640.jpg"
              alt="E-wallet background"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 ">
              <h3 className=" font-bold text-nowrap text-white shadow-lg bg-black/50 rounded-lg p-2">
                Xin chào, {user?.full_name}
              </h3>
            </div>
            {/* Optional overlay for better text readability */}
            <div className="absolute bottom-0 left-0 right-0 h-16">
              <svg
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                className="w-full h-full"
              >
                <path
                  d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"
                  fill={"white"}
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="relative z-10 top-50">
          <BalanceCard />
        </div>

        <div className="relative overflow-hidden -mx-6 -mt-6 mb-8">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${siteConfig.backgroundImage})`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-purple-900/70 to-indigo-900/80" />
          </div>

          {/* <div className="relative z-0 px-6 py-12 md:py-20">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                    <span className="text-2xl font-bold text-blue-600">VĐ</span>
                  </div>
                </div>
                <div className="text-white">
                  <h1 className="text-2xl md:text-3xl font-bold">{siteConfig.siteName}</h1>
                  <p className="text-sm md:text-base opacity-90">{siteConfig.tagline}</p>
                </div>
              </div>

              <div className="hidden md:flex items-center space-x-3">
                {siteConfig.socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  )
                })}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-white space-y-6">
                <div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                    Quản lý tài chính{" "}
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                      thông minh
                    </span>
                  </h2>
                  <p className="text-lg opacity-90 leading-relaxed">{siteConfig.description}</p>
                </div>

              

                <div className="flex flex-col sm:flex-row gap-4">
                  
                  
                </div>
              </div>

              <div className="relative">
                <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                  {heroBanners.map((slide, index) => (
                    <div
                      key={slide.id}
                      className={`absolute inset-0 transition-opacity duration-500 ${
                        index === currentSlide ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{
                          backgroundImage: `url(${slide.image})`,
                        }}
                      />

                      <div className={`absolute inset-0 bg-gradient-to-br ${slide.bgGradient}`} />

                      <div className="relative z-10 h-full flex items-center justify-center p-8">
                        <div className="text-center text-white max-w-md">
                          
                          
                          
                        </div>
                      </div>
                    </div>
                  ))}

                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
                    onClick={prevSlide}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
                    onClick={nextSlide}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>

                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
                    {heroBanners.map((_, index) => (
                      <button
                        key={index}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentSlide ? "bg-white w-8" : "bg-white/50"
                        }`}
                        onClick={() => setCurrentSlide(index)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        </div>
        <div className="relative">
          {/* Spacer to push content below image */}
          <div className="h-[22vh]" />
          <div className="px-4">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Dịch vụ</h2>
              <div className="gap-3 grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
                {services.map((service) => {
                  const Icon = service.icon;
                  return (
                    <Card
                      key={service.name}
                      className="hover:shadow-md transition-shadow cursor-pointer p-0"
                    >
                      <div className="p-2 text-center">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 ${service.color}`}
                        >
                          <Icon className="h-6 w-6" />
                        </div>
                        <h3 className="font-medium text-sm mb-1">
                          {service.name}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {service.description}
                        </p>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="pt-10 px-4">
            <h2 className="text-2xl font-semibold mb-4">Công cụ AI</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tools.map((item, index) => (
                <Card
                  key={index}
                  className="hover:shadow-md transition-shadow cursor-pointer p-0"
                >
                  <div className="p-2">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                        <item.icon className={`h-6 w-6 ${item.color}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary mb-1">
                          {item.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
