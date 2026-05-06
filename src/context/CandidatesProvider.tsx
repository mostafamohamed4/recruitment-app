import { useState, useEffect, type ReactNode } from "react";
import { CandidatesContext, type ActionState } from "./CandidatesContext";

const STORAGE_KEY = "candidates-actions";

export function CandidatesProvider({ children }: { children: ReactNode }) {
  // 1. initialize from localStorage
  const [actions, setActions] = useState<Record<string, ActionState>>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  });

  // 2. sync whenever actions change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(actions));
  }, [actions]);

  // 3. set action
  const setAction = (id: string, action: ActionState) => {
    setActions((prev) => ({
      ...prev,
      [id]: action,
    }));
  };

  // 4. get action
  const getAction = (id: string): ActionState => actions[id] ?? null;

  return (
    <CandidatesContext.Provider value={{ actions, setAction, getAction }}>
      {children}
    </CandidatesContext.Provider>
  );
}
