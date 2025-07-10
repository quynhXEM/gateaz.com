import { Progress } from "@/components/ui/progress"

interface StepProgressProps {
  currentStep: number
  totalSteps: number
  className?: string
}

export default function StepProgress({ currentStep, totalSteps, className }: StepProgressProps) {
  const progress = (currentStep / totalSteps) * 100
  return (
    <div className={className ? className : "space-y-2"}>
      <div className="flex justify-between text-sm">
        <span>
          Bước {currentStep} / {totalSteps}
        </span>
        <span>{Math.round(progress)}%</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  )
} 