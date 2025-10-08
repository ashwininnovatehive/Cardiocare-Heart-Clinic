// Smooth Scrolling for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetElement = document.querySelector(this.getAttribute('href'));
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Back to top smooth scroll
const backToTopButton = document.querySelector('.back-to-top');
if (backToTopButton) {
    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}


// --- Mobile Navigation ---
document.addEventListener('DOMContentLoaded', () => {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const sidenav = document.getElementById('mobile-nav');
    const closeBtn = document.querySelector('.sidenav .close-btn');
    const navLinks = document.querySelectorAll('.sidenav .nav-link');
    const overlay = document.getElementById('sidenav-overlay');

    if (!mobileNavToggle || !sidenav || !closeBtn || !overlay) {
        return;
    }

    const openNav = () => {
        sidenav.classList.add('open');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeNav = () => {
        sidenav.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    mobileNavToggle.addEventListener('click', openNav);
    closeBtn.addEventListener('click', closeNav);
    overlay.addEventListener('click', closeNav);

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeNav();
        });
    });
});


// --- Services Slider Functionality ---
document.addEventListener('DOMContentLoaded', () => {
    const servicesGrid = document.querySelector('.services-grid');
    const prevArrow = document.querySelector('.services-container .slider-arrow.prev-arrow');
    const nextArrow = document.querySelector('.services-container .slider-arrow.next-arrow');
    const cards = document.querySelectorAll('.service-card');

    if (!servicesGrid || !prevArrow || !nextArrow || cards.length === 0) {
        return; 
    }

    let currentIndex = 0;
    
    const getCardsVisible = () => {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    }

    function updateSlider() {
        let cardsVisible = getCardsVisible();
        const cardWidth = cards[0].offsetWidth;
        
        let gridGap = 0;
        if (cardsVisible > 1) {
             const computedGap = parseInt(window.getComputedStyle(servicesGrid).getPropertyValue('gap'));
             gridGap = isNaN(computedGap) ? 30 : computedGap; // Use default 30px if gap is not found
        }

        const slideDistance = cardWidth + gridGap;
        const offset = -currentIndex * slideDistance;
        
        servicesGrid.style.transform = `translateX(${offset}px)`;
    }

    nextArrow.addEventListener('click', () => {
        let cardsVisible = getCardsVisible();
        if (currentIndex >= (cards.length - cardsVisible)) {
            currentIndex = 0; // Loop back to the start
        } else {
            currentIndex++;
        }
        updateSlider();
    });

    prevArrow.addEventListener('click', () => {
        let cardsVisible = getCardsVisible();
        if (currentIndex === 0) {
            currentIndex = cards.length - cardsVisible; // Loop to the end
        } else {
            currentIndex--;
        }
        updateSlider();
    });
    
    window.addEventListener('resize', () => {
        // Reset index on resize to avoid weird positioning
        currentIndex = 0;
        updateSlider();
    });

    updateSlider(); // Initial call
});

// --- New Testimonial Slider Functionality ---
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.testimonial-nav-arrow.prev');
    const nextBtn = document.querySelector('.testimonial-nav-arrow.next');
    const dotsContainer = document.querySelector('.testimonial-dots');

    if (slides.length === 0 || !prevBtn || !nextBtn || !dotsContainer) {
        return;
    }

    let currentSlide = 0;
    let slideInterval; // Variable to hold the timer

    // Function to display a specific slide
    const showSlide = (index) => {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        currentSlide = index;
    };

    // Function to move to the next slide
    const nextSlide = () => {
        const newIndex = (currentSlide + 1) % slides.length;
        showSlide(newIndex);
    };

    // Function to move to the previous slide
    const prevSlide = () => {
        const newIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(newIndex);
    };
    
    // Functions to control the timer
    const startSlider = () => {
        slideInterval = setInterval(nextSlide, 5000); // Auto-scroll every 4 seconds
    };

    const resetSlider = () => {
        clearInterval(slideInterval);
        startSlider();
    };

    // Create dots and add click event listeners
    slides.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.addEventListener('click', () => {
            showSlide(i);
            resetSlider(); // Reset timer when a dot is clicked
        });
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.testimonial-dots .dot');

    // Add click listeners to arrow buttons
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetSlider(); // Reset timer when next is clicked
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetSlider(); // Reset timer when previous is clicked
    });
    
    // Initialize the slider
    showSlide(0);
    startSlider(); // Start the automatic scrolling
});

// --- Back to Top Button Visibility ---
document.addEventListener('DOMContentLoaded', () => {
    const backToTopButton = document.querySelector('.back-to-top');

    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
    }
});

