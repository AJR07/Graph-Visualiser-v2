import { Stack } from "@mui/material";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import { useState } from "react";

interface GraphInputProps {
    label: string;
    children: JSX.Element[] | JSX.Element;
}

export default function GraphInputWrapper(props: GraphInputProps) {
    const [showing, setShowing] = useState<boolean>(false);

    return (
        <Stack
            id="control-panel"
            style={{
                backgroundColor: "#1b8e49",
                padding: "1vw",
                marginLeft: "1vw",
                marginRight: "1vw",
                borderRadius: "1vw",
                opacity: "0.75",
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
                <h2 className="center">{props.label}</h2>
            </Stack>
            <div hidden={showing}>{props.children}</div>
        </Stack>
    );
}
