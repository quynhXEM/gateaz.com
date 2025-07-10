"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Users,
  TrendingUp,
  QrCode,
  Copy,
  Share2,
  User,
  Briefcase,
  DollarSign,
  Upload,
  ImageIcon,
  Palette,
  CreditCard,
} from "lucide-react"
import { toast } from "react-toastify"
import StepProgress from "@/commons/components/StepProgress"

const agencyTypes = [
  {
    id: "retail",
    title: "Đại lý bán lẻ",
    description: "Phù hợp cho cửa hàng nhỏ, tạp hóa",
    commission: "2-3%",
    minTransaction: "100,000 VNĐ",
    benefits: ["Hoa hồng cạnh tranh", "Hỗ trợ marketing", "Đào tạo miễn phí"],
  },
  {
    id: "wholesale",
    title: "Đại lý bán sỉ",
    description: "Dành cho doanh nghiệp lớn, chuỗi cửa hàng",
    commission: "1-2%",
    minTransaction: "1,000,000 VNĐ",
    benefits: ["Chiết khấu đặc biệt", "Hỗ trợ kỹ thuật 24/7", "Quản lý tập trung"],
  },
  {
    id: "online",
    title: "Đại lý trực tuyến",
    description: "Kinh doanh qua website, app, mạng xã hội",
    commission: "3-5%",
    minTransaction: "50,000 VNĐ",
    benefits: ["API tích hợp", "Dashboard quản lý", "Marketing online"],
  },
]

const packageOptions = [
  {
    id: "starter",
    name: "Gói Khởi Đầu",
    price: "Miễn phí",
    features: ["Website cơ bản", "Hỗ trợ email", "Báo cáo hàng tháng"],
    popular: false,
  },
  {
    id: "professional",
    name: "Gói Chuyên Nghiệp",
    price: "500,000 VNĐ",
    features: ["Website chuyên nghiệp", "Hỗ trợ 24/7", "Báo cáo real-time", "Công cụ marketing"],
    popular: true,
  },
  {
    id: "enterprise",
    name: "Gói Doanh Nghiệp",
    price: "1,000,000 VNĐ",
    features: ["Website tùy chỉnh", "Account manager riêng", "API không giới hạn", "Đào tạo chuyên sâu"],
    popular: false,
  },
]

