{
    const canvas = document.getElementById("rect");
    const ctx = canvas.getContext("2d", {alpha: false});

    ctx.fillStyle = 'green';
    ctx.fillRect(10,10,300,200);
    ctx.strokeStyle = 'blue';
    ctx.lineJoin = 'bevel';
    ctx.lineWidth = 5;
    ctx.strokeRect(50,100,300,200);
    ctx.clearRect(100,50,150,150);
}