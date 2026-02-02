// Generate CSRF tokens for form submissions
const crypto = require('crypto');

// In-memory store (in production, use Redis or similar)
const tokenStore = new Map();

// Clean up old tokens every hour
setInterval(() => {
  const now = Date.now();
  for (const [token, timestamp] of tokenStore.entries()) {
    if (now - timestamp > 3600000) { // 1 hour
      tokenStore.delete(token);
    }
  }
}, 3600000);

exports.handler = async (event, context) => {
  const { user } = context.clientContext;

  // Only authenticated users can get CSRF tokens
  if (!user) {
    return {
      statusCode: 401,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        error: 'Unauthorized'
      })
    };
  }

  // Generate CSRF token
  const token = crypto.randomBytes(32).toString('hex');
  const timestamp = Date.now();

  // Store token with user ID
  tokenStore.set(token, {
    userId: user.sub,
    timestamp
  });

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-store'
    },
    body: JSON.stringify({
      token,
      expiresIn: 3600 // 1 hour in seconds
    })
  };
};

// Export verification function for other serverless functions
exports.verifyToken = (token, userId) => {
  const stored = tokenStore.get(token);

  if (!stored) {
    return false;
  }

  // Check if token matches user and hasn't expired
  const isValid = stored.userId === userId &&
                  (Date.now() - stored.timestamp) < 3600000;

  // Delete token after verification (one-time use)
  if (isValid) {
    tokenStore.delete(token);
  }

  return isValid;
};
