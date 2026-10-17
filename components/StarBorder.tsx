"use client";

import React from "react";

interface StarBorderProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  className?: string;
  color?: string;
  speed?: string;
  children?: React.ReactNode;
}

export default function StarBorder({
  as: Component = "button",
  className = "",
  color = "#00e5ff",
  speed = "5s",
  children,
  ...rest
}: StarBorderProps) {
  return (
    <Component
      className={`relative inline-flex p-[1.5px] overflow-hidden rounded-xl bg-white/[0.08] ${className}`}
      {...rest}
    >
      <div
        className="absolute w-[300%] h-[50%] opacity-95 bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 40% 100% at 50% 50%, ${color} 0%, rgba(0, 229, 255, 0.5) 16%, transparent 45%)`,
          animationDuration: speed,
        }}
      />
      <div
        className="absolute w-[300%] h-[50%] opacity-95 top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 40% 100% at 50% 50%, ${color} 0%, rgba(0, 229, 255, 0.5) 16%, transparent 45%)`,
          animationDuration: speed,
        }}
      />
      <div className="relative z-10 w-full h-full rounded-[10.5px] bg-[#0c0d10] flex items-center justify-center">
        {children}
      </div>
    </Component>
  );
}
