import { Button, MenuItem, Select, Stack, TextField } from "@mui/material";
import { AdjList, NodeData, Node } from "../../types";
import { GraphInput, GraphInputWrapper } from "../input";
import { useEffect, useState } from "react";
import Pair from "../../../utils/pair";
import ImportAdjList from "./import/importadjlist";
import ImportAdjMatrix from "./import/importadjmatrix";
import ImportEdgeList from "./import/importedgelist";
import ExportAdjMatrix from "./export/exportadjmatrix";
import ExportAdjList from "./export/exportadjlist";
import ExportedEdgeList from "./export/exportededgelist";

/**
 * Formatting instructions for the user, for each type of import list
 *
 * @type {{ adjlist: {}; adjmatrix: {}; edgelist: {}; }}
 */
const importFormats = {
    adjlist: [
        "Adjacency List",
        "(This does not support Edge Weights. You will have to tune it yourself using the manual editor.)\nEach node in the graph will be represented with a line. The first word in the line will be the node's label, and the rest of the words will be the labels of the nodes connected to the first node. \n Example: \n A B C \n B A \n C A \n suggests that A is connected to B and C, B is connected to A, and C is connected to A.",
    ],
    adjmatrix: [
        "Adjacency Matrix",
        "(This supports Edge Weights. If your input data does not take into account edge weights [ie. has 1s and 0s only], you could still key it in.)\n This is a N x N array of numbers, where N is the number of nodes in the graph. The value at row i and column j is a number if node i is connected to node j, and 0 otherwise. Example: \n 0 1 1 \n 1 0 0 \n 1 0 0 \n suggests that node 1 is connected to node 2 and 3, node 2 is connected to node 1, and node 3 is connected to node 1. In this case, those that are connected all have an edge weight of 1.",
    ],
    edgelist: [
        "Edge List",
        "(This supports Edge Weights. If your input data does not have edge weights [ie. only has `A B` instead of `A B 5`], you can still key it in.)\nFor every line, the first word is the label of the first node, the second word is the label of the second node, and the third word is the weight of the edge connecting the two nodes. \n Example: \n A B 5 \n B A 5 \n C A 10 \n suggests that A is connected to B with an edge of weight 5, B is connected to A with an edge of weight 5, and C is connected to A with an edge of weight 10.",
    ],
};

/**
 * Props for import export panels
 *
 * @interface PortInputSettingsPanelProps
 * @typedef {PortInputSettingsPanelProps}
 */
interface PortInputSettingsPanelProps {
    /**
     * Function to set the node data
     *
     * @type {React.Dispatch<React.SetStateAction<NodeData>>}
     */
    setNodeData: React.Dispatch<React.SetStateAction<NodeData>>;
    /**
     * Adjacency List for the controls to use
     *
     * @type {AdjList}
     */
    adjList: AdjList;
    /**
     * Function to set the adjacency list
     *
     * @type {React.Dispatch<React.SetStateAction<AdjList>>}
     */
    setAdjList: React.Dispatch<React.SetStateAction<AdjList>>;
}

/**
 * Controls for importing and exporting graphs
 *
 * @export
 * @param {PortInputSettingsPanelProps} props
 * @returns {*}
 */
export default function PortInputSettingsPanel(
    props: PortInputSettingsPanelProps
) {
    const { setNodeData, adjList, setAdjList } = props;
    const [importExportType, setImportExportType] = useState<
        "adjlist" | "adjmatrix" | "edgelist"
    >("adjlist");
    const [importData, setImportData] = useState<string>("");
    const [exportData, setExportData] = useState<string>("");

    // see export data UI
    useEffect(() => {
        // copy to clipboard
        navigator.clipboard.writeText(exportData);
    }, [exportData]);

    return (
        <GraphInputWrapper label="Import/Export">
            {/* Render the import/export instructions */}
            <GraphInputWrapper label="Formatting" opacity={1.1}>
                <h3>Format of: {importFormats[importExportType][0]}</h3>
                <p style={{ margin: 0, whiteSpace: "pre-line" }}>
                    {importFormats[importExportType][1]}
                </p>
            </GraphInputWrapper>
            {/* Render Input/Export Type Selector - Controls the type of graph we are looking at */}
            <GraphInput label="Import/Export Type">
                <Select
                    value={importExportType}
                    fullWidth
                    onChange={(evt) => {
                        setImportExportType(
                            evt.target.value as
                                | "adjlist"
                                | "adjmatrix"
                                | "edgelist"
                        );
                    }}
                    color="warning"
                    style={{ color: "white" }}
                >
                    <MenuItem style={{ color: "black" }} value="adjlist">
                        Adjacency List
                    </MenuItem>
                    <MenuItem style={{ color: "black" }} value="adjmatrix">
                        Adjacency Matrix
                    </MenuItem>
                    <MenuItem style={{ color: "black" }} value="edgelist">
                        Edge List
                    </MenuItem>
                </Select>
            </GraphInput>
            <br />
            {/* Render UI for the user to enter data and import it in. */}
            <GraphInput label="Import" widthPercent={7}>
                <Stack
                    direction="row"
                    style={{
                        width: "100%",
                    }}
                    spacing={1}
                >
                    <TextField
                        label=""
                        multiline
                        fullWidth
                        color="warning"
                        value={importData}
                        onChange={(evt) => {
                            setImportData(evt.target.value);
                        }}
                    />
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                            // the different states you can import something in. Separate functions for each type.
                            switch (importExportType) {
                                case "adjlist":
                                    ImportAdjList(
                                        importData,
                                        setAdjList,
                                        setNodeData
                                    );
                                    break;
                                case "adjmatrix":
                                    ImportAdjMatrix(
                                        importData,
                                        setAdjList,
                                        setNodeData
                                    );
                                    break;
                                case "edgelist":
                                    ImportEdgeList(
                                        importData,
                                        setAdjList,
                                        setNodeData
                                    );
                                    break;
                            }
                        }}
                    >
                        IMPORT
                    </Button>
                </Stack>
            </GraphInput>

            {/* Render UI for the user to export the current graph as data */}
            <GraphInput label="Export" widthPercent={7}>
                <Button
                    variant="contained"
                    fullWidth
                    onClick={() => {
                        // render and export the data based on the type of graph we are looking at
                        // also copy to clipboard, using the useEffect above
                        switch (importExportType) {
                            case "adjlist":
                                setExportData(ExportAdjList(adjList));
                                break;
                            case "adjmatrix":
                                setExportData(ExportAdjMatrix(adjList));
                                break;
                            case "edgelist":
                                setExportData(ExportedEdgeList(adjList));
                                break;
                        }
                    }}
                >
                    EXPORT (Copy To Clipboard)
                </Button>
            </GraphInput>
            {/* Display the exported data so the user can also see it. */}
            <h3>Exported Data:</h3>
            <p
                style={{
                    whiteSpace: "pre-line",
                    fontFamily: "monospace",
                    padding: "1vw",
                    backgroundColor: "rgba(240, 240, 240, 0.2)",
                }}
            >
                {exportData}
            </p>
        </GraphInputWrapper>
    );
}
