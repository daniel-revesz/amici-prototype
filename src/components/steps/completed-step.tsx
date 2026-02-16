"use client";

import { useRequest } from "@/context/request-context";

const requestDetails = [
  { label: "Requesting as", value: "Company" },
  { label: "Event type", value: "+ Add" },
  { label: "Date", value: "2025-10-10" },
  { label: "Location", value: "Östasiatiska museet,\nTyghusplan 4, 111 49 Stockholm" },
  { label: "Number of guests", value: "+ Add" },
  { label: "Budget level", value: "+ Add" },
  {
    label: "Event details",
    value:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse molestie tortor tristique massa sollicitudin, in ultricies velit pretium...",
  },
];

const contactDetails = [
  { label: "Name", value: "John Doe" },
  { label: "Company", value: "Eventbiz AB" },
  { label: "Email", value: "johndoe@gmail.com" },
  { label: "Phone", value: "+46 70 123 45 67" },
];

export function CompletedStep() {
  const { setCompleted, setStep } = useRequest();

  return (
    <div className="min-h-screen bg-dark-1">
      {/* Full Navbar */}
      <nav className="flex items-center justify-between px-xl py-md h-[72px] border-b border-white-10">
        <span className="font-heading text-[24px] text-white italic">amici</span>
        <div className="flex items-center gap-xl">
          <span className="text-[16px] text-white leading-[1.4] cursor-pointer">
            For event organizers ▾
          </span>
          <span className="text-[16px] text-white leading-[1.4] cursor-pointer">
            For chefs
          </span>
          <span className="text-[16px] text-white leading-[1.4] cursor-pointer">
            About us
          </span>
          <div className="flex items-center gap-xs">
            <div className="size-[36px] rounded-full bg-accent-green flex items-center justify-center text-dark-1 font-bold text-[14px]">
              JD
            </div>
            <span className="text-[16px] text-white leading-[1.4]">John Doe ▾</span>
          </div>
          <span className="text-[16px] text-white leading-[1.4]">EN ▾</span>
        </div>
      </nav>

      <div className="max-w-[1200px] mx-auto px-xl py-lg">
        {/* Breadcrumb */}
        <div className="flex items-center justify-between mb-lg">
          <div className="flex items-center gap-xs text-[16px] leading-[1.4]">
            <span className="text-white-70 cursor-pointer">My events</span>
            <span className="text-white-30">›</span>
            <span className="text-white">Untitled event</span>
          </div>
          <div className="flex items-center gap-sm">
            <span className="flex items-center gap-xs text-accent-yellow text-[14px]">
              <span className="size-[8px] rounded-full bg-accent-yellow inline-block" />
              Waiting for offers
            </span>
            <span className="text-white-30 cursor-pointer">⋮</span>
          </div>
        </div>

        {/* Yellow banner */}
        <div className="bg-accent-yellow/10 border border-accent-yellow/30 rounded-sm px-lg py-md mb-lg flex items-center gap-sm">
          <span className="size-[8px] rounded-full bg-accent-yellow" />
          <span className="text-white text-[16px] leading-[1.4]">
            We&apos;re working on your menu
          </span>
        </div>

        {/* Cards row */}
        <div className="grid grid-cols-3 gap-lg mb-lg">
          {/* Map card */}
          <div>
            <button className="w-full bg-accent-green/10 border border-accent-green/30 text-accent-green rounded-sm px-lg py-sm mb-sm text-[16px] leading-[1.4] flex items-center justify-center gap-xs">
              ↗ Share
            </button>
            <div className="bg-dark-2 rounded-sm h-[200px] flex items-center justify-center text-white-30">
              Map placeholder
            </div>
          </div>

          {/* Venue suggestions card */}
          <div className="border border-accent-blue/30 rounded-sm p-lg">
            <h6 className="text-accent-blue text-[20px] font-bold leading-[1.4] mb-xs">
              Get venue suggestions
            </h6>
            <p className="text-white-70 text-[14px] leading-[1.4]">
              We&apos;ll find the perfect venue for your event.
            </p>
          </div>

          {/* Add extras card */}
          <div className="border border-white-20 rounded-sm p-lg">
            <h6 className="text-white text-[20px] font-bold leading-[1.4] mb-xs">
              Add extras
            </h6>
            <p className="text-white-70 text-[14px] leading-[1.4]">
              We&apos;ll include any add-ons you might need.
            </p>
          </div>
        </div>

        {/* Request details */}
        <div className="border border-white-10 rounded-sm overflow-hidden mb-lg">
          <div className="px-lg py-md border-b border-white-10">
            <h5 className="text-white text-[24px] font-bold font-heading">
              Request details
            </h5>
          </div>
          {requestDetails.map((item) => (
            <div
              key={item.label}
              className="flex items-start px-lg py-md border-b border-white-10"
            >
              <span className="text-white-70 text-[16px] leading-[1.4] w-[200px] shrink-0">
                {item.label}
              </span>
              <span
                className={`text-[16px] leading-[1.4] whitespace-pre-wrap ${
                  item.value.startsWith("+")
                    ? "text-accent-blue cursor-pointer"
                    : "text-white"
                }`}
              >
                {item.value}
              </span>
            </div>
          ))}

          {/* Contact info */}
          {contactDetails.map((item) => (
            <div
              key={item.label}
              className="flex items-start px-lg py-md border-b border-white-10"
            >
              <span className="text-white-70 text-[16px] leading-[1.4] w-[200px] shrink-0">
                {item.label}
              </span>
              <span className="text-white text-[16px] leading-[1.4]">
                {item.value}
              </span>
            </div>
          ))}
        </div>

        {/* Questions section */}
        <div className="mb-2xl">
          <h5 className="text-white text-[20px] font-bold mb-sm">
            Do you have any questions?
          </h5>
          <p className="text-white-70 text-[14px] mb-md leading-[1.4]">
            We&apos;re always here to help!
          </p>
          <div className="flex flex-col gap-sm">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-xs text-white text-[16px] leading-[1.4]">
                💬 Start chat
              </span>
              <span className="text-white-70 text-[14px]">Open 8-16 Mon-Fri</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-xs text-white text-[16px] leading-[1.4]">
                📞 Call us
              </span>
              <span className="text-white-70 text-[14px]">08-960 960</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-xs text-white text-[16px] leading-[1.4]">
                ✉️ Email us
              </span>
              <span className="text-white-70 text-[14px]">hello@amici.com</span>
            </div>
          </div>
        </div>

        {/* Back button for prototype */}
        <button
          onClick={() => { setCompleted(false); setStep(1); }}
          className="text-white-30 text-[14px] underline cursor-pointer"
        >
          ← Start over (prototype only)
        </button>
      </div>
    </div>
  );
}
