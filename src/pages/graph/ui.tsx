import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AdjList, GlobalSettings, NodeData } from "./types";
import Pair from "../../utils/pair";
import Graph from "./graph";
import { Stack } from "@mui/material";
import GraphInputSettingsPanel from "./inputs/controls";

export default function GraphUI() {
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
    const [graphData, setGraphData] = useState<NodeData[]>([]);

    useEffect(() => {
        if (data) {
            try {
                const parsedData = JSON.parse(atob(data));
                setAdjList(parsedData as AdjList);
                for (let node of Object.keys(parsedData)) {
                    setGraphData((graphData) => [
                        ...graphData,
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
            <h1 className="center">GRAPH VISUALISER</h1>
            <GraphInputSettingsPanel
                settings={settings}
                setSettings={setSettings}
            />
            <Graph />
        </Stack>
    );
}
