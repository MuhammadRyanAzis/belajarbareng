// (function(){
//     // ---------- 1. PARTIKEL LATAR BELAKANG ----------
//     const particleCanvas = document.getElementById('particleCanvas');
//     let pCtx = particleCanvas.getContext('2d');
//     let particles = [];
//     let particleCount = 3000;
//     let darkMode = false;
    
//     function resizeParticleCanvas() {
//         const container = document.querySelector('.universe');
//         const rect = container.getBoundingClientRect();
//         particleCanvas.width = rect.width;
//         particleCanvas.height = rect.height;
//         initParticles();
//     }
    
//     function initParticles() {
//         particles = [];
//         for(let i=0; i<particleCount; i++) {
//             particles.push({
//                 x: Math.random() * particleCanvas.width,
//                 y: Math.random() * particleCanvas.height,
//                 radius: 2 + Math.random() * 4,
//                 vx: (Math.random() - 0.5) * 0.5,
//                 vy: (Math.random() - 0.5) * 0.3,
//                 alpha: 0.3 + Math.random() * 0.5,
//                 colorHue: Math.random() * 360
//             });
//         }
//     }
    
//     function updateParticles() {
//         if(!particleCanvas.width || !particleCanvas.height) return;
//         for(let p of particles) {
//             p.x += p.vx;
//             p.y += p.vy;
//             if(p.x < 0) p.x = particleCanvas.width;
//             if(p.x > particleCanvas.width) p.x = 0;
//             if(p.y < 0) p.y = particleCanvas.height;
//             if(p.y > particleCanvas.height) p.y = 0;
//             p.colorHue = (p.colorHue + 0.5) % 360;
//         }
//     }
    
//     function drawParticles(globalHueOffset) {
//         if(!pCtx) return;
//         pCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
//         for(let p of particles) {
//             let hue = (p.colorHue + globalHueOffset) % 360;
//             let alpha = darkMode ? p.alpha * 0.7 : p.alpha;
//             pCtx.beginPath();
//             pCtx.arc(p.x, p.y, p.radius, 0, Math.PI*2);
//             pCtx.fillStyle = `hsla(${hue}, 75%, 65%, ${alpha})`;
//             pCtx.fill();
//             pCtx.shadowBlur = 5;
//             pCtx.shadowColor = `hsl(${hue}, 80%, 70%)`;
//             pCtx.fill();
//         }
//         pCtx.shadowBlur = 0;
//     }
    
//     // ---------- 2. KANVAS DINAMIS ----------
//     const dynCanvas = document.getElementById('dynamicCanvas');
//     const ctx = dynCanvas.getContext('2d');
//     let width = 500, height = 300;
    
//     function resizeDynamicCanvas() {
//         const container = dynCanvas.parentElement;
//         const computedWidth = container.clientWidth;
//         dynCanvas.width = computedWidth;
//         dynCanvas.height = computedWidth * (300/500);
//         width = dynCanvas.width;
//         height = dynCanvas.height;
//         drawShapes();
//     }
    
//     let shapeCount = 18;
//     let rotationSpeed = 0.012;
//     let angleOffset = 0;
//     let shapesArray = [];
//     let waveMode = false;
//     let globalHue = 0;
//     let supernovaActive = false;
//     let supernovaRadius = 0;
//     let supernovaX = 0, supernovaY = 0;
//     let floatingTexts = [];
    
//     function initShapes() {
//         shapesArray = [];
//         for(let i=0; i<shapeCount; i++) {
//             let radius = 15 + Math.random() * 28;
//             let offsetAngle = (Math.PI * 2 / shapeCount) * i;
//             let distFromCenter = Math.min(width, height) * 0.28 + Math.random() * 20;
//             shapesArray.push({
//                 radius: radius,
//                 baseXOffset: Math.cos(offsetAngle) * distFromCenter,
//                 baseYOffset: Math.sin(offsetAngle) * distFromCenter,
//                 angleSpeed: 0.005 + Math.random() * 0.01,
//                 phase: Math.random() * Math.PI * 2,
//                 type: Math.floor(Math.random() * 3),
//             });
//         }
//     }
    
//     function drawShapes() {
//         if(!ctx) return;
//         ctx.clearRect(0, 0, width, height);
//         const centerX = width/2;
//         const centerY = height/2;
        
