---
# Common-Defined params
title: "ニューロンの仕組み"
date: 2022-09-24T09:25:52+09:00
description: ""
categories:
  - "AI"
tags:
  - "ニューラルネット"
# menu: main # Optional, add page to a menu. Options: main, side, footer

# Theme-Defined params
thumbnail: "img/ai/neuron.svg" # Thumbnail image
lead: "AIの基礎的な仕組みを調べる" # Lead text
comments: true # Enable Disqus comments for specific page
authorbox: true # Enable authorbox for specific page
pager: true # Enable pager navigation (prev/next) for specific page
toc: false # Enable Table of Contents for specific page
mathjax: true # Enable MathJax for specific page
sidebar: "right" # Enable sidebar (on the right side) per page
# widgets: # Enable sidebar widgets in given order per page
---

## 形式ニューロン

参考：[Wikipedia - ニューラルネットワーク](https://ja.wikipedia.org/wiki/ニューラルネットワーク)

<figure>
<svg viewBox="0 0 600 300">
  <circle cx="300" cy="150" r="50" fill="#7090c0" />
  <marker id="arrow" markerUnits="strokeWidth" markerWidth="5" markerHeight="5" viewBox="-10 -10 20 20" orient="auto">
    <polygon points="-10,-10 10,0 -10,10" stroke="none" class="color-mode"/>
  </marker>
  <line x1="100" y1="100" x2="180" y2="120" stroke-width="4" marker-end="url(#arrow)" class="color-mode"/>
  <foreignObject x="50" y="60" width="2em" height="2em" font-size="1.7em">
    <math xmlns="http://www.w3.org/1998/Math/MathML">
      <msub><mi>x</mi><mn>1</mn></msub>
    </math>
  </foreignObject>
  <line x1="100" y1="140" x2="180" y2="150" stroke-width="4" marker-end="url(#arrow)" class="color-mode"/>
  <foreignObject x="50" y="100" width="2em" height="2em" font-size="1.7em">
    <math xmlns="http://www.w3.org/1998/Math/MathML">
      <msub><mi>x</mi><mn>2</mn></msub>
    </math>
  </foreignObject>
  <text x="60" y="170" font-size="1.5em" class="color-mode">&vellip;</text>
  <line x1="100" y1="190" x2="180" y2="180" stroke-width="4" marker-end="url(#arrow)" class="color-mode"/>
  <foreignObject x="50" y="170" width="2em" height="2em" font-size="1.7em">
    <math xmlns="http://www.w3.org/1998/Math/MathML">
      <msub><mi>x</mi><mi>n</mi></msub>
    </math>
  </foreignObject>
  <text x="50" y="250" font-size="1.5em" class="color-mode">入力</text>
  <line x1="400" y1="150" x2="490" y2="150" stroke-width="4" marker-end="url(#arrow)" class="color-mode"/>
  <foreignObject x="520" y="120" width="2em" height="2em" font-size="1.7em">
    <math xmlns="http://www.w3.org/1998/Math/MathML">
      <mi>y</mi>
    </math>
  </foreignObject>
  <text x="500" y="230" font-size="1.5em" class="color-mode">出力</text>
  <foreignObject x="200" y="100" width="2em" height="2em" font-size="1.7em">
    <math xmlns="http://www.w3.org/1998/Math/MathML">
      <msub><mi>m</mi><mn>1</mn></msub>
    </math>
  </foreignObject>
  <foreignObject x="200" y="125" width="2em" height="2em" font-size="1.7em">
    <math xmlns="http://www.w3.org/1998/Math/MathML">
      <msub><mi>m</mi><mn>2</mn></msub>
    </math>
  </foreignObject>
  <foreignObject x="200" y="155" width="2em" height="2em" font-size="1.7em">
    <math xmlns="http://www.w3.org/1998/Math/MathML">
      <msub><mi>m</mi><mi>n</mi></msub>
    </math>
  </foreignObject>
  <line x1="170" y1="240" x2="220" y2="210" stroke-width="4" marker-end="url(#arrow)" class="color-mode"/>
  <foreignObject x="140" y="220" width="2em" height="2em" font-size="1.7em">
    <math xmlns="http://www.w3.org/1998/Math/MathML"><mi>b</mi></math>
  </foreignObject>
  <text x="110" y="280" font-size="1.5em" class="color-mode">バイアス</text>
  <text x="200" y="90" font-size="1.5em" class="color-mode">重み</text>
  <foreignObject x="270" y="130" width="3em" height="2em" font-size="1.7em">
    <math xmlns="http://www.w3.org/1998/Math/MathML">
      <mi>f</mi><mo>&af;</mo><mo>(</mo><mi>x</mi><mo>)</mo>
    </math>
  </foreignObject>
  <text x="250" y="230" font-size="1.5em" class="color-mode">活性化関数</text>
</svg>
<figcaption>形式ニューロン</figcaption>
</figure>

ニューロン（神経細胞）の働きを大雑把に見ると、多数の入力側の突起から受け取ったパルス信号が本体に集まり、
しきい値を超えると出力側にもパルス信号を送る、といったものになる。

形式ニューロンはニューロンの働きをモデル化したもので、入力
<math><mfenced open="" close=""><msub><mi>x</mi><mn>1</mn></msub><mi>&hellip;</mi><msub><mi>x</mi><mi>n</mi></msub></mfenced></math>
に対して出力
<math><mi>y</mi></math>
を出力する。

入力はそれぞれ対応する
<math><mfenced open="" close=""><msub><mi>m</mi><mn>1</mn></msub><mi>&hellip;</mi><msub><mi>m</mi><mi>n</mi></msub></mfenced></math>
で重みづけられ、バイアス項
<math><mi>b</mi></math>と共に総和をとって活性化関数<math><mi>f</mi></math>に渡され、その結果が出力
<math><mi>y</mi></math>
となる。

次のように
<math><mfenced open="" close=""><mi mathvariant="bold-script">x</mi><mi mathvariant="bold-script">m</mi></math>
を定義すると

<math display="block"><mi mathvariant="bold-script">x</mi><mo>=</mo>
<mfenced><mtable>
	<mtr><mtd><msub><mi>x</mi><mn>1</mn></msub></mtd></mtr>
	<mtr><mtd><mi>&vellip;</mi></mtd></mtr>
	<mtr><mtd><msub><mi>x</mi><mi>n</mi></msub></mtd></mtr></mtable></mfenced></math>
<math display="block"><mi mathvariant="bold-script">m</mi><mo>=</mo>
<mfenced><mtable>
	<mtr>
		<mtd><msub><mi>m</mi><mn>1</mn></msub></mtd>
		<mtd><mi>&hellip;</mi></mtd>
    <mtd><msub><mi>m</mi><mi>n</mi></msub></mtd></mtr></mtable></mfenced></math>

<math><mi mathvariant="bold-script">m</mi><mo>&it;</mo><mi mathvariant="bold-script">x</mi></math>を行列の積のように表せる。

<math display="block">
<mtable columnalign="right center left" displaystyle="true">
	<mtr>
		<mtd><mi mathvariant="bold-script">m</mi><mo>&it;</mo><mi mathvariant="bold-script">x</mi></mtd>
		<mtd><mo>=</mo></mtd>
		<mtd>
			<msub><mi>m</mi><mn>1</mn></msub><mo>&it;</mo><msub><mi>x</mi><mn>1</mn></msub><mo>+</mo>
      <msub><mi>m</mi><mn>2</mn></msub><mo>&it;</mo><msub><mi>x</mi><mn>2</mn></msub><mo>+</mo>
			<mi>&hellip;</mi><mo>+</mo>
			<msub><mi>m</mi><mi>n</mi></msub><mo>&it;</mo><msub><mi>x</mi><mi>n</mi></msub></mtd></mtr>
	<mtr>
		<mtd></mtd>
		<mtd><mo>=</mo></mtd>
		<mtd>
			<munderover>
				<mo>&sum;</mo>
				<mrow><mi>k</mi><mo>=</mo><mn>1</mn></mrow>
				<mi>n</mi></munderover>
      <msub><mi>m</mi><mi>k</mi></msub><mo>&it;</mo><msub><mi>x</mi><mi>k</mi></msub></mtd></mtr></mtable></math>

出力は次のように書ける

<math display="block">
  <mi>y</mi><mo>=</mo>
  <mi>f</mi><mo>&af;</mo><mo>(</mo>
  <mi mathvariant="bold-script">m</mi><mo>&it;</mo><mi mathvariant="bold-script">x</mi>
  <mo>+</mo><mi>b</mi><mo>)</mo></math>

## 活性化関数

### ステップ関数

<math display="block"><mrow><mi>f</mi><mo>&af;</mo><mo>(</mo><mi>x</mi><mo>)</mo></mrow><mo>=</mo>
  <mrow><mo rspace="0.5em">{</mo>
    <mtable>
      <mtr><mtd><mn>1</mn></mtd><mtd><mi>x</mi><mo>&ge;</mo><mn>0</mn></mtd></mtr>
      <mtr><mtd><mn>0</mn></mtd><mtd><mi>x</mi><mo>&lt;</mo><mn>0</mn></mtd></mtr></mtable></mrow></math>

{{< gnuplot "/img/ai/step.svg#gnuplot_canvas" >}}

※<math><mi>x</mi><mo>=</mo><mn>0</mn></math>で不連続になる

最初期のニューラルネットで使われたらしい。
ニューラルネットの学習時には、可変パラメーターである重みやバイアスで出力を微分した値を見て
それらのパラメーターをどう動かすか決めていくことになる。
ところが、ステップ関数を微分するとほぼ全域で0になってしまうので学習に利用しづらいという欠点がある。

### シグモイド関数

<math display="block">
  <mrow><mi>f</mi><mo>&af;</mo><mo>(</mo><mi>x</mi><mo>)</mo></mrow>
  <mo>=</mo>
  <mfrac>
    <mn>1</mn>
    <mrow><mn>1</mn><mo>+</mo>
      <msup>
        <mi>e</mi>
        <mrow><mo>-</mo><mi>x</mi></mrow></msup></mrow></mfrac></math>

<math display="block">
  <mrow>
    <mfrac>
      <mo>d</mo>
      <mrow><mo>d</mo><mi>x</mi></mrow></mfrac>
    <mrow><mi>f</mi><mo>&af;</mo><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow>
  <mo>=</mo>
  <mfrac>
    <msup>
        <mi>e</mi>
        <mrow><mo>-</mo><mi>x</mi></mrow></msup>
    <msup>
      <mrow><mo>(</mo><mn>1</mn><mo>+</mo>
        <msup>
          <mi>e</mi>
          <mrow><mo>-</mo><mi>x</mi></mrow></msup><mo>)</mo></mrow></mrow>
      <mn>2</mn></msup></mfrac></math>

{{< gnuplot "/img/ai/sigmoid.svg#gnuplot_canvas" >}}

シグモイド関数は微分可能なので、出力をパラメーターで微分した値を見てパラメーターを調整する手法が使える。

また、シグモイド関数の導関数は元のシグモイド関数の組み合わせで表現できる。

<math display="block">
  <mtable displaystyle="true">
    <mtr>
      <mtd><mrow>
        <mfrac>
          <mo>d</mo>
          <mrow><mo>d</mo><mi>x</mi></mrow></mfrac>
        <mrow><mi>f</mi><mo>&af;</mo><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></mtd>
      <mtd><mo>=</mo></mtd>
      <mtd>
        <mfrac>
          <msup>
            <mi>e</mi>
            <mrow><mo>-</mo><mi>x</mi></mrow></msup>
          <msup>
            <mrow><mo>(</mo><mn>1</mn><mo>+</mo>
              <msup>
                <mi>e</mi>
                <mrow><mo>-</mo><mi>x</mi></mrow></msup><mo>)</mo></mrow></mrow>
            <mn>2</mn></msup></mfrac></mtd></mtr>
    <mtr>
      <mtd></mtd>
      <mtd><mo>=</mo></mtd>
      <mtd>
        <mfrac>
          <mn>1</mn>
          <mrow><mn>1</mn><mo>+</mo>
            <msup>
              <mi>e</mi>
              <mrow><mo>-</mo><mi>x</mi></mrow></msup></mrow></mfrac>
        <mo>-</mo>
        <mfrac>
          <mn>1</mn>
          <msup>
            <mrow>
              <mo>(</mo><mn>1</mn><mo>+</mo>
              <msup>
                <mi>e</mi>
                <mrow><mo>-</mo><mi>x</mi></mrow></msup>
              <mo>)</mo></mrow>
            <mn>2</mn></msup></mfrac></mtd></mtr>
    <mtr>
      <mtd></mtd>
      <mtd><mo>=</mo></mtd>
      <mtd>
        <mo>(</mo>
        <mrow>
          <mfrac>
            <mn>1</mn>
            <mrow><mn>1</mn><mo>+</mo>
              <msup>
                <mi>e</mi>
                <mrow><mo>-</mo><mi>x</mi></mrow></msup></mrow></mfrac></mrow>
        <mo>)</mo>
        <mo>&it;</mo>
        <mo>(</mo>
        <mn>1</mn>
        <mn>-</mn>
        <mfrac>
          <mn>1</mn>
          <mrow><mn>1</mn><mo>+</mo>
            <msup>
              <mi>e</mi>
              <mrow><mo>-</mo><mi>x</mi></mrow></msup></mrow></mfrac>
        <mo>)</mo></mtd></mtr>
    <mtr>
      <mtd></mtd>
      <mtd><mo>=</mo></mtd>
      <mtd>
        <mi>f</mi><mo>&af;</mo><mo>(</mo><mi>x</mi><mo>)</mo>
        <mo>&it;</mo>
        <mo>(</mo>
        <mrow>
          <mn>1</mn>
          <mo>-</mo>
          <mi>f</mi><mo>&af;</mo><mo>(</mo><mi>x</mi><mo>)</mo></mrow>
        <mo>)</mo></mtd></mtr></mtable></math>

### tanh関数

<math display="block">
  <mrow>
    <mi>tanh</mi>
    <mo>&af;</mo>
    <mo>(</mo>
    <mi>x</mi>
    <mo>)</mo></mrow>
  <mo>=</mo>
  <mfrac>
    <mrow>
      <msup>
        <mi>e</mi>
        <mi>x</mi></msup>
      <mo>-</mo>
      <msup>
        <mi>e</mi>
        <mrow><mo>-</mo><mi>x</mi></mrow></msup></mrow>
    <mrow>
      <msup>
        <mi>e</mi>
        <mi>x</mi></msup>
      <mo>+</mo>
      <msup>
        <mi>e</mi>
        <mrow><mo>-</mo><mi>x</mi></mrow></msup></mrow></mfrac></math>

<math display="block">
  <mfrac>
    <mo>d</mo>
    <mrow><mo>d</mo><mi>x</mi></mrow></mfrac>
  <mrow>
    <mi>tanh</mi>
    <mo>&af;</mo>
    <mo>(</mo>
    <mi>x</mi>
    <mo>)</mo></mrow>
  <mo>=</mo>
  <mn>1</mn>
  <mo>-</mo>
  <msup>
    <mrow>
      <mo>(</mo>
      <mi>tanh</mi>
      <mo>&af;</mo>
      <mo>(</mo>
      <mi>x</mi>
      <mo>)</mo>
      <mo>)</mo></mrow>
    <mn>2</mm></msup></math>

{{< gnuplot "/img/ai/tanh.svg#gnuplot_canvas" >}}

双曲線関数はシグモイド関数をちょうど下に伸ばした形をしている。シグモイド関数を
<math><mi>&sigma;</mi><mo>&af;</mo><mo>(</mo><mi>x</mi><mo>)</mo></math>
とすると次のように書ける。

<math display="block">
  <mrow>
    <mi>tanh</mi>
    <mo>&af;</mo>
    <mo>(</mo>
    <mi>x</mi>
    <mo>)</mo></mrow>
  <mo>=</mo>
  <mn>2</mn>
  <mo>&it;</mo>
  <mi>&sigma;</mi>
  <mo>&af;</mo>
  <mo>(</mo>
  <mn>2</mn>
  <mo>&it;</mo>
  <mi>x</mi>
  <mo>)</mo>
  <mo>-</mo>
  <mn>1</mn>
</math>

シグモイド関数と違って出力の中心がゼロとなるため、ある問題が起こりづらいらしい。
自分ではまだ分かっていないので、調べておく。

これらの活性化関数が「古典的」な活性化関数となるらしい。
より実用的な活性化関数もあるようだが、
ニューラルネットの仕組みを学ぶ段階ではまず古典的なものを使ってみる。