import Pair from "../../utils/pair";

export interface NodeData {
    label: string;
    pos: Pair<number, number>;
    velocity: Pair<number, number>;
    acceleration: Pair<number, number>;
}

export interface AdjList {
    [node: string]: string[];
}
