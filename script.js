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

    angle += 0.002;

    const x1 = 50 + Math.sin(angle) * 20;
    const y1 = 50 + Math.cos(angle) * 20;

    const x2 = 50 + Math.sin(angle * 1.3) * 25;
    const y2 = 50 + Math.cos(angle * 1.3) * 25;

    const x3 = 50 + Math.sin(angle * 0.8) * 30;
    const y3 = 50 + Math.cos(angle * 0.8) * 30;

    background.style.background = `
        radial-gradient(
            circle at ${x1}% ${y1}%,
            #F9F9F9 0%,
            transparent 45%
        ),
        radial-gradient(
            circle at ${x2}% ${y2}%,
            #EFFAF8 0%,
            transparent 45%
        ),
        radial-gradient(
            circle at ${x3}% ${y3}%,
            #FFF5F5 0%,
            transparent 45%
        ),
        radial-gradient(
            circle at ${100 - x1}% ${100 - y2}%,
            #F4F2FD 0%,
            transparent 45%
        )
    `;

    requestAnimationFrame(animateGradient);
}

// Запускаем анимацию
animateGradient();
