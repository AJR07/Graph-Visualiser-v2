import { useEffect, useState } from "react";
import { AdjList, GlobalSettings, NodeData } from "./types";
import Display from "./display";
import { Stack } from "@mui/material";
import GraphInputSettingsPanel from "./inputs/settingseditor/settingseditor";
import NodeEditorSettingsPanel from "./inputs/nodeeditor/nodeeditor";
import PortInputSettingsPanel from "./inputs/porteditor/porteditor";
import { GraphInputWrapper } from "./inputs/input";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

/**
 * The main component of the app.
 *
 * @export
 * @returns {*}
 */
export default function Graph() {
    // utility states - settings
    const [settings, setSettings] = useState<GlobalSettings>({
        bidirectional: false,
        nodeRadius: 20,
        nodeColor: "#ffffff",
        edgeColor: "#ffffff",
        edgeThickness: "weight",
        edgeLength: "weight",
    });

    // graph data states - store the info about the graph
    const [adjList, setAdjList] = useState<AdjList>({});
    const [nodeData, setNodeData] = useState<NodeData>({});

    // fetch the readme from github
    const [githubMarkdown, setGithubMarkdown] = useState<string>("");
    useEffect(() => {
        fetch(
            "https://raw.githubusercontent.com/AJR07/Graph-Visualiser-v2/master/README.md",
            {
                method: "GET",
            }
        )
            // convert the response to text, and set the state
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
                {/* Use React Markdown to render the README */}
                <GraphInputWrapper label="About">
                    <ReactMarkdown>{githubMarkdown}</ReactMarkdown>
                </GraphInputWrapper>
                {/* Rendering the input controls */}
                <h2 style={{ paddingLeft: "1vw", margin: 0, marginTop: "1vw" }}>
                    Input Controls
                </h2>
                <GraphInputSettingsPanel
                    settings={settings}
                    setSettings={setSettings}
                    setAdjList={setAdjList}
                />
                <NodeEditorSettingsPanel
                    nodeData={nodeData}
                    setNodeData={setNodeData}
                    adjList={adjList}
                    setAdjList={setAdjList}
                    bidirectional={settings.bidirectional}
                />
                <PortInputSettingsPanel
                    setNodeData={setNodeData}
                    adjList={adjList}
                    setAdjList={setAdjList}
                />
            </Stack>
            {/* Render the graph */}
            <h2 className="center">Rendered Graph</h2>
            <Display
                nodeData={nodeData}
                adjList={adjList}
                settings={settings}
            />
        </Stack>
    );
}
