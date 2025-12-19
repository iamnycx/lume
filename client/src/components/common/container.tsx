import type React from "react";
import { AuroraBackground } from "../ui/aurora-background";

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-6xl mx-auto z-50" style={{ fontFamily: "Bevellier" }}>
      <AuroraBackground className="fixed inset-0 dark:brightness-25 -z-50" />
      {children}
    </div>
  );
}
