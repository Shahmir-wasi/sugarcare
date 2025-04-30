document.addEventListener('DOMContentLoaded', function() {
    // Toggle sidebar on mobile
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });

    // Initialize charts
    initUserGrowthChart();
    initSystemActivityChart();

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
                initUserGrowthChart();
                initSystemActivityChart();
            }
        });
    });

    // Initialize User Growth Chart
    function initUserGrowthChart() {
        const ctx = document.getElementById('userGrowthChart').getContext('2d');
        
        // Destroy previous chart instance if exists
        if (window.userGrowthChart instanceof Chart) {
            window.userGrowthChart.destroy();
        }
        
        window.userGrowthChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                datasets: [{
                    label: 'New Patients',
                    data: [120, 135, 145, 160, 175, 190, 210],
                    backgroundColor: 'rgba(74, 144, 226, 0.7)',
                    borderColor: '#4a90e2',
                    borderWidth: 1
                }, {
                    label: 'New Doctors',
                    data: [5, 8, 6, 10, 7, 9, 12],
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
                        beginAtZero: true
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

    // Initialize System Activity Chart
    function initSystemActivityChart() {
        const ctx = document.getElementById('systemActivityChart').getContext('2d');
        
        // Destroy previous chart instance if exists
        if (window.systemActivityChart instanceof Chart) {
            window.systemActivityChart.destroy();
        }
        
        window.systemActivityChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
                datasets: [{
                    label: 'User Logins',
                    data: [5, 15, 120, 85, 110, 75, 30],
                    borderColor: '#4a90e2',
                    backgroundColor: 'rgba(74, 144, 226, 0.1)',
                    borderWidth: 2,
                    tension: 0.3,
                    fill: true
                }, {
                    label: 'API Requests',
                    data: [100, 150, 800, 650, 750, 500, 200],
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

    // Period selector for charts
    const periodSelectors = document.querySelectorAll('.chart-period');
    periodSelectors.forEach(selector => {
        selector.addEventListener('change', function() {
            // In a real app, this would fetch new data based on the selected period
            console.log('Data would be refreshed for selected period:', this.value);
            
            // Update charts with new data
            if (this.closest('.chart-card').querySelector('#userGrowthChart')) {
                initUserGrowthChart();
            } else if (this.closest('.chart-card').querySelector('#systemActivityChart')) {
                initSystemActivityChart();
            }
        });
    });

    // Quick action buttons
    const quickActions = document.querySelectorAll('.action-card');
    quickActions.forEach(action => {
        action.addEventListener('click', function(e) {
            e.preventDefault();
            const actionType = this.getAttribute('href').substring(1);
            
            // In a real app, this would navigate to the appropriate section
            switch(actionType) {
                case 'add-user':
                    alert('Opening Add New User form');
                    break;
                case 'manage-doctors':
                    alert('Navigating to Doctor Management');
                    break;
                case 'system-settings':
                    alert('Opening System Settings');
                    break;
                case 'generate-reports':
                    alert('Generating System Reports');
                    break;
            }
        });
    });

    // Sample data table functionality (for Users/Patients/Doctors sections)
    const dataTables = document.querySelectorAll('.data-table');
    if (dataTables.length > 0) {
        // Add click handlers for edit/delete buttons
        document.querySelectorAll('.btn-edit').forEach(btn => {
            btn.addEventListener('click', function() {
                const userId = this.getAttribute('data-id');
                alert(`Editing user with ID: ${userId}`);
            });
        });

        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', function() {
                const userId = this.getAttribute('data-id');
                if (confirm(`Are you sure you want to delete user with ID: ${userId}?`)) {
                    // In a real app, this would make an API call to delete the user
                    alert(`User ${userId} deleted`);
                }
            });
        });

        // Search functionality
        const searchInputs = document.querySelectorAll('.data-table-search');
        searchInputs.forEach(input => {
            input.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                const table = this.closest('.data-table-container').querySelector('table');
                const rows = table.querySelectorAll('tbody tr');
                
                rows.forEach(row => {
                    const rowText = row.textContent.toLowerCase();
                    if (rowText.includes(searchTerm)) {
                        row.style.display = '';
                    } else {
                        row.style.display = 'none';
                    }
                });
            });
        });

        // Pagination controls
        const paginationButtons = document.querySelectorAll('.pagination button');
        paginationButtons.forEach(button => {
            button.addEventListener('click', function() {
                const page = this.getAttribute('data-page');
                alert(`Loading page ${page} of results`);
            });
        });
    }

    // System notification controls
    const notificationButtons = document.querySelectorAll('.notifications button');
    notificationButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert('Showing notifications panel');
        });
    });

    // Message controls
    const messageButtons = document.querySelectorAll('.messages button');
    messageButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert('Showing messages panel');
        });
    });
});