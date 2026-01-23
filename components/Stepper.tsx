interface StepperProps {
  steps: string[]
  currentStep: number   // 0-based index of active step
}

// interface Step {
//   label:string,
//   index:number
// }


const Stepper:React.FC<StepperProps> = ({steps,currentStep}) => {

 return (
    <div className="flex items-center gap-4 mb-6">
      {steps.map((label, index) => (
        <>
        <div key={label} className="flex flex-col min-w-12 relative">
          {/* Circle */}
          <div
            className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center
              ${
                currentStep === index
                  ? 'border border-blue-600 text-primary'  // Active step
                  : currentStep > index
                  ? 'bg-blue-600 text-white'           // Completed step
                  : 'bg-gray-300 text-gray-700'       // Pending step
              }`}
          >
            {index+1}
          </div>

          {/* Label */}
          <p className="text-center mt-2 text-sm">{label}</p>
        </div>
         {/* Connector line */}
          {index !== steps.length - 1 && (
            <div className=' w-full h-0.5 bg-gray-300'
            />
          )}
        </>
        
      ))}
    </div>
  )
}

export default Stepper