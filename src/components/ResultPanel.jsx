// src/components/ResultPanel.jsx
export default function ResultPanel({ results }) {
  if(!results) return <section className="results-section"><p>Enter passwords to see results</p></section>;

  const { oldDefault, newDefault, oldFilipino, newFilipino, dlSim, cosSim } = results;

  const scoreColor = (score) => {
    if(score<=1) return "red";
    if(score<=3) return "orange";
    return "green";
  };

  return (
    <section className="results-section">
      <h2>Results</h2>

      <div>
        <h3>zxcvbn Score (Default)</h3>
        <p>Old: {oldDefault.score} | New: {newDefault.score}</p>
        <div style={{background:scoreColor(newDefault.score),height:'20px',width:`${newDefault.score*25}%`}}></div>
      </div>

      <div>
        <h3>zxcvbn Score (Filipino)</h3>
        <p>Old: {oldFilipino.score} | New: {newFilipino.score}</p>
        <div style={{background:scoreColor(newFilipino.score),height:'20px',width:`${newFilipino.score*25}%`}}></div>
      </div>

      <div>
        <h3>Similarity Metrics</h3>
        <p>Damerau-Levenshtein: {dlSim.toFixed(2)}</p>
        <div style={{background:'blue',height:'20px',width:`${dlSim*100}%`}}></div>
        <p>Cosine Similarity: {cosSim.toFixed(2)}</p>
        <div style={{background:'purple',height:'20px',width:`${cosSim*100}%`}}></div>
      </div>

      <p>{dlSim>0.6 ? "Warning: New password is too similar to old password." : "Passwords are sufficiently different."}</p>
    </section>
  );
}
