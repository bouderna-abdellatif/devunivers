/**
 * Devunivers Website JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Header Scroll Effect
    const header = document.querySelector('header');
    const scrollWatcher = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', scrollWatcher);
    scrollWatcher(); // Check initial state
    
    // Accordion Functionality
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    if (accordionItems.length > 0) {
        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            header.addEventListener('click', () => {
                // Close all other accordions
                accordionItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current accordion
                item.classList.toggle('active');
            });
        });
        
        // Open first accordion by default
        if (accordionItems[0]) {
            accordionItems[0].classList.add('active');
        }
    }
    
    // Portfolio Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    if (filterButtons.length > 0 && projectItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');
                
                // Filter projects
                projectItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Portfolio Modal
    const viewProjectButtons = document.querySelectorAll('.view-project');
    
    if (viewProjectButtons.length > 0) {
        viewProjectButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const targetModal = document.querySelector(button.getAttribute('href'));
                
                if (targetModal) {
                    targetModal.classList.add('open');
                    document.body.style.overflow = 'hidden';
                    
                    // Close modal when clicking the close button
                    const closeButton = targetModal.querySelector('.close-modal');
                    if (closeButton) {
                        closeButton.addEventListener('click', () => {
                            targetModal.classList.remove('open');
                            document.body.style.overflow = '';
                        });
                    }
                    
                    // Close modal when clicking outside the content
                    targetModal.addEventListener('click', (e) => {
                        if (e.target === targetModal) {
                            targetModal.classList.remove('open');
                            document.body.style.overflow = '';
                        }
                    });
                }
            });
        });
    }

    // Carousels (device screenshots)
    const carousels = document.querySelectorAll('.device-carousel');
    carousels.forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
        const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
        const prevBtn = carousel.querySelector('.carousel-arrow.prev');
        const nextBtn = carousel.querySelector('.carousel-arrow.next');
        const dots = Array.from(carousel.querySelectorAll('.carousel-dots .dot'));
        let index = 0;

        const update = () => {
            const offset = -index * 100;
            track.style.transform = `translateX(${offset}%)`;
            prevBtn.disabled = index === 0;
            nextBtn.disabled = index === slides.length - 1;
            dots.forEach((d,i)=> d.classList.toggle('active', i===index));
        };

        prevBtn.addEventListener('click', () => { if(index>0){ index--; update(); } });
        nextBtn.addEventListener('click', () => { if(index < slides.length-1){ index++; update(); } });
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const i = parseInt(dot.getAttribute('data-index'));
                if(!isNaN(i)) { index = i; update(); }
            });
        });

        // Keyboard accessibility when modal open
        carousel.addEventListener('keydown', (e) => {
            if(e.key === 'ArrowLeft'){ prevBtn.click(); }
            if(e.key === 'ArrowRight'){ nextBtn.click(); }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // If mobile menu is open, close it
                if (mainNav.classList.contains('active')) {
                    mobileMenuToggle.classList.remove('active');
                    mainNav.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            }
        });
    });
    
    // Form Validation
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        const formAction = (contactForm.getAttribute('action') || '').trim();
        const usesDemoHandler = formAction === '' || formAction === '#' || formAction.startsWith('javascript:');

        if (usesDemoHandler) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Basic validation
                let valid = true;
                const requiredFields = contactForm.querySelectorAll('[required]');
                
                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        valid = false;
                        field.classList.add('error');
                    } else {
                        field.classList.remove('error');
                    }
                    
                    // Email validation
                    if (field.type === 'email' && field.value.trim()) {
                        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailPattern.test(field.value)) {
                            valid = false;
                            field.classList.add('error');
                        }
                    }
                });
                
                if (valid) {
                    // In a real implementation, you would send the form data to a server
                    // For this example, we'll just show a success message
                    const formElements = contactForm.elements;
                    for (let i = 0; i < formElements.length; i++) {
                        if (formElements[i].type !== 'submit') {
                            formElements[i].value = '';
                        }
                    }
                    
                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'form-success';
                    successMessage.innerHTML = '<p>Thank you for your message! We\'ll get back to you shortly.</p>';
                    
                    contactForm.parentNode.insertBefore(successMessage, contactForm);
                    contactForm.style.display = 'none';
                    
                    // Scroll to success message
                    successMessage.scrollIntoView({ behavior: 'smooth' });
                }
            });

            // Remove error class on input
            contactForm.querySelectorAll('input, textarea, select').forEach(field => {
                field.addEventListener('input', function() {
                    this.classList.remove('error');
                });
            });
        }
    }
    
    // Testimonial Carousel Auto Scroll
    const testimonialCarousel = document.querySelector('.testimonials-carousel');
    
    if (testimonialCarousel) {
        const testimonialCards = testimonialCarousel.querySelectorAll('.testimonial-card');
        if (testimonialCards.length > 1) {
            let currentIndex = 0;
            const cardWidth = testimonialCards[0].offsetWidth + 30; // width + gap
            
            setInterval(() => {
                currentIndex = (currentIndex + 1) % testimonialCards.length;
                testimonialCarousel.scrollTo({
                    left: currentIndex * cardWidth,
                    behavior: 'smooth'
                });
            }, 5000);
        }
    }
    
    // Current year for copyright
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement && yearElement.textContent.includes('2025')) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = yearElement.textContent.replace('2025', currentYear);
    }
    
    // Newsletter form
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    if (newsletterForms.length > 0) {
        newsletterForms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const emailInput = form.querySelector('input[type="email"]');
                if (emailInput && emailInput.value.trim()) {
                    // In a real implementation, you would send the email to a server
                    // For this example, we'll just show a success message
                    const successMessage = document.createElement('p');
                    successMessage.className = 'newsletter-success';
                    successMessage.textContent = 'Thank you for subscribing to our newsletter!';
                    
                    form.style.display = 'none';
                    form.parentNode.insertBefore(successMessage, form.nextSibling);
                }
            });
        });
    }
    
    // Comment form
    const commentForm = document.querySelector('.comment-form form');
    
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            let valid = true;
            const requiredFields = commentForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    valid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
                
                // Email validation
                if (field.type === 'email' && field.value.trim()) {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(field.value)) {
                        valid = false;
                        field.classList.add('error');
                    }
                }
            });
            
            if (valid) {
                // In a real implementation, you would send the comment to a server
                // For this example, we'll just show a success message
                const successMessage = document.createElement('div');
                successMessage.className = 'comment-success';
                successMessage.innerHTML = '<p>Thank you for your comment! It will appear after moderation.</p>';
                
                commentForm.parentNode.insertBefore(successMessage, commentForm);
                commentForm.style.display = 'none';
            }
        });
        
        // Remove error class on input
        commentForm.querySelectorAll('input, textarea').forEach(field => {
            field.addEventListener('input', function() {
                this.classList.remove('error');
            });
        });
    }
    
    // Reply buttons
    const replyButtons = document.querySelectorAll('.reply-btn');
    
    if (replyButtons.length > 0) {
        replyButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                const commentForm = document.querySelector('.comment-form');
                if (commentForm) {
                    // Scroll to comment form
                    commentForm.scrollIntoView({ behavior: 'smooth' });
                    
                    // Focus on the first input
                    const firstInput = commentForm.querySelector('input[type="text"]');
                    if (firstInput) {
                        firstInput.focus();
                    }
                }
            });
        });
    }
});