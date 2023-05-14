/**
 * Utility Pair class
 * Has arbitrary first and second fields
 *
 * @export
 * @class Pair
 * @typedef {Pair}
 * @template First
 * @template Second
 */
export default class Pair<First, Second> {
    /**
     * Stores the first value of the pair
     *
     * @type {First}
     */
    first: First;
    /**
     * Stores the second value of the pair
     *
     * @type {Second}
     */
    second: Second;

    /**
     * Creates an instance of Pair.
     *
     * @constructor
     * @param {First} first
     * @param {Second} second
     */
    constructor(first: First, second: Second) {
        this.first = first;
        this.second = second;
    }

    /**
     * Utility function to check if another pair is equal to this one
     *
     * @param {Pair<First, Second>} other
     * @returns {boolean}
     */
    equals(other: Pair<First, Second>): boolean {
        return other.first === this.first && other.second === this.second;
    }

    /**
     * Convert this pair to a string
     *
     * @returns {string}
     */
    toString(): string {
        return `(${this.first}, ${this.second})`;
    }
}

/**
 * utility function to add two pairs
 *
 * @export
 * @param {Pair<number, number>} first
 * @param {Pair<number, number>} second
 * @returns {Pair<number, number>}
 */
export function add(
    first: Pair<number, number>,
    second: Pair<number, number>
): Pair<number, number> {
    return new Pair(first.first + second.first, first.second + second.second);
}

/**
 * Utility function to multiply a pair by a scalar
 *
 * @export
 * @param {Pair<number, number>} first
 * @param {number} second
 * @returns {Pair<number, number>}
 */
export function mult(
    first: Pair<number, number>,
    second: number
): Pair<number, number> {
    return new Pair(first.first * second, first.second * second);
}

/**
 * Utility function to restrict a pair to a maximum value
 *
 * @export
 * @param {Pair<number, number>} first
 * @param {number} second
 * @returns {Pair<number, number>}
 */
export function restrict(
    first: Pair<number, number>,
    second: number
): Pair<number, number> {
    return new Pair(
        Math.min(first.first, second),
        Math.min(first.second, second)
    );
}