//         let grad = ctx.createLinearGradient(0, 0, width, height);
//         if(darkMode) {
//             grad.addColorStop(0, `hsla(${globalHue}, 50%, 5%, 0.9)`);
//             grad.addColorStop(1, `hsla(${(globalHue+180)%360}, 60%, 3%, 0.95)`);
//         } else {
//             grad.addColorStop(0, `hsla(${globalHue}, 60%, 12%, 0.7)`);
//             grad.addColorStop(1, `hsla(${(globalHue+180)%360}, 70%, 8%, 0.9)`);
//         }
//         ctx.fillStyle = grad;
//         ctx.fillRect(0, 0, width, height);
        
//         let mouseX = mouseCanvasX, mouseY = mouseCanvasY;
        
//         for(let i=0; i<shapesArray.length; i++) {
//             let s = shapesArray[i];
//             let timeAngle = angleOffset + s.phase;
//             let moveX = Math.sin(timeAngle * 1.7) * 6;
//             let moveY = Math.cos(timeAngle * 1.2) * 6;
//             let x = centerX + s.baseXOffset + moveX;
//             let y = centerY + s.baseYOffset + moveY;
            
//             let dx = mouseX - x;
//             let dy = mouseY - y;
//             let dist = Math.hypot(dx, dy);
//             if(dist < 70 && dist > 5) {
//                 let angleMouse = Math.atan2(dy, dx);
//                 let force = (70 - dist) / 70 * 12;
//                 x -= Math.cos(angleMouse) * force;
//                 y -= Math.sin(angleMouse) * force;
//             }
//             x = Math.min(width-15, Math.max(15, x));
//             y = Math.min(height-15, Math.max(15, y));
            
//             let hueShape = (globalHue + i * 25) % 360;
//             ctx.save();
//             ctx.shadowBlur = 10;
//             ctx.shadowColor = `hsl(${hueShape}, 85%, 65%)`;
//             ctx.fillStyle = `hsla(${hueShape}, 85%, 65%, 0.85)`;
//             ctx.beginPath();
//             if(s.type === 0) {
//                 ctx.arc(x, y, s.radius, 0, Math.PI*2);
//                 ctx.fill();
//             } else if(s.type === 1) {
//                 let ang = angleOffset * 5 + i;
//                 let r = s.radius;
//                 for(let t=0; t<3; t++) {
//                     let a = ang + (t * Math.PI*2/3);
//                     let px = x + Math.cos(a)*r;
//                     let py = y + Math.sin(a)*r;
//                     if(t===0) ctx.moveTo(px,py);
//                     else ctx.lineTo(px,py);
//                 }
//                 ctx.closePath();
//                 ctx.fill();
//             } else {
//                 let size = s.radius * 1.2;
//                 ctx.fillRect(x-size/2, y-size/2, size, size);
//             }
//             ctx.restore();
            
//             ctx.beginPath();
//             ctx.strokeStyle = `hsla(${hueShape}, 70%, 70%, 0.3)`;
//             ctx.lineWidth = 1.2;
//             for(let j=i+1; j<shapesArray.length; j+=3) {
//                 let s2 = shapesArray[j];
//                 let x2 = centerX + s2.baseXOffset + Math.sin(angleOffset * 1.7 + s2.phase) * 6;
//                 let y2 = centerY + s2.baseYOffset + Math.cos(angleOffset * 1.2 + s2.phase) * 6;
//                 let dx2 = mouseX - x2;
//                 let dy2 = mouseY - y2;
//                 let dist2 = Math.hypot(dx2, dy2);
//                 if(dist2 < 70 && dist2 > 5) {
//                     let angM = Math.atan2(dy2, dx2);
//                     let force = (70 - dist2) / 70 * 12;
//                     x2 -= Math.cos(angM) * force;
//                     y2 -= Math.sin(angM) * force;
//                 }
//                 ctx.moveTo(x, y);
//                 ctx.lineTo(x2, y2);
//                 ctx.stroke();
//             }
//         }
        
//         if(supernovaActive) {
//             ctx.beginPath();
//             ctx.arc(supernovaX, supernovaY, supernovaRadius, 0, Math.PI*2);
//             ctx.fillStyle = `rgba(255, 200, 100, ${1 - supernovaRadius/80})`;
//             ctx.fill();
//             ctx.beginPath();
//             ctx.arc(supernovaX, supernovaY, supernovaRadius * 0.6, 0, Math.PI*2);
//             ctx.fillStyle = `rgba(255, 100, 50, ${0.8 - supernovaRadius/80})`;
//             ctx.fill();
//             supernovaRadius += 5;
//             if(supernovaRadius > 80) supernovaActive = false;
//         }
        
