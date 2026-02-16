"use client";

import { useState } from "react";
import { StepLayout } from "../step-layout";
import { Button } from "../ui/button";
import { useRequest } from "@/context/request-context";

const months = [
  { label: "Nov", year: 2025 },
  { label: "Dec", year: 2025 },
  { label: "Jan", year: 2026 },
  { label: "Feb", year: 2026 },
  { label: "Mar", year: 2026 },
  { label: "Apr", year: 2026 },
  { label: "May", year: 2026 },
];

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const calendarDays = [
  [null, null, null, null, null, null, 1],
  [2, 3, 4, 5, 6, 7, 8],
  [9, 10, 11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20, 21, 22],
  [23, 24, 25, 26, 27, 28, 29],
  [30, 31, null, null, null, null, null],
];

export function DateStep() {
  const { data, updateData, setStep } = useRequest();
  const [dateType, setDateType] = useState<"specific" | "flexible">(data.dateType);
  const [selectedDay, setSelectedDay] = useState<number | null>(10);
  const [selectedMonths, setSelectedMonths] = useState<string[]>(data.selectedMonths);
  const [selectedWeekdays, setSelectedWeekdays] = useState<string[]>(data.selectedWeekdays);

  const handleContinue = () => {
    updateData({
      dateType,
      selectedDate: dateType === "specific" ? `March ${selectedDay}` : null,
      selectedMonths,
      selectedWeekdays,
    });
    setStep(2);
  };

  const toggleMonth = (m: string) => {
    setSelectedMonths((prev) =>
      prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]
    );
  };

  const toggleWeekday = (d: string) => {
    setSelectedWeekdays((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
    );
  };

  return (
    <StepLayout currentStep={1} title="Select your event date">
      {/* Tabs */}
      <div className="flex items-center bg-dark-2 border border-white-20 rounded-full p-xs">
        <button
          onClick={() => setDateType("specific")}
          className={`px-md py-xs rounded-full text-[20px] leading-[1.4] transition-colors ${
            dateType === "specific"
              ? "bg-white text-dark-1"
              : "text-white"
          }`}
        >
          Specific date
        </button>
        <button
          onClick={() => setDateType("flexible")}
          className={`px-md py-xs rounded-full text-[20px] leading-[1.4] transition-colors ${
            dateType === "flexible"
              ? "bg-white text-dark-1"
              : "text-white"
          }`}
        >
          Flexible dates
        </button>
      </div>

      {dateType === "specific" ? (
        <div className="w-full flex flex-col items-center gap-xl">
          {/* Date Input */}
          <div className="w-full border border-white-30 rounded-sm px-md py-sm">
            <p className="text-[14px] text-white-70 leading-[1.4]">Date</p>
            <p className="text-[20px] text-white leading-[1.4]">
              {selectedDay ? `March ${selectedDay}` : "Select a date"}
            </p>
          </div>

          {/* Calendar */}
          <div className="relative w-full flex items-center justify-center">
            <button className="absolute left-0 top-1/2 -translate-y-1/2 text-white-70 text-[24px] p-sm z-10">
              ←
            </button>
            <div className="bg-dark-2 rounded-lg p-md w-[360px]">
              <p className="text-[20px] text-white text-center mb-md leading-[1.4]">
                March 2025
              </p>
              <div className="grid grid-cols-7 gap-y-xs">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                  <div key={d} className="text-center text-white text-[20px] leading-[1.4] h-[24px]">
                    {d}
                  </div>
                ))}
                {calendarDays.flat().map((day, i) => (
                  <button
                    key={i}
                    onClick={() => day && setSelectedDay(day)}
                    disabled={!day}
                    className={`flex items-center justify-center size-[44px] rounded-sm text-[20px] leading-[1.4] transition-colors ${
                      day === selectedDay
                        ? "bg-white text-dark-1"
                        : day
                        ? "text-white hover:bg-white-10"
                        : "text-transparent"
                    }`}
                  >
                    {day ?? ""}
                  </button>
                ))}
              </div>
            </div>
            <button className="absolute right-0 top-1/2 -translate-y-1/2 text-white-70 text-[24px] p-sm z-10">
              →
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center gap-xl">
          {/* Preferred months */}
          <p className="text-[16px] text-white text-center leading-[1.4]">
            Preferred months
          </p>
          <div className="flex items-center gap-sm overflow-x-auto w-full justify-center">
            <button className="text-white-70 text-[24px] shrink-0">←</button>
            {months.map((m) => {
              const key = `${m.label} ${m.year}`;
              const isSelected = selectedMonths.includes(key);
              return (
                <button
                  key={key}
                  onClick={() => toggleMonth(key)}
                  className={`flex flex-col items-center justify-center px-md py-sm rounded-sm border min-w-[60px] transition-colors ${
                    isSelected
                      ? "border-accent-blue bg-accent-blue/10 text-accent-blue"
                      : "border-white-30 text-white-30"
                  }`}
                >
                  <span className="text-[16px] leading-[1.4]">{m.label}</span>
                  <span className="text-[14px] leading-[1.4]">{m.year}</span>
                </button>
              );
            })}
            <button className="text-white-70 text-[24px] shrink-0">→</button>
          </div>

          {/* Preferred weekdays */}
          <p className="text-[16px] text-white text-center leading-[1.4]">
            Preferred weekdays
          </p>
          <div className="flex items-center gap-sm flex-wrap justify-center">
            {weekdays.map((d) => {
              const isSelected = selectedWeekdays.includes(d);
              return (
                <button
                  key={d}
                  onClick={() => toggleWeekday(d)}
                  className={`px-md py-sm rounded-sm border text-[16px] leading-[1.4] transition-colors ${
                    isSelected
                      ? "border-accent-blue bg-accent-blue/10 text-accent-blue"
                      : "border-white-30 text-white"
                  }`}
                >
                  {d}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <Button
        onClick={handleContinue}
        className="w-full max-w-[264px] h-[56px] rounded-sm bg-white text-dark-1 text-[20px] font-bold hover:bg-white/90"
      >
        Continue
      </Button>
    </StepLayout>
  );
}
