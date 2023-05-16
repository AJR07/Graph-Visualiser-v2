import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
} from "@mui/material";
import { AdjList, DEFAULT_NODE_WEIGHT, Node, NodeData } from "../../types";
import { GraphInputWrapper } from "../input";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import Pair from "../../../utils/pair";
import { useState } from "react";
import AdjacentNodes from "./adjacentnode";

import "./nodeeditor.css";

interface NodeEditorProps {
    nodeData: NodeData;
    setNodeData: React.Dispatch<React.SetStateAction<NodeData>>;
    adjList: AdjList;
    setAdjList: React.Dispatch<React.SetStateAction<AdjList>>;
    bidirectional: boolean;
}

export default function NodeEditorSettingsPanel(props: NodeEditorProps) {
    const [newNodeLabel, setNewNodeLabel] = useState<string>("");

    const duplicatedName: boolean = Object.keys(props.adjList).includes(
        newNodeLabel
    );
    let count = 1;

    return (
        <GraphInputWrapper label="Node Editor">
            <Stack style={{ padding: "1vw" }} spacing={2}>
                {Object.values(props.nodeData).map((node) => {
                    return (
                        <Stack
                            key={node.label}
                            direction="row"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                padding: "1vw",
                                border: "solid white",
                            }}
                            spacing={3}
                        >
                            <p>{count++}.</p>
                            <h3 className="node">{node.label}</h3>
                            <DoubleArrowIcon />
                            <AdjacentNodes
                                node={node}
                                adjList={props.adjList}
                                setAdjList={props.setAdjList}
                                bidirectional={props.bidirectional}
                            />
                            <FormControl
                                style={{
                                    marginRight: 0,
                                    marginLeft: "auto",
                                    width: "10%",
                                }}
                            >
                                <InputLabel
                                    id="add-node"
                                    style={{ color: "white" }}
                                >
                                    Add Node
                                </InputLabel>
                                <Select
                                    labelId="add-node"
                                    value={""}
                                    color="warning"
                                    variant="filled"
                                    onChange={(evt) => {
                                        props.setAdjList((adj) => {
                                            let newAdj = { ...adj };
                                            newAdj[node.label].push(
                                                new Pair(
                                                    evt.target.value,
                                                    DEFAULT_NODE_WEIGHT
                                                )
                                            );
                                            return newAdj;
                                        });
                                    }}
                                >
                                    {Object.keys(props.nodeData).map(
                                        (nodeToLinkTo: string) => {
                                            for (let nodeLabel of Object.values(
                                                props.adjList[node.label]
                                            )) {
                                                if (
                                                    nodeLabel.first ===
                                                    nodeToLinkTo
                                                ) {
                                                    return null;
                                                }
                                            }
                                            return (
                                                <MenuItem
                                                    value={nodeToLinkTo}
                                                    key={nodeToLinkTo}
                                                    style={{ color: "black" }}
                                                >
                                                    {nodeToLinkTo}
                                                </MenuItem>
                                            );
                                        }
                                    )}
                                </Select>
                            </FormControl>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={() => {
                                    props.setNodeData((oldNodeData) => {
                                        let newNodeData = { ...oldNodeData };
                                        delete newNodeData[node.label];
                                        return newNodeData;
                                    });
                                    props.setAdjList((adj) => {
                                        let newAdj = { ...adj };
                                        delete newAdj[node.label];
                                        for (let key of Object.keys(newAdj)) {
                                            newAdj[key] = newAdj[key].filter(
                                                (pair) => {
                                                    return (pair.first !==
                                                        node.label) as boolean;
                                                }
                                            );
                                        }
                                        return newAdj;
                                    });
                                }}
                            >
                                DELETE
                            </Button>
                        </Stack>
                    );
                })}
            </Stack>
            <Stack direction="row">
                <h4>Add a Node:</h4>
                <TextField
                    label="Node Name:"
                    variant="outlined"
                    color="warning"
                    error={duplicatedName}
                    helperText={
                        duplicatedName ? "Node name already exists" : null
                    }
                    fullWidth
                    value={newNodeLabel}
                    style={{ marginTop: "1vw" }}
                    onKeyPress={async (event) => {
                        if (
                            event.key === "Enter" &&
                            newNodeLabel !== "" &&
                            !Object.keys(props.adjList).includes(newNodeLabel)
                        ) {
                            // add a new node
                            props.setNodeData((oldNodeData) => {
                                let newNodeData = oldNodeData;
                                newNodeData[newNodeLabel] = {
                                    label: newNodeLabel,
                                    pos: new Pair(
                                        Math.random() * window.innerWidth,
                                        Math.random() * window.innerHeight
                                    ),
                                    velocity: new Pair(0, 0),
                                    acceleration: new Pair(0, 0),
                                } as Node;
                                return newNodeData;
                            });
                            props.setAdjList((adj) => {
                                adj[newNodeLabel] = [];
                                return adj;
                            });
                            setNewNodeLabel("");
                        }
                    }}
                    onChange={(event) => {
                        setNewNodeLabel(event.target.value);
                    }}
                />
            </Stack>
        </GraphInputWrapper>
    );
}
