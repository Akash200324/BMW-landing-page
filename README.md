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

---

## 🛠️ Technology Stack

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
