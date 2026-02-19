document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('track');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');

    let currentIndex = 0;
    const totalSlides = slides.length;

    // 1. FUNCIÓN DE NAVEGACIÓN
    const updateCarousel = (index) => {
        currentIndex = index;
        const percentage = -(currentIndex * (100 / totalSlides));
        track.style.transform = `translateX(${percentage}%)`;

        // Actualizar dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    };

    // 2. EVENTOS DE FLECHAS (Medición)
    btnNext.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log("Métrica: Click_Flecha_Derecha");
        let nextIndex = (currentIndex + 1) % totalSlides;
        updateCarousel(nextIndex);
    });

    btnPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log("Métrica: Click_Flecha_Izquierda");
        let prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarousel(prevIndex);
    });

    // 3. CLIC EN CADA SLIDE (Medición Independiente)
    slides.forEach((slide) => {
        slide.addEventListener('click', () => {
            const slideId = slide.getAttribute('data-index');
            const targetUrl = slide.getAttribute('data-url');

            // Aquí envías el evento a tu AdServer o Analytics
            console.log(`Métrica: Click_en_Slide_${slideId}`);
            
            // Acción de clic (Redirección)
            window.open(targetUrl, '_blank');
        });
    });
});