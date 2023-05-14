import { Stack } from "@mui/material";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import { useState } from "react";

/**
 * Props for the GraphInput component
 *
 * @interface GraphInputProps
 * @typedef {GraphInputProps}
 */
interface GraphInputProps {
    /**
     * Label for the input
     *
     * @type {string}
     */
    label: string;
    /**
     * Render the inputs as children
     *
     * @type {(JSX.Element[] | JSX.Element)}
     */
    children: JSX.Element[] | JSX.Element;
    /**
     * Width that the label should occupy in percent
     *
     * @type {?number}
     */
    widthPercent?: number;
}

/**
 * Graph Input Wrapper component - For each individual controls
 *
 * @export
 * @param {GraphInputProps} props
 * @returns {*}
 */
export function GraphInput(props: GraphInputProps) {
    return (
        <Stack
            direction="row"
            style={{ display: "flex", alignItems: "center" }}
        >
            {/* Render a label */}
            <p
                style={{
                    fontWeight: "bold",
                    width: `${props.widthPercent ?? 15}%`,
                }}
            >
                {props.label}:
            </p>
            {/* And then the input, with a spacing of 5 */}
            <Stack direction="row" spacing={5} style={{ width: "100%" }}>
                {props.children}
            </Stack>
        </Stack>
    );
}

/**
 * Props for the GraphInputWrapper component - for control groups
 *
 * @interface GraphInputWrapperProps
 * @typedef {GraphInputWrapperProps}
 */
interface GraphInputWrapperProps {
    /**
     * Label for the input
     *
     * @type {string}
     */
    label: string;
    /**
     * Render the inputs as children
     *
     * @type {(JSX.Element[] | JSX.Element)}
     */
    children: JSX.Element[] | JSX.Element;
    /**
     * Opacity of the wrapper
     *
     * @type {?number}
     */
    opacity?: number;
}

/**
 * Graph Input Wrapper component
 *
 * @export
 * @param {GraphInputWrapperProps} props
 * @returns {*}
 */
export function GraphInputWrapper(props: GraphInputWrapperProps) {
    // control if the controls below are hidden
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
            {/* A clickable arrow to hide and unhide things */}
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
            {/* Render children if not hidden */}
            <div hidden={hidden}>{props.children}</div>
        </Stack>
    );
}
