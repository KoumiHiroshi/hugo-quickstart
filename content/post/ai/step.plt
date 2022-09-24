set title "ステップ関数";
set terminal svg dynamic fontscale 1.5;
set zeroaxis;
set grid;
set samples 200;
f(x) = x>=0?1:0;
plot [-1:1] [-0.2:1.2] f(x) with steps;