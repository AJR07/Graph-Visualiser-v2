import { AdjList } from "../../../types";

/**
 * Exports an adjacency list into a string
 *
 * @export
 * @param {AdjList} adjList
 * @returns {string}
 */
export default function ExportAdjMatrix(adjList: AdjList) {
    let exportData = "";
    // loop 2 times for each node, to turn it into a square
    for (const node in adjList) {
        for (const node2 in adjList) {
            // if the node is connected to the other node, add the weight (find if it is)
            // if the node is not connected, add 0
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
