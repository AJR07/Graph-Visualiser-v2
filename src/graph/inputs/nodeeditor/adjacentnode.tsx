import { Stack } from "@mui/material";
import { AdjList, Node } from "../../types";
import Pair from "../../../utils/pair";

/**
 * Props for adjacent nodes to the current node
 *
 * @interface AdjacentNodesProps
 * @typedef {AdjacentNodesProps}
 */
interface AdjacentNodesProps {
    /**
     * the current node that this is adjacent to
     *
     * @type {Node}
     */
    node: Node;
    /**
     * adjacency list for the graph
     *
     * @type {AdjList}
     */
    adjList: AdjList;
    /**
     * function to set the adjacency list
     *
     * @type {React.Dispatch<React.SetStateAction<AdjList>>}
     */
    setAdjList: React.Dispatch<React.SetStateAction<AdjList>>;
    /**
     * whether the graph is bidirectional
     *
     * @type {boolean}
     */
    bidirectional: boolean;
}

/**
 * Component for the adjacent nodes to the current node
 *
 * @export
 * @param {AdjacentNodesProps} props
 * @returns {*}
 */
export default function AdjacentNodes(props: AdjacentNodesProps) {
    let { node } = props;
    return (
        <>
            {Object.keys(props.adjList).includes(node.label)
                ? Object.values(props.adjList[node.label]).map((adjNode) => {
                      return (
                          <Stack key={adjNode.first}>
                              {/* Render the node name */}
                              <h3
                                  className="node node-adjacent center"
                                  key={adjNode.first}
                                  style={{ cursor: "pointer", margin: 0 }}
                                  onClick={() => {
                                      // delete the edge
                                      props.setAdjList((adjList) => {
                                          let newAdjList = { ...adjList };
                                          newAdjList[node.label] = newAdjList[
                                              node.label
                                          ].filter(
                                              (pair) =>
                                                  pair.first !== adjNode.first
                                          );
                                          if (
                                              props.bidirectional &&
                                              newAdjList[adjNode.first]
                                          ) {
                                              newAdjList[adjNode.first] =
                                                  newAdjList[
                                                      adjNode.first
                                                  ].filter(
                                                      (potentialNode) =>
                                                          node.label !==
                                                          potentialNode.first
                                                  );
                                          }
                                          return newAdjList;
                                      });
                                  }}
                              >
                                  {adjNode.first}
                              </h3>
                              {/* Render a number selector to adjust weight! */}
                              <input
                                  type="number"
                                  value={adjNode.second}
                                  style={{ color: "black" }}
                                  onChange={(evt) => {
                                      props.setAdjList((adj) => {
                                          // make a copy of the adj list
                                          let newAdj = {
                                              ...adj,
                                          };
                                          let val = parseInt(evt.target.value);
                                          if (isNaN(val)) val = 0;
                                          val = Math.abs(val);

                                          // update the weight for that edge
                                          newAdj[node.label].find(
                                              (pair) =>
                                                  pair.first === adjNode.first
                                          )!.second = val;

                                          // if its bidirectional, update the other edge too
                                          if (props.bidirectional) {
                                              // find the other edge
                                              let correspondingEdge = newAdj[
                                                  adjNode.first
                                              ].find(
                                                  (pair) =>
                                                      pair.first === node.label
                                              );
                                              // doesn't exist, create it
                                              if (correspondingEdge) {
                                                  newAdj[adjNode.first].find(
                                                      (pair) =>
                                                          pair.first ===
                                                          node.label
                                                  )!.second = val;
                                              } else {
                                                  newAdj[adjNode.first].push(
                                                      new Pair(node.label, val)
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
