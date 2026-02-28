document.addEventListener("DOMContentLoaded", () => {
    console.log("Sagayam Sat TV - Advanced UI Loaded 📡");

    // 1. Mobile Menu Toggle
    const menuToggle = document.getElementById("mobile-menu");
    const navMenu = document.querySelector(".nav-menu");

    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        menuToggle.classList.toggle("is-active");
    });

    // Close menu when clicking a link
    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            menuToggle.classList.remove("is-active");
        });
    });

    // 2. Navbar Scroll Effect (Glassmorphism solidifies slightly on scroll)
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(5, 9, 20, 0.95)';
            navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.5)';
        } else {
            navbar.style.background = 'rgba(5, 9, 20, 0.85)';
            navbar.style.boxShadow = 'none';
        }
    });

    // 3. Scroll Reveal Animations with IntersectionObserver
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // 4. Space / Starry Background Animation (Canvas)
    const canvas = document.getElementById("space-canvas");
    if (canvas) {
        const ctx = canvas.getContext("2d");

        let width, height;
        let stars = [];

        function resize() {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            initStars();
        }

        window.addEventListener("resize", resize);

        class Star {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 1.5;
                this.speed = Math.random() * 0.5 + 0.1;
                this.opacity = Math.random();
                this.fadeDir = Math.random() > 0.5 ? 1 : -1;
            }

            update() {
                // Move slowly left or right
                this.y -= this.speed;
                if (this.y < 0) {
                    this.y = height;
                    this.x = Math.random() * width;
                }

                // Twinkle effect
                this.opacity += 0.01 * this.fadeDir;
                if (this.opacity >= 1) this.fadeDir = -1;
                if (this.opacity <= 0.1) this.fadeDir = 1;
            }

            draw() {
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initStars() {
            stars = [];
            // Calculate number of stars based on screen size
            const numStars = Math.floor((width * height) / 4000);
            for (let i = 0; i < numStars; i++) {
                stars.push(new Star());
            }
        }

        function animateStars() {
            ctx.clearRect(0, 0, width, height);
            stars.forEach(star => {
                star.update();
                star.draw();
            });
            requestAnimationFrame(animateStars);
        }

        // Initialize and Start
        resize();
        animateStars();
    }
});