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

// --- Sticky Nav on Scroll ---
document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.header-nav');
    const headerTop = document.querySelector('.header-top');

    if (!nav || !headerTop) return;

    const navHeight = nav.offsetHeight;
    const stickyPoint = headerTop.offsetHeight;
    let isSticky = false;

    function handleStickyNav() {
        if (window.pageYOffset > stickyPoint) {
            if (!isSticky) {
                document.body.style.paddingTop = navHeight + 'px';
                nav.classList.add('sticky');
                isSticky = true;
            }
        } else {
            if (isSticky) {
                document.body.style.paddingTop = '0';
                nav.classList.remove('sticky');
                isSticky = false;
            }
        }
    }
    
    window.addEventListener('scroll', handleStickyNav);
});

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
        // Only consider gap if more than one card is visible
        if (cardsVisible > 1) {
             gridGap = parseInt(window.getComputedStyle(servicesGrid).getPropertyValue('gap'));
        }

        const slideDistance = cardWidth + gridGap;
        const offset = -currentIndex * slideDistance;
        
        servicesGrid.style.transform = `translateX(${offset}px)`;

        prevArrow.disabled = currentIndex === 0;
        nextArrow.disabled = currentIndex >= (cards.length - cardsVisible);
    }

    nextArrow.addEventListener('click', () => {
        let cardsVisible = getCardsVisible();
        if (currentIndex < (cards.length - cardsVisible)) {
            currentIndex++;
            updateSlider();
        }
    });

    prevArrow.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
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

    slides.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.addEventListener('click', () => showSlide(i));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.testimonial-dots .dot');

    const showSlide = (index) => {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        currentSlide = index;
    };

    const nextSlide = () => {
        const newIndex = (currentSlide + 1) % slides.length;
        showSlide(newIndex);
    };

    const prevSlide = () => {
        const newIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(newIndex);
    };

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    showSlide(0);
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

// --- Mobile Gallery Slider ---
document.addEventListener('DOMContentLoaded', () => {
    const sliderContainer = document.querySelector('.gallery-slider-container');
    if (!sliderContainer) return;

    const track = sliderContainer.querySelector('.gallery-grid');
    const items = track.querySelectorAll('.gallery-item');
    const prevBtn = sliderContainer.querySelector('.gallery-arrow.prev');
    const nextBtn = sliderContainer.querySelector('.gallery-arrow.next');
    
    if (!track || !prevBtn || !nextBtn || items.length <= 1) {
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
        return;
    }

    let currentIndex = 0;

    const updateSliderPosition = () => {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
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
    
    updateArrows();
});

// Services dropdown
document.addEventListener('DOMContentLoaded', () => {
    const servicesDropdown = document.querySelector('.dropdown');
    if (servicesDropdown) {
        const dropdownToggle = servicesDropdown.querySelector('a');
        const dropdownMenu = servicesDropdown.querySelector('.dropdown-menu');

        // Ensure dropdown is closed initially
        dropdownMenu.classList.remove('show');

        dropdownToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Close all other dropdowns first
            document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
                if (menu !== dropdownMenu) {
                    menu.classList.remove('show');
                }
            });
            
            // Toggle current dropdown
            dropdownMenu.classList.toggle('show');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!servicesDropdown.contains(e.target)) {
                dropdownMenu.classList.remove('show');
            }
        });

        // Close dropdown when pressing Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                dropdownMenu.classList.remove('show');
            }
        });

        // Close dropdown when clicking on dropdown menu items
        dropdownMenu.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                dropdownMenu.classList.remove('show');
            }
        });
    }
});

// Modal functionality
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('successModal');
    const closeBtn = document.querySelector('.modal .close');

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// Contact form submission
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Here you could send the data to server, but for now just show modal
            const modal = document.getElementById('successModal');
            if (modal) {
                modal.style.display = 'block';
            }
            contactForm.reset();
        });
    }
});
