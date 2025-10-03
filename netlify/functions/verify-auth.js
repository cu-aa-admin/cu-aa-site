// Serverless function to verify authentication
exports.handler = async (event, context) => {
  const { user } = context.clientContext;

  // Check if user is authenticated
  if (!user) {
    return {
      statusCode: 401,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        authenticated: false,
        message: 'User not authenticated'
      })
    };
  }

  // Return user info (excluding sensitive data)
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      authenticated: true,
      user: {
        id: user.sub,
        email: user.email,
        name: user.user_metadata?.full_name,
        roles: user.app_metadata?.roles || [],
        avatar: user.user_metadata?.avatar_url
      }
    })
  };
};
