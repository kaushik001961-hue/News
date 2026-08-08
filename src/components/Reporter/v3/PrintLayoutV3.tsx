"use client";

import { ReactNode } from "react";

interface PrintLayoutProps {
  front: ReactNode;
  back: ReactNode;
  className?: string;
}

const CARD_SIZE =
  "w-[340px] h-[540px] print:w-[86mm] print:h-[54mm]";

const CARD_WRAPPER = `
relative
${CARD_SIZE}
overflow-hidden
rounded-[22px]
bg-white
shadow-2xl
border
border-neutral-200
print:rounded-none
print:shadow-none
print:border-0
flex
flex-col
`.replace(/\s+/g, " ");

export default function PrintLayout({
  front,
  back,
  className = "",
}: PrintLayoutProps) {
  return (
    <div
      className={`mx-auto flex flex-wrap justify-center gap-10 print:block ${className}`}
    >
      {/* FRONT */}
      <section
        className={`${CARD_WRAPPER} print:break-after-page`}
      >
        {front}
      </section>

      {/* BACK */}
      <section className={CARD_WRAPPER}>
        {back}
      </section>
    </div>
  );
}