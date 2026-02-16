"use client";

interface ToggleboxProps {
  label: string;
  selected: boolean;
  onToggle: () => void;
}

export function Togglebox({ label, selected, onToggle }: ToggleboxProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`px-[20px] py-md rounded-lg text-[20px] leading-[1.4] transition-colors ${
        selected
          ? "bg-accent-blue/10 border border-accent-blue text-accent-blue"
          : "border border-white-30 text-white"
      }`}
    >
      {label}
    </button>
  );
}
