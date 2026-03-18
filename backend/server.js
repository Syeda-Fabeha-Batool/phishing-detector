const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/check", (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "No URL provided" });
  }

  let score = 0;
  let reasons = [];

  if (url.includes("@")) {
    score += 40;
    reasons.push("Contains '@'");
  }

  if (url.length > 50) {
    score += 20;
    reasons.push("URL is long");
  }

  const suspiciousWords = ["login", "verify", "update", "secure", "account", "bank"];
  suspiciousWords.forEach(word => {
    if (url.toLowerCase().includes(word)) {
      score += 15;
      reasons.push(`Contains suspicious word: '${word}'`);
    }
  });

  let status = "";
  if (score > 50) status = "Likely Phishing";
  else if (score > 20) status = "Suspicious";
  else status = "Safe";

  res.json({ score, status, reasons });
});
const PORT= process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});