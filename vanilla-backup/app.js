/* ==========================================================================
   BMW 7 Series Interactive Showcase - Core Javascript Controller
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- State Management ---
    const state = {
        currentSlide: 0,
        totalSlides: 2, // Reduced to 2 (0: Cinematic, 1: Sunset Metallic)
        isScrolling: false,
        scrollDebounceTime: 1200,
        imagesLoaded: 0,
        totalImages: 0,
        isPlayingVideo: false,
        activeFrame: 0,
        autoLoopActive: true, // Automate Cinematic -> Sunset -> Cinematic cycle
        autoSlideTimeout: null
    };

    // --- DOM Elements ---
    const preloader = document.getElementById('preloader');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const canvas = document.getElementById('sequence-canvas');
    const ctx = canvas.getContext('2d');
    
    const slides = document.querySelectorAll('.slide');
    const navLinks = document.querySelectorAll('.nav-link');
    const navDots = document.querySelectorAll('.nav-dot');
    const sideNavigator = document.getElementById('side-navigator');
    const orangeTiltImg = document.getElementById('orange-tilt-img');

    // --- 1. Frame Sequences & Asset Preloading ---
    const imagePaths = [];
    const preloadedImages = [];

    // Generate 3D Sequence Frames
    // logo: Trim first 9 frames if they are static/repeating, start from 10 to 40
    for (let i = 10; i <= 40; i++) {
        imagePaths.push(`image/3dmodel/logo (${i}).jpg`);
    }
    // speedmeter (4) to (26)
    for (let i = 4; i <= 26; i++) {
        imagePaths.push(`image/3dmodel/speedmeter (${i}).jpg`);
    }
    // headlight (1) to (40)
    for (let i = 1; i <= 40; i++) {
        imagePaths.push(`image/3dmodel/headlight (${i}).jpg`);
    }
    // carside (1) to (27), omitting (18)
    for (let i = 1; i <= 27; i++) {
        if (i === 18) continue;
        imagePaths.push(`image/3dmodel/carside (${i}).jpg`);
    }

    // Capture boundary indexes for sequence
    const sequenceCount = imagePaths.length; // 129 frames

    // Slide Showcase Main Images
    imagePaths.push('image/bmwlogo.png');
    imagePaths.push('image/orange.png');

    state.totalImages = imagePaths.length;

    // Canvas Cover Scaling Calculator relative to full-width container below header
    function resizeCanvas() {
        const dpr = window.devicePixelRatio || 1;
        const parent = canvas.parentElement;
        if (!parent) return;

        const rect = parent.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        canvas.style.width = rect.width + 'px';
        canvas.style.height = rect.height + 'px';
        
        drawFrame(state.activeFrame);
    }

    function drawFrame(index) {
        if (index >= sequenceCount || !preloadedImages[index]) return;
        const img = preloadedImages[index];
        
        const cw = canvas.width;
        const ch = canvas.height;
        const iw = img.naturalWidth;
        const ih = img.naturalHeight;
        
        // Maintain correct aspect ratio mimicking background-size: contain
        const ratio = Math.min(cw / iw, ch / ih);
        const nw = iw * ratio;
        const nh = ih * ratio;
        const cx = (cw - nw) / 2;
        const cy = (ch - nh) / 2;
        
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        
        ctx.clearRect(0, 0, cw, ch);
        ctx.drawImage(img, cx, cy, nw, nh);
    }

    // Promise preloader for 100% resources
    function preloadAssets() {
        return new Promise((resolve) => {
            imagePaths.forEach((path, idx) => {
                const img = new Image();
                img.src = path;
                img.onload = img.onerror = () => {
                    state.imagesLoaded++;
                    
                    const progress = Math.round((state.imagesLoaded / state.totalImages) * 100);
                    if (progressBar) progressBar.style.width = `${progress}%`;
                    if (progressText) progressText.textContent = `${progress}% Loaded`;
                    
                    // Keep references for 3D model sequences
                    if (idx < sequenceCount) {
                        preloadedImages[idx] = img;
                    }
                    
                    if (state.imagesLoaded === state.totalImages) {
                        setTimeout(resolve, 800); // Luxury delay
                    }
                };
            });
        });
    }

    // --- 2. Cinematic Image Sequence Player (Plays Once -> Transitions to Sunset) ---
    let sequenceTimer = null;
    const fps = 14; // Slower 0.8x speed for cinematic feel

    function startCinematicVideo() {
        if (state.isPlayingVideo) return;
        state.isPlayingVideo = true;
        
        let frame = 0;
        clearInterval(sequenceTimer);

        sequenceTimer = setInterval(() => {
            if (state.currentSlide !== 0) {
                clearInterval(sequenceTimer);
                state.isPlayingVideo = false;
                return;
            }

            state.activeFrame = frame;
            drawFrame(frame);
            
            frame++;
            if (frame >= sequenceCount) {
                // Video finished! Automatically transition to Sunset Metallic (Slide 1)
                clearInterval(sequenceTimer);
                state.isPlayingVideo = false;
                
                if (state.autoLoopActive) {
                    navigateToSlide(1);
                } else {
                    // Loop back internally on slide 0 if autoLoop is overridden/cancelled
                    frame = 0;
                    startCinematicVideo();
                }
            }
        }, 1000 / fps);
    }

    function stopCinematicVideo() {
        clearInterval(sequenceTimer);
        state.isPlayingVideo = false;
    }

    // --- 3. Dynamic Canvas Particle Smoke Simulation (Sunset slide background) ---
    let smokeCanvas = null;
    let smokeCtx = null;
    let smokeParticles = [];
    let smokeTimerId = null;
    const maxParticles = 40;

    class SmokeParticle {
        constructor(w, h) {
            this.x = w * (0.35 + Math.random() * 0.45); // Centered relative to car
            this.y = h * (0.55 + Math.random() * 0.35); // Lower body of car
            this.vx = (Math.random() - 0.5) * 0.7;
            this.vy = -(0.4 + Math.random() * 0.8);
            this.radius = 60 + Math.random() * 90;
            this.alpha = 0.01 + Math.random() * 0.07;
            this.decay = 0.0002 + Math.random() * 0.0005;
            
            // Warm amber metallic exhaust tones
            this.colorR = 255;
            this.colorG = 110 + Math.round(Math.random() * 90);
            this.colorB = 30 + Math.round(Math.random() * 40);
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.alpha -= this.decay;
            this.radius += 0.06; // Disperse as it rises
        }

        draw(ctx) {
            if (this.alpha <= 0) return;
            ctx.save();
            
            // Soft cloudy radial gradient
            const grad = ctx.createRadialGradient(
                this.x, this.y, 0,
                this.x, this.y, this.radius
            );
            grad.addColorStop(0, `rgba(${this.colorR}, ${this.colorG}, ${this.colorB}, ${this.alpha})`);
            grad.addColorStop(0.3, `rgba(${this.colorR}, ${this.colorG}, ${this.colorB}, ${this.alpha * 0.4})`);
            grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
            
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    function initSmokeEffect() {
        smokeCanvas = document.getElementById('smoke-canvas');
        if (!smokeCanvas) return;
        smokeCtx = smokeCanvas.getContext('2d');
        resizeSmokeCanvas();
    }

    function resizeSmokeCanvas() {
        if (!smokeCanvas) return;
        const rect = smokeCanvas.parentElement.getBoundingClientRect();
        smokeCanvas.width = rect.width;
        smokeCanvas.height = rect.height;
    }

    function animateSmoke() {
        if (state.currentSlide !== 1) {
            cancelAnimationFrame(smokeTimerId);
            return;
        }

        smokeCtx.clearRect(0, 0, smokeCanvas.width, smokeCanvas.height);

        // Spawn particles slowly
        if (smokeParticles.length < maxParticles && Math.random() < 0.12) {
            smokeParticles.push(new SmokeParticle(smokeCanvas.width, smokeCanvas.height));
        }

        // Draw and update particles
        for (let i = smokeParticles.length - 1; i >= 0; i--) {
            const p = smokeParticles[i];
            p.update();
            p.draw(smokeCtx);

            if (p.alpha <= 0 || p.y < -p.radius) {
                smokeParticles.splice(i, 1);
            }
        }

        smokeTimerId = requestAnimationFrame(animateSmoke);
    }

    function startSmokeEffect() {
        if (!smokeCanvas) {
            initSmokeEffect();
        }
        smokeParticles = [];
        animateSmoke();
    }

    function stopSmokeEffect() {
        cancelAnimationFrame(smokeTimerId);
    }

    // --- 4. Navigation Slider Core ---
    function navigateToSlide(index) {
        if (index < 0 || index >= state.totalSlides || index === state.currentSlide) return;
        
        state.currentSlide = index;
        
        // A. Remove all active states
        slides.forEach(s => s.classList.remove('active'));
        navLinks.forEach(l => l.classList.remove('active'));
        navDots.forEach(d => d.classList.remove('active'));
        
        // B. Add active states to current indices
        slides[index].classList.add('active');
        
        // Match header nav elements and dots
        const targetNavs = document.querySelectorAll(`[data-slide="${index}"]`);
        targetNavs.forEach(node => node.classList.add('active'));

        // C. Dynamic Body Theme & Timeline loops
        document.body.className = '';
        clearTimeout(state.autoSlideTimeout);

        if (index === 0) {
            document.body.classList.add('theme-cinematic');
            const canvasCont = document.querySelector('.canvas-container');
            if (canvasCont) canvasCont.style.opacity = '1';
            
            stopSmokeEffect();
            startCinematicVideo();
        } else if (index === 1) {
            document.body.classList.add('theme-sunset');
            const canvasCont = document.querySelector('.canvas-container');
            if (canvasCont) canvasCont.style.opacity = '0';
            
            stopCinematicVideo();
            startSmokeEffect();

            // Auto transition back to Cinematic slide after 10 seconds of Sunset exposure
            if (state.autoLoopActive) {
                state.autoSlideTimeout = setTimeout(() => {
                    navigateToSlide(0);
                }, 10000); // Wait for 10 seconds
            }
        }
    }

    // Manual slide controls override auto rotation loops
    function cancelAutoLoop() {
        state.autoLoopActive = false;
        clearTimeout(state.autoSlideTimeout);
    }

    // Wheel and Touch Scroll Listeners with Premium Acceleration protection
    function handleScroll(event) {
        if (state.isScrolling) return;
        
        const delta = Math.sign(event.deltaY);
        
        if (delta > 0) {
            if (state.currentSlide < state.totalSlides - 1) {
                cancelAutoLoop();
                lockScroll();
                navigateToSlide(state.currentSlide + 1);
            }
        } else if (delta < 0) {
            if (state.currentSlide > 0) {
                cancelAutoLoop();
                lockScroll();
                navigateToSlide(state.currentSlide - 1);
            }
        }
    }

    function lockScroll() {
        state.isScrolling = true;
        setTimeout(() => {
            state.isScrolling = false;
        }, state.scrollDebounceTime);
    }

    // Touch Swipe Gesture support for mobile devices
    let touchStartY = 0;
    
    function handleTouchStart(e) {
        touchStartY = e.touches[0].clientY;
    }

    function handleTouchMove(e) {
        if (state.isScrolling || !touchStartY) return;
        
        const touchEndY = e.touches[0].clientY;
        const diffY = touchStartY - touchEndY;
        
        if (Math.abs(diffY) > 50) { // Swipe threshold
            if (diffY > 0) {
                if (state.currentSlide < state.totalSlides - 1) {
                    cancelAutoLoop();
                    lockScroll();
                    navigateToSlide(state.currentSlide + 1);
                }
            } else {
                if (state.currentSlide > 0) {
                    cancelAutoLoop();
                    lockScroll();
                    navigateToSlide(state.currentSlide - 1);
                }
            }
            touchStartY = 0;
        }
    }

    // Keyboard Key Navigator bindings
    function handleKeyDown(e) {
        if (state.isScrolling) return;

        if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 'PageDown') {
            if (state.currentSlide < state.totalSlides - 1) {
                cancelAutoLoop();
                lockScroll();
                navigateToSlide(state.currentSlide + 1);
            }
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'PageUp') {
            if (state.currentSlide > 0) {
                cancelAutoLoop();
                lockScroll();
                navigateToSlide(state.currentSlide - 1);
            }
        }
    }

    // --- 5. Interactive Mouse Parallax (Free Floating stretched car image) ---
    function setupParallaxTilt() {
        if (!orangeTiltImg) return;

        const parent = orangeTiltImg.parentElement;
        if (!parent) return;

        parent.addEventListener('mousemove', (e) => {
            const rect = parent.getBoundingClientRect();
            const w = rect.width;
            const h = rect.height;
            
            const mouseX = e.clientX - rect.left - w / 2;
            const mouseY = e.clientY - rect.top - h / 2;
            
            // Normalize offsets to maximum degrees of tilt
            const rotateX = -(mouseY / (h / 2)) * 6;
            const rotateY = (mouseX / (w / 2)) * 8;
            
            const shadowX = -(mouseX / (w / 2)) * 12;
            const shadowY = -(mouseY / (h / 2)) * 12;
            
            orangeTiltImg.style.transform = `scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            orangeTiltImg.style.filter = `drop-shadow(${shadowX}px ${shadowY}px 35px rgba(255, 94, 0, 0.35))`;
        });

        parent.addEventListener('mouseleave', () => {
            orangeTiltImg.style.transform = 'scale(1) rotateX(0deg) rotateY(0deg)';
            orangeTiltImg.style.filter = 'drop-shadow(0 20px 40px rgba(0,0,0,0.6))';
        });
    }

    // --- 6. Event Listeners Initializer ---
    window.addEventListener('resize', () => {
        resizeCanvas();
        resizeSmokeCanvas();
    });
    
    window.addEventListener('wheel', handleScroll, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    // Interactive Dot Slider clicks
    navDots.forEach(dot => {
        dot.addEventListener('click', () => {
            cancelAutoLoop();
            const slideIdx = parseInt(dot.getAttribute('data-slide'));
            navigateToSlide(slideIdx);
        });
    });

    // Nav bar links clicks (Features, Specs)
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            cancelAutoLoop();
            const slideIdx = parseInt(link.getAttribute('data-slide'));
            navigateToSlide(slideIdx);
        });
    });

    // --- 7. GSAP Advanced Animations ---
    function initGSAPAnimations() {
        if (typeof gsap === 'undefined') return;

        // Animate Navbar
        gsap.from("#main-header", {
            y: -100,
            opacity: 0,
            duration: 1.2,
            ease: "power4.out",
            delay: 0.5
        });

        gsap.from(".nav-link", {
            y: -20,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            delay: 1
        });

        // Animate Hero Content
        gsap.from(".hero-title", {
            x: -50,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
            delay: 1.2
        });

        gsap.from(".hero-desc", {
            x: -50,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
            delay: 1.4
        });

        gsap.to(".scroll-cue", {
            opacity: 1,
            duration: 1,
            delay: 2
        });
    }

    // --- 8. Start Application ---
    (async function startApp() {
        // Prepare layouts
        resizeCanvas();

        // Run Preloader Sequence loading
        await preloadAssets();

        // Close loading gate
        preloader.classList.add('fade-out');

        // Initialize GSAP
        initGSAPAnimations();

        // Draw initial frame (frame 0)
        drawFrame(0);

        // Run Parallax mouse-tilt
        setupParallaxTilt();

        // Start Cinematic Loop automatically on landing page
        startCinematicVideo();
    })();
});
