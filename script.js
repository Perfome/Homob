// Partikül sistemi
class ParticleGenerator {
    constructor() {
        this.container = document.querySelector('.particles');
        this.colors = [
            '#4dd5d9',  // Turkuaz
            '#7de3e6',  // Açık mavi
            '#ffd633',  // Sarı
            '#ffe680',  // Açık sarı
            '#b4f0f2'   // Çok açık mavi
        ];
        this.isRunning = false;
    }

    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        
        // İlk partiküller
        setTimeout(() => {
            this.generateBurst(15);
        }, 2000);
        
        // Sürekli partikül üretimi
        this.interval = setInterval(() => {
            this.generateParticles(3);
        }, 300);
    }

    generateBurst(count) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                this.createParticle();
            }, i * 50);
        }
    }

    generateParticles(count) {
        for (let i = 0; i < count; i++) {
            this.createParticle();
        }
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Rastgele renk
        const color = this.colors[Math.floor(Math.random() * this.colors.length)];
        particle.style.background = color;
        particle.style.boxShadow = `0 0 10px ${color}`;
        
        // Rastgele boyut (küçük partiküller)
        const size = 4 + Math.random() * 6;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Rastgele başlangıç pozisyonu (çiçeklerin üstünden)
        const startX = 30 + Math.random() * 40; // %30-70 arası
        particle.style.left = `${startX}%`;
        particle.style.top = `${10 + Math.random() * 20}%`;
        
        // Rastgele sürüklenme
        const drift = (Math.random() - 0.5) * 100;
        particle.style.setProperty('--drift', `${drift}px`);
        
        // Rastgele düşüş hızı
        const duration = 2 + Math.random() * 2;
        particle.style.animation = `particleFall ${duration}s linear forwards`;
        
        this.container.appendChild(particle);
        
        // Temizlik
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, duration * 1000);
    }

    stop() {
        this.isRunning = false;
        if (this.interval) {
            clearInterval(this.interval);
        }
    }
}

// Alt yaprakların rotasyonunu ayarla
function setupBottomLeaves() {
    const leaves = document.querySelectorAll('.bottom-leaf');
    leaves.forEach((leaf, index) => {
        const baseRotation = [-25, -15, -5, 5, 15, 25][index];
        leaf.style.setProperty('--rotation', `${baseRotation}deg`);
    });
}

// Çiçeklere hafif titreşim ekle
function addFlowerMovement() {
    setTimeout(() => {
        const flowers = document.querySelectorAll('.flower-head');
        flowers.forEach((flower, index) => {
            const style = document.createElement('style');
            style.textContent = `
                @keyframes flowerFloat${index} {
                    0%, 100% { transform: translateX(-50%) translateY(0) rotate(0deg); }
                    25% { transform: translateX(-50%) translateY(-3px) rotate(-1deg); }
                    75% { transform: translateX(-50%) translateY(-3px) rotate(1deg); }
                }
            `;
            document.head.appendChild(style);
            
            flower.style.animation += `, flowerFloat${index} 3s ease-in-out ${index * 0.3}s infinite`;
        });
    }, 3500);
}

// Yapraklara hafif dalga hareketi ekle
function addLeafWave() {
    setTimeout(() => {
        const leaves = document.querySelectorAll('.leaf');
        leaves.forEach((leaf, index) => {
            leaf.style.animation += `, leafWave 2.5s ease-in-out ${index * 0.15}s infinite`;
        });
    }, 3500);
}

// Yaprak dalga animasyonu
function injectLeafWaveAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes leafWave {
            0%, 100% {
                transform: rotate(var(--base-rotation, 0deg)) scale(1);
            }
            50% {
                transform: rotate(calc(var(--base-rotation, 0deg) - 3deg)) scale(1.02);
            }
        }
    `;
    document.head.appendChild(style);
}

// Merkez ışıltısı
function addCenterGlow() {
    setTimeout(() => {
        const centers = document.querySelectorAll('.center');
        centers.forEach(center => {
            setInterval(() => {
                const intensity = 15 + Math.random() * 10;
                center.style.boxShadow = `
                    0 0 ${intensity}px rgba(255, 230, 128, 0.8),
                    inset 0 0 ${intensity / 2}px rgba(255, 200, 0, 0.6)
                `;
            }, 1000);
        });
    }, 3000);
}

// Alt yapraklara rüzgar efekti
function addBottomLeafSway() {
    setTimeout(() => {
        const bottomLeaves = document.querySelectorAll('.bottom-leaf');
        bottomLeaves.forEach((leaf, index) => {
            leaf.style.animation += `, bottomLeafSway 3s ease-in-out ${index * 0.2}s infinite`;
        });
    }, 4000);
}

// Alt yaprak sallanma animasyonu
function injectBottomLeafSwayAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes bottomLeafSway {
            0%, 100% {
                transform: rotate(var(--rotation, 0deg)) scale(1);
            }
            50% {
                transform: rotate(calc(var(--rotation, 0deg) - 5deg)) scale(1.03);
            }
        }
    `;
    document.head.appendChild(style);
}

// Gövdelere hafif sallanma
function addStemSway() {
    setTimeout(() => {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes stemSway {
                0%, 100% { transform: translateX(-50%) rotate(0deg); }
                50% { transform: translateX(-50%) rotate(0.5deg); }
            }
        `;
        document.head.appendChild(style);
        
        document.querySelector('.main-stem').style.animation += ', stemSway 4s ease-in-out infinite';
    }, 3500);
}

// Sayfa yüklendiğinde başlat
window.addEventListener('load', () => {
    // Partikül sistemi
    const particleGen = new ParticleGenerator();
    particleGen.start();
    
    // Yapılandırma
    setupBottomLeaves();
    
    // Animasyon injeksiyonları
    injectLeafWaveAnimation();
    injectBottomLeafSwayAnimation();
    
    // Ek hareketler
    addFlowerMovement();
    addLeafWave();
    addCenterGlow();
    addBottomLeafSway();
    addStemSway();
    
    // Tıklama ile yeniden başlat
    document.body.addEventListener('click', () => {
        location.reload();
    });
});

// Konsol mesajı
console.log('🌸 Çiçek tomurcuktan açtı! 🌸');
