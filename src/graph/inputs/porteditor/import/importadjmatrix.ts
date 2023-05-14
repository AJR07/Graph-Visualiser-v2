import Pair from "../../../../utils/pair";
import { AdjList, Node, NodeData } from "../../../types";

/**
 * Imports an adjacency matrix into the graph
 *
 * @export
 * @param {string} importData
 * @param {React.Dispatch<React.SetStateAction<AdjList>>} setAdjList
 * @param {React.Dispatch<React.SetStateAction<NodeData>>} setNodeData
 */
export default function ImportAdjMatrix(
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
            // remove any blank spaces
            const numbers = line.split(" ").filter((x) => x !== "");

            // check if it's a square matrix
            if (numbers.length !== lines.length)
                throw new Error("non-square-matrix");

            // set the current node's label to be a number in order, 1-indexed
            const nodeLabel = `${i + 1}`;
            if (!adjList[nodeLabel]) adjList[nodeLabel] = [];
            for (let j = 0; j < lines.length; j++) {
                // if the number is 0, don't add it to the adjList (cuz it doesn't exist)
                if (numbers[j] !== "0") {
                    // check if the weight is an integer
                    let weight = parseInt(numbers[j]);
                    if (isNaN(weight)) throw new Error("non-integer-weight");

                    // add to adjList
                    adjList[nodeLabel].push(new Pair(`${j + 1}`, weight));

                    // if node doesn't exist, create it
                    if (!adjList[`${j + 1}`]) adjList[`${j + 1}`] = [];
                    if (!nodeData[`${j + 1}`]) {
                        nodeData[`${j + 1}`] = {
                            label: `${j + 1}`,
                            pos: new Pair(
                                Math.random() * window.innerWidth,
                                Math.random() * window.innerHeight
                            ),
                            velocity: new Pair(0, 0),
                            acceleration: new Pair(0, 0),
                        } as Node;
                    }
                }

                // node doesn't exist, create it
                nodeData[nodeLabel] = {
                    label: nodeLabel,
                    pos: new Pair(
                        Math.random() * window.innerWidth,
                        Math.random() * window.innerHeight
                    ),
                    velocity: new Pair(0, 0),
                    acceleration: new Pair(0, 0),
                } as Node;
            }
        }
        setAdjList(adjList);
        setNodeData(nodeData);
    } catch (err) {
        alert(
            "It seems like your input format has an error. Please adhere to the formatting rules provided."
        );
    }
}
