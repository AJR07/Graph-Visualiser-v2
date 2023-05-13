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

export interface AdjList {
    [node: string]: string[];
}

export interface GlobalSettings {
    bidirectional: boolean;

    nodeRadius: number;
    nodeColor: Color;

    edgeColor: Color;
    edgeThickness: number | "weight";
    edgeLength: number | "weight";
}
