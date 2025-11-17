document.addEventListener('DOMContentLoaded', () => {

    const items = document.querySelectorAll('.carousel .item');
    const descItems = document.querySelectorAll('.carousel-descriptions .desc-item');
    const pageNumbers = document.querySelectorAll('.carousel-pagination .page-num');
    const totalItems = items.length;
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const root = document.documentElement;
    const mockupPositions = ['95% 0','5% 0'];
    const shadowColors = ['rgba(255, 80, 0, 0.6)','rgba(0, 100, 255, 0.6)'];
    const neonGridColors = [{grid:'#ff5000',glow:'rgba(255, 80, 0, 0.5)'},{grid:'#0064ff',glow:'rgba(0, 100, 255, 0.5)'}];
    let currentIndex = 0;

    function triggerGlitchBurst() {
        const inner = document.getElementsByClassName('glitch-box-inner');
        const outer = document.getElementsByClassName('glitch-box-outer');
        let burst = setInterval(() => {
            for (let i = 0; i < inner.length; i++) {
                inner[i].style.left = Math.floor(Math.random() * 100) + '%';
                inner[i].style.top = Math.floor(Math.random() * 100) + '%';
                inner[i].style.width = Math.floor(Math.random() * 40) + '%';
                inner[i].style.height = Math.floor(Math.random() * 20) + '%';
            }
            for (let i = 0; i < outer.length; i++) {
                outer[i].style.left = Math.floor(Math.random() * 120 - 10) + '%';
                outer[i].style.top = Math.floor(Math.random() * 120 - 10) + '%';
                outer[i].style.width = Math.floor(Math.random() * 40) + '%';
                outer[i].style.height = Math.floor(Math.random() * 20) + '%';
            }
        }, 40);
        setTimeout(() => {
            clearInterval(burst);
            for (let i = 0; i < inner.length; i++) {
                inner[i].style.width = null;
                inner[i].style.height = null;
                inner[i].style.left = null;
                inner[i].style.top = null;
            }
            for (let i = 0; i < outer.length; i++) {
                outer[i].style.width = null;
                outer[i].style.height = null;
                outer[i].style.left = null;
                outer[i].style.top = null;
            }
        }, 350);
    }

    function updateSlide(newIndex) {
        if (items.length === 0) return;
        items[currentIndex].classList.remove('active');
        if (descItems.length > 0) descItems[currentIndex].classList.remove('active');
        if (pageNumbers.length > 0) pageNumbers[currentIndex].classList.remove('active');
        items[newIndex].classList.add('active');
        if (descItems.length > 0) descItems[newIndex].classList.add('active');
        if (pageNumbers.length > 0) pageNumbers[newIndex].classList.add('active');
        if (mockupPositions[newIndex]) root.style.setProperty('--mockup-bg-pos', mockupPositions[newIndex]);
        if (shadowColors[newIndex]) root.style.setProperty('--shadow-color', shadowColors[newIndex]);
        if (neonGridColors[newIndex]) {
            root.style.setProperty('--grid-neon-color', neonGridColors[newIndex].grid);
            root.style.setProperty('--grid-glow-color', neonGridColors[newIndex].glow);
        }
        currentIndex = newIndex;
        triggerGlitchBurst();
    }

    function showNextSlide() {
        if (items.length === 0) return;
        let nextIndex = (currentIndex + 1) % totalItems;
        updateSlide(nextIndex);
    }

    function showPrevSlide() {
        if (items.length === 0) return;
        let prevIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateSlide(prevIndex);
    }

    if (nextButton) nextButton.addEventListener('click', showNextSlide);
    if (prevButton) prevButton.addEventListener('click', showPrevSlide);

    if (items.length > 0) {
        if (!items[currentIndex].classList.contains('active')) items[currentIndex].classList.add('active');
        if (descItems.length > 0 && !descItems[currentIndex].classList.contains('active')) descItems[currentIndex].classList.add('active');
        if (pageNumbers.length > 0 && !pageNumbers[currentIndex].classList.contains('active')) pageNumbers[currentIndex].classList.add('active');
        root.style.setProperty('--mockup-bg-pos', mockupPositions[currentIndex]);
        root.style.setProperty('--shadow-color', shadowColors[currentIndex]);
        root.style.setProperty('--grid-neon-color', neonGridColors[currentIndex].grid);
        root.style.setProperty('--grid-glow-color', neonGridColors[currentIndex].glow);
    }

    const glitchContainerInner = document.getElementById('glitch-container-inner');
    if (glitchContainerInner) {
        const countInner = 15;
        for (let i = 0; i < countInner; i++) {
            let glitchBox = document.createElement('div');
            glitchBox.className = 'glitch-box-inner';
            glitchContainerInner.appendChild(glitchBox);
        }
    }

    const glitchContainerOuter = document.getElementById('glitch-container-outer');
    if (glitchContainerOuter) {
        const countOuter = 15;
        for (let i = 0; i < countOuter; i++) {
            let glitchBox = document.createElement('div');
            glitchBox.className = 'glitch-box-outer';
            glitchContainerOuter.appendChild(glitchBox);
        }
    }
    
    const glitchContainerBackground = document.getElementById('glitch-container-background');
    if (glitchContainerBackground) {
        const countBackground = 20;
        for (let i = 0; i < countBackground; i++) {
            let glitchBox = document.createElement('div');
            glitchBox.className = 'glitch-box-background';
            glitchContainerBackground.appendChild(glitchBox);
        }
        setInterval(function() {
            let glitch = document.getElementsByClassName('glitch-box-background');
            for (let i = 0; i < glitch.length; i++) {
                glitch[i].style.left = Math.floor(Math.random() * 110 - 5) + '%';
                glitch[i].style.top = Math.floor(Math.random() * 110 - 5) + '%';
                glitch[i].style.width = Math.floor(Math.random() * 50) + '%';
                glitch[i].style.height = Math.floor(Math.random() * 5) + '%';
                if(Math.random() > 0.95) {
                    glitch[i].style.background = 'var(--grid-neon-color)';
                    glitch[i].style.opacity = '0.05';
                } else {
                    glitch[i].style.background = '#fff';
                    glitch[i].style.opacity = '0.03';
                }
            }
        }, 150);
    }

    document.querySelectorAll('header nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#home') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const h2Element = targetElement.querySelector('h2');
                    if (!h2Element) return;
                    const header = document.querySelector('header');
                    const headerHeight = header ? header.offsetHeight : 0;
                    const elementPosition = h2Element.getBoundingClientRect().top + window.pageYOffset;
                    const buffer = (window.innerWidth <= 900) ? 400 : 20;
                    const offsetPosition = elementPosition - headerHeight - buffer;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                }
            }
        });
    });

    const hologramBackground = document.getElementById('hologram-background-glitch');
    if (hologramBackground) {
        const countHoloBg = 15;
        for (let i = 0; i < countHoloBg; i++) {
            let glitchBox = document.createElement('div');
            glitchBox.className = 'holo-bg-glitch-box';
            hologramBackground.appendChild(glitchBox);
        }

        setInterval(function() {
            let glitch = document.getElementsByClassName('holo-bg-glitch-box');
            for (let i = 0; i < glitch.length; i++) {
                glitch[i].style.left = Math.floor(Math.random() * 110 - 5) + '%';
                glitch[i].style.top = Math.floor(Math.random() * 110 - 5) + '%';
                glitch[i].style.width = Math.floor(Math.random() * 40) + '%';
                glitch[i].style.height = Math.floor(Math.random() * 3) + 'px';
                if(Math.random() > 0.9) {
                    glitch[i].style.background = 'var(--grid-neon-color)';
                    glitch[i].style.opacity = '0.06';
                } else {
                    glitch[i].style.background = '#fff';
                    glitch[i].style.opacity = '0.03';
                }
            }
        }, 200);
    }
    
    const hologramCan = document.getElementById('hologram-can');
    if (hologramCan) {
        const glowElement = document.createElement('div');
        glowElement.className = 'hologram-glow';
        hologramCan.parentNode.insertBefore(glowElement, hologramCan);
        
        const shimmerElement = document.createElement('div');
        shimmerElement.className = 'holo-layer holo-shimmer';
        hologramCan.appendChild(shimmerElement);

        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.className = 'hologram-particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
            let xEnd = (Math.random() * 60 - 30);
            particle.style.setProperty('--particle-x-end', xEnd + 'px');
            hologramCan.appendChild(particle);
        }
    }

    const holoSection = document.querySelector('.sobre-hologram');
    if (holoSection) {
        const observerOptions = {
            root: null, 
            rootMargin: '0px',
            threshold: 0.25 
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                } else {
                    entry.target.classList.remove('is-visible');
                }
            });
        };

        const intersectionObserver = new IntersectionObserver(observerCallback, observerOptions);
        intersectionObserver.observe(holoSection);
    }

});