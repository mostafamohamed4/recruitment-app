// src/components/Cards.tsx
import { Link } from "react-router-dom";
import { useCandidates } from "../Hooks/useCandidates";

/* ── TYPES ── */
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

/* ── SKELETON ── */
function SkeletonCard() {
  return (
    <div className="card skeleton-card">
      <div className="card-top">
        <div className="flex">
          <div className="sk-box av-sk" />
          <div>
            <div className="sk-box sk-title" />
            <div className="sk-box sk-sub" />
          </div>
        </div>
        <div className="sk-box sk-avatar" />
      </div>

      <div className="sk-box sk-line" />

      <div className="sk-row">
        <div className="sk-box sk-pill" />
        <div className="sk-box sk-pill" />
      </div>
    </div>
  );
}

/* ── EMPTY STATE ── */
function EmptyState() {
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

/* ── ERROR STATE ── */
function ErrorState({
  error,
  onRetry,
}: {
  error?: string | null;
  onRetry?: () => void;
}) {
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

/* ── MAIN ── */
export default function Cards({ candidates, loading, error, onRetry }: Props) {
  const { getAction } = useCandidates();

  /* loading */
  if (loading) {
    return (
      <div className="grid">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  /* error */
  if (error) return <ErrorState error={error} onRetry={onRetry} />;

  /* empty */
  if (!candidates.length) return <EmptyState />;

  /* success */
  return (
    <div className="grid">
      {candidates.map((c) => {
        const action = getAction(c.id);

        return (
          <div
            key={c.id}
            className={`card ${
              action === "shortlisted"
                ? "card-shortlisted"
                : action === "rejected"
                  ? "card-rejected"
                  : ""
            }`}
          >
            {/* ribbon */}
            {action && (
              <div className={`card-ribbon ${action}`}>
                {action === "shortlisted" ? "★ Shortlisted" : "✕ Rejected"}
              </div>
            )}

            {/* header */}
            <div className="card-top">
              <div className="flex">
                <div className="av">
                  {c.fullName
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
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

            {/* body */}
            <div className="headline">{c.headline}</div>

            <div className="meta">
              <span className="mp">⟢ {c.yearsOfExperience}y</span>
              <span className="mp">◷ {c.availability}</span>
            </div>

            {/* skills */}
            <div className="skills">
              {c.skills.slice(0, 4).map((s, i) => (
                <span key={i} className="sk">
                  {s}
                </span>
              ))}
            </div>

            {/* footer */}
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
