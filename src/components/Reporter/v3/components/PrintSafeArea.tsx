"use client";

import { ReactNode } from "react";

interface PrintSafeAreaProps {
  children: ReactNode;
}

export default function PrintSafeArea({
  children,
}: PrintSafeAreaProps) {
  return (
    <div
      className="
        relative
        z-10
        flex
        h-full
        w-full
        flex-col
        p-[10px]
        print:p-[3mm]
      "
    >
      {children}
    </div>
  );
}