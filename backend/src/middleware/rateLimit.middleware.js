const rateLimit = require('express-rate-limit');

/**
 * Render/Vercel/etc. sit behind a proxy — req.ip must use X-Forwarded-For.
 * Call rateLimit.setTrustProxy(app) pattern via express app.set('trust proxy', 1) in app.js.
 */

function json429(message) {
  return (req, res) => {
    res.status(429).json({
      success: false,
      message
    });
  };
}

/** Login / register — reduce brute force */
exports.authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 40,
  standardHeaders: true,
  legacyHeaders: false,
  handler: json429('Too many attempts. Please try again in a few minutes.')
});

/**
 * Create project / create task — stops double-click and burst spam.
 * Same IP: max 1 create every 2s per endpoint family (projects vs tasks tracked separately).
 */
exports.createResourceLimiter = rateLimit({
  windowMs: 2000,
  max: 1,
  standardHeaders: true,
  legacyHeaders: false,
  handler: json429('Please wait a moment before creating again.')
});

/** Softer cap over a minute for authenticated abuse */
exports.createSustainedLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  handler: json429('Too many create requests this minute. Try again shortly.')
});
