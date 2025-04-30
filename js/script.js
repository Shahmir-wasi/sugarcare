document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navbar = document.querySelector('.navbar');
    
    mobileMenuBtn.addEventListener('click', function() {
        navbar.classList.toggle('active');
        mobileMenuBtn.innerHTML = navbar.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.navbar ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navbar.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // Hero Slider
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dots .dot');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });

    // Auto slide change every 5 seconds
    let slideInterval = setInterval(nextSlide, 5000);

    // Pause auto slide on hover
    const sliderContainer = document.querySelector('.slider-container');
    sliderContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
    sliderContainer.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });

    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
    const testimonialPrev = document.querySelector('.testimonial-prev');
    const testimonialNext = document.querySelector('.testimonial-next');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        testimonialDots.forEach(dot => dot.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        testimonialDots[index].classList.add('active');
        currentTestimonial = index;
    }

    testimonialNext.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    });

    testimonialPrev.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    });

    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => showTestimonial(index));
    });

    // Dashboard Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
            
            // Initialize chart when glucose tab is active
            if (tabId === 'glucose') {
                initGlucoseChart();
            }
        });
    });

    // Form Toggles
    const addGlucoseBtn = document.getElementById('addGlucoseBtn');
    const glucoseFormContainer = document.getElementById('glucoseFormContainer');
    const cancelGlucoseBtn = document.getElementById('cancelGlucoseBtn');
    
    addGlucoseBtn.addEventListener('click', function() {
        glucoseFormContainer.style.display = 'block';
        window.scrollTo({
            top: glucoseFormContainer.offsetTop - 100,
            behavior: 'smooth'
        });
    });
    
    cancelGlucoseBtn.addEventListener('click', function() {
        glucoseFormContainer.style.display = 'none';
    });

    const addMedicationBtn = document.getElementById('addMedicationBtn');
    const medicationFormContainer = document.getElementById('medicationFormContainer');
    const cancelMedicationBtn = document.getElementById('cancelMedicationBtn');
    
    addMedicationBtn.addEventListener('click', function() {
        medicationFormContainer.style.display = 'block';
        window.scrollTo({
            top: medicationFormContainer.offsetTop - 100,
            behavior: 'smooth'
        });
    });
    
    cancelMedicationBtn.addEventListener('click', function() {
        medicationFormContainer.style.display = 'none';
    });

    const addDietExerciseBtn = document.getElementById('addDietExerciseBtn');
    const dietFormContainer = document.getElementById('dietFormContainer');
    const cancelDietExerciseBtn = document.getElementById('cancelDietExerciseBtn');
    
    addDietExerciseBtn.addEventListener('click', function() {
        dietFormContainer.style.display = 'block';
        window.scrollTo({
            top: dietFormContainer.offsetTop - 100,
            behavior: 'smooth'
        });
    });
    
    cancelDietExerciseBtn.addEventListener('click', function() {
        dietFormContainer.style.display = 'none';
    });

    const addAppointmentBtn = document.getElementById('addAppointmentBtn');
    const appointmentFormContainer = document.getElementById('appointmentFormContainer');
    const cancelAppointmentBtn = document.getElementById('cancelAppointmentBtn');
    
    addAppointmentBtn.addEventListener('click', function() {
        appointmentFormContainer.style.display = 'block';
        window.scrollTo({
            top: appointmentFormContainer.offsetTop - 100,
            behavior: 'smooth'
        });
    });
    
    cancelAppointmentBtn.addEventListener('click', function() {
        appointmentFormContainer.style.display = 'none';
    });

    const addHistoryBtn = document.getElementById('addHistoryBtn');
    const historyFormContainer = document.getElementById('historyFormContainer');
    const cancelHistoryBtn = document.getElementById('cancelHistoryBtn');
    
    addHistoryBtn.addEventListener('click', function() {
        historyFormContainer.style.display = 'block';
        window.scrollTo({
            top: historyFormContainer.offsetTop - 100,
            behavior: 'smooth'
        });
    });
    
    cancelHistoryBtn.addEventListener('click', function() {
        historyFormContainer.style.display = 'none';
    });

    const addLabResultBtn = document.getElementById('addLabResultBtn');
    const labFormContainer = document.getElementById('labFormContainer');
    const cancelLabResultBtn = document.getElementById('cancelLabResultBtn');
    
    addLabResultBtn.addEventListener('click', function() {
        labFormContainer.style.display = 'block';
        window.scrollTo({
            top: labFormContainer.offsetTop - 100,
            behavior: 'smooth'
        });
    });
    
    cancelLabResultBtn.addEventListener('click', function() {
        labFormContainer.style.display = 'none';
    });

    // Modal Toggles
    const loginBtn = document.querySelector('.login-btn');
    const registerBtn = document.querySelector('.register-btn');
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const switchToRegister = document.getElementById('switchToRegister');
    const switchToLogin = document.getElementById('switchToLogin');

    function openModal(modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeModal(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openModal(loginModal);
        });
    }

    if (registerBtn) {
        registerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openModal(registerModal);
        });
    }

    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });

    switchToRegister.addEventListener('click', function(e) {
        e.preventDefault();
        closeModal(loginModal);
        openModal(registerModal);
    });

    switchToLogin.addEventListener('click', function(e) {
        e.preventDefault();
        closeModal(registerModal);
        openModal(loginModal);
    });

    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });

    // Form Submissions
    const glucoseForm = document.getElementById('glucoseForm');
    if (glucoseForm) {
        glucoseForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would typically send data to the server
            alert('Glucose reading saved successfully!');
            this.reset();
            glucoseFormContainer.style.display = 'none';
        });
    }

    const medicationForm = document.getElementById('medicationForm');
    if (medicationForm) {
        medicationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Medication saved successfully!');
            this.reset();
            medicationFormContainer.style.display = 'none';
        });
    }

    const dietExerciseForm = document.getElementById('dietExerciseForm');
    if (dietExerciseForm) {
        dietExerciseForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Diet & exercise log saved successfully!');
            this.reset();
            dietFormContainer.style.display = 'none';
        });
    }

    const appointmentForm = document.getElementById('appointmentForm');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Appointment scheduled successfully!');
            this.reset();
            appointmentFormContainer.style.display = 'none';
        });
    }

    const historyForm = document.getElementById('historyForm');
    if (historyForm) {
        historyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Medical history entry saved successfully!');
            this.reset();
            historyFormContainer.style.display = 'none';
        });
    }

    const labResultForm = document.getElementById('labResultForm');
    if (labResultForm) {
        labResultForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Lab result saved successfully!');
            this.reset();
            labFormContainer.style.display = 'none';
        });
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }

    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for subscribing to our newsletter!');
            this.reset();
        });
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would typically send data to the server
            alert('Login successful! Redirecting to dashboard...');
            this.reset();
            closeModal(loginModal);
            // In a real app, you would redirect to the dashboard page
        });
    }

    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would typically send data to the server
            alert('Registration successful! You can now login.');
            this.reset();
            closeModal(registerModal);
            openModal(loginModal);
        });
    }

    // Initialize Glucose Chart
    function initGlucoseChart() {
        const ctx = document.getElementById('glucoseChart').getContext('2d');
        
        // Check if a chart already exists and destroy it
        if (window.glucoseChart instanceof Chart) {
            window.glucoseChart.destroy();
        }
        
        window.glucoseChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Fasting Glucose (mg/dL)',
                    data: [98, 102, 95, 110, 105, 108, 101],
                    borderColor: '#4a90e2',
                    backgroundColor: 'rgba(74, 144, 226, 0.1)',
                    borderWidth: 2,
                    tension: 0.3,
                    fill: true
                }, {
                    label: 'Post-Meal Glucose (mg/dL)',
                    data: [142, 135, 148, 130, 138, 145, 132],
                    borderColor: '#50c878',
                    backgroundColor: 'rgba(80, 200, 120, 0.1)',
                    borderWidth: 2,
                    tension: 0.3,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 70,
                        max: 200,
                        ticks: {
                            stepSize: 20
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                    }
                }
            }
        });
    }

    // Initialize chart when page loads if glucose tab is active
    if (document.querySelector('.tab-btn[data-tab="glucose"].active')) {
        initGlucoseChart();
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Sticky header on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
});