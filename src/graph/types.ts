import Color from "../utils/color";
import Pair from "../utils/pair";

/**
 * Stores details of all nodes
 *
 * @export
 * @interface NodeData
 * @typedef {NodeData}
 */
export interface NodeData {
    /**
     * for each node id, stores the label, position, velocity and acceleration
     */
    [node: string]: Node;
}

/**
 * Stores details of an edges
 *
 * @export
 * @interface Node
 * @typedef {Node}
 */
export interface Node {
    /**
     * The name of the node
     *
     * @type {string}
     */
    label: string;
    /**
     * The position of the node
     *
     * @type {Pair<number, number>}
     */
    pos: Pair<number, number>;
    /**
     * The velocity of the node
     *
     * @type {Pair<number, number>}
     */
    velocity: Pair<number, number>;
    /**
     * The acceleration of the node
     *
     * @type {Pair<number, number>}
     */
    acceleration: Pair<number, number>;
}

/**
 * Constant for the default node weight
 *
 * @type {number}
 */
export let DEFAULT_NODE_WEIGHT = 100;

/**
 * Stores edges and their corresponding connected edges in an adjacency list
 *
 * @export
 * @interface AdjList
 * @typedef {AdjList}
 */
export interface AdjList {
    /**
     * for each node id, stores the list of edges connected to it
     */
    [node: string]: Pair<string, number>[];
}

/**
 * Stores the settings controlled by the manual inputs
 *
 * @export
 * @interface GlobalSettings
 * @typedef {GlobalSettings}
 */
export interface GlobalSettings {
    /**
     * Determines if the graph is directed or not
     *
     * @type {boolean}
     */
    bidirectional: boolean;

    /**
     * Determines the radius of the rendered nodes
     *
     * @type {number}
     */
    nodeRadius: number;
    /**
     * Determines the colour of the rendered nodes
     *
     * @type {Color}
     */
    nodeColor: Color;

    /**
     * Determines the colour of the rendered edges
     *
     * @type {Color}
     */
    edgeColor: Color;
    /**
     * Determines the thickness of the rendered edges, could be either the weight of the edge or a constant
     *
     * @type {(number | "weight")}
     */
    edgeThickness: number | "weight";
    /**
     * Determines the length of the rendered edges, could be either the weight of the edge or a constant
     *
     * @type {(number | "weight")}
     */
    edgeLength: number | "weight";
}
