/**
 * CLIENT_URL may be a single origin or comma-separated list, e.g.
 * http://localhost:3000,https://ethara-frontend.onrender.com
 */
function getAllowedOrigins() {
  const raw = process.env.CLIENT_URL || 'http://localhost:3000';
  return raw
    .split(',')
    .map((s) => s.trim().replace(/\/$/, ''))
    .filter(Boolean);
}

module.exports = { getAllowedOrigins };
