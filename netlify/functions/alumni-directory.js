/**
 * Alumni Directory API
 * Returns alumni list with filtering capabilities
 *
 * Future: Connect to database
 * For now: Returns expanded mock data
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
    const alumni = generateAlumniData();

    // Calculate stats
    const stats = {
      total: alumni.length,
      online: alumni.filter(a => a.online).length,
      activeWeek: Math.floor(alumni.length * 0.35) // 35% active this week
    };

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'private, max-age=600' // Cache for 10 minutes
      },
      body: JSON.stringify({ alumni, stats })
    };

  } catch (error) {
    console.error('Error fetching alumni directory:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};

/**
 * Generate alumni directory data
 * TODO: Replace with real database queries
 */
function generateAlumniData() {
  const schools = ['CC', 'SEAS', 'Business', 'SIPA', 'Law', 'Medicine', 'Journalism', 'Teachers', 'GSAS', 'Climate'];
  const locations = [
    'Lagos, Nigeria', 'Nairobi, Kenya', 'Cape Town, South Africa', 'Accra, Ghana',
    'Cairo, Egypt', 'Addis Ababa, Ethiopia', 'Kigali, Rwanda', 'Dar es Salaam, Tanzania',
    'Kampala, Uganda', 'Casablanca, Morocco', 'New York, USA', 'London, UK',
    'Toronto, Canada', 'San Francisco, USA', 'Washington DC, USA'
  ];
  const industries = [
    'Technology', 'Finance', 'Healthcare', 'Education', 'Consulting',
    'Government', 'Non-profit', 'Legal', 'Media', 'Research',
    'Agriculture', 'Energy', 'Real Estate'
  ];

  const firstNames = [
    'Amara', 'Kofi', 'Zainab', 'Jabari', 'Fatima', 'Kwame', 'Aisha', 'Chidi',
    'Makena', 'Tariq', 'Simone', 'Dele', 'Nala', 'Youssef', 'Imani', 'Malik',
    'Sarah', 'David', 'Grace', 'Michael', 'Rebecca', 'James', 'Maryam', 'Samuel'
  ];
  const lastNames = [
    'Okafor', 'Mensah', 'Hassan', 'Kimathi', 'Al-Rashid', 'Mutua', 'Ibrahim',
    'Ochieng', 'Diop', 'Nkrumah', 'Traore', 'Mwangi', 'Kamara', 'Bello',
    'Chen', 'Patel', 'Johnson', 'Williams', 'Garcia', 'Rodriguez'
  ];

  const roles = [
    ['Software Engineer', 'Technology'],
    ['Product Manager', 'Technology'],
    ['Investment Banker', 'Finance'],
    ['Policy Analyst', 'Government'],
    ['Consultant', 'Consulting'],
    ['Doctor', 'Healthcare'],
    ['Professor', 'Education'],
    ['Lawyer', 'Legal'],
    ['Journalist', 'Media'],
    ['Researcher', 'Research'],
    ['Entrepreneur', 'Technology'],
    ['Data Scientist', 'Technology'],
    ['Financial Analyst', 'Finance'],
    ['Program Manager', 'Non-profit'],
    ['Diplomat', 'Government']
  ];

  const alumni = [];
  const numAlumni = 50; // Generate 50 alumni profiles

  for (let i = 0; i < numAlumni; i++) {
    const firstName = firstNames[i % firstNames.length];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const [role, industry] = roles[Math.floor(Math.random() * roles.length)];
    const school = schools[Math.floor(Math.random() * schools.length)];
    const year = String(2000 + Math.floor(Math.random() * 25)); // 2000-2024
    const location = locations[Math.floor(Math.random() * locations.length)];

    alumni.push({
      name: `${firstName} ${lastName}`,
      school,
      year,
      location,
      industry,
      role: `${role} at ${generateCompany(industry)}`,
      bio: generateBio(role, industry, school),
      online: Math.random() > 0.85, // 15% online
      tags: generateTags(industry, school)
    });
  }

  return alumni;
}

