import Color from "../../utils/color";
import Pair from "../../utils/pair";

export interface NodeData {
    [node: string]: Node;
}

export interface Node {
    label: string;
    pos: Pair<number, number>;
    velocity: Pair<number, number>;
    acceleration: Pair<number, number>;
}

export let DEFAULT_NODE_WEIGHT = 10;

export interface AdjList {
    [node: string]: Pair<string, number>[];
}

export interface GlobalSettings {
    bidirectional: boolean;

    nodeRadius: number;
    nodeColor: Color;

    edgeColor: Color;
    edgeThickness: number | "weight";
    edgeLength: number | "weight";
}
