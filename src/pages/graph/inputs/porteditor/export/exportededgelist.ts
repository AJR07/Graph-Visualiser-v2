import { AdjList } from "../../../types";

export default function ExportedEdgeList(adjList: AdjList) {
    let exportData = "";
    for (const node in adjList) {
        for (const pair of adjList[node]) {
            exportData += `${node} ${pair.first} ${pair.second}\n`;
        }
    }
    return exportData;
}
