document.addEventListener('DOMContentLoaded', function() {
    // Toggle sidebar on mobile
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });

    // Initialize charts
    initPatientsGlucoseChart();
    initAppointmentsChart();

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

            // Initialize charts when switching to relevant tabs
            if (sectionId === '#overview') {
                initPatientsGlucoseChart();
                initAppointmentsChart();
            }
        });
    });

    // Initialize Patients Glucose Chart
    function initPatientsGlucoseChart() {
        const ctx = document.getElementById('patientsGlucoseChart').getContext('2d');
        
        // Destroy previous chart instance if exists
        if (window.patientsGlucoseChart instanceof Chart) {
            window.patientsGlucoseChart.destroy();
        }
        
        window.patientsGlucoseChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                datasets: [
                    {
                        label: 'Average Fasting Glucose',
                        data: [112, 108, 105, 102],
                        borderColor: '#4a90e2',
                        backgroundColor: 'rgba(74, 144, 226, 0.1)',
                        borderWidth: 2,
                        tension: 0.3,
                        fill: true
                    },
                    {
                        label: 'Average Post-Meal Glucose',
                        data: [158, 152, 145, 142],
                        borderColor: '#50c878',
                        backgroundColor: 'rgba(80, 200, 120, 0.1)',
                        borderWidth: 2,
                        tension: 0.3,
                        fill: true
                    },
                    {
                        label: 'Highest Reading',
                        data: [180, 175, 168, 162],
                        borderColor: '#e74c3c',
                        backgroundColor: 'rgba(231, 76, 60, 0.1)',
                        borderWidth: 2,
                        tension: 0.3,
                        fill: false,
                        borderDash: [5, 5]
                    }
                ]
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

    // Initialize Appointments Chart
    function initAppointmentsChart() {
        const ctx = document.getElementById('appointmentsChart').getContext('2d');
        
        // Destroy previous chart instance if exists
        if (window.appointmentsChart instanceof Chart) {
            window.appointmentsChart.destroy();
        }
        
        window.appointmentsChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                datasets: [{
                    label: 'Scheduled Appointments',
                    data: [8, 10, 7, 12, 9, 4],
                    backgroundColor: 'rgba(74, 144, 226, 0.7)',
                    borderColor: '#4a90e2',
                    borderWidth: 1
                }, {
                    label: 'Completed Appointments',
                    data: [7, 9, 6, 10, 8, 3],
                    backgroundColor: 'rgba(80, 200, 120, 0.7)',
                    borderColor: '#50c878',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 2
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top',
                    }
                }
            }
        });
    }

    // Patient status filter
    const statusFilter = document.querySelector('.status-filter');
    if (statusFilter) {
        statusFilter.addEventListener('change', function() {
            const status = this.value;
            const rows = document.querySelectorAll('.patients-table tbody tr');
            
            rows.forEach(row => {
                if (status === 'all' || row.querySelector('.status').classList.contains(status)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }

    // Period selector for charts
    const periodSelectors = document.querySelectorAll('.chart-period');
    periodSelectors.forEach(selector => {
        selector.addEventListener('change', function() {
            // In a real app, this would fetch new data based on the selected period
            console.log('Data would be refreshed for selected period:', this.value);
            
            // Update charts with new data
            if (this.closest('.chart-card').querySelector('#patientsGlucoseChart')) {
                initPatientsGlucoseChart();
            } else if (this.closest('.chart-card').querySelector('#appointmentsChart')) {
                initAppointmentsChart();
            }
        });
    });

    // Patient search functionality
    const patientSearch = document.querySelector('.patient-search');
    if (patientSearch) {
        patientSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const rows = document.querySelectorAll('.patients-table tbody tr');
            
            rows.forEach(row => {
                const patientName = row.querySelector('.patient-info strong').textContent.toLowerCase();
                if (patientName.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }

    // View patient details
    const viewPatientButtons = document.querySelectorAll('.btn-icon .fa-eye');
    viewPatientButtons.forEach(button => {
        button.addEventListener('click', function() {
            // In a real app, this would open a modal or navigate to patient details
            alert('Viewing patient details');
        });
    });

    // Message patient
    const messagePatientButtons = document.querySelectorAll('.btn-icon .fa-comment-medical');
    messagePatientButtons.forEach(button => {
        button.addEventListener('click', function() {
            // In a real app, this would open a messaging interface
            alert('Opening messaging interface for patient');
        });
    });
});