const express = require("express");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.static("public"));

const PORT = process.env.PORT || 3000;

const API_URL = process.env.TRUSTOS_API_URL;
const API_KEY = process.env.TRUSTOS_API_KEY;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/health", (req, res) => {
  res.json({
    ok: true,
    service: "trustos-demo-ui"
  });
});

app.post("/v1/decision/run", async (req, res) => {
  const startedAt = Date.now();

  try {
    if (!API_URL || !API_KEY) {
      return res.status(500).json({
        error: "Missing TRUSTOS_API_URL or TRUSTOS_API_KEY"
      });
    }

    const payload = req.body || {};

    const apiRes = await fetch(`${API_URL}/v1/decision/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY
      },
      body: JSON.stringify(payload)
    });

    const text = await apiRes.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return res.status(500).json({
        error: "Core API did not return JSON",
        raw: text.slice(0, 300)
      });
    }

    if (!apiRes.ok) {
      return res.status(apiRes.status).json(data);
    }

    return res.json({
      decision_id: data.decision_id,
      recommendation: data.recommendation,
      risk_score: data.risk_score,
      risk_level: data.risk_level,
      policy: data.policy,
      proof_hash: data.proof_hash,
      verified: true,
      latency_ms: data.latency_ms,
      proxy_latency_ms: Date.now() - startedAt
    });

  } catch (e) {
    return res.status(500).json({
      error: e.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Trust OS Demo UI running on port ${PORT}`);
});