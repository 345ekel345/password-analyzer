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
        <p>All analysis is client-side. Passwords are never stored or sent to any server.</p>
      </header>

      {/* Explanation / Instructions */}
      <section
        className="instructions"
        style={{
          background: "#f5f5f5",
          padding: "15px",
          borderRadius: "8px",
          marginBottom: "20px"
        }}
      >
        <h2>How to Use This Tool</h2>
        <p>This website evaluates the strength of your passwords and checks whether your new password is too similar to your old one. Follow the steps below:</p>

        <h3>Step-by-Step Guide</h3>
        <ol>
          <li>
            <strong>Enter your email.</strong>  
            This helps detect patterns where emails are reused in passwords.
          </li>
          <li>
            <strong>Add personal keywords (optional).</strong>  
            Enter names, nicknames, birthdays, places, pets, or phrases.  
            Separate them with commas (e.g., <em>juan, 2001, manila, babyko</em>).
          </li>
          <li>
            <strong>Enter your current password.</strong>  
            This will be analyzed using Zxcvbn and compared against your tokens.
          </li>
          <li>
            <strong>Enter your new password.</strong>  
            The tool will calculate how similar it is to your old password.
          </li>
          <li>
            (Optional) Enable <strong>Filipino Dictionary Check</strong> to detect
            Filipino words inside your passwords.
          </li>
        </ol>

        <h3>Understanding the Results</h3>
        <ul>
          <li>
            <strong>Zxcvbn Score:</strong> 0 (very weak) → 4 (very strong)
          </li>
          <li>
            <strong>Similarity Score:</strong>  
            0 = no similarity,  
            1 = identical.  
            Lower similarity means safer.
          </li>
          <li>
            <strong>Suggestions:</strong>  
            Generated tips for improving password strength and avoiding PI-based patterns.
          </li>
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
