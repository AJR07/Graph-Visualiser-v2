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
import Pair from "../../../../utils/pair";
import { useState } from "react";

import "./nodeeditor.css";

interface NodeEditorProps {
    nodeData: NodeData;
    setNodeData: React.Dispatch<React.SetStateAction<NodeData>>;
    adjList: AdjList;
    setAdjList: React.Dispatch<React.SetStateAction<AdjList>>;
}

export default function NodeEditorSettingsPanel(props: NodeEditorProps) {
    const [newNodeLabel, setNewNodeLabel] = useState<string>("");

    const duplicatedName: boolean = Object.keys(props.adjList).includes(
        newNodeLabel
    );
    const lengthyName: boolean = newNodeLabel.length > 5;
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
                            {Object.keys(props.adjList).includes(node.label)
                                ? Object.values(props.adjList[node.label]).map(
                                      (adjNode) => {
                                          console.log(adjNode);
                                          return (
                                              <Stack>
                                                  <h3
                                                      className="node node-adjacent"
                                                      key={adjNode.first}
                                                      style={{ margin: 0 }}
                                                  >
                                                      {adjNode.first}
                                                  </h3>
                                                  <input
                                                      type="number"
                                                      value={adjNode.second}
                                                      style={{ color: "black" }}
                                                      onChange={(evt) => {
                                                          props.setAdjList(
                                                              (adj) => {
                                                                  let newAdj = {
                                                                      ...adj,
                                                                  };
                                                                  newAdj[
                                                                      node.label
                                                                  ].find(
                                                                      (pair) =>
                                                                          pair.first ===
                                                                          adjNode.first
                                                                  )!.second = parseInt(
                                                                      evt.target
                                                                          .value
                                                                  );
                                                                  return newAdj;
                                                              }
                                                          );
                                                      }}
                                                  />
                                              </Stack>
                                          );
                                      }
                                  )
                                : null}
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
