import Pair from "../../../../../utils/pair";
import { AdjList, Node, NodeData } from "../../../types";

export default function ImportAdjList(
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
            const words = line.split(" ");
            const nodeLabel = words[0];
            if (words.length == 1) continue;
            const connectedNodes = words.slice(1);
            if (!adjList[nodeLabel]) adjList[nodeLabel] = [];
            for (let j = 0; j < connectedNodes.length; j++) {
                adjList[nodeLabel].push(new Pair(connectedNodes[j], 10));
                if (!adjList[connectedNodes[j]])
                    adjList[connectedNodes[j]] = [];
                if (!nodeData[connectedNodes[j]]) {
                    nodeData[connectedNodes[j]] = {
                        label: connectedNodes[j],
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
        setAdjList(adjList);
        setNodeData(nodeData);
    } catch (err) {
        alert(
            "It seems like your input format has an error. Please adhere to the formatting rules provided."
        );
    }
}
