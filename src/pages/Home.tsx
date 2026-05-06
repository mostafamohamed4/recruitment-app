import { useEffect, useMemo, useState } from "react";
import rawCandidates from "../data/candidates.json";
import Cards from "../components/Cards";
import Filterbar from "../utils/Filterbar";
import Hero from "../components/Hero";

type Candidate = (typeof rawCandidates)[number];

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  // Simulated API fetch with latency
const fetchCandidates = async () => {
  setLoading(true);
  setError(null);

  try {
    await new Promise((r) => setTimeout(r, 800));
    setCandidates(rawCandidates as Candidate[]);
  } catch {
    setError("Failed to load candidates. Please try again.");
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  // eslint-disable-next-line react-hooks/set-state-in-effect
  fetchCandidates();
}, []);

  const [filters, setFilters] = useState({
    search: "",
    location: "",
    status: "",
    experience: "",
    sort: "",
  });

  const updateFilter = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      location: "",
      status: "",
      experience: "",
      sort: "",
    });
  };

  const filteredCandidates = useMemo(() => {
    let result = candidates.filter((c) => {
      const q = filters.search.toLowerCase();
      const matchSearch =
        !q ||
        c.fullName.toLowerCase().includes(q) ||
        c.headline.toLowerCase().includes(q) ||
        c.skills?.some((s) => s.toLowerCase().includes(q));

      const matchLocation =
        !filters.location ||
        c.location.toLowerCase().includes(filters.location);

      const matchStatus = !filters.status || c.status === filters.status;

      const matchExperience =
        !filters.experience ||
        (filters.experience === "senior" && c.yearsOfExperience >= 5) ||
        (filters.experience === "mid" &&
          c.yearsOfExperience >= 2 &&
          c.yearsOfExperience < 5) ||
        (filters.experience === "junior" && c.yearsOfExperience < 2);

      return matchSearch && matchLocation && matchStatus && matchExperience;
    });

    // ── Sort ──
    if (filters.sort === "score") {
      result = [...result].sort((a, b) => b.score - a.score);
    } else if (filters.sort === "experience") {
      result = [...result].sort(
        (a, b) => b.yearsOfExperience - a.yearsOfExperience,
      );
    } else if (filters.sort === "updated") {
      result = [...result].sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      );
    }

    return result;
  }, [filters, candidates]);

  return (
    <>
      <Hero />
      <Filterbar
        filters={filters}
        updateFilter={updateFilter}
        resetFilters={resetFilters}
        resultCount={filteredCandidates.length}
      />
      <Cards
        candidates={filteredCandidates}
        loading={loading}
        error={error}
        onRetry={fetchCandidates}
      />
    </>
  );
}
