import { Button, Stack, TextField } from "@mui/material";
import { AdjList, NodeData } from "../types";
import { GraphInputWrapper } from "./input";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import Pair from "../../../utils/pair";
import { useState } from "react";

import "./nodeeditor.css";

interface NodeEditorProps {
    nodeData: NodeData[];
    setNodeData: React.Dispatch<React.SetStateAction<NodeData[]>>;
    adjList: AdjList;
    setAdjList: React.Dispatch<React.SetStateAction<AdjList>>;
}

export default function NodeEditorSettingsPanel(props: NodeEditorProps) {
    const [newNodeLabel, setNewNodeLabel] = useState<string>("");
    const [selectValue, setSelectValue] = useState<string>("");

    const duplicatedName: boolean = Object.keys(props.adjList).includes(
        newNodeLabel
    );
    const lengthyName: boolean = newNodeLabel.length > 5;

    return (
        <GraphInputWrapper label="Node Editor">
            <Stack style={{ padding: "1vw" }} spacing={2}>
                {props.nodeData.map((node, index) => {
                    return (
                        <Stack
                            key={index}
                            direction="row"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                paddingLeft: "1vw",
                                paddingRight: "1vw",
                                border: "solid white",
                            }}
                            spacing={3}
                        >
                            <p>{index + 1}.</p>
                            <h3 className="node">{node.label}</h3>
                            <DoubleArrowIcon />
                            {Object.keys(props.adjList).includes(node.label)
                                ? Object.values(props.adjList[node.label]).map(
                                      (adjNode) => {
                                          return (
                                              <h3
                                                  className="node node-adjacent"
                                                  key={adjNode}
                                              >
                                                  {adjNode}
                                              </h3>
                                          );
                                      }
                                  )
                                : null}
                            <Stack
                                direction="row"
                                style={{ marginRight: 0, marginLeft: "auto" }}
                                spacing={3}
                            >
                                <select
                                    name="add-node"
                                    id="add-node"
                                    value={selectValue}
                                    style={{ color: "black" }}
                                    onChange={(evt) =>
                                        setSelectValue(evt.target.value)
                                    }
                                    onFocus={(evt) => {
                                        evt.target.selectedIndex = -1;
                                    }}
                                >
                                    <option value={-1}></option>
                                    {Object.keys(props.adjList).map(
                                        (linkedNode) => {
                                            return props.adjList[
                                                node.label
                                            ].includes(linkedNode) ? null : (
                                                <option
                                                    value={linkedNode}
                                                    key={linkedNode}
                                                >
                                                    {linkedNode}
                                                </option>
                                            );
                                        }
                                    )}
                                </select>
                                <Button
                                    variant="contained"
                                    onClick={() => {
                                        if (selectValue === "") return;
                                        props.setAdjList((adj) => {
                                            let newAdj = { ...adj };
                                            newAdj[node.label].push(
                                                selectValue
                                            );
                                            return newAdj;
                                        });
                                        setSelectValue("");
                                    }}
                                >
                                    ADD A CONNECTED NODE
                                </Button>
                            </Stack>
                        </Stack>
                    );
                })}
            </Stack>
            <TextField
                label="Add A Node"
                variant="filled"
                color="warning"
                error={duplicatedName || lengthyName}
                helperText={
                    duplicatedName
                        ? "Node name already exists"
                        : lengthyName
                        ? "Node name too long"
                        : null
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
                        props.setNodeData((nodeData) => [
                            ...nodeData,
                            {
                                label: newNodeLabel,
                                pos: new Pair(
                                    Math.random() * window.innerWidth,
                                    Math.random() * window.innerHeight
                                ),
                                velocity: new Pair(0, 0),
                                acceleration: new Pair(0, 0),
                            } as NodeData,
                        ]);
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
        </GraphInputWrapper>
    );
}
