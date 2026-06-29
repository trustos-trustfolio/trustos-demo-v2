# Trust OS Developer Playground

Interactive demo of the Trust OS Decision Verification Platform.

---

## What is Trust OS?

Trust OS is a Decision Verification Platform that helps organizations verify high-impact decisions before execution.

- Decision verification
- Risk evaluation
- Policy enforcement
- Auditability
- Explainability
- API-first integration

---

## Features

- Interactive UI
- Sample decisions
- Live API examples
- Verification workflow

---

## Quick Start

```sh
npm install
cp .env.sample .env
# Edit .env and set your TRUSTOS_API_KEY
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

No API key required — the playground works in sandbox mode without credentials.

---

## Presets

| Preset | Action | Risk | Recommendation |
|---|---|---|---|
| Stablecoin Payment | `stablecoin_transfer` | LOW | APPROVE |
| AI Agent Action | `execute_tool` | HIGH | REVIEW |
| DAO Treasury | `treasury_disbursement` | MEDIUM | APPROVE |

---

## Documentation

- Website: https://trust-os.io
- Developer Docs: https://trust-os.io/docs
- OpenAPI: https://trust-os.io/openapi.json

---

## License

MIT
