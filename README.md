# **Graph Visualiser v2**

### **View the Project [Here](https://graph-visual.web.app/)**

For all viewing from the site, and have no idea what this is supposed to help you visualise, please read [beginner's guide](#beginners-introduction-on-graph-theory).

## **Project Discription**

Extension of the graph visualiser me and @wangy412 did a long time ago, this time for CEP. I would like to clarify that Yunze did a lot (i mean most) of the work for that collaboration. This is meant to be a huge extension. Plus, its using a completely different framework and its 3 years apart LOL. If you want to see it, this is the [old one](https://ajr07.github.io/Graph-Visualiser/). Enjoy!

### **Side Note: Where is the simulation/visualisation?**

Simulation: There are many controls, some which would affect the physics simulation in the graph below. You could play around with this, from what I've tried with complex loops, trees etc, you can create some very cool simulations.

## **Tech Stack**

-   **Firebase**: Only for hosting
-   **React**: Framework of choice
-   **Typescript**: Language (for typings)
-   **p5**: For rendering of graph (wow AJR using p5 no way)
-   **Material UI (MUI)**: For all the beautiful input components, mainly

## **Beginner's Introduction on Graph Theory**

Well, if you want to learn what it actually is... Read the first lesson of Graph Theory in Competitive Programming [here](https://docs.google.com/presentation/d/1JWnxpK5VAGoJ81ZIeWHu4zaljB0kVptnhPw_iDgjORc/edit#slide=id.ga62fe6c12e_0_178).

Anyways, Graph Theory is basically a set of vertices/nodes (we will call them nodes here) connected by edges. Think of them like your train networks, your train stations are your nodes/vertices, the railroad are your edges, the trains... well they are non-existent LOL.

So basically, an edge can have a certain weight. This could represent the distance between two train stops for example. In the website, you can use Node Length set as Weight to allow it to resemble this.

Furthermore, an edge can be pointing in a certain direction. Like, you wouldn't want trains using the same railroad to be travelling towards each other. This is where the bidirectional setting comes in. Let's say you want to assume all railroads have both directions built, then check that box.

That was your very very very brief introduction to graph theory. If you are still clueless as to how to use this website, see [user manual](#user-manual).

## **User Manual**

-   **Controls**
    -   Bidirectional: Controls if all edges are bidirectional
    -   Node Colour: Controls the colour of all the nodes
    -   Node Radius: Controls the radius of all the nodes
    -   Edge Colour: Controls the colour of all the edges
    -   Edge Thickness: There is a toggle button controlling if the weight of that edge should determine this property, or if it should be fixed manually. If the latter is chosen, the slider will be unlocked for you to manually fix it.
    -   Edge Length: Similar to above.
-   **Node Editor**
    -   Type in some name for a node in the text box
    -   Hit Enter
    -   Your node will now have been created, and placed on the graph
    -   For each box, the node to the left of the double arrow represents the current node. The nodes to the right represents the nodes its connected to.
        -   For example, it A >> B C D, that means that A can go to B, A can go to C, A can go to D.
        -   Notice that theres a number selector below too. This will allow you to change the edge between the current node and the node above the selector.
    -   At the right, theres an Add Node dropdown. By selecting something on the dropdown, you are adding that connecting the current node to the one you selected.
    -   The delete button, well removes the node and all its associated edges.
-   **Import/Export**

    -   Format Instructions are there, go read.
    -   Select your import/export type. ALl of the operations below will use your selected type.
    -   If you want to import some data into the grpah, key it into the textfield, click import. If an error pops up, check your format.
    -   If you want to export the graph as data, click Export. This will show the exported data in the area below, and copy it to clipboard. You can share this to anyone.

-   **Graph**
    -   You can click "SAVE TO IMAGE" to save the current canvas to image, duh.
    -   You can also click and drag any node to position it anywhere as you would like.

## **TODO**

-   Create initial setup for project (3/5)
-   Setup Dynamic Parameters for routes (3/5)
-   Represent data in app (5/5)
-   Build UI to adjust parameters (7/5)
    -   Bi-directional/Uni-directional
    -   Show Graph Weights (don't show, show using line, show using thickness)
-   Build import/export data in UI (14/5)
-   Display Graph (9/5)
-   Account for other settings, such as bidirectional and weight of nodes + edges (12/5)
-   Add Physics to Graph, and interactivity (12/5)
-   Hook route parameters for sharing of graphs (**NOT IMPLEMENTED**)

## **DEVLOGS**

-   4th May: Completed the main control panel UI. Of course, there is still the edge colour and the line colour settings to be added. I have also reorganised most of the code to hopefully fit better with the layout and things. :D

-   7th May: Refuribished control panel, allowing it to be collapsed.

-   9th May: Implemented all of the UI settings, worked out integrating p5 into the website, so that it can be used to easily display the graph. I have done a rough display of the graph itself, but more improvements are to come!

-   12th May: I realised I forgot about the how the weight of nodes affect the thickness and length of edges..., so I integrated the thickness of the edges with the weight of the node here. This required modifying a lot of the Graph's Data structure & storage. It also required me ot modify the node's manual input controller for it to include edge weights. Couldn't really do much else, no time :(

-   13th May: Well, deadline is coming close. I implemented physics today, and interactivity for the user to be able to interact with the graph. I basically implemented a few things that control each nodes' position: A force that draws every node to the center, A force that repels a node if its in close proximity with another node, A force that pulls or pushes two nodes apart if they have an edge, depending on the current edge length versus the intended one. This ofc required optimizaiton so ti runs smoothly, etc.

-   14th: SUBMISSION DAY! Wow this project was short. Well, I had to implement import/export, which was a huge pain. It required writing 6 different parsers for data to adjlist/adjmatrix/edge list, or vice versa. I also hooked this README to the website itself, so that you guys can have a one-stop read of what happened. There was a lot more improvements and changes, too tired to try to recall. Welp. That's it! TIme to document everything.

# **Wow you made it all the way? Good job! Thanks for trying this out :D**

-   Also thanks to @wangy412 for pioneering this idea
