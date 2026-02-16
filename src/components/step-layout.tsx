import { Navbar } from "./navbar";
import { Stepper } from "./stepper";

interface StepLayoutProps {
  currentStep: number;
  title: string;
  children: React.ReactNode;
}

export function StepLayout({ currentStep, title, children }: StepLayoutProps) {
  return (
    <div className="min-h-screen bg-dark-1 flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center pt-[140px] gap-2xl pb-2xl px-md">
        <Stepper currentStep={currentStep} />
        <h3 className="text-[48px] font-heading font-bold text-center text-white leading-none">
          {title}
        </h3>
        <div className="w-full max-w-[552px] flex flex-col items-center gap-2xl">
          {children}
        </div>
      </div>
    </div>
  );
}
