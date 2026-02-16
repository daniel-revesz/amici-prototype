"use client";

import { RequestProvider, useRequest } from "@/context/request-context";
import { DateStep } from "@/components/steps/date-step";
import { VenueStep } from "@/components/steps/venue-step";
import { DetailsStep } from "@/components/steps/details-step";
import { ExtrasStep } from "@/components/steps/extras-step";
import { CompletedStep } from "@/components/steps/completed-step";
import { AuthModal } from "@/components/auth-modal";

function RequestFlow() {
  const { step, completed } = useRequest();

  if (completed) return <CompletedStep />;

  return (
    <>
      {step === 1 && <DateStep />}
      {step === 2 && <VenueStep />}
      {step === 3 && <DetailsStep />}
      {step === 4 && <ExtrasStep />}
      <AuthModal />
    </>
  );
}

export default function Home() {
  return (
    <RequestProvider>
      <RequestFlow />
    </RequestProvider>
  );
}
