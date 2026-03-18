import { useState } from "react";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);

  const checkURL = async () => {
    if (!url) {
      alert("Please enter a URL!");
      return;
    }

    try {
      const response = await fetch(
        "http://phishing-backend.onrender.com/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error fetching backend:", error);
      alert("Cannot reach backend! Make sure server is running on port 3000.");
    }
  };

  const getBorderColor = () => {
    if (!result) return "transparent";
    if (result.score > 50) return "red";
    if (result.score > 20) return "orange";
    return "green";
  };

  return (
    <div className="container">
      <h1>Phishing URL Detector</h1>

      <input
        type="text"
        placeholder="Enter URL..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <button onClick={checkURL}>Analyze</button>

      {result && (
        <div className="result" style={{ border: `3px solid ${getBorderColor()}` }}>
          <h2>{result.status}</h2>
          <p><strong>Score:</strong> {result.score}</p>
          <p>
            <strong>Reasons:</strong>{" "}
            {result.reasons.length > 0 ? result.reasons.join(", ") : "No major issues detected"}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;