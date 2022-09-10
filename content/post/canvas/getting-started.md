---
# Common-Defined params
title: "Canvasを使ってみる"
date: 2022-09-08T12:26:13+09:00
description: ""
categories:
  - "Canvas"
tags:
  - "Canvas"
# menu: main # Optional, add page to a menu. Options: main, side, footer

# Theme-Defined params
thumbnail: "img/html/html5-logo.png" # Thumbnail image
lead: "HTMLで使える図形描画APIのCanvasを使ってみる" # Lead text
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

## Canvas使用準備

[MDNの説明](https://developer.mozilla.org/ja/docs/Web/API/Canvas_API "MDN Canvas API")を参考に
canvasの使い方を見る

```html
<canvas id="canvas" width="480" height="320"></canvas>
```

ページに描画を表示させるためのcanvasタグを入れる。
canvasタグのwidth,height属性でこのcanvasが縦横それぞれ何ピクセルなのか指定する。
cssでサイズを変更した場合、最初に確保したサイズは変わらず、
それを拡大、縮小した形で表示される。

```javascript
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d", {alpha: false});

ctx.fillStyle = 'green';
ctx.fillRect(10, 10, 150, 100);
```

文書内のcanvas要素を指定して`getContext`で描画コンテキストを取得。
MDNに背景透過をオフにした方がパフォーマンスが上がると書かれているので`{alpha: false}`を指定。
`fillStyle`で矩形の塗りを指定して`fillRect`で指定した位置に矩形を表示。

{{< canvas id="canvas">}}
{{< script src="/script/canvas/getting-started.js" >}}

## 矩形描画

```javascript
void ctx.fillRect(x, y, width, height);
void ctx.strokeRect(x, y, width, height);
void ctx.clearRect(x, y, width, height);
```

`ctx`は`CanvasRenderingContext2D`のインスタンス。
`fillRect`は矩形の塗りつぶし、`stokeRect`は線描画、`clearRect`は矩形内の描画の消去。

```javascript
ctx.fillStyle = 'green';
ctx.fillRect(10,10,300,200);
ctx.strokeStyle = 'blue';
ctx.lineJoin = 'bevel';
ctx.lineWidth = 5;
ctx.strokeRect(50,100,300,200);
ctx.clearRect(100,50,150,150);
```

`strokeStyle`で線の塗りを指定。`lineJoin`で線の角の描き方を指定。
`lineWidth`で線の太さを指定。

{{< canvas id="rect">}}
{{< script src="/script/canvas/rect.js" >}}

## 円弧描画

```javascript
arc(x, y, radius, startAngle, endAngle, counterclockwise)
```

`x, y`を中心とした半径`radius`の円弧を`startAngle`の角度から`endAngle`の角度まで、
`counterclockwise`で指定される方向に向かって描く。

角度はX軸の正の方向から時計回りに、ラジアン角で指定。
また、`counterclockwise`の初期値は`false`。

```javascript
ctx.strokeStyle="white";
ctx.lineWidth=10;
ctx.arc(100,100,50,0,Math.PI*2,true);
ctx.stroke();
    
ctx.beginPath();
ctx.arc(300,100,50,0,Math.PI*2,true);
ctx.fillStyle="green"
ctx.fill();
```

`ctx.beginPath()`でパスをリセットしている。
これが無いと二つの`arc`で作ったパスが一つのパスとして扱われるため、
最後の`fill()`で両方の円が塗りつぶされる。

{{< canvas id="arc" >}}
{{< script src="/script/canvas/arc.js">}}
