/*
    Создаём динамический mesh-градиент.
    Градиент будет плавно менять положение цветовых пятен.
*/

// Получаем контейнер фона
const background = document.querySelector(".background-gradient");

// Координаты цветовых пятен
let angle = 0;

// Функция анимации
function animateGradient() {

    angle += 0.003;

    const x1 = 50 + Math.sin(angle) * 30;
    const y1 = 50 + Math.cos(angle) * 30;

    const x2 = 50 + Math.sin(angle * 1.3) * 35;
    const y2 = 50 + Math.cos(angle * 1.3) * 35;

    const x3 = 50 + Math.sin(angle * 0.8) * 40;
    const y3 = 50 + Math.cos(angle * 0.8) * 40;

    background.style.background = ` 
    radial-gradient( 
    circle at ${x1}% ${y1}%, 
    #F5F5F5 0%, 
    transparent 45% 
    ), 
    
    radial-gradient( 
    circle at ${x2}% ${y2}%, 
    #FDF6F4 0%, 
    transparent 45% 
    ), 
    
    radial-gradient( 
    circle at ${x3}% ${y3}%, 
    #FFEEE8 0%, transparent 45% 
    ), 
    
    radial-gradient( 
    circle at 80% 20%, 
    #FDF8F7 0%, 
    transparent 45% 
    ), 
    
    radial-gradient( 
    circle at 15% 80%, 
    #F5F5FB 0%, 
    transparent 45% 
    ), 
    
    radial-gradient( 
    circle at 80% 80%, 
    #F8F2F4 0%, 
    transparent 45% 
    ) `;

    requestAnimationFrame(animateGradient);
}

// Запускаем анимацию
animateGradient();

/* Intersection Observer */

const observer =
new IntersectionObserver(
(entries) => {
entries.forEach(entry => {
    if (entry.isIntersecting) {
        entry.target.classList.add(
            "visible"
        );
    }
});

},
{
threshold: 0.15
}
);

document
.querySelectorAll(".reveal")
.forEach(element => {
observer.observe(element);

});


/* ==========================================
   Interactive Fabric Mesh
   Реакция сетки на движение курсора
========================================== */

// Canvas
const canvas = document.getElementById("mesh-canvas");
const ctx = canvas.getContext("2d");

// Настройки сетки
const settings = {
    spacing: 20,          // Расстояние между линиями
    color: "#E1E2E9",     // Цвет сетки
    lineWidth: 1,         // Толщина линий

    influenceRadius: 230, // Радиус влияния курсора
    influenceStrength: 28, // Сила деформации

    waveSpeed: 2.0,       // Скорость волн
    waveFrequency: 0.035, // Частота волн

    ambientStrength: 3,   // Естественное колебание
};

// Размеры экрана
let width = 0;
let height = 0;

// Положение курсора
const mouse = {
    x: -1000,
    y: -1000,

    targetX: -1000,
    targetY: -1000,

    velocityX: 0,
    velocityY: 0
};

// Время анимации
let time = 0;


// ==========================================
// Размер Canvas
// ==========================================

function resizeCanvas() {

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);


// ==========================================
// Отслеживание курсора
// ==========================================

window.addEventListener("pointermove", (event) => {

    mouse.targetX = event.clientX;
    mouse.targetY = event.clientY;

});

window.addEventListener("pointerleave", () => {

    mouse.targetX = -1000;
    mouse.targetY = -1000;

});


// ==========================================
// Деформация сетки
// ==========================================

function distortPoint(x, y) {

    // Расстояние от точки до курсора
    const dx = x - mouse.x;
    const dy = y - mouse.y;

    const distance = Math.sqrt(dx * dx + dy * dy);

    // Влияние курсора постепенно уменьшается
    // по мере удаления от него

    const influence = Math.exp(
        -(distance * distance) /
        (2 * settings.influenceRadius * settings.influenceRadius)
    );

    // Распространение волны
    const wave = Math.sin(
        distance * settings.waveFrequency -
        time * settings.waveSpeed
    );

    // Сила деформации
    const displacement =
        wave *
        influence *
        settings.influenceStrength;

    // Направление деформации
    const directionX = dx / (distance + 0.001);
    const directionY = dy / (distance + 0.001);

    // Небольшое естественное колебание сетки
    const ambientX =
        Math.sin(y * 0.012 + time * 0.7) *
        settings.ambientStrength;

    const ambientY =
        Math.cos(x * 0.01 + time * 0.6) *
        settings.ambientStrength;

    return {
        x: x + directionX * displacement + ambientX * 0.35,
        y: y + directionY * displacement + ambientY
    };
}


// ==========================================
// Отрисовка сетки
// ==========================================

function drawMesh() {

    ctx.clearRect(0, 0, width, height);

    ctx.strokeStyle = settings.color;
    ctx.lineWidth = settings.lineWidth;
    ctx.globalAlpha = 0.85;

    // Сглаживание движения курсора
    mouse.x += (mouse.targetX - mouse.x) * 0.07;
    mouse.y += (mouse.targetY - mouse.y) * 0.07;

    // Обновляем время
    time += 0.016;


    // Количество линий
    const columns = Math.ceil(width / settings.spacing) + 2;
    const rows = Math.ceil(height / settings.spacing) + 2;


    // Вертикальные линии
    for (let col = -1; col <= columns; col++) {

        ctx.beginPath();

        for (let row = -1; row <= rows; row++) {

            const x = col * settings.spacing;
            const y = row * settings.spacing;

            const point = distortPoint(x, y);

            if (row === -1) {
                ctx.moveTo(point.x, point.y);
            } else {
                ctx.lineTo(point.x, point.y);
            }
        }

        ctx.stroke();
    }


    // Горизонтальные линии
    for (let row = -1; row <= rows; row++) {

        ctx.beginPath();

        for (let col = -1; col <= columns; col++) {

            const x = col * settings.spacing;
            const y = row * settings.spacing;

            const point = distortPoint(x, y);

            if (col === -1) {
                ctx.moveTo(point.x, point.y);
            } else {
                ctx.lineTo(point.x, point.y);
            }
        }

        ctx.stroke();
    }

    ctx.globalAlpha = 1;

    requestAnimationFrame(drawMesh);
}


// ==========================================
// Запуск анимации
// ==========================================

drawMesh();

