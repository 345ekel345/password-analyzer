import { useState } from "react";
import InputForm from "./components/InputForm";
import ResultPanel from "./components/ResultPanel";
import filipinoDict from "./filipino_dictionary.json";

export default function App() {
  const [formData, setFormData] = useState({
    email: "",
    tokens: [],
    oldPassword: "",
    newPassword: "",
    useFilipino: false
  });

  const [results, setResults] = useState(null);

  return (
    <div className="app-container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px", fontFamily: "sans-serif" }}>
      <header>
        <h1>Password Analyzer</h1>
        <p>All analysis is client-side. Passwords are not stored.</p>
      </header>

      {/* Explanation / Instructions */}
      <section className="instructions" style={{ background: "#f5f5f5", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
        <h2>How to Use This Tool</h2>
        <p>
          Enter your email and current password. You can optionally provide user inputs (comma-separated) such as names, dates, or phrases to help detect passwords similar to these words.
        </p>
        <p>
          Then, enter a new password to check its similarity against your current password.
        </p>
        <h3>Interpreting Results</h3>
        <ul>
          <li><strong>Zxcvbn Score:</strong> 0 (very weak) → 4 (very strong)</li>
          <li><strong>Similarity Score:</strong> 0 = no similarity, 1 = identical. Lower is better.</li>
          <li><strong>Suggestions:</strong> Tips to improve password strength.</li>
        </ul>
      </section>

      <main style={{ display: "flex", gap: "20px" }}>
        {/* Left side: Input Form */}
        <div style={{ flex: 1 }}>
          <InputForm
            formData={formData}
            setFormData={setFormData}
            setResults={setResults}
            filipinoDict={filipinoDict}
          />
        </div>

        {/* Right side: Results */}
        <div style={{ flex: 1 }}>
          <ResultPanel results={results} />
        </div>
      </main>
    </div>
  );
}
