import { useState, useRef, useCallback } from "react";

const numRows = 20;
const numCols = 40;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// ✅ Enhanced PriorityQueue with consistent state management
class PriorityQueue {
  constructor() {
    this.heap = [];
    this.nodeSet = new Set();
  }

  enqueue(node, priority) {
    const nodeKey = `${node.row},${node.col}`;
    if (this.nodeSet.has(nodeKey)) return;
    
    this.heap.push({ node, priority });
    this.nodeSet.add(nodeKey);
    this.bubbleUp();
  }

  dequeue() {
    if (this.heap.length === 0) return null;
    
    const min = this.heap[0];
    const nodeKey = `${min.node.row},${min.node.col}`;
    
    if (this.heap.length === 1) {
      this.heap = [];
      this.nodeSet = new Set();
      return min;
    }
    
    this.heap[0] = this.heap.pop();
    this.bubbleDown();
    this.nodeSet.delete(nodeKey);
    
    return min;
  }

  bubbleUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[parentIndex].priority <= this.heap[index].priority) break;
      [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
      index = parentIndex;
    }
  }

  bubbleDown() {
    let index = 0;
    while (true) {
      const leftChild = 2 * index + 1;
      const rightChild = 2 * index + 2;
      let smallest = index;

      if (leftChild < this.heap.length && this.heap[leftChild].priority < this.heap[smallest].priority) {
        smallest = leftChild;
      }
      if (rightChild < this.heap.length && this.heap[rightChild].priority < this.heap[smallest].priority) {
        smallest = rightChild;
      }
      if (smallest === index) break;

      [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
      index = smallest;
    }
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  clear() {
    this.heap = [];
    this.nodeSet.clear();
  }
}

function App() {
  const createGrid = () => {
    const grid = [];
    for (let row = 0; row < numRows; row++) {
      const currentRow = [];
      for (let col = 0; col < numCols; col++) {
        currentRow.push({
          row,
          col,
          isStart: row === 5 && col === 5,
          isEnd: row === 15 && col === 35,
          isWall: false,
          isVisited: false,
          isPath: false,
          weight: 1,
        });
      }
      grid.push(currentRow);
    }
    return grid;
  };

  const [grid, setGrid] = useState(createGrid());
  const [draggingNode, setDraggingNode] = useState(null);
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [algorithm, setAlgorithm] = useState("BFS");
  const [speed, setSpeed] = useState(50);
  const [drawingMode, setDrawingMode] = useState(null);
  const [isWeighted, setIsWeighted] = useState(false);
  const [weightValue, setWeightValue] = useState(5);
  const [isDrawingWeights, setIsDrawingWeights] = useState(false);

  const isCancelled = useRef(false);

  // ✅ Optimized node finding without stale closure issues
  const getStartNode = useCallback((gridState) => {
    if (!gridState) return null;
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        if (gridState[row][col].isStart) {
          return gridState[row][col];
        }
      }
    }
    return null;
  }, []);

  const getEndNode = useCallback((gridState) => {
    if (!gridState) return null;
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        if (gridState[row][col].isEnd) {
          return gridState[row][col];
        }
      }
    }
    return null;
  }, []);

  // Heuristic function for A* (Manhattan distance)
  const heuristic = (nodeA, nodeB) => {
    return Math.abs(nodeA.row - nodeB.row) + Math.abs(nodeA.col - nodeB.col);
  };

  // ✅ Fix 1: Simplified getNeighbors with optimized bounds checking
  const getNeighbors = (cell, gridState) => {
    const { row, col } = cell;
    const neighbors = [];
    
    // ✅ Simplified bounds checking (removed redundant conditions)
    if (row > 0) neighbors.push(gridState[row - 1][col]);
    if (row < numRows - 1) neighbors.push(gridState[row + 1][col]);
    if (col > 0) neighbors.push(gridState[row][col - 1]);
    if (col < numCols - 1) neighbors.push(gridState[row][col + 1]);
    
    return neighbors;
  };

  // ✅ Fix 2: Optimized grid update functions with input validation
  const updateCellVisited = useCallback((row, col) => {
    // ✅ Add bounds validation
    if (row < 0 || row >= numRows || col < 0 || col >= numCols) return;
    
    setGrid((prev) => {
      const newGrid = [...prev];
      newGrid[row] = [...newGrid[row]];
      newGrid[row][col] = {
        ...newGrid[row][col],
        isVisited: true
      };
      return newGrid;
    });
  }, []);

  const updateCellPath = useCallback((row, col) => {
    // ✅ Add bounds validation
    if (row < 0 || row >= numRows || col < 0 || col >= numCols) return;
    
    setGrid((prev) => {
      const newGrid = [...prev];
      newGrid[row] = [...newGrid[row]];
      newGrid[row][col] = {
        ...newGrid[row][col],
        isPath: true
      };
      return newGrid;
    });
  }, []);

  const bfs = async () => {
    // ✅ Fix 3: Use direct reference for read-only operations
    const currentGrid = grid;
    const startNode = getStartNode(currentGrid);
    const endNode = getEndNode(currentGrid);
    
    if (!startNode || !endNode) return false;

    if (startNode.row === endNode.row && startNode.col === endNode.col) {
      return true;
    }

    const queue = [];
    const visited = new Set();
    const cameFrom = {};
    const key = (row, col) => `${row},${col}`;

    queue.push(startNode);
    visited.add(key(startNode.row, startNode.col));

    while (queue.length > 0) {
      if (isCancelled.current) return false;

      const current = queue.shift();
      
      const currentCell = currentGrid[current.row][current.col];
      if (currentCell.isWall) continue;

      if (!currentCell.isStart && !currentCell.isEnd) {
        updateCellVisited(current.row, current.col);
        await sleep(speed);
      }

      if (current.row === endNode.row && current.col === endNode.col) {
        return await tracePath(cameFrom, endNode);
      }

      const neighbors = getNeighbors(current, currentGrid);
      for (const neighbor of neighbors) {
        const neighborKey = key(neighbor.row, neighbor.col);
        if (!visited.has(neighborKey) && !neighbor.isWall) {
          queue.push(neighbor);
          visited.add(neighborKey);
          cameFrom[neighborKey] = current;
        }
      }
    }
    return false;
  };

  const dijkstra = async () => {
    // ✅ Fix 3: Use direct reference for read-only operations
    const currentGrid = grid;
    const startNode = getStartNode(currentGrid);
    const endNode = getEndNode(currentGrid);
    
    if (!startNode || !endNode) return false;

    if (startNode.row === endNode.row && startNode.col === endNode.col) {
      return true;
    }

    const distances = {};
    const visited = new Set();
    const cameFrom = {};
    const key = (row, col) => `${row},${col}`;

    // Initialize distances
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        distances[key(row, col)] = Infinity;
      }
    }

    distances[key(startNode.row, startNode.col)] = 0;
    const pq = new PriorityQueue();
    pq.enqueue(startNode, 0);

    try {
      while (!pq.isEmpty()) {
        if (isCancelled.current) {
          pq.clear();
          return false;
        }

        const result = pq.dequeue();
        if (!result) break;

        const { node: current } = result;
        const currentKey = key(current.row, current.col);

        if (visited.has(currentKey)) continue;

        const currentCell = currentGrid[current.row][current.col];
        if (currentCell.isWall) continue;

        visited.add(currentKey);

        if (!currentCell.isStart && !currentCell.isEnd) {
          updateCellVisited(current.row, current.col);
          await sleep(speed);
        }

        if (current.row === endNode.row && current.col === endNode.col) {
          pq.clear();
          return await tracePath(cameFrom, endNode);
        }

        const neighbors = getNeighbors(current, currentGrid);
        for (const neighbor of neighbors) {
          const neighborKey = key(neighbor.row, neighbor.col);
          
          if (!neighbor.isWall && !visited.has(neighborKey)) {
            const weight = isWeighted ? neighbor.weight : 1;
            const tentativeDistance = distances[currentKey] + weight;
            
            if (tentativeDistance < distances[neighborKey]) {
              distances[neighborKey] = tentativeDistance;
              cameFrom[neighborKey] = current;
              pq.enqueue(neighbor, tentativeDistance);
            }
          }
        }
      }
    } catch (error) {
      console.error("Dijkstra error:", error);
      pq.clear();
      throw error;
    }
    
    pq.clear();
    return false;
  };

  const aStar = async () => {
    // ✅ Fix 3: Use direct reference for read-only operations
    const currentGrid = grid;
    const startNode = getStartNode(currentGrid);
    const endNode = getEndNode(currentGrid);
    
    if (!startNode || !endNode) return false;

    if (startNode.row === endNode.row && startNode.col === endNode.col) {
      return true;
    }

    const openSet = new PriorityQueue();
    const closedSet = new Set();
    const cameFrom = {};
    const gScore = {};
    const fScore = {};
    const key = (row, col) => `${row},${col}`;

    // Initialize scores
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        gScore[key(row, col)] = Infinity;
        fScore[key(row, col)] = Infinity;
      }
    }

    gScore[key(startNode.row, startNode.col)] = 0;
    fScore[key(startNode.row, startNode.col)] = heuristic(startNode, endNode);
    openSet.enqueue(startNode, fScore[key(startNode.row, startNode.col)]);

    try {
      while (!openSet.isEmpty()) {
        if (isCancelled.current) {
          openSet.clear();
          return false;
        }

        const result = openSet.dequeue();
        if (!result) break;

        const { node: current } = result;
        const currentKey = key(current.row, current.col);

        if (closedSet.has(currentKey)) continue;

        if (current.row === endNode.row && current.col === endNode.col) {
          openSet.clear();
          return await tracePath(cameFrom, endNode);
        }

        closedSet.add(currentKey);

        const currentCell = currentGrid[current.row][current.col];
        if (!currentCell.isStart && !currentCell.isEnd) {
          updateCellVisited(current.row, current.col);
          await sleep(speed);
        }

        const neighbors = getNeighbors(current, currentGrid);
        for (const neighbor of neighbors) {
          const neighborKey = key(neighbor.row, neighbor.col);
          
          if (neighbor.isWall || closedSet.has(neighborKey)) continue;

          const weight = isWeighted ? neighbor.weight : 1;
          const tentativeGScore = gScore[currentKey] + weight;

          if (tentativeGScore < gScore[neighborKey]) {
            cameFrom[neighborKey] = current;
            gScore[neighborKey] = tentativeGScore;
            fScore[neighborKey] = gScore[neighborKey] + heuristic(neighbor, endNode);
            openSet.enqueue(neighbor, fScore[neighborKey]);
          }
        }
      }
    } catch (error) {
      console.error("A* error:", error);
      openSet.clear();
      throw error;
    }
    
    openSet.clear();
    return false;
  };

  const tracePath = async (cameFrom, endNode) => {
    const path = [];
    let current = endNode;
    const key = (row, col) => `${row},${col}`;

    while (current) {
      if (isCancelled.current) return false;
      path.push(current);
      current = cameFrom[key(current.row, current.col)];
    }

    path.reverse();

    for (const cell of path) {
      if (isCancelled.current) return false;
      if (!cell.isStart && !cell.isEnd) {
        updateCellPath(cell.row, cell.col);
        await sleep(speed * 1.5);
      }
    }
    return true;
  };

  const isNodeAccessible = (node) => {
    if (!node || node.isWall) return false;
    const neighbors = getNeighbors(node, grid);
    return neighbors.some(neighbor => !neighbor.isWall);
  };

  const handleStart = async () => {
    if (isVisualizing) return;
    
    const startNode = getStartNode(grid);
    const endNode = getEndNode(grid);
    
    if (!startNode || !endNode) {
      alert("Start and end nodes are required!");
      return;
    }

    if (!isNodeAccessible(startNode)) {
      alert("Start node is blocked by walls!");
      return;
    }

    if (!isNodeAccessible(endNode)) {
      alert("End node is blocked by walls!");
      return;
    }

    if (!algorithm || (isWeighted && !["Dijkstra", "A*"].includes(algorithm)) || (!isWeighted && algorithm !== "BFS")) {
      alert("Please select a valid algorithm!");
      return;
    }

    setIsVisualizing(true);
    isCancelled.current = false;

    // Clear previous visualization
    setGrid(prev => prev.map((row) =>
      row.map((cell) => ({
        ...cell,
        isVisited: false,
        isPath: false,
      }))
    ));

    await sleep(50);

    try {
      let result = false;
      if (algorithm === "BFS") {
        result = await bfs();
      } else if (algorithm === "Dijkstra") {
        result = await dijkstra();
      } else if (algorithm === "A*") {
        result = await aStar();
      }
      
      if (!result && !isCancelled.current) {
        alert("No path found!");
      }
    } catch (error) {
      console.error("Algorithm error:", error);
      alert("An error occurred while running the algorithm!");
    } finally {
      setIsVisualizing(false);
    }
  };

  const handleReset = () => {
    isCancelled.current = true;
    setIsVisualizing(false);
    setIsDrawingWeights(false);
    setGrid(prev => prev.map((row) =>
      row.map((cell) => ({
        ...cell,
        isWall: false,
        isVisited: false,
        isPath: false,
        weight: 1,
      }))
    ));
  };

  const handleMouseDown = (row, col) => {
    if (isVisualizing) return;

    const cell = grid[row][col];

    if (cell.isStart) {
      setDraggingNode("start");
    } else if (cell.isEnd) {
      setDraggingNode("end");
    } else if (isDrawingWeights) {
      setDrawingMode("weight");
      setWeight(row, col);
    } else {
      setDrawingMode(cell.isWall ? "erase" : "wall");
      toggleWall(row, col);
    }
  };

  const handleMouseEnter = (row, col) => {
    if (!draggingNode && drawingMode && !isVisualizing) {
      if (drawingMode === "weight") {
        setWeight(row, col);
      } else {
        toggleWall(row, col);
      }
    } else if (draggingNode) {
      moveNode(row, col);
    }
  };

  const handleMouseUp = () => {
    setDraggingNode(null);
    setDrawingMode(null);
  };

  const toggleWall = (row, col) => {
    const cell = grid[row][col];
    if (cell.isStart || cell.isEnd) return;

    setGrid(prev => prev.map((gridRow, r) =>
      gridRow.map((gridCell, c) => {
        if (r === row && c === col) {
          return {
            ...gridCell,
            isWall: drawingMode === "wall",
            weight: drawingMode === "wall" ? 1 : gridCell.weight,
          };
        }
        return gridCell;
      })
    ));
  };

  const setWeight = (row, col) => {
    const cell = grid[row][col];
    if (cell.isStart || cell.isEnd || cell.isWall) return;

    const validWeight = Math.max(1, Math.min(10, weightValue));

    setGrid(prev => prev.map((gridRow, r) =>
      gridRow.map((gridCell, c) => {
        if (r === row && c === col) {
          return {
            ...gridCell,
            weight: validWeight,
          };
        }
        return gridCell;
      })
    ));
  };

  const moveNode = (row, col) => {
    const cell = grid[row][col];
    if (cell.isWall || (draggingNode === "start" && cell.isEnd) || (draggingNode === "end" && cell.isStart)) return;

    setGrid(prev => prev.map((gridRow, r) =>
      gridRow.map((gridCell, c) => {
        const newCell = { ...gridCell };
        if (draggingNode === "start") newCell.isStart = false;
        if (draggingNode === "end") newCell.isEnd = false;
        
        if (r === row && c === col) {
          if (draggingNode === "start") {
            newCell.isStart = true;
            newCell.weight = 1;
          }
          if (draggingNode === "end") {
            newCell.isEnd = true;
            newCell.weight = 1;
          }
        }
        
        return newCell;
      })
    ));
  };

  // ✅ Fix 4: Improved cell styling with proper priority order
  const getCellStyle = (cell) => {
    // ✅ Priority order: most specific first
    if (cell.isStart) return "bg-green-500";
    if (cell.isEnd) return "bg-red-500";
    if (cell.isPath) return "bg-yellow-400";
    if (cell.isVisited) return "bg-blue-300";
    if (cell.isWall) return "bg-gray-800";
    if (isWeighted && cell.weight > 1) return "bg-orange-200";
    return "bg-white";
  };

  const getCellContent = (cell) => {
    if (isWeighted && cell.weight > 1 && !cell.isStart && !cell.isEnd && !cell.isWall) {
      return <span className="text-xs font-bold text-gray-800">{cell.weight}</span>;
    }
    return null;
  };

  const getAvailableAlgorithms = () => {
    if (isWeighted) {
      return [
        { value: "Dijkstra", label: "Dijkstra's Algorithm" },
        { value: "A*", label: "A* Search" }
      ];
    } else {
      return [
        { value: "BFS", label: "Breadth-First Search (BFS)" }
      ];
    }
  };

  // ✅ Enhanced weight validation with better input handling
  const handleWeightChange = (e) => {
    const input = e.target.value;
    
    // Allow only numbers
    if (!/^\d*$/.test(input)) {
      e.target.value = weightValue;
      return;
    }
    
    const value = parseInt(input);
    if (!isNaN(value)) {
      const clampedValue = Math.max(1, Math.min(10, value));
      setWeightValue(clampedValue);
      
      // Update input if value was clamped
      if (value !== clampedValue) {
        e.target.value = clampedValue;
      }
    } else if (input === '') {
      // Allow empty input temporarily
      setWeightValue(1);
    }
  };

  return (
    <div
      className="flex flex-col items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white select-none"
      onMouseUp={handleMouseUp}
    >
      <h1 className="text-4xl font-bold mt-4 mb-2 drop-shadow-lg">Shortest Path Finder</h1>

      <div className="flex flex-col items-center mb-4 space-y-3">
        <div className="flex flex-wrap justify-center gap-4">
          <select
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
            className="px-2 py-1 rounded border border-gray-300 text-black"
          >
            {getAvailableAlgorithms().map(algo => (
              <option key={algo.value} value={algo.value}>
                {algo.label}
              </option>
            ))}
          </select>

          <button
            onClick={handleStart}
            className={`px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow hover:bg-green-600 transition ${
              isVisualizing ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isVisualizing}
          >
            Start
          </button>
          
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow hover:bg-red-600 transition"
          >
            Reset
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-4 items-center">
          <div className="flex items-center space-x-2">
            <label className="font-semibold">Speed:</label>
            <input
              type="range"
              min="10"
              max="200"
              step="10"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-32"
            />
            <span className="font-mono text-sm">{speed}ms</span>
          </div>

          <div className="flex items-center space-x-2">
            <label className="font-semibold">
              <input
                type="checkbox"
                checked={isWeighted}
                onChange={(e) => {
                  const newWeighted = e.target.checked;
                  setIsWeighted(newWeighted);
                  setIsDrawingWeights(false);
                  
                  if (newWeighted) {
                    setAlgorithm("Dijkstra");
                  } else {
                    setAlgorithm("BFS");
                  }
                }}
                className="mr-1"
              />
              Weighted
            </label>
            {isWeighted && (
              <>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={weightValue}
                  onChange={handleWeightChange}
                  className="w-12 px-1 py-0.5 rounded text-black text-sm text-center"
                  placeholder="1-10"
                />
                <button
                  onClick={() => setIsDrawingWeights(!isDrawingWeights)}
                  className={`px-2 py-1 text-xs rounded transition ${
                    isDrawingWeights ? "bg-orange-500 text-white" : "bg-orange-300 text-black"
                  }`}
                >
                  {isDrawingWeights ? "Stop Drawing Weights" : "Draw Weights"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="text-center mb-4 max-w-3xl">
        <p className="text-sm opacity-90">
          🟢 Start • 🔴 End • ⬛ Wall • 🟦 Visited • 🟡 Path {isWeighted && "• 🟠 Weighted"}
        </p>
        <p className="text-xs opacity-75 mt-1">
          Click and drag to move start/end points. Click empty cells to draw walls.
          {isWeighted && " Click 'Draw Weights' button, then click and drag on grid to add weights."}
        </p>
        <p className="text-xs opacity-75 mt-1">
          {!isWeighted && <strong>BFS:</strong>}
          {!isWeighted && " Explores all nodes at current depth before moving deeper (unweighted)"}
          {isWeighted && (
            <>
              <strong>Dijkstra:</strong> Always explores the closest unvisited node first (supports weights)
              <br />
              <strong>A*:</strong> Uses heuristic to guide search toward the goal efficiently (supports weights)
            </>
          )}
        </p>
      </div>

      <div
        className="grid gap-0.5"
        style={{ gridTemplateColumns: `repeat(${numCols}, 20px)` }}
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onMouseDown={() => handleMouseDown(cell.row, cell.col)}
              onMouseEnter={() => handleMouseEnter(cell.row, cell.col)}
              className={`w-5 h-5 rounded-sm border border-gray-200 cursor-pointer transition flex items-center justify-center ${getCellStyle(cell)}`}
            >
              {getCellContent(cell)}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
