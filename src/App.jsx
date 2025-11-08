// src/App.jsx
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
    <div className="app-container">
      <header>
        <h1>Password Analyzer</h1>
        <p>All analysis is client-side. Passwords are not stored.</p>
      </header>

      <main>
        <InputForm
          formData={formData}
          setFormData={setFormData}
          setResults={setResults}
          filipinoDict={filipinoDict}
        />
        <ResultPanel results={results} />
      </main>
    </div>
  );
}
