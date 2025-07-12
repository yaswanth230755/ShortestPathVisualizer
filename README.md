# Shortest Path Visualizer

<p align="center">
  <a href="https://github.com/yaswanth230755/ShortestPathVisualizer">
    <img width="800" src="./Screenshot 2025-07-05 172107.png" alt="Shortest Path Visualizer"/>
  </a>
  <h2 align="center">Shortest Path Visualizer</h2>
  <h4 align="center">
    An interactive web application that brings pathfinding algorithms to life through stunning visualizations. 
    Watch as BFS, Dijkstra's Algorithm, and A* Search explore grids in real-time, helping you understand how these fundamental computer science algorithms work. 
    Perfect for students, developers, and anyone curious about how navigation systems and AI pathfinding operate under the hood.
  </h4>
</p>

#### **Instructions to build and run the app can be found [here](#-quick-start)**

---

[![GitHub Stars](https://img.shields.io/github/stars/yaswanth230755/ShortestPathVisualizer?style=flat-square)](https://github.com/yaswanth230755/ShortestPathVisualizer/stargazers)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-View%20Here-orange?style=flat-square)](https://shortest-path-visualizer-sable.vercel.app/)
[![Documentation](https://img.shields.io/badge/Documentation-Read%20Docs-green?style=flat-square)](https://github.com/yaswanth230755/ShortestPathVisualizer#readme)
[![GitHub Profile](https://img.shields.io/badge/GitHub-yaswanth230755-blue?style=flat-square)](https://github.com/yaswanth230755)

---

## ✨ Features

- ✅ **Multiple Pathfinding Algorithms** (BFS, Dijkstra, A*)
- ✅ **Interactive Grid** with Drag-and-Drop Nodes
- ✅ **Draw Walls** by Clicking and Dragging
- ✅ **Real-time Algorithm Visualization**
- ✅ **Adjustable Animation Speed Control**
- ✅ **Weighted Graph Support** with Visual Indicators
- ✅ **Dynamic Algorithm Selection** Based on Mode
- ✅ **Path Tracing** and Shortest Path Highlighting
- ✅ **Reset and Clear Grid** Functionality
- ✅ **Responsive Design** for All Devices
- ✅ **Weight Drawing Mode** for Weighted Algorithms
- ✅ **Node Accessibility Validation**
- ✅ **Smooth Animations** and Visual Feedback
- ✅ **Professional UI** with Intuitive Controls

## 🛠️ Tech Stack

- ⚛️ **React.js** - Frontend framework with hooks
- ⚡ **Vite** - Lightning-fast build tool  
- 🎨 **Tailwind CSS** - Utility-first styling
- 📝 **JavaScript (ES6+)** - Programming language
- 📊 **Priority Queue** - Custom min-heap implementation
- 🧠 **Advanced Algorithms** - BFS, Dijkstra, A* with optimizations

## 🎯 Algorithm Performance

| Algorithm | Type | Time Complexity | Best For |
|-----------|------|----------------|----------|
| BFS | Unweighted | O(V + E) | Simple shortest path |
| Dijkstra | Weighted | O((V + E) log V) | Weighted graphs |
| A* | Weighted + Heuristic | O((V + E) log V) | Optimal pathfinding |

## ⚡ Quick Start

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

 ```
git clone https://github.com/yaswanth230755/ShortestPathVisualizer.git
cd ShortestPathVisualizer
```
 
2. **Install dependencies**

 ```
npm install
```

 
3. **Start the development server**

 ```
npm run dev
```

 
4. **Open in browser**

 ```
http://localhost:5173/
```


## 🎮 How to Use

### **Basic Controls**
- **Start Node** (🟢): Drag to move the starting position
- **End Node** (🔴): Drag to move the destination
- **Walls** (⬛): Click and drag to draw obstacles
- **Speed Control**: Adjust visualization speed with the slider

### **Weighted Mode**
1. Check the "Weighted" checkbox to enable weighted graphs
2. Set your desired weight value (1-10)
3. Click "Draw Weights" button
4. Click and drag on empty cells to add weights
5. Orange cells (🟠) indicate weighted nodes

### **Algorithm Selection**
- **Unweighted Mode**: Only BFS is available
- **Weighted Mode**: Choose between Dijkstra's Algorithm and A* Search

### **Visualization Process**
1. Select your desired algorithm
2. Set up walls and weights (if using weighted mode)
3. Click "Start" to begin visualization
4. Watch as the algorithm explores the grid:
   - Blue cells (🟦) show visited nodes
   - Yellow cells (🟡) show the final shortest path
5. Use "Reset" to clear the grid and start over

## 🧠 Algorithms Explained

### **Breadth-First Search (BFS)**
- **Type**: Unweighted
- **Guarantee**: Finds shortest path in unweighted graphs
- **How it works**: Explores all nodes at current depth before moving deeper
- **Time Complexity**: O(V + E)

### **Dijkstra's Algorithm**
- **Type**: Weighted
- **Guarantee**: Finds shortest path in weighted graphs
- **How it works**: Always explores the closest unvisited node first
- **Time Complexity**: O((V + E) log V)

### **A* Search**
- **Type**: Weighted with heuristic
- **Guarantee**: Finds shortest path (with admissible heuristic)
- **How it works**: Uses Manhattan distance heuristic to guide search toward goal
- **Time Complexity**: O((V + E) log V)

## 📁 Project Structure

```
ShortestPathVisualizer/
├── public/
│ ├── index.html
│ └── ...
├── src/
│ ├── App.jsx # Main application component
│ ├── main.jsx # Application entry point
│ └── index.css # Global styles
├── package.json
├── vite.config.js
└── README.md

```


## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Key Features Implementation

### **Performance Optimizations**
- **Priority Queue**: Efficient min-heap implementation for Dijkstra and A*
- **Optimized Rendering**: Smart grid updates to prevent unnecessary re-renders
- **Memory Management**: Proper cleanup and cancellation handling

### **User Experience**
- **Intuitive Controls**: Drag-and-drop interface for easy interaction
- **Visual Feedback**: Clear color coding and smooth animations
- **Responsive Design**: Works seamlessly across different screen sizes

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Adimulam Yaswanth Veera Nagesh**
- GitHub: [@yaswanth230755](https://github.com/yaswanth230755)

## 🙏 Acknowledgments

- Inspired by pathfinding algorithm visualizations
- Built with modern web technologies for optimal performance
- Special thanks to the open-source community

⭐ **Star this repository if you found it helpful!**
