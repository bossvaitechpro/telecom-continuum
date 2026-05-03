import { Suspense } from "react";

export default function UseCasesLayout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<div className="p-12 text-[var(--muted)] text-sm">Loading...</div>}>{children}</Suspense>;
}
