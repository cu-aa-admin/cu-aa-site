---
layout: default
---

<!-- Hero Section -->
<section class="hero hero-home">
  <div class="container">
    <div class="hero-content">
      <h1>Welcome to Columbia University Africa Alumni</h1>
      <p class="hero-subtitle">Connecting Columbia alumni across Africa to discuss challenges, share solutions, and build a stronger continent together</p>
      <div class="hero-buttons">
        <a href="/about/" class="btn btn-primary">Learn About Us</a>
        <a href="/programs/mentorship/" class="btn btn-secondary">Join Our Programs</a>
      </div>
    </div>
  </div>
</section>

<!-- Introduction Section -->
<section class="section">
  <div class="container">
    <div class="intro-content">
      <h2 class="section-title">Building Bridges Across Africa</h2>
      <p class="intro-text">
        We are a vibrant community of Columbia University alumni dedicated to addressing Africa's challenges through 
        collaborative dialogue, mentorship, and action. Our platform brings together diverse voices from across the 
        continent to share experiences, propose solutions, and create lasting impact.
      </p>
    </div>
  </div>
</section>

<!-- Latest Blog Posts -->
<section class="section" style="background-color: #f8f9fa;">
  <div class="container">
    <h2 class="section-title">Latest Discussions & Insights</h2>
    <div class="blog-grid">
      {% for post in site.posts limit:6 %}
        <article class="blog-card">
          {% if post.image %}
            <div class="blog-card-image">
              <img src="{{ post.image | relative_url }}" alt="{{ post.title }}" loading="lazy">
            </div>
          {% endif %}
          <div class="blog-card-content">
            <div class="blog-meta">
              <time datetime="{{ post.date | date_to_xmlschema }}">
                {{ post.date | date: "%B %-d, %Y" }}
              </time>
              {% if post.categories %}
                <span class="blog-category">{{ post.categories | first }}</span>
              {% endif %}
            </div>
            <h3 class="blog-title">
              <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
            </h3>
            <p class="blog-excerpt">
              {{ post.excerpt | strip_html | truncate: 160 }}
            </p>
            <a href="{{ post.url | relative_url }}" class="read-more">Read more →</a>
          </div>
        </article>
      {% endfor %}
    </div>
    
    {% if site.posts.size == 0 %}
      <div class="empty-state">
        <h3>Join the Conversation</h3>
        <p>We're just getting started! Check back soon for insightful discussions about Africa's future.</p>
      </div>
    {% endif %}
    
    {% if site.posts.size > 6 %}
      <div class="blog-cta">
        <a href="/blog/" class="btn btn-primary">View All Posts</a>
      </div>
    {% endif %}
  </div>
</section>

<!-- Quick Links Section -->
<section class="section">
  <div class="container">
    <h2 class="section-title">Get Involved</h2>
    <div class="quick-links-grid">
      <div class="quick-link-card">
        <h3>🤝 Join the Discussion</h3>
        <p>Share your perspectives on Africa's challenges and opportunities in our community blog.</p>
        <a href="/blog/" class="btn-link">Explore Topics →</a>
      </div>
      
      <div class="quick-link-card">
        <h3>🌟 Mentorship Program</h3>
        <p>Connect with experienced alumni or guide the next generation of African leaders.</p>
        <a href="/programs/mentorship/" class="btn-link">Learn More →</a>
      </div>
      
      <div class="quick-link-card">
        <h3>📅 Upcoming Events</h3>
        <p>Join our webinars, meetups, and discussions on pressing African issues.</p>
        <a href="/events/" class="btn-link">View Calendar →</a>
      </div>
    </div>
  </div>
</section>

<!-- Newsletter Section -->
<section class="section newsletter-section">
  <div class="container">
    <div class="newsletter-content">
      <h2>Stay Connected</h2>
      <p>Get weekly updates on discussions, events, and opportunities from our alumni network</p>
      <form class="newsletter-form" action="/subscribe" method="post">
        <input type="email" name="email" placeholder="Enter your email" required>
        <button type="submit" class="btn btn-primary">Subscribe</button>
      </form>
    </div>
  </div>
</section>

<style>
/* Homepage specific styles */
.hero-home {
  background: linear-gradient(135deg, var(--columbia-blue) 0%, var(--columbia-light-blue) 100%);
  padding: 4rem 0;
}

.intro-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.intro-text {
  font-size: 1.25rem;
  line-height: 1.8;
  color: var(--text-light);
}

/* Blog Grid */
.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.blog-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: var(--transition);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.blog-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-hover);
}

.blog-card-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.blog-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.blog-card-content {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.blog-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
  color: var(--text-light);
}

.blog-category {
  background: var(--columbia-light-blue);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
}

.blog-title {
  margin-bottom: 0.75rem;
  font-size: 1.25rem;
}

.blog-title a {
  color: var(--text-dark);
  text-decoration: none;
  transition: color 0.3s ease;
}

.blog-title a:hover {
  color: var(--columbia-blue);
}

.blog-excerpt {
  color: var(--text-light);
  line-height: 1.6;
  margin-bottom: 1rem;
  flex: 1;
}

.read-more {
  color: var(--columbia-blue);
  text-decoration: none;
  font-weight: 600;
  transition: var(--transition);
}

.read-more:hover {
  transform: translateX(4px);
}

.blog-cta {
  text-align: center;
  margin-top: 3rem;
}

/* Quick Links */
.quick-links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.quick-link-card {
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: var(--shadow);
  transition: var(--transition);
}

.quick-link-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-hover);
}

.quick-link-card h3 {
  color: var(--columbia-blue);
  margin-bottom: 1rem;
}

/* Newsletter Section */
.newsletter-section {
  background: linear-gradient(135deg, var(--columbia-blue) 0%, var(--columbia-light-blue) 100%);
  color: white;
}

.newsletter-content {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.newsletter-content h2 {
  color: white;
  margin-bottom: 1rem;
}

.newsletter-form {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.newsletter-form input {
  flex: 1;
  padding: 1rem;
  border: none;
  border-radius: 30px;
  font-size: 1rem;
}

.newsletter-form button {
  white-space: nowrap;
}

@media (max-width: 600px) {
  .newsletter-form {
    flex-direction: column;
  }
}
</style>