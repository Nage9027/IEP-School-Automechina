"use client";

import { Minimize, Circle, Square, Maximize } from "lucide-react";

/**
 * Realistic laptop/desktop frame wrapping the application screen.
 * 16:10 aspect ratio with browser window chrome (title bar + traffic lights).
 */
export function LaptopFrame({
  children,
  className,
}: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={className}
    >
      {/* Laptop body shadow */}
      <div className="absolute inset-0 -z-10 rounded-[24px] shadow-[0_40px_100px_-30px_rgba(15,8,45,0.35)]" />

      {/* Laptop base / keyboard area hint */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[86%] h-[12px] rounded-b-xl bg-[#1a1a1a]/40" />

      {/* Screen bezel outer */}
      <div className="relative rounded-[20px] border-[4px] border-[#2d2d2d] bg-[#1a1a1a] overflow-hidden aspect-[16/10]">
        {/* Browser title bar */}
        <div className="flex items-center gap-2 px-4 py-2 bg-[#333333] border-b border-[#404040]">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-rose-500/90">
              <Circle className="h-[10px] w-[10px] fill-current" />
            </div>
            <div className="h-3 w-3 rounded-full bg-amber-500/90">
              <Circle className="h-[10px] w-[10px] fill-current" />
            </div>
            <div className="h-3 w-3 rounded-full bg-emerald-500/90">
              <Circle className="h-[10px] w-[10px] fill-current" />
            </div>
          </div>
          <div className="flex-1" />
          <div className="flex items-center gap-1 text-[9px] text-gray-400">
            <span>IEP Schools</span>
            <Maximize className="h-3 w-3" />
          </div>
        </div>

        {/* Application screen content */}
        <div className="relative h-full overflow-hidden bg-[#F7F5FF]">
          {children}
        </div>
      </div>
    </div>
  );
}

/**
 * Traffic light window controls (alternative minimal variant)
 */
export function WindowControls() {
  return (
    <div className="flex gap-1.5 px-3 py-1.5 bg-[#e5e5e5]">
      <Minimize className="h-3 w-3 text-gray-500" />
      <Maximize className="h-3 w-3 text-gray-500" />
      <Square className="h-3 w-3 text-gray-500" />
    </div>
  );
}
