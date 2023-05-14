import { AdjList } from "../../../types";

/**
 * Description placeholder
 *
 * @export
 * @param {AdjList} adjList
 * @returns {string}
 */
export default function ExportedEdgeList(adjList: AdjList) {
    let exportData = "";
    // go by each node
    for (const node in adjList) {
        // just add the each connected node into a line, with the weight
        for (const pair of adjList[node]) {
            exportData += `${node} ${pair.first} ${pair.second}\n`;
        }
    }
    return exportData;
}
