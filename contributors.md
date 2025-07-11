---
layout: default
title: Contributors
permalink: /contributors/
description: Recognizing the Columbia alumni who contribute to our community discussions
---

<div class="container">
  <div class="contributors-page">
    <h1>Our Contributors</h1>
    <p class="intro">
      These Columbia alumni have contributed their insights, experiences, and expertise to our community discussions. 
      Their contributions help shape the dialogue on Africa's future.
    </p>

    <!-- Contributor Stats -->
    <div class="contributor-stats">
      <div class="stat">
        <h3>{% assign unique_authors = site.posts | map: 'author' | uniq | size %}{{ unique_authors }}</h3>
        <p>Contributors</p>
      </div>
      <div class="stat">
        <h3>{{ site.posts | size }}</h3>
        <p>Discussions</p>
      </div>
      <div class="stat">
        <h3>{{ site.categories | size }}</h3>
        <p>Topics</p>
      </div>
    </div>

    <!-- Featured Contributors -->
    <section class="featured-contributors">
      <h2>Top Contributors</h2>
      <div class="contributor-grid">
        {% assign authors = site.posts | group_by: 'author' %}
        {% assign sorted_authors = authors | sort: 'size' | reverse %}
        {% for author in sorted_authors limit:6 %}
          {% if author.name and author.name != "" %}
          <div class="contributor-card">
            <div class="contributor-avatar">
              {{ author.name | slice: 0 | upcase }}
            </div>
            <h3>{{ author.name }}</h3>
            <p class="post-count">{{ author.size }} {% if author.size == 1 %}post{% else %}posts{% endif %}</p>
            <div class="recent-posts">
              {% for post in author.items limit:2 %}
                <a href="{{ post.url | relative_url }}" class="recent-post">
                  {{ post.title | truncate: 50 }}
                </a>
              {% endfor %}
            </div>
          </div>
          {% endif %}
        {% endfor %}
      </div>
    </section>

    <!-- All Contributors List -->
    <section class="all-contributors">
      <h2>All Contributors</h2>
      <div class="contributors-list">
        {% assign all_authors = site.posts | map: 'author' | uniq | sort %}
        {% for author_name in all_authors %}
          {% if author_name and author_name != "" %}
            {% assign author_posts = site.posts | where: 'author', author_name %}
            <div class="contributor-item">
              <div class="contributor-info">
                <h4>{{ author_name }}</h4>
                <span class="contribution-count">{{ author_posts.size }} contribution{% if author_posts.size > 1 %}s{% endif %}</span>
              </div>
              <div class="categories">
                {% assign author_categories = author_posts | map: 'categories' | uniq %}
                {% for category in author_categories %}
                  {% if category %}
                    <span class="category-tag">{{ category | first }}</span>
                  {% endif %}
                {% endfor %}
              </div>
            </div>
          {% endif %}
        {% endfor %}
      </div>
    </section>

    <!-- Call to Action -->
    <section class="contribute-cta">
      <h2>Join Our Community of Contributors</h2>
      <p>Share your insights and experiences with the Columbia Africa Alumni community</p>
      <a href="/contribute/" class="btn btn-primary">Submit a Discussion</a>
    </section>
  </div>
</div>

<style>
.contributors-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 0;
}

.intro {
  font-size: 1.25rem;
  color: var(--text-light);
  text-align: center;
  margin-bottom: 3rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

/* Stats Section */
.contributor-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin: 3rem 0;
}

.stat {
  text-align: center;
  padding: 2rem;
  background: var(--columbia-light-blue);
  color: white;
  border-radius: 12px;
}

.stat h3 {
  font-size: 3rem;
  margin: 0;
  color: white;
}

.stat p {
  margin: 0.5rem 0 0;
  font-size: 1.1rem;
  opacity: 0.9;
}

/* Featured Contributors */
.featured-contributors {
  margin: 4rem 0;
}

.featured-contributors h2 {
  text-align: center;
  color: var(--columbia-blue);
  margin-bottom: 2rem;
}

.contributor-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.contributor-card {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  transition: var(--transition);
}

.contributor-card:hover {
  box-shadow: var(--shadow-hover);
  transform: translateY(-4px);
}

.contributor-avatar {
  width: 80px;
  height: 80px;
  background: var(--columbia-blue);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 600;
  margin: 0 auto 1rem;
}

.contributor-card h3 {
  color: var(--columbia-blue);
  margin-bottom: 0.5rem;
}

.post-count {
  color: var(--text-light);
  margin-bottom: 1rem;
}

.recent-posts {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.recent-post {
  font-size: 0.875rem;
  color: var(--text-light);
  text-decoration: none;
  padding: 0.5rem;
  border-radius: 4px;
  transition: var(--transition);
}

.recent-post:hover {
  background: #f8f9fa;
  color: var(--columbia-blue);
}

/* All Contributors List */
.all-contributors {
  margin: 4rem 0;
}

.all-contributors h2 {
  text-align: center;
  color: var(--columbia-blue);
  margin-bottom: 2rem;
}

.contributors-list {
  display: grid;
  gap: 1rem;
  max-width: 800px;
  margin: 0 auto;
}

.contributor-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  transition: var(--transition);
}

.contributor-item:hover {
  box-shadow: var(--shadow);
}

.contributor-info h4 {
  margin: 0;
  color: var(--columbia-blue);
}

.contribution-count {
  font-size: 0.875rem;
  color: var(--text-light);
}

.categories {
  display: flex;
  gap: 0.5rem;
}

.category-tag {
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  background: var(--columbia-light-blue);
  color: white;
  border-radius: 20px;
}

/* CTA Section */
.contribute-cta {
  text-align: center;
  padding: 4rem 2rem;
  background: #f8f9fa;
  border-radius: 12px;
  margin: 4rem 0;
}

.contribute-cta h2 {
  color: var(--columbia-blue);
  margin-bottom: 1rem;
}

.contribute-cta p {
  font-size: 1.1rem;
  color: var(--text-light);
  margin-bottom: 2rem;
}

/* Responsive */
@media (max-width: 768px) {
  .contributor-stats {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .stat {
    padding: 1.5rem;
  }
  
  .contributor-grid {
    grid-template-columns: 1fr;
  }
  
  .contributor-item {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .categories {
    justify-content: center;
  }
}
</style>