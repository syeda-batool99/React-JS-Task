const prompt = require("prompt-sync")();

const airports = [
  {
    start: "ISB",
    end: "LHR",
    cost: 1000,
  },
  {
    start: "LHR",
    end: "NYC",
    cost: 750,
  },
  {
    start: "CBS",
    end: "NYC",
    cost: 775,
  },
  {
    start: "ISB",
    end: "CBS",
    cost: 575,
  },
  {
    start: "CBS",
    end: "GRC",
    cost: 731,
  },
  {
    start: "NYC",
    end: "GRC",
    cost: 459,
  },
];

const graph = {};

for (let i = 0; i < airports.length; i++) {
  graph[airports[i].start] = Object.assign(
    graph[airports[i].start] ? graph[airports[i].start] : {},
    {
      [airports[i].end]: airports[i].cost,
    }
  );
  graph[airports[i].end] = Object.assign(
    graph[airports[i].end] ? graph[airports[i].end] : {},
    {}
  );
}

console.log("graph is ", graph);

var startingPoint = prompt("Enter Starting point: ");
var endingPoint = prompt("Enter Ending Point: ");

const LowestCostAirport = (costs, visited) => {
  let lowest = null;

  for (let node in costs) {
    let currentLowest = lowest === null || costs[node] < costs[lowest];
    if (currentLowest && !visited.includes(node)) {
      lowest = node;
    }
  }
  return lowest;
};

const findLowestCostPath = (graph, startNode, endNode) => {
  let costs = {};
  costs[endNode] = "Infinity";
  costs = Object.assign(costs, graph[startNode]);

  let parents = { endNode: null };
  for (let child in graph[startNode]) {
    parents[child] = startNode;
  }

  let visited = [];

  let airport = LowestCostAirport(costs, visited);

  while (airport) {
    let cost = costs[airport];
    let children = graph[airport];
    for (let child in children) {
      if (String(child) === String(startNode)) {
        continue;
      } else {
        let newCost = cost + children[child];
        if (!costs[child] || costs[child] > newCost) {
          costs[child] = newCost;
          parents[child] = airport;
        }
      }
    }
    visited.push(airport);
    airport = LowestCostAirport(costs, visited);
  }

  let LowestCost = [endNode];
  let parent = parents[endNode];
  while (parent) {
    LowestCost.push(parent);
    parent = parents[parent];
  }
  LowestCost.reverse();

  let results = {
    cost: costs[endNode],
    path: LowestCost,
  };

  return results;
};

console.log(findLowestCostPath(graph, startingPoint, endingPoint));