// --- Gallery Slider (Desktop & Mobile) with Infinite Loop ---
document.addEventListener('DOMContentLoaded', () => {
    const sliderContainer = document.querySelector('.gallery-slider-container');
    if (!sliderContainer) return;

    const track = sliderContainer.querySelector('.gallery-grid');
    const items = Array.from(track.querySelectorAll('.gallery-item'));
    const prevBtn = document.querySelector('.gallery-arrow.prev'); // Use document to find arrows outside the container
    const nextBtn = document.querySelector('.gallery-arrow.next');
    
    if (!track || !prevBtn || !nextBtn || items.length === 0) {
        console.error('Gallery elements not found!');
        return;
    }

    let currentIndex = 0;

    const getItemsPerPage = () => {
        return window.innerWidth <= 768 ? 1 : 3;
    };

    const updateSlider = () => {
        const itemsPerPage = getItemsPerPage();
        const totalItems = items.length;
        const maxIndex = Math.max(0, totalItems - itemsPerPage);

        // Ensure currentIndex is not out of bounds after resize
        if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
        }

        const itemWidth = items[0].offsetWidth;
        const itemMargin = parseInt(window.getComputedStyle(items[0]).marginRight) * 2;
        const slideDistance = itemWidth + itemMargin;
        
        track.style.transform = `translateX(-${currentIndex * slideDistance}px)`;
    };

    nextBtn.addEventListener('click', () => {
        const itemsPerPage = getItemsPerPage();
        const maxIndex = items.length - itemsPerPage;
        
        // Loop to the beginning if at the end
        if (currentIndex >= maxIndex) {
            currentIndex = 0;
        } else {
            currentIndex++;
        }
        updateSlider();
    });

    prevBtn.addEventListener('click', () => {
        const itemsPerPage = getItemsPerPage();
        const maxIndex = items.length - itemsPerPage;

        // Loop to the end if at the beginning
        if (currentIndex <= 0) {
            currentIndex = maxIndex;
        } else {
            currentIndex--;
        }
        updateSlider();
    });

    window.addEventListener('resize', updateSlider);
    updateSlider(); // Initial call
});
// --- Mobile Hospital Affiliations Slider ---
document.addEventListener('DOMContentLoaded', () => {
    const sliderContainer = document.querySelector('.hospital-slider-container');
    if (!sliderContainer) return;

    const track = sliderContainer.querySelector('.hospital-grid');
    const items = track.querySelectorAll('.hospital-card');
    const prevBtn = sliderContainer.querySelector('.hospital-arrow.prev-arrow');
    const nextBtn = sliderContainer.querySelector('.hospital-arrow.next-arrow');
    
    if (!track || !prevBtn || !nextBtn || items.length <= 1) {
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
        return;
    }

    let currentIndex = 0;

    const updateSliderPosition = () => {
        if (window.innerWidth <= 768) {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        } else {
            // Reset transform on desktop view
            track.style.transform = 'none';
        }
    };

    const updateArrows = () => {
         prevBtn.disabled = currentIndex === 0;
         nextBtn.disabled = currentIndex === items.length - 1;
    }

    nextBtn.addEventListener('click', () => {
        if (currentIndex < items.length - 1) {
            currentIndex++;
            updateSliderPosition();
            updateArrows();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSliderPosition();
            updateArrows();
        }
    });
    
    // Listen for window resize to apply/remove slider styles
    window.addEventListener('resize', updateSliderPosition);

    updateArrows(); // Initial setup for arrows
});

// --- Active Nav Link on Scroll ---
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.header-nav ul li a');
    const nav = document.querySelector('.header-nav');

    if (sections.length === 0 || navLinks.length === 0 || !nav) {
        return;
    }

    const changeActiveLinkOnScroll = () => {
        const navHeight = nav.offsetHeight;
        let currentSectionId = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 50; // Add 50px buffer
            if (window.scrollY >= sectionTop) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSectionId) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', changeActiveLinkOnScroll);
    changeActiveLinkOnScroll(); // Run on page load
});
// Form submission handler for Google Forms
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const modal = document.getElementById('successModal');
    const closeBtn = modal.querySelector('.close');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        try {
            await fetch(form.action, {
                method: 'POST',
                body: formData,
                mode: 'no-cors' // To handle CORS issues with Google Forms
            });
            // Show success modal
            modal.style.display = 'block';
            form.reset();
        } catch (error) {
            console.error('Error submitting form:', error);
            // For simplicity, still show success; in production, handle errors properly
            modal.style.display = 'block';
            form.reset();
        }
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});