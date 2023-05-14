import { Stack } from "@mui/material";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import { useState } from "react";

interface GraphInputProps {
    label: string;
    children: JSX.Element[] | JSX.Element;
    widthPercent?: number;
}

export function GraphInput(props: GraphInputProps) {
    return (
        <Stack
            direction="row"
            style={{ display: "flex", alignItems: "center" }}
        >
            <p
                style={{
                    fontWeight: "bold",
                    width: `${props.widthPercent ?? 15}%`,
                }}
            >
                {props.label}:
            </p>
            <Stack direction="row" spacing={5} style={{ width: "100%" }}>
                {props.children}
            </Stack>
        </Stack>
    );
}

interface GraphInputWrapperProps {
    label: string;
    children: JSX.Element[] | JSX.Element;
    opacity?: number;
}

export function GraphInputWrapper(props: GraphInputWrapperProps) {
    const [hidden, setHidden] = useState<boolean>(true);

    return (
        <Stack
            id="control-panel"
            style={{
                backgroundColor: "#21603a",
                padding: "1vw",
                marginLeft: "1vw",
                marginRight: "1vw",
                borderRadius: "1vw",
                opacity: props.opacity ?? 0.8,
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
                    setHidden((s) => !s);
                }}
                spacing={2}
            >
                <ArrowDropDownCircleIcon
                    style={{
                        rotate: hidden ? "270deg" : "360deg",
                    }}
                />
                <h2 className="center">{props.label}</h2>
            </Stack>
            <div hidden={hidden}>{props.children}</div>
        </Stack>
    );
}
