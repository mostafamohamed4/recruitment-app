import { useContext } from "react";
import { CandidatesContext, type CandidatesContextType } from "../context/CandidatesContext";
// import { CandidatesContext, type CandidatesContextType } from "./CandidatesContext";

export function useCandidates(): CandidatesContextType {
  const ctx = useContext(CandidatesContext);

  if (!ctx) {
    throw new Error(
      "useCandidates must be used inside CandidatesProvider"
    );
  }

  return ctx;
}