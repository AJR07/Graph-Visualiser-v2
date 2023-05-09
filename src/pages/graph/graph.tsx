import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AdjList, GlobalSettings, NodeData } from "./types";
import Pair from "../../utils/pair";
import Display from "./display";
import { Stack } from "@mui/material";
import GraphInputSettingsPanel from "./inputs/settings";

export default function Graph() {
    // utility states
    const { data } = useParams();
    const [widthHeight, setWidthHeight] = useState<Pair<number, number>>(
        new Pair(window.innerWidth, window.innerHeight)
    );
    const [settings, setSettings] = useState<GlobalSettings>({
        bidirectional: false,
        nodeRadius: 5,
        nodeColor: "#000000",
        edgeColor: "#ffffff",
        edgeThickness: "weight",
        edgeLength: "weight",
    });

    // graph data states
    const [adjList, setAdjList] = useState<AdjList>({});
    const [nodeData, setNodeData] = useState<NodeData[]>([]);

    useEffect(() => {
        if (data) {
            try {
                const parsedData = JSON.parse(atob(data));
                setAdjList(parsedData as AdjList);
                for (let node of Object.keys(parsedData)) {
                    setNodeData((nodeData) => [
                        ...nodeData,
                        {
                            label: node,
                            pos: new Pair(
                                Math.random() * widthHeight.first,
                                Math.random() * widthHeight.second
                            ),
                            velocity: new Pair(0, 0),
                            acceleration: new Pair(0, 0),
                        } as NodeData,
                    ]);
                }
            } catch {
                setAdjList({});
            }
        }

        // automatically update window sizes in code when window is resized
        window.onresize = () => {
            setWidthHeight(new Pair(window.innerWidth, window.innerHeight));
        };
    }, []);

    return (
        <Stack spacing={3}>
            <h1 className="center" style={{ marginBottom: "0" }}>
                GRAPH VISUALISER
            </h1>
            <h4 className="center" style={{ marginTop: "0" }}>
                by AJR07
            </h4>

            <Stack id="input">
                <h2 style={{ padding: "1vw" }}>Input Controls</h2>
                <GraphInputSettingsPanel
                    settings={settings}
                    setSettings={setSettings}
                />
            </Stack>
            <Display />
        </Stack>
    );
}
