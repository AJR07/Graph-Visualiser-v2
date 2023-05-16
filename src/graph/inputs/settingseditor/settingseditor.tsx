import { Slider, ToggleButton } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { AdjList, GlobalSettings, NodeData } from "../../types";
import Color from "../../../utils/color";
import { GraphInputWrapper, GraphInput } from "../input";
import Pair from "../../../utils/pair";

/**
 * Input props for the GraphInputSettingsPanel component
 *
 * @interface GraphInputSettingsPanelProps
 * @typedef {GraphInputSettingsPanelProps}
 */
interface GraphInputSettingsPanelProps {
    /**
     * Settings for the graph inputs
     *
     * @type {GlobalSettings}
     */
    settings: GlobalSettings;
    /**
     * Function to set the settings for the graph inputs
     *
     * @type {React.Dispatch<React.SetStateAction<GlobalSettings>>}
     */
    setSettings: React.Dispatch<React.SetStateAction<GlobalSettings>>;
    /**
     * Function to set the adjacency list for bidirectional
     *
     * @type {React.Dispatch<React.SetStateAction<AdjList>>}
     */
    setAdjList: React.Dispatch<React.SetStateAction<AdjList>>;
}

/**
 * Graph Input Settings Panel component - To control all the general settings for the graph
 *
 * @export
 * @param {GraphInputSettingsPanelProps} props
 * @returns {*}
 */
export default function GraphInputSettingsPanel(
    props: GraphInputSettingsPanelProps
) {
    const { settings, setSettings } = props;

    return (
        // use the graph input wrapper
        <GraphInputWrapper label="Controls">
            {/* For each input, use the various MUI components to build controls for the user */}
            <GraphInput label="Bidirectional">
                <ToggleButton
                    value="check"
                    selected={settings.bidirectional}
                    style={{
                        backgroundColor: settings.bidirectional
                            ? "#000000"
                            : "#888888",
                    }}
                    onChange={() => {
                        setSettings({
                            ...settings,
                            bidirectional: !settings.bidirectional,
                        });
                        // for every edge, duplicate it for the other node
                        props.setAdjList((adjList) => {
                            let newAdjList = { ...adjList };
                            // for each node
                            for (let primaryNode of Object.keys(adjList)) {
                                // check adjacent nodes
                                for (let secondaryNode of Object.values(
                                    adjList[primaryNode]
                                )) {
                                    // for each adjacent nodes if they do not have the primary node as the adjacent node,
                                    let correspondingOpposite = adjList[
                                        secondaryNode.first
                                    ].find((value) => {
                                        return value.first === primaryNode;
                                    });

                                    // add it!
                                    if (correspondingOpposite)
                                        adjList[secondaryNode.first][
                                            adjList[
                                                secondaryNode.first
                                            ].indexOf(correspondingOpposite)
                                        ] = new Pair(
                                            primaryNode,
                                            secondaryNode.second
                                        );
                                    else
                                        adjList[secondaryNode.first].push(
                                            new Pair(
                                                primaryNode,
                                                secondaryNode.second
                                            )
                                        );
                                }
                            }
                            return newAdjList;
                        });
                    }}
                >
                    <CheckIcon />
                </ToggleButton>
            </GraphInput>

            <GraphInput label="Node Colour">
                <input
                    type="color"
                    name="Node Colour"
                    value={settings.nodeColor}
                    onChange={(e) => {
                        setSettings({
                            ...settings,
                            nodeColor: e.target.value as Color,
                        });
                    }}
                />
            </GraphInput>

            <GraphInput label="Node Radius">
                <Slider
                    step={5}
                    marks
                    min={5}
                    max={100}
                    value={settings.nodeRadius}
                    onChange={(e, newVal) => {
                        setSettings((st) => {
                            return {
                                ...st,
                                nodeRadius: newVal as number,
                            };
                        });
                    }}
                    style={{ width: "100%" }}
                />
            </GraphInput>

            <GraphInput label="Edge Colour">
                <input
                    type="color"
                    name="Edge Colour"
                    value={settings.edgeColor}
                    onChange={(e) => {
                        setSettings({
                            ...settings,
                            edgeColor: e.target.value as Color,
                        });
                    }}
                />
            </GraphInput>

            <GraphInput label="Edge Thickness">
                <ToggleButton
                    value="check"
                    selected={typeof settings.edgeThickness === "number"}
                    style={{
                        backgroundColor:
                            typeof settings.edgeThickness === "number"
                                ? "#000000"
                                : "#888888",
                        color: "white",
                    }}
                    onChange={() => {
                        setSettings({
                            ...settings,
                            edgeThickness:
                                typeof settings.edgeThickness === "number"
                                    ? "weight"
                                    : 5,
                        });
                    }}
                >
                    {typeof settings.edgeThickness === "number"
                        ? "Fixed"
                        : "Weight"}
                </ToggleButton>
                <Slider
                    step={3}
                    marks
                    min={6}
                    max={60}
                    value={
                        typeof settings.edgeThickness === "number"
                            ? settings.edgeThickness
                            : 5
                    }
                    disabled={typeof settings.edgeThickness !== "number"}
                    onChange={(e, newVal) => {
                        setSettings((st) => {
                            return {
                                ...st,
                                edgeThickness: newVal as number,
                            };
                        });
                    }}
                />
            </GraphInput>

            <GraphInput label="Edge Length">
                <ToggleButton
                    value="check"
                    selected={typeof settings.edgeLength === "number"}
                    style={{
                        backgroundColor:
                            typeof settings.edgeLength === "number"
                                ? "#000000"
                                : "#888888",
                        color: "white",
                    }}
                    onChange={() => {
                        setSettings({
                            ...settings,
                            edgeLength:
                                typeof settings.edgeLength === "number"
                                    ? "weight"
                                    : 5,
                        });
                    }}
                >
                    {typeof settings.edgeLength === "number"
                        ? "Fixed"
                        : "Weight"}
                </ToggleButton>
                <Slider
                    step={10}
                    marks
                    min={20}
                    max={300}
                    value={
                        typeof settings.edgeLength === "number"
                            ? settings.edgeLength
                            : 5
                    }
                    disabled={typeof settings.edgeLength !== "number"}
                    onChange={(e, newVal) => {
                        setSettings((st) => {
                            return {
                                ...st,
                                edgeLength: newVal as number,
                            };
                        });
                    }}
                />
            </GraphInput>
        </GraphInputWrapper>
    );
}
