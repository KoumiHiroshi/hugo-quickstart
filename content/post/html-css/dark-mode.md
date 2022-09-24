---
# Common-Defined params
title: "ダークモードに対応"
date: 2022-09-13T07:53:30+09:00
description: ""
categories:
  - "HTML/CSS"
tags:
  - "Dark Mode"
  - "SVG"
# menu: main # Optional, add page to a menu. Options: main, side, footer

# Theme-Defined params
thumbnail: "img/html-css/html5-logo.png" # Thumbnail image
lead: "最近はダークモードに対応するシステムが増えている。ダークモードが設定されているときに、メディアクエリを利用して適用するスタイルを変えられるので、このブログをダークモードに対応させてみる。" # Lead text
comments: true # Enable Disqus comments for specific page
authorbox: true # Enable authorbox for specific page
pager: true # Enable pager navigation (prev/next) for specific page
toc: false # Enable Table of Contents for specific page
mathjax: false # Enable MathJax for specific page
sidebar: "right" # Enable sidebar (on the right side) per page
# widgets: # Enable sidebar widgets in given order per page
---

## ダークモードとは

ダークモードは背景を暗い色に、背景以外の要素を明るい色で表示するスタイル。
「ダークモード」という言葉が使われるようになって、
今までよく使われてきた明るい背景のテーマを「ライトモード」と呼んだりするようになった。

ディスプレイにOLED（有機EL）に使用している端末では明るさに応じて消費電力が変わるのだが、
ダークモードを使えば輝度を上げても比較的消費電力を抑えられる。
表示する内容が主に文字であれば、ダークモードを使って輝度を上げることで、
消費電力を変えずに視認性が上がると期待できる。（たぶん）
参考：[lifehacker - ダークモード「スマホのバッテリーを長持ちさせる」は本当か？](https://www.lifehacker.jp/article/239725dark-mode-not-save-smartphone-battery-life/)

## ダークモードの設定 - Windowsの場合

![ダークモードの設定](/img/html-css/dark-mode-setting.png)
Windows11の場合

> 個人用設定 → 色

で出てくる画面にダークモード/ライトモードの設定がある。
Windows10でも大体同じやり方のはず。

## CSSのメディアクエリを使う

サイトの閲覧に使われているシステムに、ダークモードが設定されているかどうかに応じて
スタイルを適用する場合はCSSで次のように書く。

```css
@media (prefers-color-scheme: dark) {
  p {
    background: black;
    color: white;
  }
}
```

ライトモードの場合は`prefers-color-scheme: light`を使う。
システムデフォルトはライトモードだと見なして、基本はライトモード用の色指定で、
メディアクエリでダークモード用の色指定を追加するやり方が無難だと思ったので。
このブログではそのようにした。

参考：[MDN - prefers-color-scheme](https://developer.mozilla.org/ja/docs/Web/CSS/@media/prefers-color-scheme)

## ダークモードのテスト

サイトをダークモードで表示したときと、ライトモードで表示したときを見比べるのに、
Firefoxの現行バージョン104.0.2の場合「開発ツール」が使える。

![Firefox開発ツール](/img/html-css/dark-mode-test.png)

キーボードショートカット<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd>で開発ツールを表示させてから、
右下にある太陽マークと月マークを押すことで、ダーク/ライトモードをテストできる。

## SVG要素にも使える

SVG要素の中でもメディアクエリが使えるので

```svg
<svg width="600" height="400" viewBox="0 0 10 5">
    <style>
text, circle { fill: black }
@media (prefers-color-scheme: dark) {
    text, circle { fill: white }
}
   </style>
    <text x="1" y="1" font-size="1">SVGテスト</text>
    <circle cx="3" cy="3" r="1"/>
</svg>
```

このように書ける。ただし、SVGファイルをimgタグで読み込んだ場合は開発者ツールのボタンで切り替わらなかった。
ブラウザでSVGファイルを画像として読み込むと、システムの設定を直接参照するのかもしれない。

<svg width="600" height="400" viewBox="0 0 10 5">
    <style>
text, circle { fill: black }
@media (prefers-color-scheme: dark) {
    text, circle { fill: white }
}
    </style>
    <text x="1" y="1" font-size="1">SVGテスト</text>
    <circle cx="3" cy="3" r="1"/>
</svg>
