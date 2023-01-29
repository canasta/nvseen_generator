const canvas_width = 640;
const canvas_height = 360;
const font_size = 30;

let size_select = 1;
let line_split = 'auto';

const draw_canvas = () => {
    const canvas = document.getElementById("meme");
    canvas.width = canvas_width * size_select;
    canvas.height = canvas_height * size_select;

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

            let lines = [];
            if (line_split == 'auto') {
                if (text.length >= 8) {
                    text = text.trim()
                    const line_counts = parseInt((text.length - 1) / 8) + 1;
                    const line_length = parseInt(text.length/line_counts);
                    for (let i=0; i < line_counts - 1; i++){
                        lines.push(text.slice(i * line_length, (i+1) * line_length).trim());
                    }
                    lines.push(text.slice(line_length * (line_counts - 1)).trim());
                } else {
                    lines = [text];
                }
            } else if (line_split == 'slash') {
                lines = text.split('/');
            } else if (line_split == 'one') {
                lines.push(text);
            }
            
            let max_line_length = 0;
            let _font_size = font_size;
            lines.forEach(element => {
                if (element.length > max_line_length) max_line_length = element.length;
            });
            if (max_line_length > 7 || lines.length > 4) {
                _font_size = Math.min(parseInt(300 / max_line_length / 2) * 2, parseInt(50 / lines.length) * 2);
                ctx.font = _font_size * size_select + "px 궁서체";
                console.log(_font_size);
            }

            for (let i=0; i < lines.length; i++) {
                ctx.fillText(lines[i],
                    150 * size_select,
                    (280 - (lines.length - 1) * parseInt(_font_size/2) + i * _font_size) * size_select);
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
    // document.querySelector("input[name='size']").addEventListener('change',
    //     () => {
    //         size_select = document.querySelector("input[name='size']:checked").value;
    //         console.log('changed');
    //         draw_canvas();
    //     }
    // );
    document.querySelectorAll("input[name='size']").forEach(qs => {
        qs.onchange = (ev) => {
            if (ev.target.checked) {
                size_select = ev.target.value;
                draw_canvas();
            }
        }
    });
    
    document.querySelectorAll("input[name='linesplit']").forEach(qs => {
        qs.onchange = (ev) => {
            if (ev.target.checked) {
                line_split = ev.target.value;
                draw_canvas();
            }
        }
    });
}