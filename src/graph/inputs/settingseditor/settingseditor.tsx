import { Slider, ToggleButton } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { GlobalSettings } from "../../types";
import Color from "../../../utils/color";
import { GraphInputWrapper, GraphInput } from "../input";

interface GraphInputSettingsPanelProps {
    settings: GlobalSettings;
    setSettings: React.Dispatch<React.SetStateAction<GlobalSettings>>;
}

export default function GraphInputSettingsPanel(
    props: GraphInputSettingsPanelProps
) {
    const { settings, setSettings } = props;

    return (
        <GraphInputWrapper label="Controls">
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
