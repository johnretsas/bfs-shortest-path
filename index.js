'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function (inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function () {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'bfs' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER m
 *  3. 2D_INTEGER_ARRAY edges
 *  4. INTEGER s
 */
const adjacencyList = new Map();

function addNode(node) {
    adjacencyList.set(node, []);
}

function addEdge(origin, destination) {
    adjacencyList.get(origin).push(destination);
    adjacencyList.get(destination).push(origin);
}


function bfs(n, m, edges, s) {
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
                console.log("Visited: ", destination);
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
    return (multiplyByValue(distances, 6));

}


function main() {

    const q = parseInt(readLine().trim(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

        const n = parseInt(firstMultipleInput[0], 10);

        const m = parseInt(firstMultipleInput[1], 10);

        let edges = Array(m);

        for (let i = 0; i < m; i++) {
            edges[i] = readLine().replace(/\s+$/g, '').split(' ').map(edgesTemp => parseInt(edgesTemp, 10));
        }

        const s = parseInt(readLine().trim(), 10);

        const result = bfs(n, m, edges, s);

        console.log(result)
    }

    ws.end();
}
