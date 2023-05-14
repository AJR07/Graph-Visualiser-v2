export default class Pair<First, Second> {
    first: First;
    second: Second;

    constructor(first: First, second: Second) {
        this.first = first;
        this.second = second;
    }

    equals(other: Pair<First, Second>): boolean {
        return other.first === this.first && other.second === this.second;
    }

    toString(): string {
        return `(${this.first}, ${this.second})`;
    }
}

export function add(
    first: Pair<number, number>,
    second: Pair<number, number>
): Pair<number, number> {
    return new Pair(first.first + second.first, first.second + second.second);
}

export function mult(
    first: Pair<number, number>,
    second: number
): Pair<number, number> {
    return new Pair(first.first * second, first.second * second);
}

export function restrict(
    first: Pair<number, number>,
    second: number
): Pair<number, number> {
    return new Pair(
        Math.min(first.first, second),
        Math.min(first.second, second)
    );
}
