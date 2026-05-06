// src/components/Cards.tsx
import { Link } from "react-router-dom";
import { useCandidates } from "../Hooks/useCandidates";

type Candidate = {
  id: string;
  fullName: string;
  location: string;
  score: number;
  headline: string;
  yearsOfExperience: number;
  availability: string;
  skills: string[];
  status: string;
};

type Props = {
  candidates: Candidate[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
};
  //loading
function SkeletonCard() {
  return (
    <div className="card skeleton-card">
      <div className="card-top">
        <div
          style={{ display: "flex", gap: "7px", alignItems: "center", flex: 1 }}
        >
          <div className="sk-box av-sk" />
          <div>
            <div
              className="sk-box"
              style={{ width: 120, height: 14, marginBottom: 6 }}
            />
            <div className="sk-box" style={{ width: 80, height: 11 }} />
          </div>
        </div>
        <div
          className="sk-box"
          style={{ width: 44, height: 44, borderRadius: 8 }}
        />
      </div>
      <div
        className="sk-box"
        style={{ width: "80%", height: 12, marginTop: 10 }}
      />
      <div style={{ display: "flex", gap: 4, marginTop: 10 }}>
        <div
          className="sk-box"
          style={{ width: 60, height: 24, borderRadius: 20 }}
        />
        <div
          className="sk-box"
          style={{ width: 70, height: 24, borderRadius: 20 }}
        />
      </div>
      <div
        style={{
          display: "flex",
          gap: 4,
          marginTop: 8,
          flexWrap: "wrap" as const,
        }}
      >
        {[80, 65, 90, 55].map((w, i) => (
          <div
            key={i}
            className="sk-box"
            style={{ width: w, height: 22, borderRadius: 4 }}
          />
        ))}
      </div>
      <div className="card-footer" style={{ marginTop: 12 }}>
        <div
          className="sk-box"
          style={{ width: 90, height: 22, borderRadius: 20 }}
        />
        <div
          className="sk-box"
          style={{ width: 70, height: 30, borderRadius: 6 }}
        />
      </div>
    </div>
  );
}

export default function Cards({ candidates, loading, error, onRetry }: Props) {
  const { getAction } = useCandidates();
  //loading
  if (loading) {
    return (
      <div className="grid" id="candidates">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }
  //error
  if (error) {
    return (
      <div className="state-box">
        <div className="state-icon">⚠</div>
        <div className="state-title">Something went wrong</div>
        <div className="state-sub">{error}</div>
        {onRetry && (
          <button className="state-btn" onClick={onRetry}>
            ↺ Try again
          </button>
        )}
      </div>
    );
  }
  /* ── no data ── */
  if (candidates.length === 0) {
    return (
      <div className="state-box">
        <div className="state-icon">◌</div>
        <div className="state-title">No candidates found</div>
        <div className="state-sub">
          Try adjusting your filters or search query.
        </div>
      </div>
    );
  }

  /* ── Normal Grid ── */
  return (
    <div className="grid" id="candidates">
      {candidates.map((c) => {
        const action = getAction(c.id);
        return (
          <div
            key={c.id}
            className={`card ${action === "shortlisted" ? "card-shortlisted" : ""} ${
              action === "rejected" ? "card-rejected" : ""
            }`}
          >
            {/* Action ribbon */}
            {action === "shortlisted" && (
              <div className="card-ribbon shortlisted">★ Shortlisted</div>
            )}
            {/* //rejected */}
            {action === "rejected" && (
              <div className="card-ribbon rejected">✕ Rejected</div>
            )}
            <div className="card-top">
              <div
                style={{
                  display: "flex",
                  gap: "7px",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <div className="av">
                  {c.fullName
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div>
                  <div className="card-name">{c.fullName}</div>
                  <div className="card-loc">◎ {c.location}</div>
                </div>
              </div>
              <div className="score-box">
                <div className="score-value">{c.score}</div>
                <div className="score-bar">
                  <div
                    className="score-fill"
                    style={{ width: `${c.score}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="headline">{c.headline}</div>
            <div style={{ display: "flex", gap: "4px" }}>
              <span className="mp">⟢ {c.yearsOfExperience}y</span>
              <span className="mp">◷ {c.availability}</span>
            </div>
            <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
              {(c.skills || []).slice(0, 4).map((skill, i) => (
                <span key={i} className="sk">
                  {skill}
                </span>
              ))}
            </div>
            <div className="card-footer">
              <span className="b-open">{c.status}</span>
              <Link to={`/candidate/${c.id}`} className="view-btn">
                View →
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
