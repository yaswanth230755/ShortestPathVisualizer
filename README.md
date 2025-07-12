# 🗺️ Shortest Path Visualizer

<div align="center">

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](#)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](#)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](#)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](#)

<br>

<a href="https://shortest-path-visualizer-sable.vercel.app/">
  <img width="800" src="./Screenshot 2025-07-05 172107.png" alt="Shortest Path Visualizer"/>
</a>

**An interactive web app that brings path-finding algorithms to life**  
_Build walls, add weights, adjust speed – then watch BFS, Dijkstra & A* explore in real time._

[![GitHub Stars](https://img.shields.io/github/stars/yaswanth230755/ShortestPathVisualizer?style=social)](https://github.com/yaswanth230755/ShortestPathVisualizer/stargazers)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-View-orange?style=flat-square)](https://shortest-path-visualizer-sable.vercel.app/)
[![Docs](https://img.shields.io/badge/Documentation-Read-green?style=flat-square)](https://github.com/yaswanth230755/ShortestPathVisualizer#readme)

</div>

---

## 🌟 Features

| Category | Highlights |
|----------|------------|
| **Core Algorithms** | • Breadth-First Search (BFS) · Unweighted  <br>• Dijkstra’s Algorithm · Weighted  <br>• A* Search · Heuristic-guided |
| **Interactive Grid** | • Drag-and-drop start/end nodes  <br>• Click-and-drag walls  <br>• Weighted cells (1-10)  <br>• Adjustable speed (10-200 ms) |
| **Visual Experience** | • Real-time exploration  <br>• Smooth Tailwind animations  <br>• Color-coded states (visited, path, walls) |
| **Technical Extras** | • Responsive design  <br>• Custom min-heap priority queue  <br>• Optimized renders & memory cleanup |

---

## 🛠️ Tech Stack

| Tech | Purpose | Notes |
|------|---------|-------|
| ⚛️ React & Hooks | UI & state | `useState`, `useRef`, `useCallback` |
| ⚡ Vite | Build tool | Instant dev server, lightning builds |
| 🎨 Tailwind CSS | Styling | Utility-first, fully responsive |
| 📝 ES6 JavaScript | Logic | Modern syntax & async/await |
| 📊 Custom PQ | Data structure | O(log N) operations for Dijkstra & A* |

---

## 📊 Algorithm Complexity

| Algorithm | Time | Space | Best Use |
|-----------|------|-------|----------|
| BFS | O(V + E) | O(V) | Unweighted graphs |
| Dijkstra | O((V + E) log V) | O(V) | Weighted graphs |
| A* | O((V + E) log V) | O(V) | Weighted with heuristic |

---

## ⚡ Quick Start

### Prerequisites
- Node 14+
- npm or yarn

<details>
<summary><b>Setup Steps</b></summary>



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
</details>

---

## 🎮 How to Use

### Basic Controls
- 🟢 **Start Node** – drag to reposition  
- 🔴 **End Node** – drag to reposition  
- ⬛ **Walls** – click/drag to draw or erase  
- 🎚️ **Speed** – slide between 10 – 200 ms

### Weighted Mode
1. Enable **Weighted** checkbox  
2. Set weight (1-10)  
3. Click **Draw Weights**, then paint cells (🟠)

### Visualization
1. Pick algorithm (BFS / Dijkstra / A*)  
2. Build walls & weights  
3. Click **Start** and watch:  
   - 🟦 Visited nodes  
   - 🟡 Shortest path  
4. Click **Reset** anytime

---

## 🧠 Algorithm Cheat-Sheets

<details>
<summary><b>BFS</b></summary>

- **Type:** Unweighted  
- **Guarantee:** Shortest path  
- **Strategy:** Level-by-level exploration  
- **Complexity:** O(V + E)
</details>

<details>
<summary><b>Dijkstra</b></summary>

- **Type:** Weighted (non-negative)  
- **Guarantee:** Shortest path  
- **Strategy:** Expand closest unvisited node via priority queue  
- **Complexity:** O((V + E) log V)
</details>

<details>
<summary><b>A* Search</b></summary>

- **Type:** Weighted + Heuristic  
- **Guarantee:** Optimal with admissible heuristic  
- **Strategy:** f = g + h (actual + Manhattan estimate)  
- **Complexity:** O((V + E) log V)
</details>

---

## 📁 Project Structure



```
ShortestPathVisualizer/
├─ public/
│ └─ index.html
├─ src/
│ ├─ App.jsx # Main component
│ ├─ main.jsx # Entry point
│ └─ index.css # Tailwind & global styles
├─ package.json # Scripts & deps
├─ vite.config.js # Vite setup
└─ tailwind.config.js # Tailwind setup
└── README.md

```

---

## 🔧 Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Launch dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview build locally |
| `npm run lint` | ESLint analysis |

---

## 🎯 Implementation Highlights

- **Priority Queue:** Custom min-heap for O(log N) insert/delete  
- **Smart Rendering:** Updates only affected grid cells  
- **Memory Safety:** Cancels async loops on reset  
- **Responsive UI:** Tailwind + flex/grid for any screen

---

## 🤝 Contributing

1. **Fork** ➜ `git checkout -b feature/YourFeature`  
2. **Develop & commit** ➜ `git commit -m "Add feature"`  
3. **Push** ➜ `git push origin feature/YourFeature`  
4. **Open Pull Request** – we’ll review ASAP!

Please follow code style, add comments, and update docs/tests.

---

## 📝 License

Released under the **MIT License**. See [`LICENSE`](LICENSE) for details.

---

## 👨‍💻 Author

|  |  |
|--|--|
| **GitHub** | [@yaswanth230755](https://github.com/yaswanth230755) |
| **LinkedIn** | [Adimulam Yaswanth Veera Nagesh](https://www.linkedin.com/in/adimulam-yaswanth-veera-nagesh-6014382a3/) |
| **Email** | [adimulamyaswanthveeranagesh@gmail.com](mailto:adimulamyaswanthveeranagesh@gmail.com) |

---

## 🙏 Acknowledgments

- Classic CS path-finding lectures & articles  
- React & Tailwind community for awesome tools  
- All OSS contributors who inspire continuous learning

<div align="center">

⭐ **Star this repo if it helped you!**  
<br>  
_“The best way to understand algorithms is to see them in action.”_

</div>

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
