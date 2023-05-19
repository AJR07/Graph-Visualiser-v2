import { Component, RefObject, createRef } from "react";
import { AdjList, GlobalSettings, NodeData } from "./types";
import p5 from "p5";
import Pair, { add, mult, restrict } from "../utils/pair";
import contrast from "../utils/contrast";
import { Button, Stack } from "@mui/material";

/**
 * Constant for the strength of the force pushing things away from each other
 *
 * @type {number}
 */
const REPULSION_FORCE_SCALE = 0.9;
/**
 * Constant for the strength of the force pulling things towards each other, if they are connected via an edge
 *
 * @type {number}
 */
const EDGE_FORCE_SCALE = 0.001;
/**
 * Constant for how thick the edges should be when rendered
 *
 * @type {number}
 */
const THICKNESS_SCALE = 1;
/**
 * Constant for the maximum velocity of a node
 *
 * @type {number}
 */
const MAX_VELOCITY = 4;
/**
 * Constant for the damping factor of the velocity
 *
 * @type {number}
 */
const DAMPING = 0.9;

/**
 * Props for the p5 display component
 *
 * @interface DisplayProps
 * @typedef {DisplayProps}
 */
interface DisplayProps {
    /**
     * nodeData to be display
     *
     * @type {NodeData}
     */
    nodeData: NodeData;
    /**
     * Adjacency list to be display
     *
     * @type {AdjList}
     */
    adjList: AdjList;
    /**
     * Global settings to be used when displaying
     *
     * @type {GlobalSettings}
     */
    settings: GlobalSettings;
}

/**
 * Class Component to display the graph, integrated with p5
 *
 * @export
 * @class Display
 * @typedef {Display}
 * @extends {Component<DisplayProps>}
 */
export default class Display extends Component<DisplayProps> {
    /**
     * reference to link p5 to the div to add the canvas
     *
     * @type {RefObject<HTMLDivElement>}
     */
    ref: RefObject<HTMLDivElement>;
    /**
     * var that stores our instance of p5
     *
     * @type {(any | null)}
     */
    p5: any | null = null;
    /**
     * props passed into the component
     *
     * @type {DisplayProps}
     */
    props: DisplayProps;

    // !utility variables
    /**
     * start time when the component was rendered, for framerate
     *
     * @type {number}
     */
    startTime: number = Date.now();
    /**
     * node that is selected by the mouse
     *
     * @type {(string | null)}
     */
    selectedNode: string | null = null;

    /**
     * Creates an instance of Display.
     *
     * @constructor
     * @param {DisplayProps} props
     */
    constructor(props: DisplayProps) {
        // add props to the class
        super(props);
        this.props = props;

        // bind functions so they can use 'this'
        this.sketch = this.sketch.bind(this);
        this.updateNodes = this.updateNodes.bind(this);
        this.applyForce = this.applyForce.bind(this);

        // create ref
        this.ref = createRef<HTMLDivElement>();

        // update canvas upon window resize
        window.onresize = () => {
            if (this.p5) {
                this.p5.resizeCanvas(window.innerWidth, window.innerHeight);
            }
        };
    }

    /**
     * function to be run every frame to update every node!
     */
    updateNodes() {
        for (let node of Object.values(this.props.nodeData)) {
            // add acceleration to velocity
            node.velocity = add(node.velocity, node.acceleration);
            // add dapming factor
            node.velocity = mult(node.velocity, DAMPING);

            // clamp velocity
            node.velocity = restrict(node.velocity, MAX_VELOCITY);

            // calculate position, restrict to within canvas
            node.pos = add(node.pos, node.velocity);
            node.pos = new Pair(
                Math.min(
                    Math.max(node.pos.first, this.props.settings.nodeRadius),
                    window.innerWidth - this.props.settings.nodeRadius
                ),
                Math.min(
                    Math.max(node.pos.second, this.props.settings.nodeRadius),
                    window.innerHeight - this.props.settings.nodeRadius
                )
            );

            // reset acceleration
            node.acceleration = new Pair(0, 0);

            // if the node is selected, set it to the same position as mouse
            if (this.selectedNode === node.label)
                node.pos = new Pair(this.p5.mouseX, this.p5.mouseY);
        }
    }

