import { IconButton, Slider, Stack, ToggleButton } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { GlobalSettings } from "../types";
import Color from "../../../utils/color";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import { useState } from "react";

interface GraphInputProps {
    label: string;
    children: JSX.Element[] | JSX.Element;
}

function GraphInput(props: GraphInputProps) {
    return (
        <Stack
            direction="row"
            style={{ display: "flex", alignItems: "center" }}
        >
            <p style={{ fontWeight: "bold", width: "15%" }}>{props.label}:</p>
            <Stack direction="row" spacing={5} style={{ width: "100%" }}>
                {props.children}
            </Stack>
        </Stack>
    );
}

interface GraphInputSettingsPanelProps {
    settings: GlobalSettings;
    setSettings: React.Dispatch<React.SetStateAction<GlobalSettings>>;
}

export default function GraphInputSettingsPanel(
    props: GraphInputSettingsPanelProps
) {
    const { settings, setSettings } = props;
    const [showing, setShowing] = useState<boolean>(false);

    return (
        <Stack
            id="control-panel"
            style={{
                backgroundColor: "#0c4121",
                padding: "1vw",
                marginLeft: "1vw",
                marginRight: "1vw",
                borderRadius: "1vw",
                opacity: "0.8",
            }}
        >
            <Stack
                direction="row"
                style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                }}
                onClick={() => {
                    setShowing((s) => !s);
                }}
                spacing={2}
            >
                <ArrowDropDownCircleIcon
                    style={{
                        rotate: showing ? "270deg" : "360deg",
                    }}
                />
                <h2 className="center">Controls</h2>
            </Stack>
            <div hidden={showing}>
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
                        getAriaValueText={() => `${settings.nodeRadius}`}
                        valueLabelDisplay="auto"
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
                        step={5}
                        marks
                        min={5}
                        max={100}
                        getAriaValueText={() => `${settings.edgeThickness}`}
                        valueLabelDisplay="auto"
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
                        step={5}
                        marks
                        min={5}
                        max={100}
                        getAriaValueText={() => `${settings.edgeLength}`}
                        valueLabelDisplay="auto"
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
            </div>
        </Stack>
    );
}
