/* ==========================================================================
   ANTARES ADULTO MAYOR - INTERACTIVE JAVASCRIPT LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* --------------------------------------------------------------------------
       1. MOBILE MENU TOGGLE & NAVIGATION
       -------------------------------------------------------------------------- */
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });

        // Close menu when clicking any nav link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });
    }

    /* --------------------------------------------------------------------------
       2. ACTIVE NAV LINK ON SCROLL & STICKY HEADER
       -------------------------------------------------------------------------- */
    const sections = document.querySelectorAll('section[id]');
    const mainHeader = document.getElementById('mainHeader');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        // Sticky Header shadow state
        if (scrollY > 50) {
            mainHeader.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.12)';
        } else {
            mainHeader.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';
        }

        // Active link update
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector(`.nav-menu a[href*=${sectionId}]`)?.classList.add('active');
            } else {
                document.querySelector(`.nav-menu a[href*=${sectionId}]`)?.classList.remove('active');
            }
        });
    });

    /* --------------------------------------------------------------------------
       3. ROOMS CAROUSEL SLIDER LOGIC
       -------------------------------------------------------------------------- */
    const roomSlides = document.querySelectorAll('.room-slide');
    const prevRoomBtn = document.getElementById('prevRoomBtn');
    const nextRoomBtn = document.getElementById('nextRoomBtn');
    const roomDotsContainer = document.getElementById('roomDots');

    let currentRoomSlide = 0;
    const totalRoomSlides = roomSlides.length;

    if (roomDotsContainer && totalRoomSlides > 0) {
        roomDotsContainer.innerHTML = '';
        for (let i = 0; i < totalRoomSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('room-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => showRoomSlide(i));
            roomDotsContainer.appendChild(dot);
        }
    }

    function showRoomSlide(index) {
        if (!roomSlides.length) return;
        roomSlides.forEach(slide => slide.classList.remove('active'));
        currentRoomSlide = (index + totalRoomSlides) % totalRoomSlides;
        roomSlides[currentRoomSlide].classList.add('active');

        const dots = document.querySelectorAll('.room-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentRoomSlide);
        });
    }

    if (prevRoomBtn && nextRoomBtn) {
        prevRoomBtn.addEventListener('click', () => showRoomSlide(currentRoomSlide - 1));
        nextRoomBtn.addEventListener('click', () => showRoomSlide(currentRoomSlide + 1));
    }

    // Auto rotate rooms carousel every 5 seconds
    setInterval(() => {
        showRoomSlide(currentRoomSlide + 1);
    }, 5000);

    /* --------------------------------------------------------------------------
       4. ANIMATED NUMERIC COUNTERS (Intersection Observer)
       -------------------------------------------------------------------------- */
    const counters = document.querySelectorAll('.counter');
    let animated = false;

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const speed = 200; // Duration factor
                    const increment = target / speed;

                    let count = 0;
                    const updateCount = () => {
                        count += Math.ceil(target / 40);
                        if (count < target) {
                            counter.innerText = count;
                            setTimeout(updateCount, 40);
                        } else {
                            counter.innerText = target;
                        }
                    };

                    updateCount();
                });
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.getElementById('estadisticas');
    if (statsSection) {
        counterObserver.observe(statsSection);
    }

    /* --------------------------------------------------------------------------
       5. TESTIMONIALS SLIDER
       -------------------------------------------------------------------------- */
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    const sliderDots = document.getElementById('sliderDots');

    let currentTestimonial = 0;
    const totalTestimonials = testimonialCards.length;

    // Create pagination dots
    if (sliderDots && totalTestimonials > 0) {
        sliderDots.innerHTML = '';
        for (let i = 0; i < totalTestimonials; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => showTestimonial(i));
            sliderDots.appendChild(dot);
        }
    }

    function showTestimonial(index) {
        testimonialCards.forEach((card, i) => {
            card.classList.remove('active');
        });
        
        currentTestimonial = (index + totalTestimonials) % totalTestimonials;
        testimonialCards[currentTestimonial].classList.add('active');

        // Update dots
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentTestimonial);
        });
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => showTestimonial(currentTestimonial - 1));
        nextBtn.addEventListener('click', () => showTestimonial(currentTestimonial + 1));
    }

    // Auto-advance testimonials every 6 seconds
    setInterval(() => {
        showTestimonial(currentTestimonial + 1);
    }, 6000);

    /* --------------------------------------------------------------------------
       6. REVEAL ANIMATIONS ON SCROLL
       -------------------------------------------------------------------------- */
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));

    /* --------------------------------------------------------------------------
       7. RECORRIDO / TOUR MODAL FUNCTIONALITY & WHATSAPP GENERATOR
       -------------------------------------------------------------------------- */
    const tourModal = document.getElementById('tourModal');
    const openTourBtn = document.getElementById('openTourModal');
    const closeTourBtn = document.getElementById('closeTourModal');
    const tourForm = document.getElementById('tourForm');
    const tourDateInput = document.getElementById('tourDate');
    const tourInterestSelect = document.getElementById('tourInterest');

    // Default min date to tomorrow
    if (tourDateInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tourDateInput.min = tomorrow.toISOString().split('T')[0];
        tourDateInput.value = tomorrow.toISOString().split('T')[0];
    }

    window.openTourModalFunc = function() {
        if (tourModal) {
            tourModal.classList.add('active');
        }
    };

    if (openTourBtn) {
        openTourBtn.addEventListener('click', () => openTourModalFunc());
    }

    if (closeTourBtn) {
        closeTourBtn.addEventListener('click', () => {
            tourModal.classList.remove('active');
        });
    }

    // Close modal when clicking background overlay
    if (tourModal) {
        tourModal.addEventListener('click', (e) => {
            if (e.target === tourModal) {
                tourModal.classList.remove('active');
            }
        });
    }

    // Form submission -> Formats WhatsApp Message directly
    if (tourForm) {
        tourForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('tourName').value;
            const phone = document.getElementById('tourPhone').value;
            const date = document.getElementById('tourDate').value;
            const time = document.getElementById('tourTime').value;

            const message = `¡Hola Antares Adulto Mayor! 👋%0A%0AMi nombre es *${name}* y quisiera agendar un recorrido presencial por sus instalaciones en Manizales.%0A%0A🗓️ *Fecha deseada:* ${date}%0A⏰ *Horario preferido:* ${time}%0A📞 *Contacto:* ${phone}%0A%0AQuedo atento a su confirmación. ¡Muchas gracias!`;

            const whatsappUrl = `https://wa.me/573186109411?text=${message}`;

            // Open WhatsApp in new tab
            window.open(whatsappUrl, '_blank');

            // Close modal
            tourModal.classList.remove('active');
            tourForm.reset();
        });
    }
});
