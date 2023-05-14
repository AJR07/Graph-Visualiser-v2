import { AdjList } from "../../../types";

export default function ExportAdjMatrix(adjList: AdjList) {
    let exportData = "";
    for (const node in adjList) {
        for (const node2 in adjList) {
            let node2Pos = adjList[node].find((pair) => pair.first === node2);
            if (node2Pos) {
                exportData += `${node2Pos.second} `;
            } else {
                exportData += "0 ";
            }
        }
        exportData += "\n";
    }
    return exportData;
}
