const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

function ensureDataFiles() {
  return;
}

async function readDecisions() {
  const { data, error } = await supabase
    .from("trustcheck_decisions")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    throw error;
  }

  return data ?? [];
}

async function writeDecisions(data) {
  if (!Array.isArray(data) || data.length === 0) {
    return;
  }

  const latest = data[data.length - 1];

  const row = {
    decision_id: latest.decision_id,
    user_id: latest.user_id,
    action: latest.action,
    amount: latest.amount,
    currency: latest.currency,
    destination: latest.destination,
    event_timestamp: latest.timestamp,
    context: latest.context ?? {},
    risk_score: latest.risk_score,
    risk_level: latest.risk_level,
    recommendation: latest.recommendation,
    confidence: latest.confidence ?? null,
    factors: latest.factors ?? []
  };

  const { error } = await supabase
    .from("trustcheck_decisions")
    .upsert(row, { onConflict: "decision_id" });

  if (error) {
    throw error;
  }
}

async function readLedgers() {
  const { data, error } = await supabase
    .from("trustcheck_ledgers")
    .select("*")
    .order("height", { ascending: true });

  if (error) {
    throw error;
  }

  return data ?? [];
}

async function writeLedgers(data) {
  if (!Array.isArray(data) || data.length === 0) {
    return;
  }

  const latest = data[data.length - 1];

  const row = {
    ledger_id: latest.ledger_id,
    decision_id: latest.decision_id,
    input_hash: latest.input_hash,
    result_hash: latest.result_hash,
    risk_score: latest.risk_score,
    recommendation: latest.recommendation,
    prev_hash: latest.prev_hash ?? null,
    height: latest.height,
    recorded_at: latest.recorded_at,
    hash: latest.hash
  };

  const { error } = await supabase
    .from("trustcheck_ledgers")
    .upsert(row, { onConflict: "ledger_id" });

  if (error) {
    throw error;
  }
}

module.exports = {
  ensureDataFiles,
  readDecisions,
  writeDecisions,
  readLedgers,
  writeLedgers
};