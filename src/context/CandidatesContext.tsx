import { createContext } from "react";
//⭐ shortlisted ❌ rejected
export type ActionState = "shortlisted" | "rejected" | null;

export interface CandidatesContextType {
  actions: Record<string, ActionState>;
  setAction: (id: string, action: ActionState) => void;
  getAction: (id: string) => ActionState;
}

export const CandidatesContext = createContext<
  CandidatesContextType | undefined
>(undefined);