//         for(let i=0; i<floatingTexts.length; i++) {
//             let t = floatingTexts[i];
//             ctx.font = `${t.size}px Arial`;
//             ctx.fillStyle = `hsla(${t.hue}, 80%, 65%, ${t.alpha})`;
//             ctx.shadowBlur = 8;
//             ctx.shadowColor = `hsl(${t.hue}, 80%, 60%)`;
//             ctx.fillText(t.text, t.x, t.y);
//             t.y -= t.speed;
//             t.alpha -= 0.01;
//             t.size += 0.3;
//             if(t.alpha <= 0 || t.y < 0) {
//                 floatingTexts.splice(i,1);
//                 i--;
//             }
//         }
//         ctx.shadowBlur = 0;
        
//         if(mousePresent && rippleIntensity > 0) {
//             ctx.beginPath();
//             ctx.arc(mouseCanvasX, mouseCanvasY, rippleRadius, 0, Math.PI*2);
//             ctx.strokeStyle = `hsla(${globalHue+40}, 100%, 70%, 0.8)`;
//             ctx.lineWidth = 2.5;
//             ctx.stroke();
//             rippleRadius += 3;
//             if(rippleRadius > 50) rippleIntensity = 0;
//         }
//     }
    
//     let angle = 0, rippleIntensity = 0, rippleRadius = 5, mousePresent = false;
//     let mouseCanvasX = width/2, mouseCanvasY = height/2;
//     let clickCounter = 0, lastEffectMsg = "None", vibeFactor = 0.8;
    
//     const orb = document.getElementById('magicOrb');
//     const clickSpan = document.getElementById('clickCount');
//     const lastEffectSpan = document.getElementById('lastEffect');
//     const vibeSlider = document.getElementById('vibeSlider');
//     const vibeValSpan = document.getElementById('vibeValue');
//     const vibeIndicator = document.getElementById('vibeIndicator');
//     const resetBtn = document.getElementById('resetStatsBtn');
//     const shapeSlider = document.getElementById('shapeCountSlider');
//     const countValSpan = document.getElementById('countVal');
//     const speedSlider = document.getElementById('speedSlider');
//     const speedValSpan = document.getElementById('speedVal');
//     const chaosBtn = document.getElementById('chaosBtn');
//     const hueSlider = document.getElementById('hueSlider');
//     const hueValSpan = document.getElementById('hueVal');
//     const particleCountSlider = document.getElementById('particleCountSlider');
//     const partCountSpan = document.getElementById('partCountVal');
//     const toggleWaveBtn = document.getElementById('toggleWaveBtn');
//     const darkModeBtn = document.getElementById('darkModeBtn');
//     const mouseCoordSpan = document.getElementById('mouseCoord');
    
//     orb.addEventListener('click', (e) => {
//         clickCounter++;
//         clickSpan.innerText = clickCounter;
//         lastEffectMsg = `💥 SUPERNOVA! 💥`;
//         lastEffectSpan.innerText = lastEffectMsg;
//         const rect = orb.getBoundingClientRect();
//         const canvasRect = dynCanvas.getBoundingClientRect();
//         supernovaX = (rect.left + rect.right)/2 - canvasRect.left;
//         supernovaY = (rect.top + rect.bottom)/2 - canvasRect.top;
//         supernovaActive = true;
//         supernovaRadius = 5;
//         floatingTexts.push({ text: '✨ SUPERNOVA! ✨', x: supernovaX - 40, y: supernovaY - 20, speed: 1.5, alpha: 1, size: 18, hue: Math.random() * 360 });
//         rippleIntensity = 1; rippleRadius = 8; mousePresent = true;
//         orb.style.transform = `scale(${1 - vibeFactor*0.15})`;
//         setTimeout(() => { orb.style.transform = ''; }, 150);
//         for(let i=0;i<50;i++) {
//             particles.push({ x: Math.random() * particleCanvas.width, y: Math.random() * particleCanvas.height, radius: 2+Math.random()*6, vx: (Math.random()-0.5)*3, vy: (Math.random()-0.5)*3, alpha: 0.9, colorHue: Math.random()*360 });
//         }
//     });
    
