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


// /* ==========================================
//    Interactive Fabric Mesh
//    Реакция сетки на движение курсора
// ========================================== */

// // Canvas
// const canvas = document.getElementById("mesh-canvas");
// const ctx = canvas.getContext("2d");

// // Настройки сетки
// const settings = {
//     spacing: 20,          // Расстояние между линиями
//     color: "#E1E2E9",     // Цвет сетки
//     lineWidth: 1,         // Толщина линий

//     influenceRadius: 330, // Радиус влияния курсора
//     influenceStrength: 25, // Сила деформации

//     waveSpeed: 2.0,       // Скорость волн
//     waveFrequency: 0.030, // Частота волн

//     ambientStrength: 2,   // Естественное колебание
// };

// // Размеры экрана
// let width = 0;
// let height = 0;

// // Положение курсора
// const mouse = {
//     x: -1000,
//     y: -1000,

//     targetX: -1000,
//     targetY: -1000,

//     velocityX: 0,
//     velocityY: 0
// };

// // Время анимации
// let time = 0;


// // ==========================================
// // Размер Canvas
// // ==========================================

// function resizeCanvas() {

//     const dpr = Math.min(window.devicePixelRatio || 1, 2);

//     width = window.innerWidth;
//     height = window.innerHeight;

//     canvas.width = width * dpr;
//     canvas.height = height * dpr;

//     ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
// }

// resizeCanvas();

// window.addEventListener("resize", resizeCanvas);


// // ==========================================
// // Отслеживание курсора
// // ==========================================

// window.addEventListener("pointermove", (event) => {

//     mouse.targetX = event.clientX;
//     mouse.targetY = event.clientY;

// });

// window.addEventListener("pointerleave", () => {

//     mouse.targetX = -1000;
//     mouse.targetY = -1000;

// });


// // ==========================================
// // Деформация сетки
// // ==========================================

// function distortPoint(x, y) {

//     // Расстояние от точки до курсора
//     const dx = x - mouse.x;
//     const dy = y - mouse.y;

//     const distance = Math.sqrt(dx * dx + dy * dy);

//     // Влияние курсора постепенно уменьшается
//     // по мере удаления от него

//     const influence = Math.exp(
//         -(distance * distance) /
//         (2 * settings.influenceRadius * settings.influenceRadius)
//     );

//     // Распространение волны
//     const wave = Math.sin(
//         distance * settings.waveFrequency -
//         time * settings.waveSpeed
//     );

//     // Сила деформации
//     const displacement =
//         wave *
//         influence *
//         settings.influenceStrength;

//     // Направление деформации
//     const directionX = dx / (distance + 0.001);
//     const directionY = dy / (distance + 0.001);

//     // Небольшое естественное колебание сетки
//     const ambientX =
//         Math.sin(y * 0.012 + time * 0.7) *
//         settings.ambientStrength;

//     const ambientY =
//         Math.cos(x * 0.01 + time * 0.6) *
//         settings.ambientStrength;

//     return {
//         x: x + directionX * displacement + ambientX * 0.35,
//         y: y + directionY * displacement + ambientY
//     };
// }


// // ==========================================
// // Отрисовка сетки
// // ==========================================

// function drawMesh() {

//     ctx.clearRect(0, 0, width, height);

//     ctx.strokeStyle = settings.color;
//     ctx.lineWidth = settings.lineWidth;
//     ctx.globalAlpha = 0.85;

//     // Сглаживание движения курсора
//     mouse.x += (mouse.targetX - mouse.x) * 0.07;
//     mouse.y += (mouse.targetY - mouse.y) * 0.07;

//     // Обновляем время
//     time += 0.016;


//     // Количество линий
//     const columns = Math.ceil(width / settings.spacing) + 2;
//     const rows = Math.ceil(height / settings.spacing) + 2;


//     // Вертикальные линии
//     for (let col = -1; col <= columns; col++) {

