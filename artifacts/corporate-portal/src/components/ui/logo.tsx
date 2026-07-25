import React from "react";
import logoImg from "@/assets/logo.png";

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  size?: "sm" | "md" | "lg";
}

export function AiLincLogo({ className = "", showTagline = false, size = "md" }: LogoProps) {
  const heights = {
    sm: "h-8 md:h-9",
    md: "h-10 md:h-12",
    lg: "h-14 md:h-16",
  };

  return (
    <div className={`inline-flex flex-col justify-center ${className}`}>
      <img
        src={logoImg}
        alt="AI LINC"
        className={`${heights[size]} w-auto object-contain rounded-lg bg-white/95 px-2.5 py-1 shadow-md border border-white/20 hover:bg-white transition-colors`}
      />
      {showTagline && (
        <p className="text-[11px] font-medium text-muted-foreground tracking-normal mt-1.5 pl-0.5">
          Empowering the world with infinite possibilities of AI
        </p>
      )}
    </div>
  );
}
