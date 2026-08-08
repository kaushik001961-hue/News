"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

import PressCardFront from "./PressCardFront";
import PressCardBack from "./PressCardBack";
import DownloadButtons from "./DownloadButtons";

import { PressCardData } from "./types";

interface Props {
  reporter: PressCardData;
}

export default function PressCard({
  reporter,
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div className="space-y-8">

      <DownloadButtons
        targetRef={cardRef}
        fileName={reporter.cardNumber}
      />

      <motion.div
        ref={cardRef}
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className="flex flex-col gap-10 lg:flex-row"
      >
        <PressCardFront reporter={reporter} />

        <PressCardBack reporter={reporter} />
      </motion.div>

    </div>
  );
}