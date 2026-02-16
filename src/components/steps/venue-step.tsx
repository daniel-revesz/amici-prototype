"use client";

import { useState } from "react";
import { StepLayout } from "../step-layout";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { useRequest } from "@/context/request-context";

export function VenueStep() {
  const { data, updateData, setStep } = useRequest();
  const [suggestions, setSuggestions] = useState(data.venueSuggestions);
  const [venue, setVenue] = useState(data.venue);
  const [location, setLocation] = useState(data.venueLocation);
  const [details, setDetails] = useState(data.venueDetails);

  const handleNext = () => {
    updateData({
      venueSuggestions: suggestions,
      venue,
      venueLocation: location,
      venueDetails: details,
    });
    setStep(3);
  };

  return (
    <StepLayout currentStep={2} title="Select your venue">
      {/* Toggle */}
      <div className="flex items-center gap-sm">
        <Switch
          checked={suggestions}
          onCheckedChange={setSuggestions}
          className="data-[state=checked]:bg-accent-blue"
        />
        <span className="text-[20px] text-white leading-[1.4]">
          Get venue suggestions
        </span>
      </div>

      {suggestions ? (
        <div className="w-full flex flex-col items-center gap-2xl">
          <h5 className="text-[30px] font-heading font-bold text-white text-center leading-none">
            Let&apos;s find your perfect venue
          </h5>

          <div className="w-full border border-white-30 rounded-sm overflow-hidden">
            {/* Location input */}
            <div className="px-md py-sm border-b border-white-30">
              <p className="text-[14px] text-white-70 leading-[1.4]">Location</p>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Stockholm"
                className="w-full bg-transparent text-[20px] text-white leading-[1.4] outline-none placeholder:text-white-30"
              />
            </div>
            {/* Additional details */}
            <div className="px-md py-sm">
              <p className="text-[14px] text-white-70 leading-[1.4]">
                Additional details
              </p>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Tell us about your ideal venue..."
                rows={5}
                className="w-full bg-transparent text-[20px] text-white leading-[1.4] outline-none resize-none placeholder:text-white-30"
              />
            </div>
          </div>

          <p className="text-[16px] text-white-70 leading-[1.4] flex items-center gap-xs">
            In partnership with
            <span className="bg-black text-white text-[12px] px-xs py-2xs rounded-full font-bold">
              Venue
            </span>
          </p>

          <div className="w-full flex gap-lg">
            <Button
              variant="secondary"
              onClick={() => setStep(1)}
              className="flex-1 h-[56px] rounded-sm bg-white-10 text-white text-[20px] font-bold hover:bg-white-20"
            >
              Previous
            </Button>
            <Button
              onClick={handleNext}
              className="flex-1 h-[56px] rounded-sm bg-white text-dark-1 text-[20px] font-bold hover:bg-white/90"
            >
              Continue
            </Button>
          </div>
        </div>
      ) : (
        <>
          {/* Venue input */}
          <div className="w-full border border-white-70 rounded-sm px-md py-sm">
            <p className="text-[14px] text-white-70 leading-[1.4]">Venue</p>
            <input
              type="text"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              placeholder="Add your venue"
              className="w-full bg-transparent text-[20px] text-white leading-[1.4] outline-none placeholder:text-white-30"
            />
          </div>

          <div className="w-full flex gap-lg">
            <Button
              variant="secondary"
              onClick={() => setStep(1)}
              className="flex-1 h-[56px] rounded-sm bg-white-10 text-white text-[20px] font-bold hover:bg-white-20"
            >
              Previous
            </Button>
            <Button
              onClick={handleNext}
              className="flex-1 h-[56px] rounded-sm bg-white text-dark-1 text-[20px] font-bold hover:bg-white/90"
            >
              Skip for now
            </Button>
          </div>
        </>
      )}
    </StepLayout>
  );
}
