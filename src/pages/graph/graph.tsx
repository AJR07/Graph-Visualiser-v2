import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AdjList, GlobalSettings, Node, NodeData } from "./types";
import Pair from "../../utils/pair";
import Display from "./display/display";
import { Stack } from "@mui/material";
import GraphInputSettingsPanel from "./inputs/settingseditor";
import NodeEditorSettingsPanel from "./inputs/nodeeditor/nodeeditor";

export default function Graph() {
    // utility states
    const { data } = useParams();
    const [settings, setSettings] = useState<GlobalSettings>({
        bidirectional: false,
        nodeRadius: 20,
        nodeColor: "#ffffff",
        edgeColor: "#ffffff",
        edgeThickness: "weight",
        edgeLength: "weight",
    });

    // graph data states
    const [adjList, setAdjList] = useState<AdjList>({});
    const [nodeData, setNodeData] = useState<NodeData>({});

    useEffect(() => {
        if (data) {
            try {
                const parsedData = JSON.parse(atob(data));
                setAdjList(parsedData as AdjList);
                for (let node of Object.keys(parsedData)) {
                    setNodeData((prevNodeData) => {
                        const newNodeData = prevNodeData;
                        newNodeData[node] = {
                            label: node,
                            pos: new Pair(
                                Math.random() * window.innerWidth,
                                Math.random() * window.innerHeight
                            ),
                            velocity: new Pair(0, 0),
                            acceleration: new Pair(0, 0),
                        } as Node;
                        return newNodeData;
                    });
                }
            } catch {
                setAdjList({});
            }
        }
    }, []);

    return (
        <Stack spacing={3}>
            <h1 className="center" style={{ marginBottom: "0" }}>
                GRAPH VISUALISER
            </h1>
            <h4 className="center" style={{ marginTop: "0" }}>
                by AJR07
            </h4>

            <Stack id="input" spacing={3}>
                <h2 style={{ paddingLeft: "1vw" }}>Input Controls</h2>
                <GraphInputSettingsPanel
                    settings={settings}
                    setSettings={setSettings}
                />
                <NodeEditorSettingsPanel
                    nodeData={nodeData}
                    setNodeData={setNodeData}
                    adjList={adjList}
                    setAdjList={setAdjList}
                    bidirectional={settings.bidirectional}
                />
            </Stack>
            <Display
                nodeData={nodeData}
                adjList={adjList}
                settings={settings}
            />
        </Stack>
    );
}
