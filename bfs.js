function bfs(n, m, edges, s) {
    const adjacencyList = new Map();

    function addNode(node) {
        adjacencyList.set(node, []);
    }

    function addEdge(origin, destination) {
        adjacencyList.get(origin).push(destination);
        adjacencyList.get(destination).push(origin);
    }
    
    let adj = [[]]

    for (let i = 0; i <= n; i++) {
        addNode(i);
        adj[i] = new Set();
    }

    for (let edge of edges) {
        if (!adj[edge[0]].has(edge[1])) {
            addEdge(edge[0], edge[1]);
            adj[edge[0]].add(edge[1])
            adj[edge[1]].add(edge[0]);
        }
    }

    let distances = [];
    let visited = new Set();

    let queue = [s];
    visited.add(s);

    for (let i = 0; i <= n; i++) {
        distances[i] = 0;
    }

    while (queue.length > 0) {
        let node = queue.shift();

        let destinations = adjacencyList.get(node);

        for (let destination of destinations) {

            if (!visited.has(destination)) {
                visited.add(destination);
                distances[destination] = distances[node] + 1;
                queue.push(destination);
            }
        }
    }

    distances.splice(s, 1);
    distances.shift();

    const multiplyByValue = (arr, value) => arr.map(el => {
        if (el === 0) {
            return -1;
        }
        if (el > 0) {
            return el * 6;
        }
        if (el < 0) {
            return el
        }
    });
    console.log (multiplyByValue(distances, 6));

}

bfs(4, 1, [[1,3], [1,3], [1,2], [1,2]], 1);