---
lang: en-US
title: Imazzine Project
excerpt: Imazzine Project
---

# imazzine.github.io


{% for post in site.posts %}
  <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
  {{ post.excerpt }}
{% endfor %}

{% for note in site.notes %}
  <h2><a href="{{ note.url }}">{{ note.title }}</a></h2>
  {{ note.excerpt }}
{% endfor %}