//         ctx.beginPath();

//         for (let row = -1; row <= rows; row++) {

//             const x = col * settings.spacing;
//             const y = row * settings.spacing;

//             const point = distortPoint(x, y);

//             if (row === -1) {
//                 ctx.moveTo(point.x, point.y);
//             } else {
//                 ctx.lineTo(point.x, point.y);
//             }
//         }

//         ctx.stroke();
//     }


//     // Горизонтальные линии
//     for (let row = -1; row <= rows; row++) {

//         ctx.beginPath();

//         for (let col = -1; col <= columns; col++) {

//             const x = col * settings.spacing;
//             const y = row * settings.spacing;

//             const point = distortPoint(x, y);

//             if (col === -1) {
//                 ctx.moveTo(point.x, point.y);
//             } else {
//                 ctx.lineTo(point.x, point.y);
//             }
//         }

//         ctx.stroke();
//     }

//     ctx.globalAlpha = 1;

//     requestAnimationFrame(drawMesh);
// }


// // ==========================================
// // Запуск анимации
// // ==========================================

// drawMesh();

// ------------------------------------------------------------------- Упругая ткань -------------------------------------------------------------------

// /* ==========================================
//    Interactive Cloth Simulation
//    Физическая симуляция тканевой сетки
// ========================================== */

// // Canvas
// const canvas = document.getElementById("mesh-canvas");
// const ctx = canvas.getContext("2d");

// // ==========================================
// // Настройки симуляции
// // ==========================================

// const settings = {

//     // Внешний вид
//     spacing: 24,
//     color: "#E1E2E9",
//     lineWidth: 1,
//     opacity: 0.85,

//     // Физика ткани
//     damping: 0.985,          // Затухание инерции
//     iterations: 5,           // Количество расчётов связей
//     stiffness: 0.3,         // Жёсткость ткани
//     bendStiffness: 0.1,     // Сопротивление изгибу

//     // Воздействие курсора
//     influenceRadius: 400,
//     mouseStrength: 1.9,
//     mousePush: 0.45,

//     // Внешние силы
//     gravity: 0.015,
//     windStrength: 0.525,

// };

// // ==========================================
// // Размеры Canvas
// // ==========================================

// let width = 0;
// let height = 0;
// let particles = [];
// let constraints = [];
// let columns = 0;
// let rows = 0;
// let time = 0;

// function resizeCanvas() {

//     const dpr = Math.min(window.devicePixelRatio || 1, 2);

//     width = window.innerWidth;
//     height = window.innerHeight;

//     canvas.width = width * dpr;
//     canvas.height = height * dpr;

//     ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

//     createCloth();
// }

// // ==========================================
// // Курсор
// // ==========================================

// const mouse = {
//     x: -1000,
//     y: -1000,
//     active: false,
//     vx: 0,
//     vy: 0
// };

// let previousMouseX = -1000;
// let previousMouseY = -1000;

// window.addEventListener("pointermove", (event) => {

//     mouse.x = event.clientX;
//     mouse.y = event.clientY;

//     mouse.vx = mouse.x - previousMouseX;
//     mouse.vy = mouse.y - previousMouseY;

//     previousMouseX = mouse.x;
//     previousMouseY = mouse.y;

//     mouse.active = true;

// });

// window.addEventListener("pointerleave", () => {

//     mouse.active = false;

//     mouse.x = -1000;
//     mouse.y = -1000;

//     mouse.vx = 0;
//     mouse.vy = 0;

// });


// // ==========================================
// // Создание частиц
// // ==========================================

// function createCloth() {

//     particles = [];
//     constraints = [];

//     columns = Math.ceil(width / settings.spacing) + 1;
//     rows = Math.ceil(height / settings.spacing) + 1;

//     // Создаём сетку точек

//     for (let row = 0; row <= rows; row++) {

//         for (let col = 0; col <= columns; col++) {

