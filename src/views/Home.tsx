"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
} from "lucide-react"

const wallets = [
  { name: "Ví chính", balance: "2,450,000", currency: "VND", type: "primary" as const, change: "+5.2%" },
  { name: "Ví tiết kiệm", balance: "15,000,000", currency: "VND", type: "savings" as const, change: "+2.1%" },
  { name: "Bitcoin Wallet", balance: "0.0234", currency: "BTC", type: "crypto" as const, change: "-1.8%" },
  { name: "Ví phụ", balance: "850,000", currency: "VND", type: "secondary" as const, change: "+0.5%" },
]

const stats = [
  { title: "Tổng tài sản", value: "18,300,000 VND", icon: DollarSign, trend: "+12.5%" },
  { title: "Thu nhập tháng", value: "5,200,000 VND", icon: TrendingUp, trend: "+8.2%" },
  { title: "Chi tiêu tháng", value: "3,100,000 VND", icon: TrendingDown, trend: "-2.1%" },
  { title: "Tiết kiệm", value: "15,000,000 VND", icon: PiggyBank, trend: "+15.3%" },
]

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
  { name: "Đặt vé máy bay", icon: Plane, color: "bg-sky-100 text-sky-600", description: "Đặt vé giá tốt" },
  {
    name: "Đặt phòng khách sạn",
    icon: Building,
    color: "bg-orange-100 text-orange-600",
    description: "Đặt phòng ưu đãi",
  },
  { name: "Đặt vé xem phim", icon: Film, color: "bg-indigo-100 text-indigo-600", description: "Đặt vé online" },
  { name: "Mua vé xe", icon: Bus, color: "bg-yellow-100 text-yellow-600", description: "Đặt vé xe khách" },
  { name: "Mua sắm online", icon: ShoppingCart, color: "bg-pink-100 text-pink-600", description: "Mua sắm tiết kiệm" },
]

// Site configuration
const siteConfig = {
  logo: "/placeholder.svg?height=80&width=80&text=VĐ",
  siteName: "Ví Điện Tử",
  tagline: "Thanh toán thông minh, cuộc sống tiện lợi",
  description: "Trải nghiệm dịch vụ tài chính toàn diện với công nghệ hiện đại và bảo mật tuyệt đối",
  backgroundImage: "/placeholder.svg?height=600&width=1200&text=Hero+Background",
  socialLinks: [
    { platform: "Facebook", url: "https://facebook.com", icon: Facebook, followers: "125K" },
    { platform: "Instagram", url: "https://instagram.com", icon: Instagram, followers: "89K" },
    { platform: "Twitter", url: "https://twitter.com", icon: Twitter, followers: "67K" },
    { platform: "Youtube", url: "https://youtube.com", icon: Youtube, followers: "234K" },
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
}

const heroBanners = [
  {
    id: 1,
    title: "Chuyển tiền siêu tốc",
    subtitle: "Chuyển tiền trong 3 giây với công nghệ blockchain",
    image: "/placeholder.svg?height=600&width=1200&text=Chuyển+tiền+nhanh+Banner",
    bgGradient: "from-blue-600/80 to-purple-600/80",
  },
  {
    id: 2,
    title: "Bảo mật tuyệt đối",
    subtitle: "Công nghệ mã hóa 256-bit và sinh trắc học",
    image: "/placeholder.svg?height=600&width=1200&text=Bảo+mật+cao+Banner",
    bgGradient: "from-green-600/80 to-teal-600/80",
  },
  {
    id: 3,
    title: "Ưu đãi hấp dẫn",
    subtitle: "Cashback lên đến 10% cho mọi giao dịch",
    image: "/placeholder.svg?height=600&width=1200&text=Ưu+đãi+lớn+Banner",
    bgGradient: "from-orange-600/80 to-red-600/80",
  },
]

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroBanners.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroBanners.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroBanners.length) % heroBanners.length)
  }

  return (
    <div className="space-y-6">
      {/* Hero Section với Background tùy chỉnh */}
      <div className="relative overflow-hidden -mx-6 -mt-6 mb-8">
        {/* Background Image với Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${siteConfig.backgroundImage})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-purple-900/70 to-indigo-900/80" />
        </div>

        {/* Content */}
        <div className="relative z-0 px-6 py-12 md:py-20">
          <div className="max-w-6xl mx-auto">
            {/* Header với Logo và Social Links */}
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

              {/* Social Links */}
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

            {/* Main Content */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left Content */}
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

                {/* Contact Info */}
                

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  
                  
                </div>
              </div>

              {/* Right Content - Banner Slideshow */}
              <div className="relative">
                <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                  {heroBanners.map((slide, index) => (
                    <div
                      key={slide.id}
                      className={`absolute inset-0 transition-opacity duration-500 ${
                        index === currentSlide ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      {/* Background Image */}
                      <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{
                          backgroundImage: `url(${slide.image})`,
                        }}
                      />

                      {/* Gradient Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${slide.bgGradient}`} />

                      {/* Content */}
                      <div className="relative z-10 h-full flex items-center justify-center p-8">
                        <div className="text-center text-white max-w-md">
                          
                          
                          
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Navigation Arrows */}
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

                  {/* Dots Indicator */}
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

            {/* Stats */}
          </div>
        </div>
      </div>

      {/* Slideshow Banner */}

      {/* Services Grid */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Dịch vụ</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <Card key={service.name} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 ${service.color}`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-medium text-sm mb-1">{service.name}</h3>
                  <p className="text-xs text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Additional Services */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Công cụ AI</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-600 mb-1">Đẩy Mạng Xã Hội</h3>
                  <p className="text-sm text-muted-foreground">Tăng view, tăng like, kéo subs...</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center">
                  <PenTool className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-600 mb-1">AI Viết Bài</h3>
                  <p className="text-sm text-muted-foreground">Tăng tốc sáng tạo nội dung</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
                  <Languages className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-600 mb-1">Dịch Văn Bản</h3>
                  <p className="text-sm text-muted-foreground">Dịch nhanh mọi ngôn ngữ</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center">
                  <Globe className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-600 mb-1">Công Cụ Tên Miền</h3>
                  <p className="text-sm text-muted-foreground">Đơn giản hóa quản lý tên miền</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center">
                  <Mic className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-600 mb-1">Voice Box</h3>
                  <p className="text-sm text-muted-foreground">Để văn bản của bạn lên tiếng!</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Stats Overview */}

      {/* Wallets */}
    </div>
  )
}
