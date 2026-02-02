/**
 * User Stats API
 * Returns personalized stats for authenticated users
 *
 * Future: Connect to database or analytics service
 * For now: Returns mock data based on user
 */

exports.handler = async (event, context) => {
  // Verify authentication
  const { user } = context.clientContext;

  if (!user) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Unauthorized' })
    };
  }

  try {
    // Extract user ID
    const userId = user.sub;
    const email = user.email;

    // TODO: Replace with actual database queries
    // For now, generate personalized mock data based on user
    const stats = generateUserStats(userId, email);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'private, max-age=300' // Cache for 5 minutes
      },
      body: JSON.stringify(stats)
    };

  } catch (error) {
    console.error('Error fetching user stats:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};

/**
 * Generate user statistics
 * TODO: Replace with real database queries
 */
function generateUserStats(userId, email) {
  // Generate deterministic but varied stats based on user ID
  const seed = userId ? userId.charCodeAt(0) : 0;

  return {
    postsRead: Math.floor((seed % 20) + 5), // 5-24
    discordMessages: Math.floor((seed % 50) + 2), // 2-51
    eventsAttended: Math.floor((seed % 10)), // 0-9
    connections: Math.floor((seed % 30) + 3), // 3-32

    // Additional stats for future use
    memberSince: new Date(Date.now() - (seed * 86400000)).toISOString().split('T')[0],
    lastActive: new Date(Date.now() - (seed % 7) * 86400000).toISOString(),
    profileCompleteness: Math.min(100, (seed % 60) + 40), // 40-100%

    // Activity breakdown
    activity: {
      blogPosts: {
        read: Math.floor((seed % 20) + 5),
        liked: Math.floor((seed % 10)),
        commented: Math.floor((seed % 5))
      },
      discord: {
        messages: Math.floor((seed % 50) + 2),
        channels: Math.floor((seed % 7) + 2),
        reactions: Math.floor((seed % 30))
      },
      events: {
        attended: Math.floor((seed % 10)),
        upcoming: Math.floor((seed % 5) + 1),
        missed: Math.floor((seed % 3))
      },
      network: {
        connections: Math.floor((seed % 30) + 3),
        messages: Math.floor((seed % 15)),
        mentorships: Math.floor((seed % 3))
      }
    },

    // User preferences (for personalization)
    preferences: {
      interests: selectInterests(seed),
      location: selectLocation(seed),
      industry: selectIndustry(seed)
    }
  };
}

function selectInterests(seed) {
  const allInterests = [
    'Technology', 'Economics', 'Healthcare', 'Education',
    'Climate', 'Finance', 'Agriculture', 'Policy',
    'Entrepreneurship', 'Research'
  ];

  const count = (seed % 3) + 2; // 2-4 interests
  return allInterests.slice(0, count);
}

function selectLocation(seed) {
  const locations = [
    'Kenya', 'Nigeria', 'South Africa', 'Ghana', 'Ethiopia',
    'Egypt', 'Rwanda', 'Tanzania', 'Uganda', 'Morocco',
    'USA', 'UK', 'Canada'
  ];

  return locations[seed % locations.length];
}

function selectIndustry(seed) {
  const industries = [
    'Technology', 'Finance', 'Healthcare', 'Education',
    'Consulting', 'Government', 'Non-profit', 'Research',
    'Manufacturing', 'Agriculture'
  ];

  return industries[seed % industries.length];
}
