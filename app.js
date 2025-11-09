
//courosel slide view
document.querySelectorAll('.carousel').forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');
    const cards = carousel.querySelectorAll('.destination-card');
    let index = 0;

    const cardsToShow = 3; // Show 3 cards at a time
    const totalCards = cards.length;

    function updateCarousel() {
        const cardWidth = cards[0].offsetWidth + 24; // width + gap
        track.style.transform = `translateX(-${index * cardWidth}px)`;
    }

    nextBtn.addEventListener('click', () => {
        if (index < totalCards - cardsToShow) index++;
        else index = 0; // loop back
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        if (index > 0) index--;
        else index = totalCards - cardsToShow;
        updateCarousel();
    });

    window.addEventListener('resize', updateCarousel);
});


//review cards
document.querySelectorAll('.review-carousel').forEach(carousel => {
    const track = carousel.querySelector('.review-track');
    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');
    const cards = carousel.querySelectorAll('.review-card');
    const dotsContainer = carousel.querySelector('.review-dots');
    let index = 0;

    const cardsToShow = 3;
    const totalCards = cards.length;
    const totalSlides = Math.ceil(totalCards / cardsToShow);

    // Create dots dynamically
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('button');
        if (i === 0) dot.classList.add('active');
        dotsContainer.appendChild(dot);

        dot.addEventListener('click', () => {
            index = i * cardsToShow;
            updateCarousel();
        });
    }
    const dots = dotsContainer.querySelectorAll('button');

    function updateCarousel() {
        const cardWidth = cards[0].offsetWidth + 32; // width + gap
        track.style.transform = `translateX(-${index * cardWidth}px)`;

        // Update active dot
        dots.forEach(dot => dot.classList.remove('active'));
        dots[Math.floor(index / cardsToShow)].classList.add('active');
    }

    nextBtn.addEventListener('click', () => {
        if (index < totalCards - cardsToShow) index++;
        else index = 0;
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        if (index > 0) index--;
        else index = totalCards - cardsToShow;
        updateCarousel();
    });


    window.addEventListener('resize', updateCarousel);
});



