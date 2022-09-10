{
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d", {alpha: false});

    ctx.fillStyle = 'green';
    ctx.fillRect(10, 10, 150, 100);
}