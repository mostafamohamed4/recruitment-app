import candidates from "../data/candidates.json";

export default function Hero() {
  const totalCandidates = candidates.length;

 const countries = new Set(
   candidates.map((c) => c.location?.split(",").pop()?.trim()).filter(Boolean), 
 ).size;

  const skills = new Set(candidates.flatMap((c) => c.skills)).size;

  const shortlistRate = Math.round(
    (candidates.filter((c) => c.score >= 85).length / totalCandidates) * 100,
  );

  return (
    <>
      <div className="hero">
        <div className="wordmark">⬡ Pandy AI</div>
        <h1>
          Find your next
          <br />
          <span>exceptional hire.</span>
        </h1>
        <p>
          AI-matched talent across MENA — pre-vetted, scored, and ready to move.
        </p>
        <a href="#candidates" className="cta-btn">
          Browse Candidates ↓
        </a>
        <div className="stats-row">
          <div className="stat">
            <div className="stat-v">{totalCandidates}</div>
            <div className="stat-l">Candidates</div>
          </div>
          <div className="stat">
            <div className="stat-v">{countries}</div>
            <div className="stat-l">Countries</div>
          </div>
          <div className="stat">
            <div className="stat-v">{skills}</div>
            <div className="stat-l">Skills</div>
          </div>
          <div className="stat">
            <div className="stat-v">{shortlistRate}</div>
            <div className="stat-l">Shortlist rate</div>
          </div>
        </div>
      </div>
    </>
  );
}
