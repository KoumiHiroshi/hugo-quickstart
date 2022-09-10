{
    const canvas = document.getElementById("arc");
    const ctx = canvas.getContext("2d", {alpha: false});

    ctx.strokeStyle="white";
    ctx.lineWidth=10;
    ctx.arc(100,100,50,0,Math.PI*2,true);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(300,100,50,0,Math.PI*2,true);
    ctx.fillStyle="green"
    ctx.fill();
}