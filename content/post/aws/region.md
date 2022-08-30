---
# Common-Defined params
title: "AWS Amplifierのリージョン設定を間違えていた"
date: 2022-08-30T17:26:30+09:00
description: ""
categories:
  - "AWS"
tags:
  - "AWS"
  - "Amplifier"
# menu: main # Optional, add page to a menu. Options: main, side, footer

# Theme-Defined params
thumbnail: "img/aws/thumb/aws-region.webp" # Thumbnail image
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

{{< thumbnail src="/img/aws/aws-region.png" alt="AWSのリージョン設定" >}}

このサイトは[Amazon Web Services](https://aws.amazon.com "Amazon Web Servicesホーム")
のAWS Amplifyというサービスを利用してホストしているのだが、
設定を眺めていたらリージョンがバージニアになっていた。
このリージョンを明示的に設定した記憶がないのでAWS Amplifyの初期値なのかも…？

スナップショットをとって別のリージョンに移す方法もあるようだが、
まだリポジトリも小さいので、東京リージョンに新しくインスタンスを作った。
小さなサイトにはあまり影響ないかもしれないけれど、きっと近い方が遅延は減るはずだから。