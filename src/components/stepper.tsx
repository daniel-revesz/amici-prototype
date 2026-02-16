const steps = ["Date", "Venue", "Details", "Extras"];

export function Stepper({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center">
      {steps.map((label, i) => {
        const stepNum = i + 1;
        const isActive = stepNum === currentStep;
        const isPast = stepNum < currentStep;

        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`flex items-center justify-center size-[48px] rounded-full text-[20px] font-bold font-sans ${
                  isActive
                    ? "bg-white text-dark-1"
                    : isPast
                    ? "bg-white text-dark-1"
                    : "border border-white-20 text-white-20"
                }`}
              >
                {stepNum}
              </div>
              <span
                className={`text-[16px] mt-xs text-center ${
                  isActive ? "text-white font-bold" : "text-white-30"
                }`}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className="w-[88px] h-px bg-white-20 mx-0 -mt-[28px]" />
            )}
          </div>
        );
      })}
    </div>
  );
}