function generateCompany(industry) {
  const companies = {
    Technology: ['Google', 'Microsoft', 'Andela', 'Flutterwave', 'Jumia', 'M-Kopa', 'Twiga Foods'],
    Finance: ['Goldman Sachs', 'JPMorgan', 'Equity Bank', 'Standard Bank', 'Ecobank', 'McKinsey'],
    Healthcare: ['WHO', 'MSF', 'Novartis', 'Pfizer', 'Aga Khan Hospital', 'Amref Health'],
    Education: ['Harvard', 'Oxford', 'University of Cape Town', 'Ashesi University', 'ALU'],
    Consulting: ['McKinsey', 'BCG', 'Bain', 'Deloitte', 'PwC', 'Dalberg'],
    Government: ['UN', 'World Bank', 'African Union', 'USAID', 'UNDP', 'Ministry of Finance'],
    'Non-profit': ['Gates Foundation', 'Mastercard Foundation', 'Acumen', 'Ashoka', 'TechnoServe'],
    Legal: ['Clifford Chance', 'Bowmans', 'Dentons', 'Allen & Overy', 'Udo Udoma & Belo-Osagie'],
    Media: ['CNN', 'BBC', 'Al Jazeera', 'The Africa Report', 'Quartz Africa', 'TechCabal'],
    Research: ['MIT', 'Stanford', 'Oxford', 'CGIAR', 'African Research Universities Alliance'],
    Agriculture: ['Yara', 'OCP Africa', 'ThriveAgric', 'Apollo Agriculture', 'Farmcrowdy'],
    Energy: ['Shell', 'TotalEnergies', 'M-KOPA', 'PowerGen', 'BBOXX', 'Engie Energy Access'],
    'Real Estate': ['Knight Frank', 'Actis', 'Pam Golding', 'Hass Consult', 'ILAM Fahari']
  };

  const list = companies[industry] || ['Leading Company'];
  return list[Math.floor(Math.random() * list.length)];
}

function generateBio(role, industry, school) {
  const bios = [
    `Passionate about driving ${industry.toLowerCase()} innovation across Africa. Previously worked in consulting and impact investing.`,
    `Leading ${industry.toLowerCase()} transformation initiatives across multiple African markets. ${school} alumna/us committed to sustainable development.`,
    `Building solutions for Africa's ${industry.toLowerCase()} challenges. Former Rhodes Scholar and Fulbright recipient.`,
    `${role} focused on scalable impact across the continent. Active mentor and angel investor.`,
    `Leveraging technology and policy to create change in ${industry.toLowerCase()}. Passionate about pan-African collaboration.`
  ];

  return bios[Math.floor(Math.random() * bios.length)];
}

function generateTags(industry, school) {
  const industryTags = {
    Technology: ['AI', 'Software', 'Fintech', 'SaaS'],
    Finance: ['Investment', 'Banking', 'M&A', 'Private Equity'],
    Healthcare: ['Digital Health', 'Global Health', 'Medicine'],
    Education: ['EdTech', 'Teaching', 'Research'],
    Consulting: ['Strategy', 'Management', 'Advisory'],
    Government: ['Policy', 'Public Service', 'Diplomacy'],
    'Non-profit': ['Impact', 'Development', 'Social Enterprise'],
    Legal: ['Corporate Law', 'M&A', 'International Law'],
    Media: ['Journalism', 'Broadcasting', 'Digital Media'],
    Research: ['Academia', 'Innovation', 'Science'],
    Agriculture: ['AgTech', 'Food Security', 'Sustainability'],
    Energy: ['Renewable Energy', 'Climate', 'Infrastructure'],
    'Real Estate': ['Property', 'Investment', 'Development']
  };

  const tags = industryTags[industry] || [industry];
  const numTags = 2 + Math.floor(Math.random() * 2); // 2-3 tags

  return tags.slice(0, numTags);
}
