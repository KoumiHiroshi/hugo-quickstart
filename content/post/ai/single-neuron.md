---
# Common-Defined params
title: "ニューロンの学習"
date: 2022-10-08T08:44:34+09:00
description: ""
categories:
  - "AI"
tags:
  - "ニューラルネット"
# menu: main # Optional, add page to a menu. Options: main, side, footer

# Theme-Defined params
thumbnail: "img/ai/neuron.svg" # Thumbnail image
lead: "ニューロンの動きが分かったので、次は学習方法を見てみる。" # Lead text
comments: true # Enable Disqus comments for specific page
authorbox: true # Enable authorbox for specific page
pager: true # Enable pager navigation (prev/next) for specific page
toc: false # Enable Table of Contents for specific page
mathjax: true # Enable MathJax for specific page
sidebar: "right" # Enable sidebar (on the right side) per page
# widgets: # Enable sidebar widgets in given order per page
---

### ニューロンの学習

ニューロンの入力と出力の関係がわかった。
このニューロンにより良い出力を出してもらうためには、パラメータをどう動かせばいいのだろうか。

ここで、最終的に出してほしい特定の「正解値」が事前にわかっていると仮定して、
現在のニューロンの出力がどれだけ正解値から離れているかを評価する関数を「損失関数」と呼ぶ。
損失関数としてよく使われるものの一つが正解値との差を二乗したもので、
正解値<math><mi>t</mi></math>に対して<math><mi>y</mi></math>が出力されたとき、次のように書ける。

<math display="block">
  <mrow><mi>E</mi><mo>&af;</mo><mo>(</mo><mi>y</mi><mo>)</mo></mrow>
  <mo>=</mo>
  <msup>
    <mrow><mo>(</mo><mi>y</mi><mo>-</mo><mi>t</mi><mo>)</mo></mrow>
    <mn>2</mn></msup>
</math>

通常、ニューロンを単体で使うことはなく、ニューロンを組み合わせたニューラルネットとして使用する。
単体では一つの出力しか持たないニューロンが、
ニューラルネットになると複数のニューロンがそれぞれ出力を担当する。

<math><mi>n</mi></math>個のニューロンが出力を担当するニューラルネットを考える。
正解値
<math><mfenced open="" close="">
  <msub><mi>t</mi><mn>1</mn></msub>
	<mi>&hellip;</mi>
  <msub><mi>t</mi><mi>n</mi></msub></mfenced></math>
に対応する出力
<math><mfenced open="" close="">
  <msub><mi>y</mi><mn>1</mn></msub>
	<mi>&hellip;</mi>
  <msub><mi>y</mi><mi>n</mi></msub></mfenced></math>
が出力されたとき、それぞれの損失の和をとる。

<math display="block">
  <mi>E</mi><mo>&af;</mo>
  <mfenced>
  	<msub><mi>y</mi><mn>1</mn></msub>
	  <mi>&hellip;</mi>
    <msub><mi>y</mi><mi>n</mi></msub>
    </mfenced>
  <mo>=</mo>
  <msup>
    <mrow><mo>(</mo>
      <msub><mi>y</mi><mn>1</mn></msub>
      <mo>-</mo>
      <msub><mi>t</mi><mn>1</mn></msub>
      <mo>)</mo></mrow>
    <mn>2</mn></msup>
  <mo>+</mo>
  <mi>&hellip;</mi>
  <mo>+</mo>
  <msup>
    <mrow><mo>(</mo>
      <msub><mi>y</mi><mi>n</mi></msub>
      <mo>-</mo>
      <msub><mi>t</mi><mi>n</mi></msub>
      <mo>)</mo></mrow>
    <mn>2</mn></msup>
</math>

行列で表現すると

<math display="block">
  <mi mathvariant="bold-italic">y</mi>
  <mo>=</mo>
  <mfenced><mtable>
    <mtr><mtd><msub><mi>y</mi><mn>1</mn></msub></mtr></mtd>
	  <mtr><mtd><mi>&vellip;</mi></mtr></mtd>
    <mtr><mtd><msub><mi>y</mi><mi>n</mi></msub></mtr></mtd></mtable></mfenced>
  <mo>,</mo><mspace width="1em" />
  <mi mathvariant="bold-italic">t</mi>
  <mo>=</mo>
  <mfenced><mtable>
    <mtr><mtd><msub><mi>t</mi><mn>1</mn></msub></mtr></mtd>
	  <mtr><mtd><mi>&vellip;</mi></mtr></mtd>
    <mtr><mtd><msub><mi>t</mi><mi>n</mi></msub></mtr></mtd></mtable></mfenced></math>

