import { Slider, Stack, ToggleButton } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { GlobalSettings } from "./graphtypes";

interface GraphInputProps {
    label: string;
    children: JSX.Element[] | JSX.Element;
}

function GraphInput(props: GraphInputProps) {
    return (
        <Stack
            direction="row"
            spacing={2}
            style={{ display: "flex", alignItems: "center" }}
        >
            <p className="black" style={{ fontWeight: "bold" }}>
                {props.label}:
            </p>
            {props.children}
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

    return (
        <Stack
            id="control-panel"
            style={{
                backgroundColor: "#56a543",
                padding: "1vw",
                marginLeft: "1vw",
                marginRight: "1vw",
                borderRadius: "1vw",
            }}
        >
            <h2 className="black center">Controls</h2>
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
                    value={settings.edgeThickness as number}
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
                    value={settings.edgeLength as number}
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
        </Stack>
    );
}
