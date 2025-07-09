import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface WalletCardProps {
  name: string
  balance: string
  currency: string
  type: "primary" | "secondary" | "crypto" | "savings"
  change?: string
}

export function WalletCard({ name, balance, currency, type, change }: WalletCardProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "primary":
        return "bg-blue-500"
      case "secondary":
        return "bg-green-500"
      case "crypto":
        return "bg-orange-500"
      case "savings":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "primary":
        return "Chính"
      case "secondary":
        return "Phụ"
      case "crypto":
        return "Crypto"
      case "savings":
        return "Tiết kiệm"
      default:
        return "Khác"
    }
  }

  return (
    <Card className="relative overflow-hidden">
      <div className={`absolute top-0 left-0 w-full h-1 ${getTypeColor(type)}`} />
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{name}</CardTitle>
          <Badge variant="secondary">{getTypeLabel(type)}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-2xl font-bold">
            {balance} {currency}
          </div>
          {change && (
            <div className={`text-sm ${change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>{change}</div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