export default function InviteAgencyPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedType, setSelectedType] = useState("")
  const [selectedPackage, setSelectedPackage] = useState("")
  const [agencyInfo, setAgencyInfo] = useState({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    address: "",
    businessType: "",
    experience: "",
    expectedVolume: "",
    description: "",
    website: "",
    facebook: "",
    instagram: "",
  })
  const [websiteDesign, setWebsiteDesign] = useState({
    logo: null as File | null,
    banner: null as File | null,
    backgroundImage: null as File | null,
    primaryColor: "#3B82F6",
    secondaryColor: "#10B981",
    companySlogan: "",
    aboutUs: "",
    services: "",
    contactInfo: "",
  })
  const [inviteCode, setInviteCode] = useState("")
  const [paymentInfo, setPaymentInfo] = useState({
    amount: 0,
    transactionId: "",
  })

  const totalSteps = 5
  const progress = (currentStep / totalSteps) * 100

  const generateInviteCode = () => {
    const code = `AGENCY-${Math.random().toString(36).substr(2, 8).toUpperCase()}`
    setInviteCode(code)
  }

  const generatePaymentInfo = () => {
    const selectedPkg = packageOptions.find((pkg) => pkg.id === selectedPackage)
    const amount = selectedPkg?.id === "professional" ? 500000 : selectedPkg?.id === "enterprise" ? 1000000 : 0
    const transactionId = `PAY${Date.now().toString().slice(-8)}`

    setPaymentInfo({ amount, transactionId })
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
      if (currentStep === 4) {
        generateInviteCode()
        generatePaymentInfo()
      }
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleFileUpload = (type: "logo" | "banner" | "backgroundImage", file: File) => {
    setWebsiteDesign((prev) => ({
      ...prev,
      [type]: file,
    }))
  }

  const copyInviteCode = () => {
    navigator.clipboard.writeText(inviteCode)
    toast("Mã mời đại lý đã được sao chép vào clipboard.")
  }

  const shareInvite = () => {
    if (navigator.share) {
      navigator.share({
        title: "Mời làm đại lý",
        text: `Tham gia làm đại lý với mã: ${inviteCode}`,
        url: window.location.origin + `/register-agency?code=${inviteCode}`,
      })
    } else {
      copyInviteCode()
    }
  }

  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    })
  }, [currentStep])

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Mời Đại Lý Mới</h1>
              <p className="text-muted-foreground">Tạo tài khoản đại lý với website chuyên nghiệp</p>
            </div>
          </div>

          {/* Progress Bar */}
          <StepProgress currentStep={currentStep} totalSteps={totalSteps} />
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {currentStep === 1 && (
                        <>
                          <Building2 className="h-5 w-5" /> Chọn Loại Đại Lý
                        </>
                      )}
                      {currentStep === 2 && (
                        <>
                          <Briefcase className="h-5 w-5" /> Chọn Gói Dịch Vụ
                        </>
                      )}
                      {currentStep === 3 && (
                        <>
                          <User className="h-5 w-5" /> Thông Tin Đại Lý
                        </>
                      )}
                      {currentStep === 4 && (
                        <>
                          <Palette className="h-5 w-5" /> Thiết Kế Website
                        </>
                      )}
                      {currentStep === 5 && (
                        <>
                          <CreditCard className="h-5 w-5" /> Thanh Toán & Hoàn Thành
                        </>
                      )}
                    </CardTitle>
                    <CardDescription>
                      {currentStep === 1 && "Chọn loại hình đại lý phù hợp với doanh nghiệp"}
                      {currentStep === 2 && "Lựa chọn gói dịch vụ tốt nhất cho đại lý"}
                      {currentStep === 3 && "Điền thông tin chi tiết về đại lý"}
                      {currentStep === 4 && "Tùy chỉnh giao diện website của bạn"}
                      {currentStep === 5 && "Hoàn tất thanh toán để kích hoạt tài khoản"}
                    </CardDescription>
                  </div>
                  <Badge variant="outline">{currentStep}/5</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Step 1: Agency Type Selection */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    {agencyTypes.map((type) => (
                      <Card
                        key={type.id}
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          selectedType === type.id ? "ring-2 ring-primary" : ""
                        }`}
                        onClick={() => setSelectedType(type.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg">{type.title}</h3>
                              <p className="text-muted-foreground text-sm mb-3">{type.description}</p>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="font-medium">Hoa hồng: </span>
                                  <span className="text-green-600">{type.commission}</span>
                                </div>
                                <div>
                                  <span className="font-medium">Giao dịch tối thiểu: </span>
                                  <span>{type.minTransaction}</span>
                                </div>
                              </div>
                              <div className="mt-3">
                                <p className="font-medium text-sm mb-2">Quyền lợi:</p>
                                <div className="flex flex-wrap gap-1">
                                  {type.benefits.map((benefit, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                      {benefit}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div
                                className={`w-4 h-4 rounded-full border-2 ${
                                  selectedType === type.id ? "bg-primary border-primary" : "border-gray-300"
                                }`}
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {/* Step 2: Package Selection */}
                {currentStep === 2 && (
                  <div className="grid md:grid-cols-3 gap-4">
                    {packageOptions.map((pkg) => (
                      <Card
                        key={pkg.id}
                        className={`cursor-pointer transition-all hover:shadow-md relative ${
                          selectedPackage === pkg.id ? "ring-2 ring-primary" : ""
                        }`}
                        onClick={() => setSelectedPackage(pkg.id)}
                      >
                        {pkg.popular && (
                          <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2">Phổ biến</Badge>
                        )}
                        <CardContent className="p-4 text-center">
                          <h3 className="font-semibold text-lg mb-2">{pkg.name}</h3>
                          <div className="text-2xl font-bold text-primary mb-4">{pkg.price}</div>
                          <ul className="space-y-2 text-sm text-left">
                            {pkg.features.map((feature, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                          <div className="mt-4">
                            <div
                              className={`w-4 h-4 rounded-full border-2 mx-auto ${
                                selectedPackage === pkg.id ? "bg-primary border-primary" : "border-gray-300"
                              }`}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {/* Step 3: Agency Information */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="businessName">Tên doanh nghiệp *</Label>
                        <Input
                          id="businessName"
                          placeholder="Nhập tên doanh nghiệp"
                          value={agencyInfo.businessName}
                          onChange={(e) => setAgencyInfo({ ...agencyInfo, businessName: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contactName">Người liên hệ *</Label>
                        <Input
                          id="contactName"
                          placeholder="Nhập tên người liên hệ"
                          value={agencyInfo.contactName}
                          onChange={(e) => setAgencyInfo({ ...agencyInfo, contactName: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="email@example.com"
                          value={agencyInfo.email}
                          onChange={(e) => setAgencyInfo({ ...agencyInfo, email: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Số điện thoại *</Label>
                        <Input
                          id="phone"
                          placeholder="0123456789"
                          value={agencyInfo.phone}
                          onChange={(e) => setAgencyInfo({ ...agencyInfo, phone: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Địa chỉ kinh doanh *</Label>
                      <Input
                        id="address"
                        placeholder="Nhập địa chỉ đầy đủ"
                        value={agencyInfo.address}
                        onChange={(e) => setAgencyInfo({ ...agencyInfo, address: e.target.value })}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="website">Website (nếu có)</Label>
                        <Input
                          id="website"
                          placeholder="https://example.com"
                          value={agencyInfo.website}
                          onChange={(e) => setAgencyInfo({ ...agencyInfo, website: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="businessType">Loại hình kinh doanh</Label>
                        <Select
                          value={agencyInfo.businessType}
                          onValueChange={(value) => setAgencyInfo({ ...agencyInfo, businessType: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn loại hình" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="retail">Bán lẻ</SelectItem>
                            <SelectItem value="wholesale">Bán sỉ</SelectItem>
                            <SelectItem value="service">Dịch vụ</SelectItem>
                            <SelectItem value="online">Thương mại điện tử</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="facebook">Facebook</Label>
                        <Input
                          id="facebook"
                          placeholder="https://facebook.com/yourpage"
                          value={agencyInfo.facebook}
                          onChange={(e) => setAgencyInfo({ ...agencyInfo, facebook: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="instagram">Instagram</Label>
                        <Input
                          id="instagram"
                          placeholder="https://instagram.com/yourpage"
                          value={agencyInfo.instagram}
                          onChange={(e) => setAgencyInfo({ ...agencyInfo, instagram: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="experience">Kinh nghiệm (năm)</Label>
                        <Select
                          value={agencyInfo.experience}
                          onValueChange={(value) => setAgencyInfo({ ...agencyInfo, experience: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn kinh nghiệm" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0-1">0-1 năm</SelectItem>
                            <SelectItem value="1-3">1-3 năm</SelectItem>
                            <SelectItem value="3-5">3-5 năm</SelectItem>
                            <SelectItem value="5+">Trên 5 năm</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="expectedVolume">Doanh thu dự kiến/tháng</Label>
                        <Select
                          value={agencyInfo.expectedVolume}
                          onValueChange={(value) => setAgencyInfo({ ...agencyInfo, expectedVolume: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn mức doanh thu" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="under-10m">Dưới 10 triệu</SelectItem>
                            <SelectItem value="10m-50m">10-50 triệu</SelectItem>
                            <SelectItem value="50m-100m">50-100 triệu</SelectItem>
                            <SelectItem value="100m-500m">100-500 triệu</SelectItem>
                            <SelectItem value="over-500m">Trên 500 triệu</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Mô tả về doanh nghiệp</Label>
                      <Textarea
                        id="description"
                        placeholder="Mô tả về doanh nghiệp, kế hoạch kinh doanh, mục tiêu..."
                        value={agencyInfo.description}
                        onChange={(e) => setAgencyInfo({ ...agencyInfo, description: e.target.value })}
                        rows={4}
                      />
                    </div>
                  </div>
                )}

                {/* Step 4: Website Design */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    {/* Logo Upload */}
                    <div className="space-y-2">
                      <Label>Logo công ty</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <ImageIcon className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-muted-foreground mb-2">Tải lên logo của công ty</p>
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Chọn file
                        </Button>
                        <p className="text-xs text-muted-foreground mt-2">PNG, JPG tối đa 2MB</p>
                      </div>
                    </div>

                    {/* Banner Upload */}
                    <div className="space-y-2">
                      <Label>Banner trang chủ</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <ImageIcon className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-muted-foreground mb-2">Tải lên banner cho trang chủ</p>
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Chọn file
                        </Button>
                        <p className="text-xs text-muted-foreground mt-2">PNG, JPG tối đa 5MB, kích thước 1920x600px</p>
                      </div>
                    </div>

                    {/* Background Image Upload */}
                    <div className="space-y-2">
                      <Label>Ảnh nền website</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <ImageIcon className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-muted-foreground mb-2">Tải lên ảnh nền cho website</p>
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Chọn file
                        </Button>
                        <p className="text-xs text-muted-foreground mt-2">PNG, JPG tối đa 3MB</p>
                      </div>
                    </div>

                    {/* Color Scheme */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="primaryColor">Màu chủ đạo</Label>
                        <div className="flex gap-2">
                          <Input
                            id="primaryColor"
                            type="color"
                            value={websiteDesign.primaryColor}
                            onChange={(e) => setWebsiteDesign({ ...websiteDesign, primaryColor: e.target.value })}
                            className="w-16 h-10 p-1"
                          />
                          <Input
                            value={websiteDesign.primaryColor}
                            onChange={(e) => setWebsiteDesign({ ...websiteDesign, primaryColor: e.target.value })}
                            placeholder="#3B82F6"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="secondaryColor">Màu phụ</Label>
                        <div className="flex gap-2">
                          <Input
                            id="secondaryColor"
                            type="color"
                            value={websiteDesign.secondaryColor}
                            onChange={(e) => setWebsiteDesign({ ...websiteDesign, secondaryColor: e.target.value })}
                            className="w-16 h-10 p-1"
                          />
                          <Input
                            value={websiteDesign.secondaryColor}
                            onChange={(e) => setWebsiteDesign({ ...websiteDesign, secondaryColor: e.target.value })}
                            placeholder="#10B981"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Company Slogan */}
                    <div className="space-y-2">
                      <Label htmlFor="companySlogan">Slogan công ty</Label>
                      <Input
                        id="companySlogan"
                        placeholder="Nhập slogan của công ty"
                        value={websiteDesign.companySlogan}
                        onChange={(e) => setWebsiteDesign({ ...websiteDesign, companySlogan: e.target.value })}
                      />
                    </div>

                    {/* About Us */}
                    <div className="space-y-2">
                      <Label htmlFor="aboutUs">Giới thiệu về công ty</Label>
                      <Textarea
                        id="aboutUs"
                        placeholder="Viết giới thiệu về công ty, lịch sử, tầm nhìn..."
                        value={websiteDesign.aboutUs}
                        onChange={(e) => setWebsiteDesign({ ...websiteDesign, aboutUs: e.target.value })}
                        rows={4}
                      />
                    </div>

                    {/* Services */}
                    <div className="space-y-2">
                      <Label htmlFor="services">Dịch vụ cung cấp</Label>
                      <Textarea
                        id="services"
                        placeholder="Mô tả các dịch vụ mà công ty cung cấp..."
                        value={websiteDesign.services}
                        onChange={(e) => setWebsiteDesign({ ...websiteDesign, services: e.target.value })}
                        rows={3}
                      />
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-2">
                      <Label htmlFor="contactInfo">Thông tin liên hệ bổ sung</Label>
                      <Textarea
                        id="contactInfo"
                        placeholder="Giờ làm việc, thông tin bổ sung khác..."
                        value={websiteDesign.contactInfo}
                        onChange={(e) => setWebsiteDesign({ ...websiteDesign, contactInfo: e.target.value })}
                        rows={3}
                      />
                    </div>
                  </div>
                )}

                {/* Step 5: Payment & Completion */}
                {currentStep === 5 && (
                  <div className="space-y-6">
                    {/* Summary */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                      <h3 className="font-semibold mb-3">Tóm tắt đơn hàng</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Tên doanh nghiệp:</span>
                          <span className="font-medium">{agencyInfo.businessName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Loại đại lý:</span>
                          <span className="font-medium">{agencyTypes.find((t) => t.id === selectedType)?.title}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Gói dịch vụ:</span>
                          <span className="font-medium">
                            {packageOptions.find((p) => p.id === selectedPackage)?.name}
                          </span>
                        </div>
                        <div className="border-t pt-2 mt-2">
                          <div className="flex justify-between font-bold text-lg">
                            <span>Tổng cần thanh toán:</span>
                            <span className="text-primary">{paymentInfo.amount.toLocaleString()} VNĐ</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Payment QR Code */}
                    {paymentInfo.amount > 0 && (
                      <div className="text-center">
                        <h3 className="text-lg font-semibold mb-4">Thanh toán qua QR Code</h3>
                        <div className="w-48 h-48 md:w-64 md:h-64 mx-auto bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center mb-4">
                          <div className="text-center">
                            <QrCode className="h-24 w-24 md:h-32 md:w-32 mx-auto text-gray-400 mb-2" />
                            <p className="text-xs md:text-sm text-muted-foreground">Mã QR thanh toán</p>
                          </div>
                        </div>

                        {/* Payment Info */}
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg space-y-2 max-w-md mx-auto">
                          <div className="flex justify-between text-sm">
                            <span>Người thanh toán:</span>
                            <span className="font-medium">{agencyInfo.contactName}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Số tiền:</span>
                            <span className="font-bold text-lg text-blue-600">
                              {paymentInfo.amount.toLocaleString()} VNĐ
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Mã giao dịch:</span>
                            <span className="font-mono text-xs">{paymentInfo.transactionId}</span>
                          </div>
                        </div>

                        {/* Payment Instructions */}
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg mt-4 max-w-md mx-auto">
                          <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                            Hướng dẫn thanh toán:
                          </h4>
                          <ol className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1 list-decimal list-inside text-left">
                            <li>Mở ứng dụng ngân hàng hoặc ví điện tử</li>
                            <li>Quét mã QR ở trên</li>
                            <li>Xác nhận thông tin và thanh toán</li>
                            <li>Website sẽ được tạo sau khi thanh toán thành công</li>
                          </ol>
                        </div>
                      </div>
                    )}

                    {/* Success Message for Free Package */}
                    {paymentInfo.amount === 0 && (
                      <div className="text-center space-y-4">
                        <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mx-auto flex items-center justify-center">
                          <QrCode className="h-16 w-16 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2">Tài khoản đã được tạo thành công!</h3>
                          <p className="text-muted-foreground">
                            Mã mời đại lý của bạn: <span className="font-mono font-bold">{inviteCode}</span>
                          </p>
                        </div>
                        <div className="flex justify-center gap-2">
                          <Button variant="outline" size="sm" onClick={copyInviteCode}>
                            <Copy className="h-4 w-4 mr-2" />
                            Sao chép mã
                          </Button>
                          <Button variant="outline" size="sm" onClick={shareInvite}>
                            <Share2 className="h-4 w-4 mr-2" />
                            Chia sẻ
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6">
                  <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Quay lại
                  </Button>

                  {currentStep < totalSteps ? (
                    <Button
                      onClick={handleNext}
                      disabled={
                        (currentStep === 1 && !selectedType) ||
                        (currentStep === 2 && !selectedPackage) ||
                        (currentStep === 3 &&
                          (!agencyInfo.businessName ||
                            !agencyInfo.contactName ||
                            !agencyInfo.email ||
                            !agencyInfo.phone ||
                            !agencyInfo.address))
                      }
                    >
                      Tiếp tục
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  ) : paymentInfo.amount > 0 ? (
                    <Button className="bg-green-600 hover:bg-green-700">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Xác nhận thanh toán
                    </Button>
                  ) : (
                    <Button onClick={() => (window.location.href = "/")}>Hoàn thành</Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Summary Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tóm tắt</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedType && (
                  <div>
                    <Label className="text-sm font-medium">Loại đại lý</Label>
                    <p className="text-sm text-muted-foreground">
                      {agencyTypes.find((t) => t.id === selectedType)?.title}
                    </p>
                  </div>
                )}

                {selectedPackage && (
                  <div>
                    <Label className="text-sm font-medium">Gói dịch vụ</Label>
                    <p className="text-sm text-muted-foreground">
                      {packageOptions.find((p) => p.id === selectedPackage)?.name}
                    </p>
                  </div>
                )}

                {agencyInfo.businessName && (
                  <div>
                    <Label className="text-sm font-medium">Doanh nghiệp</Label>
                    <p className="text-sm text-muted-foreground">{agencyInfo.businessName}</p>
                  </div>
                )}

                {paymentInfo.amount > 0 && (
                  <div className="border-t pt-4">
                    <Label className="text-sm font-medium">Tổng thanh toán</Label>
                    <p className="text-lg font-bold text-primary">{paymentInfo.amount.toLocaleString()} VNĐ</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
