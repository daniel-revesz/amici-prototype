"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface RequestData {
  dateType: "specific" | "flexible";
  selectedDate: string | null;
  selectedMonths: string[];
  selectedWeekdays: string[];
  venueSuggestions: boolean;
  venue: string;
  venueLocation: string;
  venueDetails: string;
  eventTypes: string[];
  guestCount: string;
  budget: string;
  foodPreferences: string;
  eventDetails: string;
  extras: string[];
  quality: string;
  addonDescription: string;
}

interface RequestContextType {
  step: number;
  setStep: (step: number) => void;
  data: RequestData;
  updateData: (updates: Partial<RequestData>) => void;
  showAuth: boolean;
  setShowAuth: (show: boolean) => void;
  completed: boolean;
  setCompleted: (completed: boolean) => void;
}

const defaultData: RequestData = {
  dateType: "specific",
  selectedDate: null,
  selectedMonths: [],
  selectedWeekdays: [],
  venueSuggestions: false,
  venue: "",
  venueLocation: "",
  venueDetails: "",
  eventTypes: [],
  guestCount: "",
  budget: "",
  foodPreferences: "",
  eventDetails: "",
  extras: [],
  quality: "standard",
  addonDescription: "",
};

const RequestContext = createContext<RequestContextType | null>(null);

export function RequestProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<RequestData>(defaultData);
  const [showAuth, setShowAuth] = useState(false);
  const [completed, setCompleted] = useState(false);

  const updateData = (updates: Partial<RequestData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  return (
    <RequestContext.Provider
      value={{ step, setStep, data, updateData, showAuth, setShowAuth, completed, setCompleted }}
    >
      {children}
    </RequestContext.Provider>
  );
}

export function useRequest() {
  const ctx = useContext(RequestContext);
  if (!ctx) throw new Error("useRequest must be used within RequestProvider");
  return ctx;
}
