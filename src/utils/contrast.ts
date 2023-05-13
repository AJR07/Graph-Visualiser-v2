import Color from "./color";

export default function contrast(clr: Color) {
    let r = parseInt(clr.slice(1, 3), 16);
    let g = parseInt(clr.slice(3, 5), 16);
    let b = parseInt(clr.slice(5, 7), 16);
    let luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    if (luma > 128) {
        return 0;
    } else {
        return 255;
    }
}
