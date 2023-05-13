import { Component, RefObject, createRef } from "react";
import { AdjList, GlobalSettings, NodeData } from "../types";
import p5 from "p5";
import Pair from "../../../utils/pair";
import contrast from "../../../utils/contrast";

interface DisplayProps {
    nodeData: NodeData;
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

        window.onresize = () => {
            if (this.p5) {
                this.p5.resizeCanvas(window.innerWidth, window.innerHeight);
            }
        };
    }

    sketch(p5: any) {
        p5.setup = () => {
            p5.createCanvas(window.innerWidth, window.innerHeight);
            p5.frameRate(1);
        };

        p5.draw = () => {
            p5.background(50);

            // draw edges
            for (let node of Object.values(this.props.nodeData)) {
                for (let neighbour of this.props.adjList[node.label]) {
                    let neighbourNode = this.props.nodeData[neighbour.first];
                    if (neighbourNode) {
                        let thickness = this.props.settings.edgeThickness;
                        if (thickness === "weight")
                            thickness = neighbour.second;

                        let clr = this.props.settings.edgeColor;

                        p5.push();
                        p5.stroke(clr);
                        if (thickness === 0) p5.noStroke();
                        else p5.strokeWeight(thickness);
                        p5.line(
                            node.pos.first,
                            node.pos.second,
                            neighbourNode.pos.first,
                            neighbourNode.pos.second
                        );
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
                                -thickness * 2,
                                -thickness * 2,
                                0,
                                thickness * 2,
                                0
                            );
                            p5.pop();
                        }
                    }
                }
            }

            // draw nodes
            for (let node of Object.values(this.props.nodeData)) {
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
