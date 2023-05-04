import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AdjList, NodeData } from "./graphtypes";
import Pair from "../../utils/pair";
import Graph from "./graph";

export default function GraphUI() {
    const { data } = useParams();
    const [adjList, setAdjList] = useState<AdjList>({});
    const [graphData, setGraphData] = useState<NodeData[]>([]);
    const [widthHeight, setWidthHeight] = useState<Pair<number, number>>(
        new Pair(window.innerWidth, window.innerHeight)
    );

    useEffect(() => {
        if (data) {
            try {
                const parsedData = JSON.parse(atob(data));
                setAdjList(parsedData as AdjList);
                for (let node of Object.keys(parsedData)) {
                    setGraphData((graphData) => [
                        ...graphData,
                        {
                            label: node,
                            pos: new Pair(
                                Math.random() * widthHeight.first,
                                Math.random() * widthHeight.second
                            ),
                            velocity: new Pair(0, 0),
                            acceleration: new Pair(0, 0),
                        } as NodeData,
                    ]);
                }
            } catch {
                setAdjList({});
            }
        }
    }, []);

    return (
        <div>
            <h1></h1>
            <Graph />
        </div>
    );
}
