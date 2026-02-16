"use client";

import { useState } from "react";
import { StepLayout } from "../step-layout";
import { Button } from "../ui/button";
import { Togglebox } from "../togglebox";
import { useRequest } from "@/context/request-context";

const extrasOptions = [
  "Decor", "Tables", "Glasses", "Plates", "Silverware", "Flowers",
  "Furniture", "Candels", "Tents", "Lighting", "Sound", "Other",
];

const qualityOptions = [
  { value: "basic", label: "Basic quality" },
  { value: "standard", label: "Standard quality" },
  { value: "premium", label: "Premium quality" },
];

export function ExtrasStep() {
  const { data, updateData, setStep, setShowAuth } = useRequest();
  const [extras, setExtras] = useState<string[]>(data.extras);
  const [quality, setQuality] = useState(data.quality || "standard");
  const [addonDescription, setAddonDescription] = useState(data.addonDescription);

  const toggleExtra = (extra: string) => {
    setExtras((prev) =>
      prev.includes(extra)
        ? prev.filter((e) => e !== extra)
        : [...prev, extra]
    );
  };

  const handleComplete = () => {
    updateData({ extras, quality, addonDescription });
    setShowAuth(true);
  };

  return (
    <StepLayout currentStep={4} title="Add any extras">
      {/* Togglebox chips */}
      <div className="flex flex-wrap gap-sm justify-center w-full max-w-[744px]">
        {extrasOptions.map((extra) => (
          <Togglebox
            key={extra}
            label={extra}
            selected={extras.includes(extra)}
            onToggle={() => toggleExtra(extra)}
          />
        ))}
      </div>

      {/* Quality radio */}
      <div className="flex items-center gap-sm">
        {qualityOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setQuality(option.value)}
            className="flex items-center gap-sm p-2xs"
          >
            <div
              className={`size-[24px] rounded-full border-2 flex items-center justify-center ${
                quality === option.value
                  ? "border-white"
                  : "border-white-30"
              }`}
            >
              {quality === option.value && (
                <div className="size-[12px] rounded-full bg-white" />
              )}
            </div>
            <span className="text-[20px] text-white leading-[1.4]">
              {option.label}
            </span>
          </button>
        ))}
      </div>

      {/* Add-on description */}
      <div className="w-full border border-white-30 rounded-sm overflow-hidden">
        <div className="px-md pt-sm">
          <p className="text-[14px] text-white-70 leading-[1.4]">
            Add-on description
          </p>
          <textarea
            value={addonDescription}
            onChange={(e) => setAddonDescription(e.target.value)}
            placeholder="Describe your add-on requirements..."
            rows={5}
            className="w-full bg-transparent text-[20px] text-white leading-[1.4] outline-none resize-y placeholder:text-white-30"
          />
        </div>
      </div>

      {/* Partnership badge */}
      <p className="text-[16px] text-white-70 leading-[1.4] flex items-center gap-xs">
        In partnership with
        <span className="bg-black text-white text-[12px] px-xs py-2xs rounded-full font-bold flex items-center gap-2xs">
          ▲ Westmans
        </span>
      </p>

      <div className="w-full flex gap-lg">
        <Button
          variant="secondary"
          onClick={() => setStep(3)}
          className="flex-1 h-[56px] rounded-sm bg-white-10 text-white text-[20px] font-bold hover:bg-white-20"
        >
          Previous
        </Button>
        <Button
          onClick={handleComplete}
          className="flex-1 h-[56px] rounded-sm bg-white text-dark-1 text-[20px] font-bold hover:bg-white/90"
        >
          Complete request
        </Button>
      </div>

      <p className="text-[16px] text-white-70 text-center leading-[1.4]">
        By clicking signing up you are accepting our{" "}
        <span className="underline cursor-pointer">Terms</span> and{" "}
        <span className="underline cursor-pointer">Integration policy</span>
      </p>
    </StepLayout>
  );
}
