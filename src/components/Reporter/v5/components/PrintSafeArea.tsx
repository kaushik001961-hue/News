import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function PrintSafeArea({
  children,
}: Props) {
  return (
    <div className="absolute inset-0 p-2">
      {children}
    </div>
  );
}