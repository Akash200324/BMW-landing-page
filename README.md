<<<<<<< HEAD
<div align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg" width="120" alt="BMW Logo" />
  <h1>BMW 7 Series: The Obsidian Experience</h1>
  <p>A bleeding-edge, cinematic web experience designed to showcase the ultimate driving machine. Built with Next.js, Framer Motion, and pure CSS 3D physics to create a luxurious, Apple-tier product landing page.</p>

  <p>
    <a href="#-the-floating-coin-engine">The Floating Coin</a> • 
    <a href="#-key-features">Key Features</a> • 
    <a href="#-technology-stack">Tech Stack</a> • 
    <a href="#-running-locally">Getting Started</a>
  </p>
</div>

---

## 🎥 Cinematic Scroll Animation

> **Note to Developer:** Record a 15-second screen recording of you scrolling down the "Core Features" section, convert it to a `.gif` (or just drag the `.mp4` into GitHub), and place it right here! It will blow people away.

![Place your animated GIF or MP4 here](https://via.placeholder.com/800x400.png?text=Record+a+GIF+of+the+Floating+Coin+Scroll+and+put+it+here!)

---

## 🌟 The Floating Coin Engine (Framer Motion)

The crown jewel of this repository is the **Scroll-Linked 3D Coin Animation** in the Core Features section. 

Instead of relying on buggy CSS `position: sticky` (which breaks when parent containers use `overflow-x: hidden`), we engineered a pixel-perfect absolute tracking system using **Framer Motion**:

1. **Viewport Mathematics:** We track the exact scroll progress (`useScroll`) of the container's height.
2. **Absolute Y-Tracking:** We map the scroll progress from `0%` to `100%` directly to the `top` property of an `absolute` positioned motion div. This perfectly pins the coin to the vertical center of the user's viewport without ever clipping or un-sticking.
3. **Horizontal Interpolation:** We mapped the exact centers of all 6 alternating feature cards (at precise fractions: `1/12`, `3/12`, `5/12`, etc.) to specific `x` offset values.
4. **Spring Physics:** Applying `useSpring` to the raw transformed values ensures the coin doesn't just jump—it glides, scales, and carries physical "weight" as it floats from the left text box to the right text box perfectly in sync with your mouse wheel.

---

## ✨ Other Key Features

### 1. Immersive Glare Physics 
The floating coin isn't just an image; it carries a massive `800px` blurred radial-gradient bloom effect that acts as a dynamic light source. As the coin floats between sections, it illuminates the pure black `#000000` background of the text panels behind it.

### 2. Gyroscope 3D Spec Viewer
The Technical section abandons standard grids for a deep-space particle field. The BMW logo runs on a continuous **Gyroscope 3D Animation** via pure CSS keyframes (`rotateY(720deg)` and `rotateX(45deg)`). It creates a planet-like orbiting feel that dramatically flips the logo on multiple axes.

### 3. Dynamic Count-Up Data
A custom `useCountUp` hook powered by `IntersectionObserver` detects when the technical specs scroll into view, smoothly counting up the massive (clamp-sized) tabular numbers with an ease-out curve.

### 4. Smart Preloader
A custom-built loading screen ("PREPARING EXPERIENCE") ensures that heavy assets are cached before the user is dropped into the experience, guaranteeing exactly 0 frames of jank on entrance.

### 5. Premium Automotive Typography
Utilizes geometric, high-impact sans-serif fonts (`Outfit`, `Inter`) paired with `clamp()` functions to ensure typography scales flawlessly from 4K ultra-wide monitors down to iPhones, maintaining a ruthless, high-end automotive feel.
=======
# BMW M7: Obsidian Symphony Showcase

A stunning, cinematic web experience designed to showcase the all-new futuristic BMW 7 Series. Built with cutting-edge web technologies, this project abandons static imagery in favor of a dynamic, interactive canvas player, fluid Framer Motion animations, and gorgeous glassmorphism UI.

## 🌟 Key Features

### 1. Cinematic 3D Canvas Player
- Utilizes an HTML5 `<canvas>` element to rapidly paint a high-fidelity sequence of over 130 pre-rendered frames. 
- Creates a remarkably smooth "video" effect (tuned precisely to 0.9x speed) of the car's headlights, body lines, and speedometer, completely free of native HTML video player overhead.

### 2. Intelligent Preloader
- A custom-built loading screen ("PREPARING EXPERIENCE") that calculates the real-time download progression of the hundreds of frames required for the canvas player.
- Ensures the user is dropped into the experience only when it is 100% perfectly smooth and ready to play.

### 3. Dual-State Hero Section
- Automatically orchestrates a transition between the cinematic 3D sequence and a breathtaking "Sunset Metallic" aesthetic slide.
- Implements atmospheric overlay effects (such as a simulated smoke canvas) and animated text reveals.

### 4. Obsidian Symphony Configurator
- An interactive specifications viewer wrapped in a sleek, minimalist glass UI (`backdrop-blur`).
- **Interactive Dropdown:** Users can toggle between features (Powertrain, Design, Tech, Charging, etc.).
- **Dynamic Data Widgets:** Instantly maps performance statistics to clean, geometric SVG icons (via `lucide-react`) with staggered entry animations. 
- **Infinite Background Slider:** The backdrop loops through a gallery of high-resolution vehicle shots every 5 seconds, keeping the interface alive.

### 5. Premium Automotive Typography & Design
- Uses the sleek, geometric `Outfit` font for critical data points and headings, invoking an authentic, high-end automotive feel.
- Fully responsive architecture that scales flawlessly from ultra-wide monitors down to mobile devices. 
- Zero Next.js watermarks for a pure production-ready aesthetic.
>>>>>>> 3ed6e87094a70a153c03cb2e0db44dcba10019e2

---

## 🛠️ Technology Stack

<<<<<<< HEAD
- **Framework:** [Next.js 14+](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animation Engine:** [Framer Motion](https://www.framer.com/motion/)
- **3D Engine:** Pure CSS `perspective` & `transform-style: preserve-3d`
- **Data Hooks:** React `useRef`, `useScroll`, `useTransform`, `useSpring`

---

## 💻 Getting Started

To run the development server locally and experience the physics engine yourself:

```bash
# Clone the repository
git clone https://github.com/your-username/bmw-obsidian.git
cd bmw-obsidian

# Install dependencies
npm install

# Run the Next.js development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to witness the ultimate driving machine.
=======
- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Rendering:** HTML5 Canvas (2D Context)

## 🚀 How It Works Under The Hood

1. **Preloading & State Management:** When the site loads, `CinematicPlayer.jsx` mounts immediately in the background and silently begins downloading image sequences. It emits progression data back to the parent `page.js`, which renders the `Preloader.jsx`. 
2. **Orchestrated Timers:** Once loading hits 100%, `page.js` utilizes `framer-motion`'s `<AnimatePresence>` to dissolve the preloader and ignite the canvas player.
3. **Canvas Drawing:** Instead of an `.mp4`, the Cinematic Player draws `.jpg` frames sequentially onto a canvas at exactly 10 FPS (a perfectly tuned 0.9x cinematic speed). 
4. **Slide Auto-Transitions:** After the canvas animation finishes, a callback fires, switching the active slide to the `SunsetSlide.jsx`, which features a simulated particle-smoke canvas. A 10-second `setTimeout` hook automatically loops the experience back to the beginning.
5. **Configurator Architecture:** The `Configurator.jsx` maintains its own independent state, using an array of feature objects mapped to Lucide icons. When the user changes the dropdown, Framer Motion elegantly exits the old data and staggers the entry of the new data.

## 💻 Getting Started

To run the development server locally:

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [https://new-bmw-car-landing-page-and-featur.vercel.app/] with your browser to see the result.
>>>>>>> 3ed6e87094a70a153c03cb2e0db44dcba10019e2
