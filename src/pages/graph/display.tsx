import { Component, RefObject, createRef } from "react";
import { AdjList, GlobalSettings, NodeData } from "./types";
import p5 from "p5";
import Pair from "../../utils/pair";

interface DisplayProps {
    nodeData: NodeData[];
    adjList: AdjList;
    settings: GlobalSettings;
}

export default class Display extends Component<DisplayProps> {
    ref: RefObject<HTMLDivElement>;
    p5: any | null = null;
    props: DisplayProps;

    constructor(props: DisplayProps) {
        super(props);
        this.props = props;
        this.sketch = this.sketch.bind(this);

        this.ref = createRef<HTMLDivElement>();
    }

    sketch(p5: any) {
        p5.setup = () => {
            p5.createCanvas(window.innerWidth, window.innerHeight);
            p5.frameRate(1);
        };

        p5.draw = () => {
            p5.background(50);

            // draw edges
            for (let node of this.props.nodeData) {
                for (let neighbour of this.props.adjList[node.label]) {
                    let neighbourNode = this.props.nodeData.find(
                        (n) => n.label === neighbour
                    );
                    if (neighbourNode) {
                        let thickness = this.props.settings.edgeThickness;

                        let clr = this.props.settings.edgeColor;
                        p5.push();
                        p5.stroke(clr);
                        p5.strokeWeight(thickness);
                        p5.line(
                            node.pos.first,
                            node.pos.second,
                            neighbourNode.pos.first,
                            neighbourNode.pos.second
                        );

                        let midpoint = new Pair(
                            (node.pos.first + neighbourNode.pos.first) / 2,
                            (node.pos.second + neighbourNode.pos.second) / 2
                        );
                        p5.translate(midpoint.first, midpoint.second);
                        p5.rotate(
                            p5.atan2(
                                neighbourNode.pos.second - node.pos.second,
                                neighbourNode.pos.first - node.pos.first
                            ) +
                                p5.PI / 2
                        );
                        p5.triangle(0, -thickness, -thickness, 0, thickness, 0);
                        p5.pop();
                    }
                }
            }

            // draw nodes
            for (let node of this.props.nodeData) {
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
                p5.textStyle(p5.BOLD);
                // find a contrasting colour to clr
                let r = parseInt(clr.slice(1, 3), 16);
                let g = parseInt(clr.slice(3, 5), 16);
                let b = parseInt(clr.slice(5, 7), 16);
                let luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
                if (luma > 128) {
                    p5.fill(0);
                } else {
                    p5.fill(255);
                }
                p5.text(node.label, node.pos.first, node.pos.second);
                p5.pop();
            }
        };
    }

    componentDidMount() {
        this.p5 = new p5(this.sketch, this.ref.current!);
    }

    render() {
        return <div ref={this.ref} />;
    }
}