<math display="block">
  <mrow><mi>E</mi><mo>&af;</mo>
  <mo>(</mo>
  <mi mathvariant="bold-italic">y</mi>
  <mo>)</mo></mrow>
  <mo>=</mo>
  <mo>||</mo>
      <mi mathvariant="bold-italic">y</mi>
      <mo>-</mo>
      <mi mathvariant="bold-italic">t</mi>
  <mo>||</mo>
</math>

という具合に、ベクトルのノルムで表現できる。

損失が小さくなるようにパラメータを調節していけば、正解値に近い値を出力するようになるが、
問題はどうやって調整するかというところだ。

損失関数が微分可能なら、損失関数が下る方向にパラメータを調整すればさらに損失関数が小さくなる。
傾きが大きいほど正解値から離れていると考えて、パラメータを多きく動かすようにすれば良い。

損失関数の傾きは微分によって得られるので、損失関数<math><mi>E</mi></math>に影響を与えるパラメータ<math><mi>w</mi></math>
に対して次のように値を更新し、それを繰り返していけば出力が正解値に近づいていく。

<math display="block"><mi>w</mi><mo>&larr;</mo>
  <mi>w</mi><mo>-</mo><mi>&eta;</mi>
  <mfrac>
    <mrow><mo>d</mo><mi>E</mi></mrow>
    <mrow><mo>d</mo><mi>w</mi></mrow></mfrac>
</math>

<math><mi>&eta;</mi></math>は学習率と呼ばれ、一回の学習でパラメータを動かす度合を調整するために設定される。
学習率が大きすぎれば一度の学習で正解値を大幅に通り過ぎて、なかなか収束しなかったり、
逆に小さすぎれば極小値にとらわれて正解値に近づかなくなったりするらしい。

### 単一ニューロンでの学習

簡単にするため、単一ニューロンで学習した場合どうなるかを見てみる。
活性化関数はシグモイド関数で、学習係数は1とする。

<fieldset id="input">
  <legend>入力</legend>
  <div class="parambar">
    <label>x1</label>
    <input type="number" value="0" step="0.01" min="-1" max="1">
    <input type="range" name="x1" step="0.01" min="-1" max="1"></div>
  <div class="parambar">
    <label>x2</label>
    <input type="number" value="0" step="0.01" min="-1" max="1">
    <input type="range" name="x2" step="0.01" min="-1" max="1"></div>
  <div class="parambar">
    <label>x3</label>
    <input type="number" value="0" step="0.01" min="-1" max="1">
    <input type="range" name="x3" step="0.01" min="-1" max="1"></div>
</fieldset>

<fieldset id="parameter">
  <legend>パラメータ w:重み b:バイアス</legend>
  <div class="parambar">
    <label>w1</label>
    <input type="number" value="0" step="0.01" min="-1" max="1">
    <input type="range" name="w1" step="0.01" min="-1" max="1"></div>
  <div class="parambar">
    <label>w2</label>
    <input type="number" value="0" step="0.01" min="-1" max="1">
    <input type="range" name="w2" step="0.01" min="-1" max="1"></div>
  <div class="parambar">
    <label>w3</label>
    <input type="number" value="0" step="0.01" min="-1" max="1">
    <input type="range" name="w3" step="0.01" min="-1" max="1"></div>
  <div class="parambar">
    <label>b</label>
    <input type="number" value="0" step="0.01" min="-1" max="1">
    <input type="range" name="b" step="0.01" min="-1" max="1"></div>
</fieldset>
<label>正解値<input id="t" type="number" value="0" step="0.01" min="-1" max="1"></label>
<button id="random" type="button">ランダム</button>
<button id="learn">学習</button>

