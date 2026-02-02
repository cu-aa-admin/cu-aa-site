---
layout: default
---

<!-- Hero Section -->
<section class="hero hero-compact">
  <div class="africa-bg"></div>
  <div class="container">
    <div class="hero-content">
      <h1>Join the Discussion</h1>
      <p class="hero-subtitle">A platform for Columbia alumni to discuss Africa's challenges and opportunities</p>
    </div>
  </div>
</section>

<!-- Main Discussion Section -->
<section class="section">
  <div class="container">
    <div class="discussion-layout">
      <!-- Main Content -->
      <div class="discussion-main">
        <div class="discussion-header">
          <h2>Recent Discussions</h2>
          <a href="/new-post/" class="btn btn-primary">Start New Discussion</a>
        </div>

        <!-- Discussion Threads -->
        <div class="discussion-list">
          {% for post in site.posts %}
            <article class="discussion-thread">
              <div class="thread-content">
                <h3 class="thread-title">
                  <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
                </h3>
                <div class="thread-meta">
                  <span class="thread-author">Posted by {{ post.author | default: "Anonymous" }}</span>
                  <span class="thread-date">{{ post.date | date: "%B %-d, %Y" }}</span>
                  {% if post.categories %}
                    <span class="thread-category">in {{ post.categories | first }}</span>
                  {% endif %}
                </div>
                <p class="thread-excerpt">
                  {{ post.excerpt | strip_html | truncate: 200 }}
                </p>
                <div class="thread-stats">
                  <span class="comments-count">💬 {{ post.comments | default: 0 }} comments</span>
                  <a href="{{ post.url | relative_url }}" class="read-more">Join discussion →</a>
                </div>
              </div>
            </article>
          {% endfor %}
          
          {% if site.posts.size == 0 %}
            <div class="empty-state">
              <h3>Be the first to start a discussion!</h3>
              <p>Share your thoughts on Africa's future, ask questions, or propose solutions.</p>
              <a href="/new-post/" class="btn btn-primary">Start Discussion</a>
            </div>
          {% endif %}
        </div>
      </div>

      <!-- Sidebar -->
      <aside class="discussion-sidebar">
        <div class="sidebar-section">
          <h3>About Discussions</h3>
          <p>This is a space for Columbia alumni to engage in meaningful dialogue about Africa. Share insights, ask questions, and collaborate on solutions.</p>
        </div>

        <div class="sidebar-section">
          <h3>Discussion Guidelines</h3>
          <ul class="guidelines-list">
            <li>Be respectful and constructive</li>
            <li>Back opinions with facts when possible</li>
            <li>Focus on solutions, not just problems</li>
            <li>Engage with diverse perspectives</li>
          </ul>
        </div>

        <div class="sidebar-section">
          <h3>Popular Topics</h3>
          <div class="topic-tags">
            <a href="/blog/category/economics/" class="topic-tag">Economics</a>
            <a href="/blog/category/technology/" class="topic-tag">Technology</a>
            <a href="/blog/category/education/" class="topic-tag">Education</a>
            <a href="/blog/category/healthcare/" class="topic-tag">Healthcare</a>
            <a href="/blog/category/policy/" class="topic-tag">Policy</a>
          </div>
        </div>

        <div class="sidebar-section contribute-box">
          <h3>Want to Contribute?</h3>
          <p>To post or comment, you'll need to log in with your alumni credentials.</p>
          <a href="/login/" class="btn btn-secondary btn-small">Log In</a>
        </div>
      </aside>
    </div>
  </div>
</section>

<style>
/* Compact hero for discussion focus */
.hero-compact {
  background: linear-gradient(135deg, var(--columbia-blue) 0%, var(--columbia-light-blue) 100%);
  padding: 3rem 0;
}

.hero-compact h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

/* Discussion layout */
.discussion-layout {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 3rem;
}

@media (max-width: 968px) {
  .discussion-layout {
    grid-template-columns: 1fr;
  }
}

/* Discussion header */
.discussion-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.discussion-header h2 {
  margin: 0;
  color: var(--columbia-blue);
}

/* Discussion threads */
.discussion-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.discussion-thread {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1.5rem;
  transition: var(--transition);
}

.discussion-thread:hover {
  box-shadow: var(--shadow);
  border-color: var(--columbia-light-blue);
}

.thread-title {
  margin: 0 0 0.75rem 0;
  font-size: 1.25rem;
}

.thread-title a {
  color: var(--text-dark);
  text-decoration: none;
  transition: color 0.3s ease;
}

.thread-title a:hover {
  color: var(--columbia-blue);
}

.thread-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.875rem;
  color: var(--text-light);
  margin-bottom: 1rem;
}

.thread-meta span::after {
  content: "•";
  margin-left: 1rem;
  color: #ccc;
}

.thread-meta span:last-child::after {
  display: none;
}

.thread-excerpt {
  color: var(--text-dark);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.thread-stats {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
}

.comments-count {
  color: var(--text-light);
}

/* Sidebar */
.discussion-sidebar {
  position: sticky;
  top: 100px;
  height: fit-content;
}

.sidebar-section {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.sidebar-section h3 {
  color: var(--columbia-blue);
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

.guidelines-list {
  list-style: none;
  padding: 0;
}

.guidelines-list li {
  padding: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;
}

.guidelines-list li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: var(--columbia-blue);
}

.topic-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.topic-tag {
  background: var(--columbia-light-blue);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  text-decoration: none;
  transition: var(--transition);
}

.topic-tag:hover {
  background: var(--columbia-blue);
}

.contribute-box {
  background: #f8f9fa;
  border: 2px solid var(--columbia-light-blue);
}

.btn-small {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

/* Empty state */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background: #f8f9fa;
  border-radius: 12px;
  margin-top: 2rem;
}
</style>