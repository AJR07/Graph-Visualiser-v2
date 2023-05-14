/**
 * Define a type for RGB colors
 *
 * @typedef {RGB}
 */
type RGB = `rgb(${number}, ${number}, ${number})`;
/**
 * Define a type for RGBA (+ Alpha) colors
 *
 * @typedef {RGBA}
 */
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
/**
 * Define a type for HEX colors
 *
 * @typedef {HEX}
 */
type HEX = `#${string}`;

/**
 * Define a type for colors
 *
 * @typedef {Color}
 */
type Color = RGB | RGBA | HEX;

export default Color;