//     vibeSlider.addEventListener('input', (e) => {
//         vibeFactor = parseFloat(e.target.value);
//         vibeValSpan.innerText = vibeFactor.toFixed(2);
//         vibeIndicator.innerHTML = vibeFactor > 1 ? '⚡ Getaran: INTENS! 🔥' : vibeFactor < 0.3 ? '💤 Getaran: Lembut' : '⚡ Getaran: Aktif';
//     });
    
//     resetBtn.addEventListener('click', () => {
//         clickCounter = 0; clickSpan.innerText = '0'; lastEffectSpan.innerText = 'reset';
//         floatingTexts.push({ text: '🔄 RESET! 🔄', x: width/2, y: height/2, speed: 1, alpha: 1, size: 20, hue: 200 });
//     });
    
//     shapeSlider.addEventListener('input', (e) => {
//         shapeCount = parseInt(e.target.value); countValSpan.innerText = shapeCount; initShapes();
//     });
    
//     speedSlider.addEventListener('input', (e) => {
//         rotationSpeed = parseFloat(e.target.value); speedValSpan.innerText = rotationSpeed.toFixed(4);
//     });
    
//     chaosBtn.addEventListener('click', () => {
//         for(let s of shapesArray) { s.radius = Math.max(8, Math.min(45, s.radius + (Math.random()-0.5)*12)); s.type = Math.floor(Math.random()*3); }
//         floatingTexts.push({ text: '🌀 CHAOS! 🌀', x: width/2, y: height/2, speed: 1.2, alpha: 1, size: 22, hue: Math.random() * 360 });
//     });
    
//     hueSlider.addEventListener('input', (e) => {
//         globalHue = parseInt(e.target.value); hueValSpan.innerText = globalHue;
//     });
    
//     particleCountSlider.addEventListener('input', (e) => {
//         particleCount = parseInt(e.target.value); partCountSpan.innerText = particleCount; initParticles();
//     });
    
//     toggleWaveBtn.addEventListener('click', () => {
//         waveMode = !waveMode; toggleWaveBtn.innerText = waveMode ? "🌊 Gelombang AKTIF" : "🌊 Aktifkan Gelombang";
//     });
    
//     darkModeBtn.addEventListener('click', () => {
//         darkMode = !darkMode;
//         document.body.classList.toggle('dark-mode-active');
//         darkModeBtn.innerHTML = darkMode ? '☀️ Mode Terang' : '🌙 Mode Malam Gelap';
//     });
    
//     dynCanvas.addEventListener('mousemove', (e) => {
//         const rect = dynCanvas.getBoundingClientRect();
//         const scaleX = dynCanvas.width / rect.width;
//         const scaleY = dynCanvas.height / rect.height;
//         mouseCanvasX = (e.clientX - rect.left) * scaleX;
//         mouseCanvasY = (e.clientY - rect.top) * scaleY;
//         mouseCoordSpan.innerText = `${Math.floor(mouseCanvasX)},${Math.floor(mouseCanvasY)}`;
//         mousePresent = true;
//         if(Math.random() < 0.05) floatingTexts.push({ text: '✨', x: mouseCanvasX, y: mouseCanvasY, speed: 0.8, alpha: 0.8, size: 12 + Math.random() * 8, hue: Math.random() * 360 });
//     });
    
//     dynCanvas.addEventListener('mouseleave', () => { mousePresent = false; mouseCoordSpan.innerText = 'out'; });
    
//     function animate() {
//         requestAnimationFrame(animate);
//         angle += rotationSpeed; angleOffset = angle;
//         if(waveMode) globalHue = (globalHue + 1.5) % 360;
//         updateParticles(); drawParticles(globalHue); drawShapes();
//         if(rippleIntensity > 0) { rippleIntensity -= 0.03; } else rippleRadius = 5;
//     }
    
//     window.addEventListener('resize', () => { resizeParticleCanvas(); resizeDynamicCanvas(); });
//     resizeParticleCanvas(); resizeDynamicCanvas(); initShapes(); initParticles();
//     requestAnimationFrame(animate);
// })();