    /**
     * Function to apply a force to a node
     * The source param is for debugging.
     *
     * @param {string} nodeID
     * @param {Pair<number, number>} force
     * @param {string} [source=""]
     */
    applyForce(
        nodeID: string,
        force: Pair<number, number>,
        source: string = ""
    ) {
        // add the force to the acceleration
        this.props.nodeData[nodeID].acceleration = add(
            this.props.nodeData[nodeID].acceleration,
            force
        );
    }

    /**
     * Draw the graph using p5!!!
     *
     * @param {*} p5
     */
    sketch(p5: any) {
        // set up the canvas
        p5.setup = () => {
            p5.createCanvas(window.innerWidth, window.innerHeight);
            // store the start time
            this.startTime = Date.now();
        };

        // draw the graph - ran every frame
        p5.draw = () => {
            let mouseOverNode = false;
            p5.background(50);

            // frame rate
            p5.push();
            p5.textSize(10);
            p5.textAlign(p5.RIGHT, p5.CENTER);
            p5.fill("white");
            p5.text(
                `Frame Rate: ${Math.round(
                    p5.frameCount / ((Date.now() - this.startTime) / 1000)
                )}`,
                p5.width - 10,
                20
            );
            p5.pop();

            // draw edges
            for (let node of Object.values(this.props.nodeData)) {
                // check neighbour for each edge
                for (let neighbour of this.props.adjList[node.label]) {
                    if (!neighbour) continue;
                    // get the neighbour node
                    let neighbourNode = this.props.nodeData[neighbour.first];
                    // if it exists
                    if (neighbourNode) {
                        // calculate thickness
                        let thickness = this.props.settings.edgeThickness;
                        if (thickness === "weight")
                            thickness = neighbour.second;
                        thickness = Math.sqrt(thickness * THICKNESS_SCALE);

                        p5.push();
                        let clr = this.props.settings.edgeColor;
                        p5.stroke(clr);

                        // if thickness is 0, don't draw the stroke
                        if (thickness === 0) p5.noStroke();
                        else p5.strokeWeight(thickness / 2);

                        // if there is a self loop, aka node go to itself
                        if (neighbourNode.label == node.label) {
                            // loop from node to itself
                            p5.noFill();
                            // use a circle to draw a loop
                            p5.circle(
                                node.pos.first +
                                    this.props.settings.nodeRadius / 2.5 +
                                    thickness,
                                node.pos.second +
                                    this.props.settings.nodeRadius / 2.5 +
                                    thickness,
                                this.props.settings.nodeRadius
                            );
                        } else {
                            // draw a line from node to neighbour
                            p5.line(
                                node.pos.first,
                                node.pos.second,
                                neighbourNode.pos.first,
                                neighbourNode.pos.second
                            );
                        }
                        p5.pop();

                        // if its a directed graph, draw an arrow
                        if (!this.props.settings.bidirectional) {
                            p5.push();
                            // by calculating midpoint and angle
                            let midpoint = new Pair(
                                    (node.pos.first + neighbourNode.pos.first) /
                                        2,
                                    (node.pos.second +
                                        neighbourNode.pos.second) /
                                        2
                                ),
                                angle =
                                    p5.atan2(
                                        neighbourNode.pos.second -
                                            node.pos.second,
                                        neighbourNode.pos.first - node.pos.first
                                    ) +
                                    p5.PI / 2;

                            // draw the arrow
                            p5.noStroke();
                            p5.translate(midpoint.first, midpoint.second);
                            p5.rotate(angle);
                            p5.triangle(
                                0,
                                -thickness,
                                -thickness,
                                0,
                                thickness,
                                0
                            );
                            p5.pop();
                        }
                    }
                }
            }

            // draw nodes
            for (let node of Object.values(this.props.nodeData)) {
                // check if mouse is over node
                if (
                    p5.dist(
                        p5.mouseX,
                        p5.mouseY,
                        node.pos.first,
                        node.pos.second
                    ) < this.props.settings.nodeRadius
                ) {
                    mouseOverNode = true;
                }

                // !APPLY FORCES

                // apply forces - repel from nodes
                for (let otherNode of Object.values(this.props.nodeData)) {
                    if (otherNode.label !== node.label) {
                        this.applyForce(
                            node.label,
                            new Pair(
                                (REPULSION_FORCE_SCALE * 1) /
                                    (node.pos.first - otherNode.pos.first),
                                (REPULSION_FORCE_SCALE * 1) /
                                    (node.pos.second - otherNode.pos.second)
                            ),
                            "repel"
                        );
                    }
                }

                // apply forces - edge
                for (let neighbour of this.props.adjList[node.label]) {
                    // go through all neighbours of current node
                    let neighbourNode = this.props.nodeData[neighbour.first]!;
                    if (neighbourNode.label === node.label) continue;

                    // calculate the force
                    let dist = p5.dist(
                        node.pos.first,
                        node.pos.second,
                        neighbourNode.pos.first,
                        neighbourNode.pos.second
                    );
                    let force =
                        dist -
                        (this.props.settings.edgeLength === "weight"
                            ? neighbour.second
                            : this.props.settings.edgeLength);
                    // and the angle
                    let angle = p5.atan2(
                        neighbourNode.pos.second - node.pos.second,
                        neighbourNode.pos.first - node.pos.first
                    );

                    // apply the force correctly using trigo!
                    this.applyForce(
                        node.label,
                        new Pair(
                            p5.cos(angle) * force * EDGE_FORCE_SCALE,
                            p5.sin(angle) * force * EDGE_FORCE_SCALE
                        ),
                        "edge"
                    );
                }

                // !DRAW THE NODES!
                let radius = this.props.settings.nodeRadius;
                let clr = this.props.settings.nodeColor;
                p5.push();
                p5.fill(clr);
                p5.strokeWeight(radius / 10);
                p5.circle(node.pos.first, node.pos.second, radius * 2);
                p5.pop();

                // draw the labels for each node
                p5.push();
                p5.textSize((radius / node.label.length) * 1.5);
                p5.textAlign(p5.CENTER, p5.CENTER);
                p5.fill(contrast(clr));
                p5.text(node.label, node.pos.first, node.pos.second);
                p5.pop();

                this.updateNodes();
            }
            // if mouse is over node, change cursor
            if (mouseOverNode) document.body.style.cursor = "pointer";
            else document.body.style.cursor = "default";
        };

        // if mouse is pressed, check which node is selected by the mouse
        p5.mousePressed = () => {
            for (let node of Object.values(this.props.nodeData)) {
                if (
                    p5.dist(
                        p5.mouseX,
                        p5.mouseY,
                        node.pos.first,
                        node.pos.second
                    ) < this.props.settings.nodeRadius
                ) {
                    this.selectedNode = node.label;
                }
            }
        };

        // when mouse is released, set selected node to null
        p5.mouseReleased = () => {
            this.selectedNode = null;
        };
    }

    /**
     * When component has mounted, render p5
     */
    componentDidMount() {
        this.p5 = new p5(this.sketch, this.ref.current!);
    }

    /**
     * Render an empty div for the p5 canvas
     *
     * @returns {*}
     */
    render() {
        return (
            <Stack>
                {/* Button to save the canvas as an image */}
                <Button
                    variant="contained"
                    color="success"
                    fullWidth
                    onClick={() => {
                        this.p5!.saveCanvas("graph", "png");
                    }}
                >
                    SAVE AS IMAGE
                </Button>
                <div ref={this.ref} />
            </Stack>
        );
    }
}
