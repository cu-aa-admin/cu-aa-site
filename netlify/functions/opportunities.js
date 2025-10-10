/**
 * Opportunities API
 * Returns job postings, collaborations, and other opportunities
 *
 * Future: Connect to database
 * For now: Returns generated mock data
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
    // TODO: Replace with database query
    const opportunities = generateOpportunities();

    // Calculate stats by category
    const stats = {
      jobs: opportunities.filter(o => o.category === 'jobs').length,
      collaborations: opportunities.filter(o => o.category === 'collaborations').length,
      startups: opportunities.filter(o => o.category === 'startups').length,
      mentorships: opportunities.filter(o => o.category === 'mentorship').length,
      events: opportunities.filter(o => o.category === 'events').length
    };

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'private, max-age=600' // Cache for 10 minutes
      },
      body: JSON.stringify({ opportunities, stats })
    };

  } catch (error) {
    console.error('Error fetching opportunities:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};

/**
 * Generate opportunities data
 * TODO: Replace with real database queries
 */
function generateOpportunities() {
  const categories = ['jobs', 'collaborations', 'startups', 'mentorship', 'events'];

  const jobTitles = [
    'Senior Software Engineer', 'Product Manager', 'Data Scientist', 'UX Designer',
    'Marketing Manager', 'Business Development Manager', 'Financial Analyst',
    'Policy Analyst', 'Research Associate', 'Program Manager'
  ];

  const companies = [
    'Flutterwave', 'Andela', 'Jumia', 'M-KOPA', 'Twiga Foods', 'Yoco',
    'Goldman Sachs', 'McKinsey', 'Google', 'Microsoft', 'African Development Bank',
    'World Bank', 'UN', 'WHO', 'Columbia University', 'MIT', 'Stanford'
  ];

  const locations = [
    'Lagos, Nigeria', 'Nairobi, Kenya', 'Cape Town, South Africa', 'Accra, Ghana',
    'Cairo, Egypt', 'Kigali, Rwanda', 'Addis Ababa, Ethiopia', 'Remote',
    'New York, USA', 'London, UK', 'San Francisco, USA'
  ];

  const types = ['full-time', 'part-time', 'contract', 'freelance', 'volunteer', 'equity'];

  const skillSets = [
    ['JavaScript', 'React', 'Node.js', 'AWS'],
    ['Python', 'Machine Learning', 'TensorFlow', 'Data Analysis'],
    ['Product Management', 'Agile', 'User Research', 'Strategy'],
    ['Finance', 'Excel', 'Financial Modeling', 'Analysis'],
    ['Marketing', 'Social Media', 'Content Strategy', 'Analytics'],
    ['Policy', 'Research', 'Writing', 'Data Analysis'],
    ['Mobile Development', 'iOS', 'Android', 'Flutter'],
    ['Design', 'Figma', 'UI/UX', 'Prototyping']
  ];

  const alumni = [
    { name: 'Sarah O.', school: 'SEAS', year: '16' },
    { name: 'Michael C.', school: 'Business', year: '15' },
    { name: 'Amina H.', school: 'SIPA', year: '18' },
    { name: 'David M.', school: 'CC', year: '20' },
    { name: 'Prof. Johnson', school: 'Faculty', year: '' }
  ];

  const opportunities = [];
  const numOpportunities = 30; // Generate 30 opportunities

  for (let i = 0; i < numOpportunities; i++) {
    const category = categories[i % categories.length];
    const alumnus = alumni[i % alumni.length];

    let title, description, salary;

    switch (category) {
      case 'jobs':
        title = jobTitles[Math.floor(Math.random() * jobTitles.length)];
        description = `Seeking a talented ${title.toLowerCase()} to join our growing team. You'll work on innovative solutions for African markets.`;
        salary = ['$60k-90k', '$80k-120k', '$100k-150k', '$50k-70k'][Math.floor(Math.random() * 4)];
        break;

      case 'collaborations':
        title = `Research Collaboration: ${['Climate Finance', 'Healthcare Innovation', 'EdTech', 'Fintech', 'Agriculture'][i % 5]}`;
        description = `Looking for collaborators on research project exploring ${title.split(': ')[1].toLowerCase()} in Africa. 6-month commitment.`;
        salary = 'Unpaid (Academic credit possible)';
        break;

      case 'startups':
        title = `Co-founder for ${['FinTech', 'HealthTech', 'AgriTech', 'EdTech', 'CleanTech'][i % 5]} Startup`;
        description = `Building the next big thing in African tech. Looking for passionate co-founder with complementary skills.`;
        salary = 'Equity + Small stipend';
        break;

      case 'mentorship':
        title = `Mentorship: ${['Recent Graduate in Tech', 'Career Transition to Finance', 'Aspiring Entrepreneur', 'PhD Student'][i % 4]}`;
        description = `${['Seeking mentorship', 'Looking for guidance', 'Need career advice'][i % 3]} from experienced professionals in the field.`;
        salary = 'Volunteer';
        break;

      case 'events':
        title = `${['Tech Innovation', 'Career Development', 'Networking', 'Alumni Reunion'][i % 4]} Event`;
        description = `Join us for an exciting event bringing together Columbia alumni across Africa and beyond.`;
        salary = 'Free for members';
        break;
    }

    opportunities.push({
      id: i + 1,
      title,
      company: companies[Math.floor(Math.random() * companies.length)],
      category,
      type: types[Math.floor(Math.random() * types.length)],
      location: locations[Math.floor(Math.random() * locations.length)],
      salary,
      description,
      skills: skillSets[Math.floor(Math.random() * skillSets.length)],
      contact: category === 'jobs' ? 'careers@company.com' : `${alumnus.name.toLowerCase().replace(' ', '.')}@alumni.columbia.edu`,
      deadline: Math.random() > 0.5 ? getRandomFutureDate() : null,
      postedBy: `${alumnus.name} (${alumnus.school}${alumnus.year ? " '" + alumnus.year : ''})`,
      postedDate: getRandomPastDate()
    });
  }

  // Sort by posted date (most recent first)
  return opportunities.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
}

function getRandomFutureDate() {
  const today = new Date();
  const future = new Date(today);
  future.setDate(today.getDate() + Math.floor(Math.random() * 60) + 1); // 1-60 days in future
  return future.toISOString().split('T')[0];
}

function getRandomPastDate() {
  const today = new Date();
  const past = new Date(today);
  past.setDate(today.getDate() - Math.floor(Math.random() * 30)); // 0-30 days ago
  return past.toISOString().split('T')[0];
}
