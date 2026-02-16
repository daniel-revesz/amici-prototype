"use client";

import { useState } from "react";
import { parse, format, isValid } from "date-fns";
import { StepLayout } from "../step-layout";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
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

const DATE_FORMATS = [
  "MMMM d, yyyy",
  "MMMM d yyyy",
  "MMM d, yyyy",
  "MMM d yyyy",
  "MM/dd/yyyy",
  "M/d/yyyy",
  "yyyy-MM-dd",
  "d MMMM yyyy",
  "d MMM yyyy",
  "MMMM d",
  "MMM d",
];

function tryParseDate(text: string): Date | null {
  const trimmed = text.trim();
  if (!trimmed) return null;

  const referenceDate = new Date();

  for (const fmt of DATE_FORMATS) {
    const result = parse(trimmed, fmt, referenceDate);
    if (isValid(result)) {
      return result;
    }
  }
  return null;
}

export function DateStep() {
  const { data, updateData, setStep } = useRequest();
  const [dateType, setDateType] = useState<"specific" | "flexible">(data.dateType);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    data.selectedDate ? new Date(data.selectedDate) : undefined
  );
  const [inputText, setInputText] = useState<string>(
    data.selectedDate ? format(new Date(data.selectedDate), "MMMM d, yyyy") : ""
  );
  const [displayMonth, setDisplayMonth] = useState<Date>(
    data.selectedDate ? new Date(data.selectedDate) : new Date()
  );
  const [isInputInvalid, setIsInputInvalid] = useState(false);
  const [selectedMonths, setSelectedMonths] = useState<string[]>(data.selectedMonths);
  const [selectedWeekdays, setSelectedWeekdays] = useState<string[]>(data.selectedWeekdays);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setInputText(text);

    const parsed = tryParseDate(text);
    if (parsed) {
      setSelectedDate(parsed);
      setDisplayMonth(parsed);
      setIsInputInvalid(false);
    } else {
      setIsInputInvalid(text.trim().length > 0);
    }
  };

  const handleInputBlur = () => {
    if (selectedDate && !isInputInvalid) {
      setInputText(format(selectedDate, "MMMM d, yyyy"));
    }
  };

  const handleCalendarSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      setInputText(format(date, "MMMM d, yyyy"));
      setDisplayMonth(date);
      setIsInputInvalid(false);
    } else {
      setInputText("");
      setIsInputInvalid(false);
    }
  };

  const handleContinue = () => {
    updateData({
      dateType,
      selectedDate:
        dateType === "specific" && selectedDate
          ? format(selectedDate, "yyyy-MM-dd")
          : null,
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
          <div
            className={`w-full border rounded-sm px-md py-sm ${
              isInputInvalid ? "border-accent-red" : "border-white-30"
            }`}
          >
            <p className="text-[14px] text-white-70 leading-[1.4]">Date</p>
            <input
              type="text"
              value={inputText}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              placeholder="Select a date"
              className="w-full bg-transparent text-[20px] text-white leading-[1.4] outline-none placeholder:text-white-30"
            />
            {isInputInvalid && (
              <p className="text-[12px] text-accent-red leading-[1.4] mt-2xs">
                Try a format like March 10, 03/10/2025, or 2025-03-10
              </p>
            )}
          </div>

          {/* Calendar */}
          <div className="w-full flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleCalendarSelect}
              month={displayMonth}
              onMonthChange={setDisplayMonth}
              className="bg-dark-2 rounded-lg p-md"
            />
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
        disabled={dateType === "specific" && (!selectedDate || isInputInvalid)}
        className="w-full max-w-[264px] h-[56px] rounded-sm bg-white text-dark-1 text-[20px] font-bold hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue
      </Button>
    </StepLayout>
  );
}
