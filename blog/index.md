---
layout: default
title: Blog
permalink: /blog/
---

<h1>Blog</h1>

<ul>
{% for post in site.posts %}
  <li>
    <time datetime="{{ post.date | date_to_xmlschema }}">
      {{ post.date | date: "%b %-d, %Y" }}
    </time>
    &nbsp; <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
  </li>
{% endfor %}
</ul>