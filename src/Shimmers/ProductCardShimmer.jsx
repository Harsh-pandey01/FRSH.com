import React from "react";

export default function ProductCardShimmer() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 w-full mt-6">
      {Array.from({ length: 3 }).map((_, idx) => (
        <div
          key={idx}
          className="rounded-xl border border-border p-4 shadow-sm animate-pulse space-y-4"
        >
          <div className="w-full aspect-[4/3] rounded-lg bg-secondry/70" />

          <div className="space-y-2">
            <div className="h-4 w-3/4 bg-secondry/70 rounded" />
            <div className="h-4 w-1/2 bg-secondry/70 rounded" />
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="h-8 w-16 bg-secondry/70 rounded" />
            <div className="h-9 w-9 bg-secondry/70 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
