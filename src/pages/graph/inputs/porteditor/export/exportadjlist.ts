import { AdjList, NodeData } from "../../../types";

export default function ExportAdjList(adjList: AdjList) {
    let exportData = "";
    for (const node in adjList) {
        exportData += node;
        for (const pair of adjList[node]) {
            exportData += " " + pair.first;
        }
        exportData += "\n";
    }
    return exportData;
}
