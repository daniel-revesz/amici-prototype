"use client";

import { useState } from "react";
import { StepLayout } from "../step-layout";
import { Button } from "../ui/button";
import { useRequest } from "@/context/request-context";
import { ChevronDown, X } from "lucide-react";

const eventTypeOptions = [
  "Celebration",
  "Company event",
  "Wedding",
  "Birthday",
  "Conference",
];

const guestOptions = ["10", "25", "50", "100", "150", "200", "300+"];
const budgetOptions = [
  "500 SEK per person",
  "750 SEK per person",
  "1000 SEK per person",
  "1500 SEK per person",
  "2000 SEK per person",
];

export function DetailsStep() {
  const { data, updateData, setStep } = useRequest();
  const [eventTypes, setEventTypes] = useState<string[]>(
    data.eventTypes.length ? data.eventTypes : ["Celebration", "Company event"]
  );
  const [guestCount, setGuestCount] = useState(data.guestCount || "100");
  const [budget, setBudget] = useState(data.budget || "1500 SEK per person");
  const [foodPreferences, setFoodPreferences] = useState(data.foodPreferences);
  const [eventDetails, setEventDetails] = useState(data.eventDetails);
  const [showEventTypes, setShowEventTypes] = useState(false);
  const [showGuests, setShowGuests] = useState(false);
  const [showBudget, setShowBudget] = useState(false);

  const removeEventType = (type: string) => {
    setEventTypes((prev) => prev.filter((t) => t !== type));
  };

  const addEventType = (type: string) => {
    if (!eventTypes.includes(type)) {
      setEventTypes((prev) => [...prev, type]);
    }
    setShowEventTypes(false);
  };

  const handleContinue = () => {
    updateData({
      eventTypes,
      guestCount,
      budget,
      foodPreferences,
      eventDetails,
    });
    setStep(4);
  };

  return (
    <StepLayout currentStep={3} title="Add more event details">
      {/* Field group */}
      <div className="w-full border border-white-30 rounded-sm overflow-hidden">
        {/* Event type */}
        <div className="relative px-md py-sm border-b border-white-30">
          <p className="text-[14px] text-white-70 leading-[1.4]">Event type</p>
          <div className="flex items-center gap-2xs">
            <div className="flex-1 flex flex-wrap gap-2xs">
              {eventTypes.map((type) => (
                <span
                  key={type}
                  className="flex items-center gap-2xs bg-white-10 text-white text-[16px] leading-[1.4] pl-xs pr-2xs py-2xs rounded-sm"
                >
                  {type}
                  <button onClick={() => removeEventType(type)}>
                    <X size={16} className="text-white" />
                  </button>
                </span>
              ))}
            </div>
            <button onClick={() => setShowEventTypes(!showEventTypes)} className="p-2xs">
              <ChevronDown size={24} className="text-white-70" />
            </button>
          </div>
          {showEventTypes && (
            <div className="absolute left-0 right-0 top-full bg-dark-2 border border-white-20 rounded-sm z-10 shadow-lg">
              {eventTypeOptions
                .filter((o) => !eventTypes.includes(o))
                .map((option) => (
                  <button
                    key={option}
                    onClick={() => addEventType(option)}
                    className="w-full text-left px-md py-sm text-[16px] text-white hover:bg-white-10 leading-[1.4]"
                  >
                    {option}
                  </button>
                ))}
            </div>
          )}
        </div>

        {/* Number of guests */}
        <div className="relative px-md py-sm border-b border-white-30">
          <p className="text-[14px] text-white-70 leading-[1.4]">Number of guests</p>
          <div className="flex items-center gap-2xs">
            <p className="flex-1 text-[20px] text-white leading-[1.4]">{guestCount}</p>
            <button onClick={() => setShowGuests(!showGuests)} className="p-2xs">
              <ChevronDown size={24} className="text-white-70" />
            </button>
          </div>
          {showGuests && (
            <div className="absolute left-0 right-0 top-full bg-dark-2 border border-white-20 rounded-sm z-10 shadow-lg">
              {guestOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => { setGuestCount(option); setShowGuests(false); }}
                  className="w-full text-left px-md py-sm text-[16px] text-white hover:bg-white-10 leading-[1.4]"
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Budget */}
        <div className="relative px-md py-sm border-b border-white-30">
          <p className="text-[14px] text-white-70 leading-[1.4]">Budget</p>
          <div className="flex items-center gap-2xs">
            <p className="flex-1 text-[20px] text-white leading-[1.4]">{budget}</p>
            <button onClick={() => setShowBudget(!showBudget)} className="p-2xs">
              <ChevronDown size={24} className="text-white-70" />
            </button>
          </div>
          {showBudget && (
            <div className="absolute left-0 right-0 top-full bg-dark-2 border border-white-20 rounded-sm z-10 shadow-lg">
              {budgetOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => { setBudget(option); setShowBudget(false); }}
                  className="w-full text-left px-md py-sm text-[16px] text-white hover:bg-white-10 leading-[1.4]"
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Food preferences */}
        <div className="px-md py-sm border-b border-white-30">
          <p className="text-[14px] text-white-70 leading-[1.4]">Food preferences</p>
          <input
            type="text"
            value={foodPreferences}
            onChange={(e) => setFoodPreferences(e.target.value)}
            placeholder="Any dietary requirements or preferences..."
            className="w-full bg-transparent text-[20px] text-white leading-[1.4] outline-none placeholder:text-white-30"
          />
        </div>

        {/* Event details */}
        <div className="px-md pt-sm">
          <p className="text-[14px] text-white-70 leading-[1.4]">Event details</p>
          <textarea
            value={eventDetails}
            onChange={(e) => setEventDetails(e.target.value)}
            placeholder="Tell us more about your event..."
            rows={5}
            className="w-full bg-transparent text-[20px] text-white leading-[1.4] outline-none resize-y placeholder:text-white-30"
          />
        </div>
      </div>

      <div className="w-full flex gap-lg">
        <Button
          variant="secondary"
          onClick={() => setStep(2)}
          className="flex-1 h-[56px] rounded-sm bg-white-10 text-white text-[20px] font-bold hover:bg-white-20"
        >
          Previous
        </Button>
        <Button
          onClick={handleContinue}
          className="flex-1 h-[56px] rounded-sm bg-white text-dark-1 text-[20px] font-bold hover:bg-white/90"
        >
          Continue
        </Button>
      </div>
    </StepLayout>
  );
}
