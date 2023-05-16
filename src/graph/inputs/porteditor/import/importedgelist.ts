import Pair from "../../../../utils/pair";
import { AdjList, DEFAULT_NODE_WEIGHT, Node, NodeData } from "../../../types";

/**
 * Imports an edge list into the graph
 *
 * @export
 * @param {string} importData
 * @param {React.Dispatch<React.SetStateAction<AdjList>>} setAdjList
 * @param {React.Dispatch<React.SetStateAction<NodeData>>} setNodeData
 */
export default function ImportEdgeList(
    importData: string,
    setAdjList: React.Dispatch<React.SetStateAction<AdjList>>,
    setNodeData: React.Dispatch<React.SetStateAction<NodeData>>
) {
    // try-catch to handle invalid input
    try {
        const adjList: AdjList = {};
        const nodeData: NodeData = {};
        const lines = importData.split("\n");
        // go by each line
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const numbers = line.split(" ");
            // 2 cases: either 2 or 3 numbers (2 - node1, node2; 3 - node1, node2, weight)
            if (numbers.length === 2) {
                const node1 = numbers[0];
                const node2 = numbers[1];
                if (!adjList[node1]) adjList[node1] = [];
                if (!adjList[node2]) adjList[node2] = [];
                // default weight is 10, add to adjList
                adjList[node1].push(new Pair(node2, DEFAULT_NODE_WEIGHT));

                // if node1 or node2 doesn't exist, create it
                if (!nodeData[node1]) {
                    nodeData[node1] = {
                        label: node1,
                        pos: new Pair(
                            Math.random() * window.innerWidth,
                            Math.random() * window.innerHeight
                        ),
                        velocity: new Pair(0, 0),
                        acceleration: new Pair(0, 0),
                    } as Node;
                }
                if (!nodeData[node2]) {
                    nodeData[node2] = {
                        label: node2,
                        pos: new Pair(
                            Math.random() * window.innerWidth,
                            Math.random() * window.innerHeight
                        ),
                        velocity: new Pair(0, 0),
                        acceleration: new Pair(0, 0),
                    } as Node;
                }
            } else if (numbers.length === 3) {
                const node1 = numbers[0];
                const node2 = numbers[1];
                const weight = parseInt(numbers[2]);
                // if weight is not number, throw error
                if (isNaN(weight)) throw new Error();

                // add to adjList, and create a list if it doesn't exist
                if (!adjList[node1]) adjList[node1] = [];
                if (!adjList[node2]) adjList[node2] = [];
                adjList[node1].push(new Pair(node2, weight));

                // if node1 or node2 doesn't exist, create it
                if (!nodeData[node1]) {
                    nodeData[node1] = {
                        label: node1,
                        pos: new Pair(
                            Math.random() * window.innerWidth,
                            Math.random() * window.innerHeight
                        ),
                        velocity: new Pair(0, 0),
                        acceleration: new Pair(0, 0),
                    } as Node;
                }
                if (!nodeData[node2]) {
                    nodeData[node2] = {
                        label: node2,
                        pos: new Pair(
                            Math.random() * window.innerWidth,
                            Math.random() * window.innerHeight
                        ),
                        velocity: new Pair(0, 0),
                        acceleration: new Pair(0, 0),
                    } as Node;
                }
            } else throw new Error();
        }
        setAdjList(adjList);
        setNodeData(nodeData);
    } catch (err) {
        alert(
            "It seems like your input format has an error. Please adhere to the formatting rules provided."
        );
    }
}
