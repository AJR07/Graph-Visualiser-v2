import { Button, MenuItem, Select, Stack, TextField } from "@mui/material";
import { AdjList, NodeData, Node } from "../../types";
import { GraphInput, GraphInputWrapper } from "../input";
import { useState } from "react";
import Pair from "../../../utils/pair";
import ImportAdjList from "./import/importadjlist";
import ImportAdjMatrix from "./import/importadjmatrix";
import ImportEdgeList from "./import/importedgelist";
import ExportAdjMatrix from "./export/exportadjmatrix";
import ExportAdjList from "./export/exportadjlist";
import ExportedEdgeList from "./export/exportededgelist";

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

interface PortInputSettingsPanelProps {
    nodeData: NodeData;
    setNodeData: React.Dispatch<React.SetStateAction<NodeData>>;
    adjList: AdjList;
    setAdjList: React.Dispatch<React.SetStateAction<AdjList>>;
    setSaveCanvas: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PortInputSettingsPanel(
    props: PortInputSettingsPanelProps
) {
    const { nodeData, setNodeData, adjList, setAdjList, setSaveCanvas } = props;
    const [importExportType, setImportExportType] = useState<
        "adjlist" | "adjmatrix" | "edgelist"
    >("adjlist");
    const [importData, setImportData] = useState<string>("");
    const [exportData, setExportData] = useState<string>("");

    return (
        <GraphInputWrapper label="Import/Export">
            <GraphInputWrapper label="Formatting" opacity={1.1}>
                <h3>Format of: {importFormats[importExportType][0]}</h3>
                <p style={{ margin: 0, whiteSpace: "pre-line" }}>
                    {importFormats[importExportType][1]}
                </p>
            </GraphInputWrapper>
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

            <GraphInput label="Export" widthPercent={7}>
                <Button
                    variant="contained"
                    fullWidth
                    onClick={(evt) => {
                        // copy to user's clipboard
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
