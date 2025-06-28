import { createContext, useContext } from "react";
import { Session } from "next-auth";

export const SessionContext = createContext<Session | null>(null);

export const useServerSession = () => useContext(SessionContext);