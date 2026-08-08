"use client";

import { ReactNode } from "react";

interface Props {
  front: ReactNode;
  back: ReactNode;
}

export default function PrintLayoutV5({
  front,
  back,
}: Props) {
  
  return (
    <div className="flex justify-center gap-10 flex-wrap">
    {front}
    {back}
</div>
  );
}