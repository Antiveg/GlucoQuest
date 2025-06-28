// components/providers.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { Session } from "next-auth";
// import { SessionContext } from "@/app/session-context";

export function Providers({
  children,
  session,
}: {
  children: ReactNode;
  session: Session | null;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <SessionProvider session={session}>
      {/* Untuk akses fungsi useSession() -> client-side protection function -> conditional UI display */}
      <QueryClientProvider client={queryClient}>
        {/* Untuk akses fungsi tanstack query -> state management abstraction -> useQuery & useMutation */}
        {children}
      </QueryClientProvider>
    </SessionProvider>
  )
}

{/* 
  <SessionContext.Provider value={session}>
      
  </SessionContext.Provider>
*/}
