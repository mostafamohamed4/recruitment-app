// src/components/Profile.tsx
import { useParams, Link } from "react-router-dom";
import candidates from "../data/candidates.json";
import { useCandidates } from "../Hooks/useCandidates";

export default function Profile() {
  const { id } = useParams();
  const { getAction, setAction } = useCandidates();

  const candidate = candidates.find((c) => c.id === id);
  if (!candidate) return <div className="not-found">Candidate not found</div>;

  const action = getAction(candidate.id);

  return (
    <>
      <p className="lbl mt-2">Candidate Profile</p>

      <div className="screen">
        <div className="top-bar">
          <Link to="/" className="back-btn">
            ← Back to Candidates
          </Link>
          <div className="breadcrumb">
            <span>Pandy AI</span> / {candidate.fullName}
          </div>
        </div>

        <div className="p-layout">
          <div className="p-main">
            {/* Profile Card */}
            <div className="pcard">
              <div className="p-top">
                <div className="p-av">
                  {candidate.fullName
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div style={{ flex: 1 }}>
                  <div className="p-name">{candidate.fullName}</div>
                  <div className="p-hl">{candidate.headline}</div>
                  <div className="p-meta">
                    <span>◎ {candidate.location}</span>
                    <span>⟢ {candidate.yearsOfExperience} years</span>
                    <span>◷ {candidate.availability}</span>
                  </div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div className="score-circle">{candidate.score}</div>
                  <div className="p-score-lbl">Match score</div>
                </div>
              </div>

              <div className="p-status-row">
                <span className="b-open">
                  <span className="bdot"></span>
                  {candidate.status}
                </span>

                {/* ── ACTION BUTTONS ── */}
                <div className="action-btns">
                  <button
                    className={`action-btn shortlist ${action === "shortlisted" ? "active" : ""}`}
                    onClick={() =>
                      setAction(
                        candidate.id,
                        action === "shortlisted" ? null : "shortlisted",
                      )
                    }
                  >
                    {action === "shortlisted" ? "★ Shortlisted" : "☆ Shortlist"}
                  </button>
                  <button
                    className={`action-btn reject ${action === "rejected" ? "active" : ""}`}
                    onClick={() =>
                      setAction(
                        candidate.id,
                        action === "rejected" ? null : "rejected",
                      )
                    }
                  >
                    {action === "rejected" ? "✕ Rejected" : "✕ Reject"}
                  </button>
                </div>
              </div>

              {/* Action feedback banner */}
              {action === "shortlisted" && (
                <div className="action-banner shortlisted">
                  ✓ This candidate has been added to your shortlist
                </div>
              )}
              {action === "rejected" && (
                <div className="action-banner rejected">
                  ✕ This candidate has been rejected
                </div>
              )}
            </div>

            {/* About */}
            <div className="scard">
              <div className="stitle">About</div>
              <div className="sbody">{candidate.summary}</div>
            </div>

            {/* Skills */}
            <div className="scard">
              <div className="stitle">Skills</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {candidate.skills.map((s: string, i: number) => (
                  <span key={i} className="sk-lg">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="scard">
              <div className="stitle">Experience</div>
              {candidate.experience.map(
                (
                  exp: {
                    title: string;
                    company: string;
                    start: string;
                    end: string;
                    highlights: string[];
                  },
                  i: number,
                ) => (
                  <div key={i} className="tl-item">
                    <div className="tl-dot"></div>
                    <div>
                      <div className="tl-head">
                        <div className="tl-title">{exp.title}</div>
                        <div className="tl-period">
                          {exp.start} - {exp.end}
                        </div>
                      </div>
                      <div className="tl-co">{exp.company}</div>
                      {exp.highlights.map((h: string, idx: number) => (
                        <div key={idx} className="tl-desc">
                          • {h}
                        </div>
                      ))}
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="p-sidebar">
            <div className="metapanel">
              <div className="stitle">Details</div>
              <div className="meta-item">
                <div className="meta-k">Availability</div>
                <div className="meta-v">{candidate.availability}</div>
              </div>
              <div className="meta-item">
                <div className="meta-k">Score</div>
                <div className="meta-v">{candidate.score} / 100</div>
              </div>
              <div className="meta-item">
                <div className="meta-k">Languages</div>
                <div className="meta-v">{candidate.languages.join(", ")}</div>
              </div>
              <div className="meta-item">
                <div className="meta-k">Status</div>
                <div className="meta-v">{candidate.status}</div>
              </div>
              <div className="meta-item">
                <div className="meta-k">Last updated</div>
                <div className="meta-v">{candidate.updatedAt}</div>
              </div>
              <div className="meta-item">
                <div className="meta-k">Saved State</div>
                <div className={`meta-v action-tag ${action ?? "none"}`}>
                  {action === "shortlisted"
                    ? "★ Shortlisted"
                    : action === "rejected"
                      ? "✕ Rejected"
                      : "— None"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
