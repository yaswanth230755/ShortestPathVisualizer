<p align="center">
<a href="https://github.com/yaswanth230755/ShortestPathVisualizer">
	<img width="800" src="./logo.png" alt="Shortest Path Visualizer"/>
</a>
	<h2 align="center"> Shortest Path Visualizer </h2>
	<h4 align="center"> An interactive web application that brings pathfinding algorithms to life through stunning visualizations. Watch as BFS, Dijkstra's Algorithm, and A* Search explore grids in real-time, helping you understand how these fundamental computer science algorithms work. Perfect for students, developers, and anyone curious about how navigation systems and AI pathfinding actually operate under the hood. </h4>
</p>

#### **Instructions to build and run the app can be found [here](#-quick-start)**

---

[![GitHub Stars](https://img.shields.io/github/stars/yaswanth230755/ShortestPathVisualizer?style=flat-square)](https://github.com/yaswanth230755/ShortestPathVisualizer/stargazers)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-View%20Here-orange?style=flat-square)](https://yaswanth230755.github.io/ShortestPathVisualizer)
[![Documentation](https://img.shields.io/badge/Documentation-Read%20Docs-green?style=flat-square)](https://github.com/yaswanth230755/ShortestPathVisualizer#readme)
[![GitHub Profile](https://img.shields.io/badge/GitHub-yaswanth230755-blue?style=flat-square)](https://github.com/yaswanth230755)


#### **Instructions to build and run the app can be found [here](doc.md)**

## ✨ Features
- [ ]  Multiple Pathfinding Algorithms (BFS, Dijkstra, A*)
- [ ]  Interactive Grid with Drag-and-Drop Nodes
- [ ]  Draw Walls by Clicking and Dragging
- [ ]  Real-time Algorithm Visualization
- [ ]  Adjustable Animation Speed Control
- [ ]  Weighted Graph Support with Visual Indicators
- [ ]  Dynamic Algorithm Selection Based on Mode
- [ ]  Path Tracing and Shortest Path Highlighting
- [ ]  Reset and Clear Grid Functionality
- [ ]  Responsive Design for All Devices
- [ ]  Weight Drawing Mode for Weighted Algorithms
- [ ]  Node Accessibility Validation
- [ ]  Smooth Animations and Visual Feedback
- [ ]  Professional UI with Intuitive Controls


---
## 🛠️ Tech Stack

- ⚛️ **React.JS** - Frontend framework with hooks
- ⚡ **Vite** - Lightning-fast build tool  
- 🎨 **Tailwind CSS** - Utility-first styling
- 📝 **JavaScript (ES6+)** - Programming language
- 📊 **Priority Queue** - Custom min-heap implementation
- 🧠 **Advanced Algorithms** - BFS, Dijkstra, A* with optimizations

## 🛠 Dependencies
- Vite - Build tool and development server
- Tailwind CSS - Utility-first CSS framework
- React - Frontend JavaScript library
- JavaScript - Core programming language
 


---
## ⚡ Quick Start
 Clone the repository
 ```
git clone https://github.com/yaswanth230755/ShortestPathVisualizer.git
cd ShortestPathVisualizer
```

 Install dependencies
 ```
npm install
```

 Start the development server
 ```
npm run dev
```

 Open in browser
 ```
http://localhost:5173/
```

## 🎮 Usage Guide
🟢 Start Node: Drag to move starting point

🔴 End Node: Drag to change destination

⬛ Wall: Click/drag to create barriers

🔶 Visited Nodes: Shown during algorithm

🟡 Path: Final shortest path

⚙️ Controls:

Choose algorithm (BFS, Dijkstra, A*)

Adjust animation speed

Reset board to clear everything

## 📚 Algorithms
🔹 Breadth-First Search (BFS)
✅ Unweighted, guarantees shortest path
🔁 Explores neighbors level by level
⏱ Time Complexity: O(V + E)

🔹 Dijkstra’s Algorithm
✅ Weighted, guarantees shortest path
📦 Uses min-heap (priority queue)
⏱ Time Complexity: O((V + E) log V)

🔹 A* Search
✅ Weighted + heuristic (Manhattan Distance)
🧠 Faster than Dijkstra in practice
⏱ Time Complexity: O((V + E) log V)

## 🧱 Project Structure
```
ShortestPathVisualizer/
├── public/
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
└── README.md

```

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Yaswanth Veera Nagesh

GitHub: @yaswanth230755
