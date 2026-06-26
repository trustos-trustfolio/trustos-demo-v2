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
      return res.status(503).json({
        error: "Service temporarily unavailable"
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
      return res.status(502).json({
        error: "Upstream service error"
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

  } catch {
    return res.status(500).json({
      error: "Internal server error"
    });
  }
});

app.listen(PORT, () => {
  console.log(`Trust OS Demo UI running on port ${PORT}`);
});