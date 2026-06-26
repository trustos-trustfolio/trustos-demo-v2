# Trust OS

Decision Verification Infrastructure for Financial Operations.

Verify high-impact decisions before execution.

- Website: https://trust-os.io
- Developer Playground: https://demo.trust-os.io
- Financial Operations Demo: https://ops.trust-os.io
- SDK npm: https://www.npmjs.com/package/@trust-os-sdk/trust-os-sdk

---

# Trust OS Developer Playground

Developer API Playground for Trust OS.

An interactive environment to test the Trust OS Decision Verification API — inspect request payloads, evaluate live and sandbox responses, and integrate with confidence.

Live at: [demo.trust-os.io](https://demo.trust-os.io)

---

## What you can do

- Send decision verification requests with configurable presets
- Inspect the full request payload before sending
- View structured JSON responses from the live API or sandbox
- Switch between Stablecoin Payment, AI Agent Action, and DAO Treasury scenarios
- Copy the raw JSON response for integration testing
- Run through the complete request lifecycle step-by-step

---

## Request Payload

```json
{
  "action": "stablecoin_transfer",
  "amount": 50000,
  "currency": "USDC",
  "destination": "wallet_0x4f3b9c2a8d1e6f5a",
  "source": "Payment API",
  "priority": "High"
}
```

---

## JSON Response

```json
{
  "decision_id": "dec_a1b2c3d4",
  "recommendation": "APPROVE",
  "risk_score": 0.18,
  "risk_level": "LOW",
  "policy": "Stablecoin Settlement Policy v1.0",
  "proof_hash": "SHA-256: 0x4a3f...9c2b",
  "verified": true,
  "latency_ms": 142
}
```

Possible `recommendation` values: `APPROVE`, `REVIEW`, `DENY`

---

## SDK Example

```js
const { TrustOSClient } = require("@trust-os-sdk/trust-os-sdk");

const client = new TrustOSClient({
  apiKey: process.env.TRUST_OS_API_KEY
});

const result = await client.verifyDecision({
  action: "stablecoin_transfer",
  amount: 50000,
  currency: "USDC",
  destination: "wallet_abc"
});
```

Install the SDK:

```sh
npm install @trust-os-sdk/trust-os-sdk
```

---

## curl Example

```sh
curl -X POST https://trustos-core-gateway-v2-7jm9owrs.an.gateway.dev/v1/decision/verify \
  -H "Content-Type: application/json" \
  -H "x-api-key: YOUR_API_KEY" \
  -d '{
    "action": "stablecoin_transfer",
    "amount": 50000,
    "currency": "USDC",
    "destination": "wallet_abc"
  }'
```

---

## Sandbox Response

When API credentials are not configured, the playground returns a sandbox response with the same structure as a live response. The `mode: "sandbox"` field identifies sandbox responses.

```json
{
  "decision_id": "dec_sandbox_x7f2a1",
  "recommendation": "APPROVE",
  "risk_score": 0.18,
  "risk_level": "LOW",
  "policy": "Stablecoin Settlement Policy v1.0",
  "proof_hash": "SHA-256: 0x4a3f...9c2b",
  "verified": false,
  "latency_ms": 487,
  "mode": "sandbox"
}
```

Sandbox responses are identical in shape to live API responses. Build your integration against sandbox output before provisioning an API key.

---

## Live API Response

Live responses are returned when an API key is configured in the server environment. The `verified: true` field confirms the decision was evaluated against real policy and signed with a verification proof.

```json
{
  "decision_id": "dec_9f2c4b1a",
  "recommendation": "APPROVE",
  "risk_score": 0.18,
  "risk_level": "LOW",
  "policy": "Stablecoin Settlement Policy v1.0",
  "proof_hash": "SHA-256: 0x9c2b...7a1d",
  "verified": true,
  "latency_ms": 142
}
```

---

## Presets

| Preset | Action | Risk | Recommendation |
|---|---|---|---|
| Stablecoin Payment | `stablecoin_transfer` | LOW | APPROVE |
| AI Agent Action | `execute_tool` | HIGH | REVIEW |
| DAO Treasury | `treasury_disbursement` | MEDIUM | APPROVE |

---

## Local Setup

```sh
npm install
cp .env.sample .env
# Edit .env and set your TRUSTOS_API_KEY
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**No API key?** The playground works without one. Without a configured key, all responses return as Sandbox responses with the same JSON structure as live API responses. You can build and test your integration against sandbox output before requesting access.

---

## Stack

- Node.js + Express proxy (`server.js`)
- Static frontend (`public/index.html`) — no framework, no build step
- Deployed on Vercel

---

## Early Access

Trust OS is in private beta. API keys are provisioned by invitation.

Contact: admin@trust-os.io
