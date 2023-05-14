import { useEffect, useState } from "react";
import { AdjList, GlobalSettings, NodeData } from "./types";
import Display from "./display/display";
import { Stack } from "@mui/material";
import GraphInputSettingsPanel from "./inputs/settingseditor/settingseditor";
import NodeEditorSettingsPanel from "./inputs/nodeeditor/nodeeditor";
import PortInputSettingsPanel from "./inputs/porteditor/porteditor";
import { GraphInputWrapper } from "./inputs/input";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export default function Graph() {
    // utility states
    const [settings, setSettings] = useState<GlobalSettings>({
        bidirectional: false,
        nodeRadius: 20,
        nodeColor: "#ffffff",
        edgeColor: "#ffffff",
        edgeThickness: "weight",
        edgeLength: "weight",
    });
    const [saveCanvas, setSaveCanvas] = useState<boolean>(false);

    // graph data states
    const [adjList, setAdjList] = useState<AdjList>({});
    const [nodeData, setNodeData] = useState<NodeData>({});
    const [githubMarkdown, setGithubMarkdown] = useState<string>("");
    useEffect(() => {
        fetch(
            "https://raw.githubusercontent.com/AJR07/Graph-Visualiser-v2/master/README.md",
            {
                method: "GET",
            }
        )
            .then((res) => res.text())
            .then((text) => setGithubMarkdown(text));
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
                <GraphInputWrapper label="About">
                    <ReactMarkdown>{githubMarkdown}</ReactMarkdown>
                </GraphInputWrapper>
                <h2 style={{ paddingLeft: "1vw", margin: 0, marginTop: "1vw" }}>
                    Input Controls
                </h2>
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
                <PortInputSettingsPanel
                    nodeData={nodeData}
                    setNodeData={setNodeData}
                    adjList={adjList}
                    setAdjList={setAdjList}
                    setSaveCanvas={setSaveCanvas}
                />
            </Stack>
            <h2 className="center">Rendered Graph</h2>
            <Display
                nodeData={nodeData}
                adjList={adjList}
                settings={settings}
                saveCanvas={saveCanvas}
            />
        </Stack>
    );
}