const historicalDatabase = {
    '2026': {
        months: ['Jan', 'Feb', 'Mar', 'Apr'],
        prices: [2500000, 2600000, 2550000, 2690374],
        desc: "Memasuki 2026, harga mencapai level psikologis baru didorong oleh adopsi aset digital dan ketidakpastian geopolitik."
    },
    '2025': {
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
        prices: [2100000, 2150000, 2250000, 2300000, 2400000, 2350000, 2450000, 2550000, 2500000, 2580000, 2620000, 2650000],
        desc: "2025 menjadi tahun pertumbuhan agresif. Emas secara konsisten mengungguli instrumen investasi lainnya."
    },
    '2024': {
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
        prices: [1800000, 1820000, 1850000, 1900000, 1880000, 1950000, 2000000, 2100000, 2050000, 2150000, 2120000, 2180000],
        desc: "Tahun transisi di mana harga mulai stabil di atas 2 Juta rupiah per gram untuk pertama kalinya dalam sejarah."
    },
    '2023': {
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
        prices: [1500000, 1550000, 1600000, 1580000, 1650000, 1700000, 1680000, 1750000, 1800000, 1780000, 1820000, 1850000],
        desc: "Emas mulai menunjukkan tren 'bullish' kuat akibat pemulihan ekonomi global dan kebijakan suku bunga."
    },
    '2022': {
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
        prices: [1100000, 1150000, 1250000, 1300000, 1350000, 1320000, 1380000, 1420000, 1450000, 1430000, 1480000, 1500000],
        desc: "Tahun 2022 ditandai dengan volatilitas tinggi namun ditutup dengan kenaikan yang sangat solid."
    },
    '2021': {
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
        prices: [850000, 870000, 860000, 900000, 920000, 950000, 980000, 1000000, 1050000, 1030000, 1080000, 1100000],
        desc: "Awal perjalanan investasi emas modern dimulai di sini, di mana harga masih berada di level Rp850rb per gram."
    }
};

const ctx = document.getElementById('goldChart').getContext('2d');
let goldChart;

function updateDashboard(year) {
    const dataObj = historicalDatabase[year];
    const prices = dataObj.prices;
    const labels = dataObj.months;

    // Update UI Stats
    document.querySelectorAll('.active-year').forEach(el => el.innerText = year);
    document.getElementById('active-year-label').innerText = year;

    const max = Math.max(...prices);
    const min = Math.min(...prices);
    const avg = (prices.reduce((a,b) => a+b, 0) / prices.length).toFixed(0);
    const first = prices[0];
    const last = prices[prices.length - 1];
    const growth = (((last - first) / first) * 100).toFixed(2);
    const isUp = growth >= 0;

    document.getElementById('stat-high').innerText = `Rp ${max.toLocaleString()}`;
    document.getElementById('stat-low').innerText = `Rp ${min.toLocaleString()}`;
    document.getElementById('main-price').innerText = `Rp ${avg.toLocaleString()}`;

    const tag = document.getElementById('performance-tag');
    tag.className = `performance-badge ${isUp ? 'positive' : 'negative'}`;
    document.getElementById('perf-icon').innerText = isUp ? '↑' : '↓';
    document.getElementById('perf-value').innerText = `${isUp ? '+' : ''}${growth}%`;

    // Algoritma Jump Detection
    let biggestJump = 0;
    let jumpMonth = "";
    for(let i=1; i < prices.length; i++) {
        let diff = prices[i] - prices[i-1];
        if(diff > biggestJump) { biggestJump = diff; jumpMonth = labels[i]; }
    }

    document.getElementById('insight-content').innerText = `${dataObj.desc} Kejadian menonjol pada bulan ${jumpMonth}, dengan lonjakan tertinggi Rp ${biggestJump.toLocaleString()} per gram.`;

    // Chart logic
    const neonColor = isUp ? '#00ff88' : '#ff4444';
    let gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, isUp ? 'rgba(0, 255, 136, 0.2)' : 'rgba(255, 68, 68, 0.2)');
    gradient.addColorStop(1, 'transparent');

    if (goldChart) goldChart.destroy();
    goldChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                data: prices,
                borderColor: neonColor,
                borderWidth: 3,
                fill: true,
                backgroundColor: gradient,
                tension: 0.4,
                pointRadius: 4,
                pointBackgroundColor: neonColor
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { grid: { color: 'rgba(255, 255, 255, 0.05)' } },
                x: { grid: { display: false } }
            }
        }
    });
}

document.getElementById('year-select').addEventListener('change', (e) => updateDashboard(e.target.value));
updateDashboard('2026');