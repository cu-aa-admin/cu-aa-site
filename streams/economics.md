---
layout: default
title: "Economics Stream"
permalink: /streams/economics/
---

# CU‑AA Economics Stream

Welcome to our Economics discussion space! Connect with fellow alumni to discuss economics, geopolitics, market trends, and policy analysis.

## Recent Economics Posts

<ul>
  {% for post in site.categories.economics %}
    <li>
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
      <small>— {{ post.date | date: "%b %-d, %Y" }}</small>
    </li>
  {% endfor %}
</ul>

## Join Live Economics Discussions

Connect with our community on Discord for real-time conversations about economics and geopolitics.

<div style="background: #f8f9fa; border: 1px solid #e9ecef; border-radius: 8px; padding: 1.5rem; margin: 2rem 0;">
  <h3 style="margin-top: 0; color: #495057;">💬 Economics Channel</h3>
  <p style="margin-bottom: 1rem; color: #6c757d;">
    Join our dedicated #economics channel on Discord to discuss market trends, policy analysis, and economic research with fellow alumni.
  </p>
  <div style="text-align: center;">
    <a href="https://discord.gg/2h2HgWFJ" 
       target="_blank" 
       style="background: #5865F2; color: white; padding: 12px 24px; 
              border-radius: 5px; text-decoration: none; font-weight: bold; display: inline-block;">
      💼 Join Economics Discussion
    </a>
  </div>
</div>

## What We Discuss

- **Market Analysis**: Share insights on global markets and trends
- **Policy Impact**: Discuss how policies affect African economies
- **Research Sharing**: Present economic research and findings
- **Career Opportunities**: Economics-focused job postings and networking
- **Academic Discussions**: Theoretical economics and current debates

## Contributing

Have economics insights to share? Write a blog post or join our Discord discussions. Contact us to contribute to this stream.

<style>
.discord-invite {
  background: linear-gradient(135deg, #5865F2 0%, #4752C4 100%);
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  text-align: center;
  margin: 2rem 0;
}

.discord-invite a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}
</style>