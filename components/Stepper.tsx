
interface StepperProps {
  steps: string[]
  currentStep: number
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => {
  return (
    <div className="relative w-full mb-8">

      {/* Background Line */}
      <div className="absolute top-4 left-0 w-full h-0.5 bg-gray-300" />

      {/* Steps */}
      <div className="flex justify-between w-full">
        {steps.map((label, index) => {
          const isCompleted = index < currentStep
          const isActive = index === currentStep

          return (
            <div
              key={label}
              className="flex flex-col items-center flex-1"
            >
              {/* Circle */}
              <div
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center z-10
                  ${
                    isCompleted
                      ? 'bg-blue-600 text-white'
                      : isActive
                      ? 'border-2 border-blue-600 text-blue-600 bg-white'
                      : 'bg-gray-300 text-gray-700'
                  }
                `}
              >
                {index + 1}
              </div>

              {/* Label */}
              <p className="mt-2 text-sm text-center">
                {label}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Stepper
