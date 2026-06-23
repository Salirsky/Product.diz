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
    #EFFAF4 0%, 
    transparent 45% 
    ), 
    
    radial-gradient( 
    circle at ${x3}% ${y3}%, 
    #FFEEE8 0%, transparent 45% 
    ), 
    
    radial-gradient( 
    circle at 80% 20%, 
    #FAF4E6 0%, 
    transparent 45% 
    ), 
    
    radial-gradient( 
    circle at 15% 80%, 
    #F9FAEA 0%, 
    transparent 45% 
    ), 
    
    radial-gradient( 
    circle at 80% 80%, 
    #F3FAEA 0%, 
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