//             const x = col * settings.spacing;
//             const y = row * settings.spacing;

//             // Края ткани закреплены

//             const pinned =
//                 row === 0 ||
//                 row === rows ||
//                 col === 0 ||
//                 col === columns;

//             particles.push({

//                 x: x,
//                 y: y,

//                 oldX: x,
//                 oldY: y,

//                 baseX: x,
//                 baseY: y,

//                 pinned: pinned

//             });

//         }
//     }

//     // Индекс частицы по координатам сетки

//     function index(row, col) {
//         return row * (columns + 1) + col;
//     }

//     // Создание связи между частицами

//     function connect(a, b, stiffness) {

//         const p1 = particles[a];
//         const p2 = particles[b];

//         const dx = p2.x - p1.x;
//         const dy = p2.y - p1.y;

//         constraints.push({

//             a: a,
//             b: b,

//             length: Math.sqrt(dx * dx + dy * dy),

//             stiffness: stiffness

//         });
//     }

//     // Структурные связи:
//     // горизонтальные и вертикальные

//     for (let row = 0; row <= rows; row++) {

//         for (let col = 0; col <= columns; col++) {

//             const current = index(row, col);

//             if (col < columns) {
//                 connect(
//                     current,
//                     index(row, col + 1),
//                     settings.stiffness
//                 );
//             }

//             if (row < rows) {
//                 connect(
//                     current,
//                     index(row + 1, col),
//                     settings.stiffness
//                 );
//             }

//             // Диагональные связи:
//             // предотвращают деформацию ячеек в параллелограммы

//             if (col < columns && row < rows) {

//                 connect(
//                     current,
//                     index(row + 1, col + 1),
//                     settings.stiffness * 0.7
//                 );

//                 connect(
//                     index(row, col + 1),
//                     index(row + 1, col),
//                     settings.stiffness * 0.7
//                 );

//             }

//             // Связи через одну точку:
//             // сопротивление сильному изгибу

//             if (col + 2 <= columns) {

//                 connect(
//                     current,
//                     index(row, col + 2),
//                     settings.bendStiffness
//                 );

//             }

//             if (row + 2 <= rows) {

//                 connect(
//                     current,
//                     index(row + 2, col),
//                     settings.bendStiffness
//                 );

//             }

//         }
//     }
// }


// // ==========================================
// // Verlet Integration
// // Расчёт движения частиц
// // ==========================================

// function updateParticles() {

//     for (const p of particles) {

//         if (p.pinned) continue;

//         // Скорость через разницу координат
//         // текущего и предыдущего кадров

//         let vx = (p.x - p.oldX) * settings.damping;
//         let vy = (p.y - p.oldY) * settings.damping;

//         // Сохраняем предыдущие координаты

//         p.oldX = p.x;
//         p.oldY = p.y;

//         // Естественное движение воздуха

//         const windX =
//             Math.sin(p.y * 0.008 + time) *
//             settings.windStrength;

//         const windY =
//             Math.cos(p.x * 0.006 + time * 0.7) *
//             settings.windStrength;

//         // Воздействие курсора

//         let forceX = 0;
//         let forceY = 0;

//         if (mouse.active) {

//             const dx = p.x - mouse.x;
//             const dy = p.y - mouse.y;

//             const distance = Math.sqrt(dx * dx + dy * dy);

//             if (distance < settings.influenceRadius) {

//                 const falloff =
//                     1 - distance / settings.influenceRadius;

//                 const influence = falloff * falloff;

//                 const directionX = dx / (distance + 0.001);
//                 const directionY = dy / (distance + 0.001);

//                 // Курсор отталкивает ткань

//                 forceX +=
//                     directionX *
//                     influence *
//                     settings.mousePush;

//                 forceY +=
//                     directionY *
//                     influence *
//                     settings.mousePush;

//                 // Движение курсора увлекает ткань

//                 forceX +=
//                     mouse.vx *
//                     influence *
//                     settings.mouseStrength *
//                     0.025;

