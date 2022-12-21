const canvas_width = 640;
const canvas_height = 360;
const font_size = 30;
let size_select = 1;

const draw_canvas = () => {
    const canvas = document.getElementById("meme");

    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");

        const bgimg = new Image();
        if (size_select == 1)
            bgimg.src = "./images/bg-640_360.jpg";
        else if (size_select == 2)
            bgimg.src = "./images/bg-1280_720.jpg";
        // bgimg.crossOrigin = '*';

        bgimg.onload = () => {
            ctx.drawImage(bgimg, 0, 0, canvas_width * size_select, canvas_height * size_select);

            ctx.font = font_size * size_select + "px 궁서체";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
        
            let text = document.getElementById("text").value;
            text = text.trim()
            let lines = [];
            if (text.length >= 8) {
                const line_counts = parseInt((text.length - 1) / 8) + 1;
                const line_length = parseInt(text.length/line_counts);
                for (let i=0; i < line_counts - 1; i++){
                    lines.push(text.slice(i * line_length, (i+1) * line_length).trim());
                }
                lines.push(text.slice(line_length * (line_counts - 1)).trim());
            } else {
                lines = [text];
            }
            for (let i=0; i < lines.length; i++) {
                ctx.fillText(lines[i], 150, 280 - (lines.length - 1) * parseInt(font_size/2) + i * font_size);
            }
        }
    } else {
        // canvas-unsupported
    }  
}

window.onload = () => {
    draw_canvas();

    document.getElementById("download").addEventListener('click',
    event => 
        event.target.href = document.getElementById("meme").toDataURL("image/png")
    );
    document.getElementById("text").onchange = draw_canvas;
}