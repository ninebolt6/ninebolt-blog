---
title: '@nuxt/contentで作成したページを含めたサイトマップを生成する'
description: 'この記事では、@nuxtjs/sitemapで生成されるサイトマップに、@nuxt/contentで作成したページを含める方法を紹介します。'
category: 'Nuxt.js'
tags: ['nuxt-content']
isUpdated: 'false'
---

## @nuxtjs/sitemapでサイトマップを作りたい

Nuxt.jsでサイトマップを作るモジュールといえば`@nuxtjs/sitemap`が有名ですが、`@nuxt/content`で作られた動的なページはうまくルーティングされないようでデフォルトの設定では正しいサイトマップが作れません。そこで、ルーティングの設定をいじって動的なページを認識させます。

## 環境

NuxtJS 2.14.0<br>
@nuxt/content 1.7.0<br>
@nuxtjs/sitemap 2.4.0<br>
<br>
ファイル構造<br>
```
content
└─ articles
    └─ hello.md
pages
├─ articles
│   └─ _slug.vue
│
└─ index.vue
```

## @nuxtjs/sitemapのインストール

まずは@nuxtjs/sitemapをインストールしましょう。

```
npm install @nuxtjs/sitemap
```

もしくは

```
yarn add @nuxtjs/sitemap
```

でインストールできます。

## @nuxtjs/sitemapの設定

nuxt.config.jsのmoduleに、@nuxtjs/sitemapを追加し、hostnameを設定します。hostnameには、自分のサイトのURLを設定します。
> 例: https://ninebolt.net

```js[nuxt.config.js]
modules: [
  '@nuxtjs/sitemap'
],
sitemap: {
  hostname: 'https://YOUR_SITE.example'
}
```

ここまででサイトマップを生成することが可能になりますが、`nuxt generate`して生成された`dist/sitemap.xml`を見るとarticles以下の記述がありません。

```xml[dist/sitemap.xml]
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <url>
    <loc>https://your_site.example/</loc>
  </url>
</urlset>
```

<br>
ここでsitemapにルーティングの設定を追加します。

```js[nuxt.config.js]
sitemap: {
  hostname: 'https://YOUR_SITE.example',
  routes: async () => {
    const { $content } = require('@nuxt/content')
    const articles = await $content('articles').only(['path']).fetch()

    return articles.map(article => article.path)
  }
}
```

`routes`で、`content/articles`に保存された全ページを取得し、pathを返すようにします。こうすることで、@nuxt/contentで作成されたページをサイトマップに反映させることができます。<br>
articles以外のフォルダ、例えば`content/posts`のページを取得する場合は`$content('articles')`を`$content('posts')`に変更するなど、ご自身の環境に合わせてください。<br>
<br>
ここまでの設定で、もう一度`nuxt generate`をすると、以下のように`/articles/hello`が追加されているのがわかります。

```xml[dist/sitemap.xml]
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <url>
    <loc>https://your_site.example/articles/hello</loc>
  </url>
  <url>
    <loc>https://your_site.example/</loc>
  </url>
</urlset>
```

## さいごに

本当は自動でルーティングしてくれると嬉しいんですが、ひと手間かけることでsitemap.xmlにnuxt/contentのページを追加することができますので、ぜひお試しください。<br>

### 参考サイト

[@nuxtjs/sitemap - npm](https://www.npmjs.com/package/@nuxtjs/sitemap)<br>
[発展的な機能 - Nuxt Content](https://content.nuxtjs.org/ja/advanced)