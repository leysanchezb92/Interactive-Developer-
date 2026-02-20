/**
 * Main Carousel functionality for Interactive Banner.
 * Handles slide navigation, dot indicators, and interaction tracking.
 */
document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const track = document.getElementById('track');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');

    // --- State Variables ---
    let currentIndex = 0;
    const totalSlides = slides.length;

    /**
     * Updates the carousel position and visual indicators.
     * @param {number} index - The index of the slide to display.
     */
    const updateCarousel = (index) => {
        currentIndex = index;
        
        // Calculate the translation percentage based on total slides
        const percentage = -(currentIndex * (100 / totalSlides));
        track.style.transform = `translateX(${percentage}%)`;

        // Update pagination dots (active state)
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    };

    /**
     * Event Listener: Next Button.
     * Advances the carousel to the next slide (loops to the start).
     */
    btnNext.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevents triggering background click layers
        console.log("Metric: Right_Arrow_Click");
        
        let nextIndex = (currentIndex + 1) % totalSlides;
        updateCarousel(nextIndex);
    });

    /**
     * Event Listener: Previous Button.
     * Moves the carousel to the previous slide (loops to the end).
     */
    btnPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log("Metric: Left_Arrow_Click");
        
        let prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarousel(prevIndex);
    });

    /**
     * Slide Interaction Handling.
     * Tracks clicks on individual slides and redirects to specific URLs.
     */
    slides.forEach((slide) => {
        slide.addEventListener('click', () => {
            const slideId = slide.getAttribute('data-index');
            const targetUrl = slide.getAttribute('data-url');
            
            console.log(`Metric: Click_on_Slide_${slideId}`);
            window.open(targetUrl, '_blank');
        });
    });
});