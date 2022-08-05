[en-US](../README.md) | zh-CN

# hexo-related-posts-bysk

一个为 Hexo 设计的插件，用来生成相关文章，作者是 Sukwants.

它通过标签和分类来选择相关文章。首先按照与文章相同标签和分类的数量排序，再按照你设置的方式排序。

## 安装

```sh
$ npm install hexo-related-posts-bysk --save
```

## 使用

在文件 `themes/next/layout/_partials/post/post-related.njk` 里，替换全部为
```njk
{% set related_post =  related_posts_bysk(post, {maxCount: theme.related_posts.max_count, orderBy: theme.related_posts.order_by, order: theme.related_posts.order}) %}
{% if related_post.length > 0 %}
  <div class="popular-posts-header">{{ theme.related_posts.title or __('post.related_posts') }}</div>
  <ul class="related-posts">
  {% for rl_post in related_post %}
      <li class="related-posts-item"><a href="{{ url_for(rl_post.path) }}">{{ rl_post.title }}</a></li>
  {% endfor %}
  </ul>
{% endif %}
```

在文件 `themes/next/_config.yml` 里，重写 `related_posts` 以下的内容

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
```

修改 `enable` 来打开和关闭该功能。

修改 `title` 来设置显示在相关文章之前的标题。如果没有设置，将使用默认标题。

修改 `display_in_home` 来决定是否在主页显示相关文章。

修改 `max_count` 来调整相关文章数量的上限。

修改 `order_by` 来设置相关文章的排序依据。你可以选择 `'date'`,`'updated'`,`'title'`,`'random'`。默认选择为 `'date'`.

在 `'positive'`（升序）和 `'negative'`（降序）之间选择 `order` 的值，来设置相关文章的排列顺序。默认选择为 `'negative'`.
