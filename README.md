en-US | [zh-CN](./zh-CN/README.md)

# hexo-related-posts-bysk

A plugin for Hexo to list related posts, written by Sukwants.

It chooses related posts through tags and categories. First, sort by the number of same tags and categories with the post. Then, sort by the ways you set.

You can choose to exclude specific tags or categories from the post's relevance calculation.

## Install

```sh
$ npm install hexo-related-posts-bysk --save
```

## Usage

In file `themes/next/layout/_partials/post/post-related.njk`, replace all with

```njk
{% set related_post =  related_posts_bysk(post, {maxCount: theme.related_posts.max_count, orderBy: theme.related_posts.order_by, order: theme.related_posts.order, excludeTags: theme.related_posts.exclude.tags, excludeCategories: theme.related_posts.exclude.categories}) %}
{% if related_post.length > 0 %}
  <div class="popular-posts-header">{{ theme.related_posts.title or __('post.related_posts') }}</div>
  <ul class="related-posts">
  {% for rl_post in related_post %}
      <li class="related-posts-item"><a href="{{ url_for(rl_post.path) }}">{{ rl_post.title }}</a></li>
  {% endfor %}
  </ul>
{% endif %}
```

In file `themes/next/_config.yml`, rewrite what's below `related_posts` with

```yml
# List related posts, written by Sukwants
# Dependencies: https://github.com/Sukwants/hexo-related-posts-bysk
related_posts:
  enable: true
  title: # Custom header, leave empty to use the default one
  display_in_home: false
  max_count: 5
  order_by: 'date'
  #order: 'positive'
  order: 'negative'
  exclude:
    tags:
      #- 'some tags'
    categories:
      #- 'some categories'
```

Modify `enable` to turn on or turn off this function.

Modify `title` to set the title shown ahead of related posts. If it isn't set, use the default one.

Modify `display_in_home` to decide whether to show related posts on index pages.

Modify `max_count` to adjust the upper limit of the number of related posts.

Modify `order_by` to set the sort by of related posts. You can choose `'date'`,`'updated'`,`'title'`,`'random'`. The default choice is `'date'`.

Choose the value of `order` between `'positive'` and `'negative'` to set the order of related posts. The default choice is `'negative'`.

Below `exclude`, list the tags you don't want included in the post's relevance calculation below `tags`, and list the categories you don't want included below `categories`.
