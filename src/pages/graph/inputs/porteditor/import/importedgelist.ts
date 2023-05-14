import Pair from "../../../../../utils/pair";
import { AdjList, Node, NodeData } from "../../../types";

export default function ImportEdgeList(
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
            const numbers = line.split(" ");
            if (numbers.length === 2) {
                const node1 = numbers[0];
                const node2 = numbers[1];
                if (!adjList[node1]) adjList[node1] = [];
                if (!adjList[node2]) adjList[node2] = [];
                adjList[node1].push(new Pair(node2, 10));

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
                if (isNaN(weight)) throw new Error();
                if (!adjList[node1]) adjList[node1] = [];
                if (!adjList[node2]) adjList[node2] = [];
                adjList[node1].push(new Pair(node2, weight));

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
