import { AdjList } from "../../../types";

/**
 * Exports an adjacency list into a string
 *
 * @export
 * @param {AdjList} adjList
 * @returns {string}
 */
export default function ExportAdjList(adjList: AdjList) {
    let exportData = "";
    // go by each node
    for (const node in adjList) {
        exportData += node;
        // just add the each connected node into a line if there are no edges
        for (const pair of adjList[node]) {
            exportData += " " + pair.first;
        }
        exportData += "\n";
    }
    return exportData;
}