//                 forceY +=
//                     mouse.vy *
//                     influence *
//                     settings.mouseStrength *
//                     0.025;

//             }
//         }

//         // Обновляем координаты

//         p.x += vx + windX + forceX;

//         p.y += vy + windY + forceY + settings.gravity;

//     }
// }


// // ==========================================
// // Distance Constraints
// // Сохранение формы ткани
// // ==========================================

// function solveConstraints() {

//     for (let iteration = 0;
//          iteration < settings.iterations;
//          iteration++) {

//         for (const c of constraints) {

//             const p1 = particles[c.a];
//             const p2 = particles[c.b];

//             const dx = p2.x - p1.x;
//             const dy = p2.y - p1.y;

//             const distance = Math.sqrt(dx * dx + dy * dy);

//             if (distance === 0) continue;

//             // Отклонение от исходной длины связи

//             const difference =
//                 (distance - c.length) / distance;

//             const correction =
//                 difference * c.stiffness;

//             const offsetX = dx * correction;
//             const offsetY = dy * correction;

//             // Распределяем нагрузку
//             // между свободными частицами

//             if (!p1.pinned && !p2.pinned) {

//                 p1.x += offsetX * 0.5;
//                 p1.y += offsetY * 0.5;

//                 p2.x -= offsetX * 0.5;
//                 p2.y -= offsetY * 0.5;

//             } else if (p1.pinned && !p2.pinned) {

//                 p2.x -= offsetX;
//                 p2.y -= offsetY;

//             } else if (!p1.pinned && p2.pinned) {

//                 p1.x += offsetX;
//                 p1.y += offsetY;

//             }

//         }
//     }
// }


// // ==========================================
// // Отрисовка сетки
// // ==========================================

// function drawCloth() {

//     ctx.clearRect(0, 0, width, height);

//     ctx.strokeStyle = settings.color;
//     ctx.lineWidth = settings.lineWidth;
//     ctx.globalAlpha = settings.opacity;

//     // Горизонтальные линии

//     for (let row = 0; row <= rows; row++) {

//         ctx.beginPath();

//         for (let col = 0; col <= columns; col++) {

//             const p = particles[
//                 row * (columns + 1) + col
//             ];

//             if (col === 0) {
//                 ctx.moveTo(p.x, p.y);
//             } else {
//                 ctx.lineTo(p.x, p.y);
//             }

//         }

//         ctx.stroke();
//     }

//     // Вертикальные линии

//     for (let col = 0; col <= columns; col++) {

//         ctx.beginPath();

//         for (let row = 0; row <= rows; row++) {

//             const p = particles[
//                 row * (columns + 1) + col
//             ];

//             if (row === 0) {
//                 ctx.moveTo(p.x, p.y);
//             } else {
//                 ctx.lineTo(p.x, p.y);
//             }

//         }

//         ctx.stroke();
//     }

//     ctx.globalAlpha = 1;
// }


// // ==========================================
// // Главный цикл анимации
// // ==========================================

// function animateCloth() {

//     time += 0.016;

//     updateParticles();

//     solveConstraints();

//     drawCloth();

//     // Постепенно уменьшаем скорость курсора

//     mouse.vx *= 0.8;
//     mouse.vy *= 0.8;

//     requestAnimationFrame(animateCloth);
// }


// // ==========================================
// // Запуск
// // ==========================================

// resizeCanvas();

// animateCloth();


// ------------------------------------------------------------------- 3D-вихрь -------------------------------------------------------------------


/* ==========================================
   3D Vortex Mesh
   Интерактивный трёхмерный вихрь
========================================== */

// Canvas
const canvas = document.getElementById("mesh-canvas");
const ctx = canvas.getContext("2d");


// ==========================================
// Настройки
// ==========================================

