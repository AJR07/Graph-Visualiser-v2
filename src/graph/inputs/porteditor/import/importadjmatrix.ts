import Pair from "../../../../utils/pair";
import { AdjList, Node, NodeData } from "../../../types";

export default function ImportAdjMatrix(
    importData: string,
    setAdjList: React.Dispatch<React.SetStateAction<AdjList>>,
    setNodeData: React.Dispatch<React.SetStateAction<NodeData>>
) {
    try {
        const adjList: AdjList = {};
        const nodeData: NodeData = {};
        const lines = importData.split("\n");
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const numbers = line.split(" ").filter((x) => x !== "");
            if (numbers.length !== lines.length)
                throw new Error("non-square-matrix");

            const nodeLabel = `${i + 1}`;
            if (!adjList[nodeLabel]) adjList[nodeLabel] = [];
            for (let j = 0; j < lines.length; j++) {
                if (numbers[j] !== "0") {
                    let weight = parseInt(numbers[j]);
                    if (isNaN(weight)) throw new Error("non-integer-weight");
                    adjList[nodeLabel].push(new Pair(`${j + 1}`, weight));
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
