import { Stack } from "@mui/material";
import { AdjList, Node } from "../types";
import Pair from "../../../utils/pair";

interface AdjacentNodesProps {
    node: Node;
    adjList: AdjList;
    setAdjList: React.Dispatch<React.SetStateAction<AdjList>>;
    bidirectional: boolean;
}

export default function AdjacentNodes(props: AdjacentNodesProps) {
    let { node } = props;
    return (
        <>
            {Object.keys(props.adjList).includes(node.label)
                ? Object.values(props.adjList[node.label]).map((adjNode) => {
                      return (
                          <Stack key={adjNode.first}>
                              <h3
                                  className="node node-adjacent center"
                                  key={adjNode.first}
                                  style={{ margin: 0 }}
                              >
                                  {adjNode.first}
                              </h3>
                              <input
                                  type="number"
                                  value={adjNode.second}
                                  style={{ color: "black" }}
                                  onChange={(evt) => {
                                      props.setAdjList((adj) => {
                                          let newAdj = {
                                              ...adj,
                                          };
                                          newAdj[node.label].find(
                                              (pair) =>
                                                  pair.first === adjNode.first
                                          )!.second = parseInt(
                                              evt.target.value
                                          );
                                          if (props.bidirectional) {
                                              let correspondingEdge = newAdj[
                                                  adjNode.first
                                              ].find(
                                                  (pair) =>
                                                      pair.first === node.label
                                              );
                                              if (correspondingEdge) {
                                                  newAdj[adjNode.first].find(
                                                      (pair) =>
                                                          pair.first ===
                                                          node.label
                                                  )!.second = parseInt(
                                                      evt.target.value
                                                  );
                                              } else {
                                                  newAdj[adjNode.first].push(
                                                      new Pair(
                                                          node.label,
                                                          parseInt(
                                                              evt.target.value
                                                          )
                                                      )
                                                  );
                                              }
                                          }
                                          return newAdj;
                                      });
                                  }}
                              />
                          </Stack>
                      );
                  })
                : null}
        </>
    );
}
