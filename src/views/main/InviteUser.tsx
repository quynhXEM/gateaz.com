"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  UserPlus,
  ArrowLeft,
  ChevronRight,
  Check,
  Users,
  Gift,
  QrCode,
  Copy,
  Share2,
  Mail,
  MessageCircle,
  Facebook,
  Star,
  Wallet,
} from "lucide-react";

const inviteTypes = [
  {
    id: "friend",
    title: "Bạn bè",
    description: "Mời bạn bè sử dụng ứng dụng",
    icon: Users,
    color: "bg-blue-100 text-blue-600",
    reward: "50,000 VND",
  },
  {
    id: "family",
    title: "Gia đình",
    description: "Mời thành viên gia đình",
    icon: Users,
    color: "bg-green-100 text-green-600",
    reward: "100,000 VND",
  },
  {
    id: "colleague",
    title: "Đồng nghiệp",
    description: "Mời đồng nghiệp cùng sử dụng",
    icon: Users,
    color: "bg-purple-100 text-purple-600",
    reward: "75,000 VND",
  },
];

const promotions = [
  {
    id: "basic",
    title: "Gói cơ bản",
    description: "Tặng 50,000 VND khi đăng ký",
    reward: "50,000 VND",
    features: ["Miễn phí chuyển tiền", "Cashback 2%", "Hỗ trợ 24/7"],
  },
  {
    id: "premium",
    title: "Gói cao cấp",
    description: "Tặng 200,000 VND + ưu đãi đặc biệt",
    reward: "200,000 VND",
    features: [
      "Miễn phí chuyển tiền",
      "Cashback 5%",
      "Ưu tiên hỗ trợ",
      "Tư vấn đầu tư",
    ],
    popular: true,
  },
  {
    id: "vip",
    title: "Gói VIP",
    description: "Tặng 500,000 VND + quyền lợi VIP",
    reward: "500,000 VND",
    features: [
      "Miễn phí mọi giao dịch",
      "Cashback 10%",
      "Quản lý tài khoản riêng",
      "Sự kiện độc quyền",
    ],
  },
];