const settings = {

    // Внешний вид
    spacing: 20,
    color: "#E1E2E9",
    lineWidth: 1,
    opacity: 0.85,

    // Радиус воздействия
    influenceRadius: 500,

    // Вращение вихря
    twistStrength: 2.2,

    // Объёмность
    heightStrength: 38,
    perspective: 900,

    // Волны
    waveAmplitude: 12,
    waveFrequency: 0.025,
    waveSpeed: 1.5,

    // Плавность
    mouseSmoothness: 0.09,
    fadeSpeed: 0.06,

};


// ==========================================
// Размеры Canvas
// ==========================================

let width = 0;
let height = 0;

let time = 0;

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
// Курсор
// ==========================================

const mouse = {

    x: width / 2,
    y: height / 2,

    targetX: width / 2,
    targetY: height / 2,

    active: false,
    strength: 0

};


// Отслеживаем движение курсора

window.addEventListener("pointermove", (event) => {

    mouse.targetX = event.clientX;
    mouse.targetY = event.clientY;

    mouse.active = true;

});


// Плавное исчезновение при уходе курсора

window.addEventListener("pointerleave", () => {

    mouse.active = false;

});


// ==========================================
// 3D-деформация точки
// ==========================================

function distortPoint(x, y) {

    // Расстояние от точки до центра вихря

    const dx = x - mouse.x;
    const dy = y - mouse.y;

    const distance = Math.sqrt(dx * dx + dy * dy);


    // Радиус воздействия с плавным затуханием

    const normalizedDistance =
        Math.min(distance / settings.influenceRadius, 1);

    const falloff = Math.pow(
        1 - normalizedDistance,
        2
    );

    const influence = falloff * mouse.strength;


    // ======================================
    // 1. Вращение вокруг курсора
    // ======================================

    const phase =
        distance * settings.waveFrequency -
        time * settings.waveSpeed;

    const rotation =
        settings.twistStrength * influence;

    // Поворачиваем точку вокруг эпицентра

    const cos = Math.cos(rotation);
    const sin = Math.sin(rotation);

    const rotatedX = dx * cos - dy * sin;
    const rotatedY = dx * sin + dy * cos;


    // ======================================
    // 2. Вертикальная деформация
    // ======================================

    const wave =
        Math.sin(phase) *
        settings.waveAmplitude *
        influence;

    // Имитация высоты поверхности

    const z =
        settings.heightStrength * influence +
        wave;


    // ======================================
    // 3. Перспективная проекция
    // ======================================

    const perspective =
        settings.perspective /
        (settings.perspective - z);

    // Применяем перспективу

    const projectedX =
        mouse.x + rotatedX * perspective;

    const projectedY =
        mouse.y + rotatedY * perspective;


    // ======================================
    // 4. Возвращаем координаты
    // ======================================

    return {

        x: projectedX,
        y: projectedY

    };

}


// ==========================================
// Отрисовка сетки
// ==========================================

function drawMesh() {

    ctx.clearRect(0, 0, width, height);

    ctx.strokeStyle = settings.color;
    ctx.lineWidth = settings.lineWidth;
    ctx.globalAlpha = settings.opacity;


    // Плавное перемещение эпицентра

    mouse.x +=
        (mouse.targetX - mouse.x) *
        settings.mouseSmoothness;

    mouse.y +=
        (mouse.targetY - mouse.y) *
        settings.mouseSmoothness;


    // Плавное появление и исчезновение вихря

    const targetStrength = mouse.active ? 1 : 0;

    mouse.strength +=
        (targetStrength - mouse.strength) *
        settings.fadeSpeed;


    // Обновление времени

    time += 0.016;


    // Количество линий

    const columns =
        Math.ceil(width / settings.spacing) + 1;

    const rows =
        Math.ceil(height / settings.spacing) + 1;


    // ======================================
    // Вертикальные линии
    // ======================================

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


    // ======================================
    // Горизонтальные линии
    // ======================================

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
// Запуск
// ==========================================

drawMesh();

