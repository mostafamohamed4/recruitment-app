type Props = {
  filters: {
    search: string;
    location: string;
    status: string;
    experience: string;
    sort: string;
  };
  updateFilter: (key: string, value: string) => void;
  resetFilters: () => void;
  resultCount: number;
};

export default function Filterbar({
  filters,
  updateFilter,
  resetFilters,
  resultCount,
}: Props) {
 
 
  const hasActiveFilters =
    filters.location || filters.status || filters.experience || filters.search;

  return (
    <div className="filter-bar">
      {/* SEARCH */}
      <div className="search-row">
        <input
          className="search-box"
          value={filters.search}
          onChange={(e) => updateFilter("search", e.target.value)}
          placeholder="Search by name, skill, or role…"
          aria-label="Search candidates"
        />
      </div>

      {/* FILTERS + SORT */}
      <div className="filters-row">
        <select
          className="fpill"
          value={filters.location}
          onChange={(e) => updateFilter("location", e.target.value)}
          aria-label="Filter by location"
        >
          <option value="">All locations</option>
          <option value="cairo">Cairo</option>
          <option value="alex">Alexandria</option>
          <option value="remote">Remote</option>
        </select>

        <select
          className="fpill"
          value={filters.experience}
          onChange={(e) => updateFilter("experience", e.target.value)}
          aria-label="Filter by experience"
        >
          <option value="">All experience</option>
          <option value="junior">Junior (&lt;2y)</option>
          <option value="mid">Mid (2–5y)</option>
          <option value="senior">Senior (5y+)</option>
        </select>

        <select
          className="fpill"
          value={filters.status}
          onChange={(e) => updateFilter("status", e.target.value)}
          aria-label="Filter by status"
        >
          <option value="">All statuses</option>
          <option value="Open to work">Open to work</option>
          <option value="Interviewing">Interviewing</option>
          <option value="Hired">Hired</option>
        </select>

        {/* ── SORT ── */}
        <select
          className="fpill sort-pill"
          value={filters.sort}
          onChange={(e) => updateFilter("sort", e.target.value)}
          aria-label="Sort candidates"
        >
          <option value="">Sort: Default</option>
          <option value="score">↓ Highest score</option>
          <option value="experience">↓ Most experience</option>
          <option value="updated">↓ Recently updated</option>
        </select>

        {hasActiveFilters && (
          <button
            className="fpill reset"
            onClick={resetFilters}
            aria-label="Reset all filters"
          >
            ✕ Reset
          </button>
        )}
      </div>

      {/* META ROW */}
      <div className="meta-row">
        <span className="count">
          {resultCount} candidate{resultCount !== 1 ? "s" : ""}
        </span>
        <div className="chips">
          {filters.location && (
            <span className="chip" onClick={() => updateFilter("location", "")}>
              📍 {filters.location} ×
            </span>
          )}
          {filters.status && (
            <span className="chip" onClick={() => updateFilter("status", "")}>
              ● {filters.status} ×
            </span>
          )}
          {filters.experience && (
            <span
              className="chip"
              onClick={() => updateFilter("experience", "")}
            >
              ⟢ {filters.experience} ×
            </span>
          )}
          {filters.sort && (
            <span className="chip" onClick={() => updateFilter("sort", "")}>
              ↕ {filters.sort} ×
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
