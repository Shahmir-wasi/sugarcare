document.addEventListener('DOMContentLoaded', function() {
    // Toggle sidebar on mobile
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });

    // Initialize charts
    initGlucoseChart();
    initMedicationChart();

    // User dropdown
    const userDropdown = document.querySelector('.user-dropdown');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    
    userDropdown.addEventListener('click', function(e) {
        e.stopPropagation();
        dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
        dropdownMenu.style.display = 'none';
    });

    // Navigation between sections
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    const sections = document.querySelectorAll('.dashboard-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(l => l.parentElement.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked link and corresponding section
            this.parentElement.classList.add('active');
            const sectionId = this.getAttribute('href');
            document.querySelector(sectionId).classList.add('active');
            
            // Update page title
            document.querySelector('.page-title').textContent = this.querySelector('span').textContent;
            
            // Close sidebar on mobile
            if (window.innerWidth < 992) {
                sidebar.classList.remove('active');
            }
        });
    });

    // Initialize Glucose Chart
    function initGlucoseChart() {
        const ctx = document.getElementById('glucoseChart').getContext('2d');
        
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

    // Initialize Medication Chart
    function initMedicationChart() {
        const ctx = document.getElementById('medicationChart').getContext('2d');
        
        window.medicationChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Taken', 'Missed', 'Pending'],
                datasets: [{
                    data: [85, 5, 10],
                    backgroundColor: [
                        '#50c878',
                        '#e74c3c',
                        '#f39c12'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                    }
                }
            }
        });
    }

    // Period selector for charts
    const periodSelectors = document.querySelectorAll('.chart-period');
    periodSelectors.forEach(selector => {
        selector.addEventListener('change', function() {
            // In a real app, this would fetch new data based on the selected period
            alert('Data would be refreshed for ' + this.value + ' days');
        });
    });
});