export default function InviteUserPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedType, setSelectedType] = useState("");
  const [selectedPromotion, setSelectedPromotion] = useState("");
  const [inviteInfo, setInviteInfo] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [qrGenerated, setQrGenerated] = useState(false);

  const steps = [
    {
      id: 1,
      title: "Chọn loại mời",
      description: "Chọn đối tượng bạn muốn mời",
    },
    { id: 2, title: "Chọn ưu đãi", description: "Chọn gói ưu đãi phù hợp" },
    {
      id: 3,
      title: "Thông tin người mời",
      description: "Nhập thông tin chi tiết",
    },
    { id: 4, title: "Xác nhận & QR", description: "Tạo mã QR thanh toán" },
  ];

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedType !== "";
      case 2:
        return selectedPromotion !== "";
      case 3:
        return inviteInfo.name && inviteInfo.email && inviteInfo.phone;
      default:
        return true;
    }
  };

  const generateQR = () => {
    setQrGenerated(true);
  };

  const getTypeInfo = (typeId: string) => {
    return inviteTypes.find((t) => t.id === typeId);
  };

  const getPromotionInfo = (promoId: string) => {
    return promotions.find((p) => p.id === promoId);
  };

  const inviteCode =
    "INVITE" + Math.random().toString(36).substr(2, 6).toUpperCase();
  const qrValue = `https://wallet-app.com/register?code=${inviteCode}&type=${selectedType}&promo=${selectedPromotion}`;

  return (
    <div className="min-h-screen px-4 py-6">
      <div className="max-w-6xl mx-auto space-y-4 md:space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
          </Button>
          <div>
            <h1 className="text-xl md:text-2xl font-bold">
              Mời người dùng mới
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Chia sẻ ứng dụng và nhận thưởng hấp dẫn
            </p>
          </div>
        </div>

        {/* Progress Steps */}
        <Card>
          <CardContent className="p-3 md:p-6">
            <div className="flex items-center justify-between overflow-x-auto">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center min-w-0">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-sm font-medium ${
                        step.id < currentStep
                          ? "bg-green-500 text-white"
                          : step.id === currentStep
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {step.id < currentStep ? (
                        <Check className="h-3 w-3 md:h-5 md:w-5" />
                      ) : (
                        step.id
                      )}
                    </div>
                    <div className="mt-1 md:mt-2 text-center">
                      <p className="text-xs md:text-sm font-medium whitespace-nowrap hidden sm:block">
                        {step.title}
                      </p>
                      <p className="text-xs text-muted-foreground hidden lg:block">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-8 md:w-16 h-0.5 mx-2 md:mx-4 ${
                        step.id < currentStep ? "bg-green-500" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Step Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <UserPlus className="h-5 w-5" />
                  <span>{steps[currentStep - 1].title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Step 1: Choose Invite Type */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-base font-medium">
                        Chọn đối tượng mời
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Mỗi loại mời sẽ có mức thưởng khác nhau
                      </p>
                    </div>
                    <div className="space-y-3">
                      {inviteTypes.map((type) => {
                        const Icon = type.icon;
                        return (
                          <div
                            key={type.id}
                            className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                              selectedType === type.id
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                            onClick={() => setSelectedType(type.id)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div
                                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${type.color}`}
                                >
                                  <Icon className="h-6 w-6" />
                                </div>
                                <div>
                                  <h3 className="font-medium">{type.title}</h3>
                                  <p className="text-sm text-muted-foreground">
                                    {type.description}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <Badge className="bg-green-100 text-green-700">
                                  +{type.reward}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Step 2: Choose Promotion */}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-base font-medium">
                        Chọn gói ưu đãi
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Chọn gói ưu đãi dành cho người được mời
                      </p>
                    </div>
                    <div className="space-y-4">
                      {promotions.map((promo) => (
                        <div
                          key={promo.id}
                          className={`relative p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                            selectedPromotion === promo.id
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => setSelectedPromotion(promo.id)}
                        >
                          {promo.popular && (
                            <Badge className="absolute -top-2 -right-2 bg-orange-500">
                              Phổ biến nhất
                            </Badge>
                          )}
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="font-semibold text-lg">
                                  {promo.title}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  {promo.description}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-2xl font-bold text-green-600">
                                  {promo.reward}
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {promo.features.map((feature, index) => (
                                <Badge
                                  key={index}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3: Invite Information */}
                {currentStep === 3 && (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-base font-medium">
                        Thông tin người được mời
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Nhập thông tin chi tiết của người bạn muốn mời
                      </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label>Họ và tên *</Label>
                        <Input
                          value={inviteInfo.name}
                          onChange={(e) =>
                            setInviteInfo({
                              ...inviteInfo,
                              name: e.target.value,
                            })
                          }
                          placeholder="Nguyễn Văn A"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>Email *</Label>
                        <Input
                          type="email"
                          value={inviteInfo.email}
                          onChange={(e) =>
                            setInviteInfo({
                              ...inviteInfo,
                              email: e.target.value,
                            })
                          }
                          placeholder="email@example.com"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>Số điện thoại *</Label>
                        <Input
                          type="tel"
                          value={inviteInfo.phone}
                          onChange={(e) =>
                            setInviteInfo({
                              ...inviteInfo,
                              phone: e.target.value,
                            })
                          }
                          placeholder="0987654321"
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Lời nhắn cá nhân</Label>
                      <textarea
                        className="w-full mt-1 p-3 border rounded-lg resize-none"
                        rows={3}
                        value={inviteInfo.message}
                        onChange={(e) =>
                          setInviteInfo({
                            ...inviteInfo,
                            message: e.target.value,
                          })
                        }
                        placeholder="Hãy tham gia cùng tôi sử dụng ứng dụng ví điện tử tuyệt vời này..."
                      />
                    </div>
                  </div>
                )}

                {/* Step 4: QR Code & Confirmation */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div>
                      <Label className="text-base font-medium">
                        Mã QR thanh toán
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Chia sẻ mã QR này để người được mời có thể đăng ký
                      </p>
                    </div>

                    {/* QR Code Display */}
                    <div className="text-center">
                      <div className="w-48 h-48 md:w-64 md:h-64 mx-auto bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center mb-4">
                        {qrGenerated ? (
                          <div className="text-center">
                            <QrCode className="h-24 w-24 md:h-32 md:w-32 mx-auto text-gray-400 mb-2" />
                            <p className="text-xs md:text-sm text-muted-foreground">
                              Mã QR đã được tạo
                            </p>
                          </div>
                        ) : (
                          <div className="text-center">
                            <QrCode className="h-12 w-12 md:h-16 md:w-16 mx-auto text-gray-300 mb-2" />
                            <p className="text-xs md:text-sm text-muted-foreground">
                              Nhấn tạo QR để hiển thị
                            </p>
                          </div>
                        )}
                      </div>
                      {!qrGenerated && (
                        <Button onClick={generateQR} className="mb-4">
                          <QrCode className="h-4 w-4 mr-2" />
                          Tạo mã QR
                        </Button>
                      )}
                    </div>

                    {/* Invite Code */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <Label className="text-sm font-medium">Mã mời</Label>
                      <div className="flex items-center space-x-2 mt-2">
                        <Input
                          value={inviteCode}
                          readOnly
                          className="font-mono"
                        />
                        <Button size="sm" variant="outline">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Share Options */}
                    <div>
                      <Label className="text-sm font-medium mb-3 block">
                        Chia sẻ qua
                      </Label>
                      <div className="grid grid-cols-2 sm:flex sm:space-x-3 gap-2 sm:gap-0">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs bg-transparent"
                        >
                          <Mail className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                          Email
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs bg-transparent"
                        >
                          <MessageCircle className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                          SMS
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs bg-transparent"
                        >
                          <Facebook className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                          Facebook
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs bg-transparent"
                        >
                          <Share2 className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                          Khác
                        </Button>
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h3 className="font-medium text-green-800 mb-2">
                        Tóm tắt lời mời
                      </h3>
                      <div className="space-y-2 text-sm text-green-700">
                        <div className="flex justify-between">
                          <span>Loại mời:</span>
                          <span>{getTypeInfo(selectedType)?.title}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Gói ưu đãi:</span>
                          <span>
                            {getPromotionInfo(selectedPromotion)?.title}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Người được mời:</span>
                          <span>{inviteInfo.name}</span>
                        </div>
                        <div className="flex justify-between font-medium">
                          <span>Thưởng cho bạn:</span>
                          <span>{getTypeInfo(selectedType)?.reward}</span>
                        </div>
                        <div className="flex justify-between font-medium">
                          <span>Thưởng cho họ:</span>
                          <span>
                            {getPromotionInfo(selectedPromotion)?.reward}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          {selectedType && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tóm tắt</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {selectedType && (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">
                        Loại:
                      </span>
                      <span className="text-sm font-medium">
                        {getTypeInfo(selectedType)?.title}
                      </span>
                    </div>
                  )}
                  {selectedPromotion && (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">
                        Ưu đãi:
                      </span>
                      <span className="text-sm font-medium">
                        {getPromotionInfo(selectedPromotion)?.title}
                      </span>
                    </div>
                  )}
                  {inviteInfo.name && (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">
                        Người mời:
                      </span>
                      <span className="text-sm font-medium">
                        {inviteInfo.name}
                      </span>
                    </div>
                  )}
                  {selectedType && (
                    <div className="pt-2 border-t">
                      <p className="text-sm text-muted-foreground">
                        Thưởng của bạn
                      </p>
                      <p className="text-lg font-bold text-green-600">
                        {getTypeInfo(selectedType)?.reward}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between gap-4 pb-20 md:pb-6">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="bg-transparent flex-1 sm:flex-none"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Quay lại</span>
            <span className="sm:hidden">Lại</span>
          </Button>
          {currentStep < 4 ? (
            <Button
              onClick={nextStep}
              disabled={!canProceed()}
              className="flex-1 sm:flex-none"
            >
              <span className="hidden sm:inline">Tiếp tục</span>
              <span className="sm:hidden">Tiếp</span>
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button className="bg-green-600 hover:bg-green-700 flex-1 sm:flex-none">
              <Share2 className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Gửi lời mời</span>
              <span className="sm:hidden">Gửi</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