<svg viewBox="0 0 600 480">
  <marker id="arrow" markerUnits="strokeWidth" markerWidth="5" markerHeight="5" viewBox="-10 -10 20 20" orient="auto">
    <polygon points="-10,-10 10,0 -10,10" stroke="none" class="color-mode"/>
  </marker>
  <filter x="0" y="0" width="1" height="1" id="background">
    <feFlood flood-color="white"/>
    <feComposite in="SourceGraphic" operator="over"/>
  </filter>
  <circle cx="300" cy="240" r="50" fill="#7090c0"/>
  <text x="50" y="120" font-size="1.5em" class="color-mode">x1</text>
  <line x1="100" y1="120" x2="150" y2="140" stroke-width="4" marker-end="url(#arrow)" class="color-mode"/>
  <text id="x1" x="30" y="145" filter="url(#background)" font-size="1.5em" class="color-mode">####</text>
  <text x="50" y="240" font-size="1.5em" class="color-mode">x2</text>
  <line x1="100" y1="240" x2="150" y2="240" stroke-width="4" marker-end="url(#arrow)" class="color-mode"/>
  <text id="x2" x="30" y="265" filter="url(#background)" font-size="1.5em" class="color-mode">####</text>
  <text x="50" y="360" font-size="1.5em" class="color-mode">x3</text>
  <line x1="100" y1="340" x2="150" y2="320" stroke-width="4" marker-end="url(#arrow)" class="color-mode"/>
  <text id="x3" x="30" y="385" filter="url(#background)" font-size="1.5em" class="color-mode">####</text>
  <text x="190" y="160" font-size="1.5em" class="color-mode">w1</text>
  <text id="w1" x="180" y="185" filter="url(#background)" font-size="1.5em" class="color-mode">####</text>
  <text x="190" y="240" font-size="1.5em" class="color-mode">w2</text>
  <text id="w2" x="180" y="265" filter="url(#background)" font-size="1.5em" class="color-mode">####</text>
  <text x="190" y="320" font-size="1.5em" class="color-mode">w3</text>
  <text id="w3" x="180" y="345" filter="url(#background)" font-size="1.5em" class="color-mode">####</text>
  <text x="140" y="420" font-size="1.5em" class="color-mode">b</text>
  <line x1="200" y1="420" x2="250" y2="360" stroke-width="4" marker-end="url(#arrow)" class="color-mode"/>
  <text id="b" x="120" y="445" filter="url(#background)" font-size="1.5em" class="color-mode">####</text>
  <text x="480" y="240" font-size="1.5em" class="color-mode">y</text>
  <text id="y" x="460" y="265" font-size="1.5em" class="color-mode">####</text>
  <line x1="380" y1="240" x2="440" y2="240" stroke-width="4" marker-end="url(#arrow)" class="color-mode"/>
</svg>

<script>
var params;
params = document.getElementsByClassName('parambar');
var labels = ["x1", "x2", "x3", "w1", "w2", "w3", "b"].map(x => document.getElementById(x));
for(let i = 0; i < params.length; i++){
  let num;
  let range;
  num = params[i].children[1];
  range = params[i].children[2];
  range.addEventListener('input', (event) => {
    num.value = range.value;
    let evt = new Event('input');
    num.dispatchEvent(evt);
  });
  num.addEventListener('input', (event) => {
    range.value = num.value;
    labels[i].innerHTML = Number(num.value).toExponential(6);
    let y = document.getElementById('y');
    let pv = new Array();
    Array.from(params).forEach(x => {
      pv.push(Number(x.children[1].value));
    });
    y.innerHTML = (sigmoid(pv[0] * pv[3] + pv[1] * pv[4] + pv[2] * pv[5] + pv[6])).toExponential(6);
  });
}
var x1 = params[0].children[1];
var x2 = params[1].children[1];
var x3 = params[2].children[1];
var w1 = params[3].children[1];
var w2 = params[4].children[1];
var w3 = params[5].children[1];
var b  = params[6].children[1];
var t  = document.getElementById('t');
var random = document.getElementById('random');
random.addEventListener('click',(event) => {
  [x1, x2, x3, w1, w2, w3, b].map((x) => {
    x.value = Math.random() - 0.5;
    let evt = new Event('input');
    x.dispatchEvent(evt);
  });
});
var learn = document.getElementById('learn');
learn.addEventListener('click', event => {
  let u = Number(x1.value) * Number(w1.value)
    + Number(x2.value) * Number(w2.value)
    + Number(x3.value) * Number(w3.value)
    + Number(b.value);
  w1.value = w1.value - x1.value * sigmoid(u) * (1 - sigmoid(u)) * (sigmoid(u) - t.value);
  w2.value = w2.value - x2.value * sigmoid(u) * (1 - sigmoid(u)) * (sigmoid(u) - t.value);
  w3.value = w3.value - x3.value * sigmoid(u) * (1 - sigmoid(u)) * (sigmoid(u) - t.value);
  b.value = b.value - sigmoid(u) * (1 - sigmoid(u)) * (sigmoid(u) - t.value);
  let evt = new Event('input');
  w1.dispatchEvent(evt);
  w2.dispatchEvent(evt);
  w3.dispatchEvent(evt);
  b.dispatchEvent(evt);
});
function sigmoid(x){
  return (1/(1+Math.exp(-x)));
}
window.addEventListener('DOMContentLoaded', (event) => {
});
</script>

入力が一定なのでほとんど意味のない形だが、学習のたびに出力が正解値に近づくことがわかる。
この場合は正解値が入力に依存して変化しないので、bだけ動かせば正解値が出せてしまう。
