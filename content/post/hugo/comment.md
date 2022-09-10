---
# Common-Defined params
title: "コメント欄追加"
date: 2022-08-31T08:37:29+09:00
description: ""
categories:
  - "Hugo"
tags:
  - "Hugo"
  - "Disqus"
# menu: main # Optional, add page to a menu. Options: main, side, footer

# Theme-Defined params
thumbnail: "img/hugo/thumb/disqus-shortname.webp" # Thumbnail image
lead: "" # Lead text
comments: true # Enable Disqus comments for specific page
authorbox: true # Enable authorbox for specific page
pager: true # Enable pager navigation (prev/next) for specific page
toc: false # Enable Table of Contents for specific page
mathjax: false # Enable MathJax for specific page
sidebar: "right" # Enable sidebar (on the right side) per page
widgets: # Enable sidebar widgets in given order per page
  - "search"
  - "recent"
  - "taglist"
---

{{< thumbnail src="/img/hugo/disqus-shortname.png" alt="コメントサービスDisqus" >}}

コメント欄を追加。[Hugo](https://gohugo.io/ "Hugoホーム")ではじめからテンプレートが用意されている
コメントサービス[Disqus](https://disqus.com/ "Disqusホーム")を利用する。
Disqusにアカウント登録してサイト用に設定するとShortnameがもらえるので、
config.tomlのdisqusShortnameに入力。

```toml
disqusShortname = "******"
```

[Mainroad](https://github.com/Vimux/Mainroad/ "Mainroadリポジトリ")をテーマに利用しているので、
パラメーターに

```yaml
comments: true
```

を設定しておけばコメント欄が表示される。
