import { Component, RefObject, createRef } from "react";
import { AdjList, GlobalSettings, NodeData } from "../types";
import p5 from "p5";
import Pair, { add, mult, restrict } from "../../utils/pair";
import contrast from "../../utils/contrast";
import { Button, Stack } from "@mui/material";

const CENTER_FORCE_SCALE = 0.00001;
const REPULSION_FORCE_SCALE = 0.001;
const EDGE_FORCE_SCALE = 0.0001;
const THICKNESS_SCALE = 1;
const MAX_VELOCITY = 1.5;

interface DisplayProps {
    nodeData: NodeData;
    adjList: AdjList;
    settings: GlobalSettings;
    saveCanvas: boolean;
}

export default class Display extends Component<DisplayProps> {
    ref: RefObject<HTMLDivElement>;
    p5: any | null = null;
    props: DisplayProps;
    startTime: number = Date.now();
    selectedNode: string | null = null;
    DAMPING: number = 0.99;

    constructor(props: DisplayProps) {
        super(props);
        this.props = props;
        this.sketch = this.sketch.bind(this);
        this.updateNodes = this.updateNodes.bind(this);
        this.applyForce = this.applyForce.bind(this);

        this.ref = createRef<HTMLDivElement>();

        window.onresize = () => {
            if (this.p5) {
                this.p5.resizeCanvas(window.innerWidth, window.innerHeight);
            }
        };
    }

    updateNodes() {
        for (let node of Object.values(this.props.nodeData)) {
            node.velocity = add(node.velocity, node.acceleration);
            node.velocity = mult(node.velocity, this.DAMPING);
            node.velocity = restrict(node.velocity, MAX_VELOCITY);
            node.pos = add(node.pos, node.velocity);
            node.pos = new Pair(
                Math.min(Math.max(node.pos.first, 0), window.innerWidth),
                Math.min(Math.max(node.pos.second, 0), window.innerHeight)
            );
            node.acceleration = new Pair(0, 0);
        }
    }

    applyForce(
        nodeID: string,
        force: Pair<number, number>,
        source: string = ""
    ) {
        this.props.nodeData[nodeID].acceleration = add(
            this.props.nodeData[nodeID].acceleration,
            force
        );
    }

    sketch(p5: any) {
        p5.setup = () => {
            p5.createCanvas(window.innerWidth, window.innerHeight);
            this.startTime = Date.now();
        };

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
                for (let neighbour of this.props.adjList[node.label]) {
                    let neighbourNode = this.props.nodeData[neighbour.first];
                    if (neighbourNode) {
                        let thickness = this.props.settings.edgeThickness;
                        if (thickness === "weight")
                            thickness = neighbour.second;
                        thickness = Math.sqrt(thickness * THICKNESS_SCALE);

                        let clr = this.props.settings.edgeColor;

                        p5.push();
                        p5.stroke(clr);
                        if (thickness === 0) p5.noStroke();
                        else p5.strokeWeight(thickness / 2);

                        if (neighbourNode.label == node.label) {
                            // loop from node to itself
                            p5.noFill();
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
                            p5.line(
                                node.pos.first,
                                node.pos.second,
                                neighbourNode.pos.first,
                                neighbourNode.pos.second
                            );
                        }
                        p5.pop();

                        if (!this.props.settings.bidirectional) {
                            p5.push();
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
                if (this.selectedNode === node.label)
                    node.pos = new Pair(p5.mouseX, p5.mouseY);

                // !APPLY FORCES
                // apply forces - near edge
                let distX = p5.width / 2 - node.pos.first;
                let distY = p5.height / 2 - node.pos.second;
                this.applyForce(
                    node.label,
                    new Pair(
                        distX * CENTER_FORCE_SCALE,
                        distY * CENTER_FORCE_SCALE
                    ),
                    "near edge"
                );

                // apply forces - repel
                for (let otherNode of Object.values(this.props.nodeData)) {
                    if (
                        otherNode.label !== node.label &&
                        p5.dist(
                            node.pos.first,
                            node.pos.second,
                            otherNode.pos.first,
                            otherNode.pos.second
                        ) <
                            this.props.settings.nodeRadius * 3
                    ) {
                        this.applyForce(
                            node.label,
                            new Pair(
                                REPULSION_FORCE_SCALE *
                                    -(
                                        this.props.settings.nodeRadius -
                                        (node.pos.first - otherNode.pos.first)
                                    ),
                                REPULSION_FORCE_SCALE *
                                    -(
                                        this.props.settings.nodeRadius -
                                        (node.pos.second - otherNode.pos.second)
                                    )
                            ),
                            "repel"
                        );
                    }
                }

                // apply forces - edge
                for (let neighbour of this.props.adjList[node.label]) {
                    let neighbourNode = this.props.nodeData[neighbour.first]!;
                    if (neighbourNode.label === node.label) continue;
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
                    let angle = p5.atan2(
                        neighbourNode.pos.second - node.pos.second,
                        neighbourNode.pos.first - node.pos.first
                    );

                    this.applyForce(
                        node.label,
                        new Pair(
                            p5.cos(angle) * force * EDGE_FORCE_SCALE,
                            p5.sin(angle) * force * EDGE_FORCE_SCALE
                        ),
                        "edge"
                    );
                }

                let radius = this.props.settings.nodeRadius;
                let clr = this.props.settings.nodeColor;
                p5.push();
                p5.fill(clr);
                p5.strokeWeight(radius / 10);
                p5.circle(node.pos.first, node.pos.second, radius * 2);
                p5.pop();

                p5.push();
                p5.textSize((radius / node.label.length) * 1.5);
                p5.textAlign(p5.CENTER, p5.CENTER);
                p5.fill(contrast(clr));
                p5.text(node.label, node.pos.first, node.pos.second);
                p5.pop();

                this.updateNodes();
            }
            if (mouseOverNode) document.body.style.cursor = "pointer";
            else document.body.style.cursor = "default";
        };

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

        p5.mouseReleased = () => {
            this.selectedNode = null;
        };
    }

    componentDidMount() {
        this.p5 = new p5(this.sketch, this.ref.current!);
    }

    render() {
        return (
            <Stack>
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
