"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/libs/utils"

const banners = [
  {
    id: 1,
    title: "Chuyển tiền miễn phí",
    subtitle: "Không phí chuyển tiền nội địa trong tháng 12",
    image: "/placeholder.svg?height=200&width=400&text=Chuyển+tiền+miễn+phí",
    bgColor: "from-blue-500 to-blue-600",
    textColor: "text-white",
  },
  {
    id: 2,
    title: "Cashback 10%",
    subtitle: "Hoàn tiền tối đa 100,000 VND cho giao dịch đầu tiên",
    image: "/placeholder.svg?height=200&width=400&text=Cashback+10%",
    bgColor: "from-green-500 to-green-600",
    textColor: "text-white",
  },
  {
    id: 3,
    title: "Nạp thẻ giảm 50%",
    subtitle: "Giảm 50% phí nạp thẻ điện thoại tất cả nhà mạng",
    image: "/placeholder.svg?height=200&width=400&text=Nạp+thẻ+giảm+50%",
    bgColor: "from-purple-500 to-purple-600",
    textColor: "text-white",
  },
  {
    id: 4,
    title: "Tích điểm x2",
    subtitle: "Nhận gấp đôi điểm thưởng cuối tuần",
    image: "/placeholder.svg?height=200&width=400&text=Tích+điểm+x2",
    bgColor: "from-orange-500 to-orange-600",
    textColor: "text-white",
  },
]

export function Slideshow() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length)
    }, 4000) // Tự động chuyển slide sau 4 giây

    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <div className="relative w-full h-48 md:h-56 rounded-xl overflow-hidden">
      {/* Slides */}
      <div className="relative w-full h-full">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-500 ease-in-out",
              index === currentSlide ? "opacity-100" : "opacity-0",
            )}
          >
            <div className={`w-full h-full bg-gradient-to-r ${banner.bgColor} flex items-center justify-between p-6`}>
              <div className={`flex-1 ${banner.textColor}`}>
                <h3 className="text-xl md:text-2xl font-bold mb-2">{banner.title}</h3>
                <p className="text-sm md:text-base opacity-90">{banner.subtitle}</p>
                <Button className="mt-4 bg-white text-gray-800 hover:bg-gray-100" size="sm">
                  Tìm hiểu thêm
                </Button>
              </div>
              <div className="hidden md:block">
                <img
                  src={banner.image || "/placeholder.svg"}
                  alt={banner.title}
                  className="w-32 h-32 object-cover rounded-lg opacity-80"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white"
        onClick={nextSlide}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              index === currentSlide ? "bg-white w-6" : "bg-white/50",
            )}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}
