set title "シグモイド関数";
set terminal svg dynamic fontscale 1.5;
set zeroaxis;
set grid;
f(x) = 1/(1+exp(-x));
g(x) = exp(-x)/(1+exp(-x))**2;
plot [-8:8] [-0.1:1.2] f(x), g(x) title "d/dx f(x)";