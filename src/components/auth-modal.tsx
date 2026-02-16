"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { useRequest } from "@/context/request-context";

export function AuthModal() {
  const { showAuth, setShowAuth, setCompleted } = useRequest();
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [signingUpAs, setSigningUpAs] = useState("Company");

  if (!showAuth) return null;

  const handleSubmit = () => {
    setShowAuth(false);
    setCompleted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-dark-1/80 backdrop-blur-sm"
        onClick={() => setShowAuth(false)}
      />

      {/* Modal */}
      <div className="relative bg-dark-2 border border-white-20 rounded-lg p-2xl w-full max-w-[552px] mx-md">
        {/* Tabs */}
        <div className="flex items-center justify-center mb-2xl">
          <div className="flex items-center bg-dark-2 border border-white-20 rounded-full p-xs">
            <button
              onClick={() => setTab("login")}
              className={`px-md py-xs rounded-full text-[20px] leading-[1.4] transition-colors ${
                tab === "login"
                  ? "bg-white text-dark-1"
                  : "text-white"
              }`}
            >
              Log in
            </button>
            <button
              onClick={() => setTab("signup")}
              className={`px-md py-xs rounded-full text-[20px] leading-[1.4] transition-colors ${
                tab === "signup"
                  ? "bg-white text-dark-1"
                  : "text-white"
              }`}
            >
              Sign up
            </button>
          </div>
        </div>

        {tab === "login" ? (
          <div className="flex flex-col gap-0">
            <div className="border border-white-30 rounded-sm overflow-hidden">
              <div className="px-md py-sm border-b border-white-30">
                <p className="text-[14px] text-white-70 leading-[1.4]">Email</p>
                <input
                  type="email"
                  placeholder="johndoe@example.com"
                  className="w-full bg-transparent text-[20px] text-white leading-[1.4] outline-none placeholder:text-white-30"
                />
              </div>
              <div className="px-md py-sm">
                <p className="text-[14px] text-white-70 leading-[1.4]">Password</p>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-transparent text-[20px] text-white leading-[1.4] outline-none placeholder:text-white-30"
                />
              </div>
            </div>
            <Button
              onClick={handleSubmit}
              className="w-full h-[56px] rounded-sm bg-white text-dark-1 text-[20px] font-bold hover:bg-white/90 mt-lg"
            >
              Log in
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-0">
            <div className="border border-white-30 rounded-sm overflow-hidden">
              <div className="px-md py-sm border-b border-white-30">
                <p className="text-[14px] text-white-70 leading-[1.4]">Signing up as a</p>
                <div className="flex items-center justify-between">
                  <p className="text-[20px] text-white leading-[1.4]">{signingUpAs}</p>
                  <select
                    value={signingUpAs}
                    onChange={(e) => setSigningUpAs(e.target.value)}
                    className="bg-transparent text-white outline-none appearance-none cursor-pointer"
                  >
                    <option value="Company" className="bg-dark-2">Company</option>
                    <option value="Individual" className="bg-dark-2">Individual</option>
                  </select>
                </div>
              </div>
              <div className="px-md py-sm border-b border-white-30">
                <p className="text-[14px] text-white-70 leading-[1.4]">Organization number</p>
                <input
                  type="text"
                  placeholder="000000-000"
                  className="w-full bg-transparent text-[20px] text-white leading-[1.4] outline-none placeholder:text-white-30"
                />
              </div>
              <div className="px-md py-sm border-b border-white-30">
                <p className="text-[14px] text-white-70 leading-[1.4]">Name</p>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full bg-transparent text-[20px] text-white leading-[1.4] outline-none placeholder:text-white-30"
                />
              </div>
              <div className="px-md py-sm border-b border-white-30">
                <p className="text-[14px] text-white-70 leading-[1.4]">Email</p>
                <input
                  type="email"
                  placeholder="johndoe@example.com"
                  className="w-full bg-transparent text-[20px] text-white leading-[1.4] outline-none placeholder:text-white-30"
                />
              </div>
              <div className="px-md py-sm">
                <p className="text-[14px] text-white-70 leading-[1.4]">Phone</p>
                <input
                  type="tel"
                  placeholder="070 000 00 00"
                  className="w-full bg-transparent text-[20px] text-white leading-[1.4] outline-none placeholder:text-white-30"
                />
              </div>
            </div>
            <Button
              onClick={handleSubmit}
              className="w-full h-[56px] rounded-sm bg-white text-dark-1 text-[20px] font-bold hover:bg-white/90 mt-lg"
            >
              Sign up
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
