const crypto = require("crypto");

/**
 * Stable stringify so hash order does not change
 */
function stableStringify(value) {
  if (value === null || typeof value !== "object") {
    return JSON.stringify(value);
  }

  if (Array.isArray(value)) {
    return `[${value.map((item) => stableStringify(item)).join(",")}]`;
  }

  const keys = Object.keys(value).sort();
  const entries = keys.map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`);
  return `{${entries.join(",")}}`;
}

function sha256(input) {
  return crypto.createHash("sha256").update(String(input)).digest("hex");
}

module.exports = {
  stableStringify,
  sha256
};