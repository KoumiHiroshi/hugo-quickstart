set title "tanh関数";
set terminal svg dynamic fontscale 1.5;
set zeroaxis;
set grid;
f(x) = tanh(x);
g(x) = 1-(tanh(x))**2;
plot [-8:8] [-1.2:1.4] f(x) title "tanh(x)", g(x) title "d/dx tanh(x)";