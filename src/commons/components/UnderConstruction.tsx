"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Construction, Clock, Star } from "lucide-react"

interface UnderConstructionProps {
  title: string
  description: string
  icon?: React.ComponentType<{ className?: string }>
  estimatedTime?: string
}

export function UnderConstruction({
  title,
  description,
  icon: Icon = Construction,
  estimatedTime = "Sắp ra mắt",
}: UnderConstructionProps) {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-12 text-center">
          <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon className="h-12 w-12 text-orange-600" />
          </div>

          <h2 className="text-2xl font-bold mb-4">Tính năng đang hoàn thiện</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Chúng tôi đang phát triển tính năng này để mang đến trải nghiệm tốt nhất cho bạn. Vui lòng quay lại sau!
          </p>

          <div className="flex items-center justify-center space-x-2 mb-8">
            <Clock className="h-5 w-5 text-blue-600" />
            <span className="text-blue-600 font-medium">{estimatedTime}</span>
          </div>

          <div className="space-y-4">
            <Button onClick={() => window.history.back()} className="w-full">
              Quay lại trang trước
            </Button>
            <Button variant="outline" onClick={() => (window.location.href = "/")} className="w-full bg-transparent">
              Về trang chủ
            </Button>
          </div>

          <div className="mt-8 pt-8 border-t">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium">Theo dõi cập nhật</span>
            </div>
            <p className="text-xs text-muted-foreground">Bật thông báo để nhận tin tức về tính năng mới</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
