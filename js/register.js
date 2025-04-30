document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    const userTypeSelect = document.getElementById('userType');
    const patientFields = document.querySelector('.patient-fields');
    const doctorFields = document.querySelector('.doctor-fields');
    const passwordInput = document.getElementById('registerPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const passwordStrengthBars = document.querySelectorAll('.strength-bar');
    const strengthText = document.querySelector('.strength-text span');
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');

    // Show/hide password fields
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.replace('fa-eye-slash', 'fa-eye');
            }
        });
    });

    // Show relevant fields based on user type
    userTypeSelect.addEventListener('change', function() {
        const userType = this.value;
        
        // Hide all fields first
        patientFields.style.display = 'none';
        doctorFields.style.display = 'none';
        
        // Show relevant fields
        if (userType === 'patient') {
            patientFields.style.display = 'block';
        } else if (userType === 'doctor') {
            doctorFields.style.display = 'block';
        }
    });

    // Password strength checker
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        let strength = 0;
        
        // Length check
        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        
        // Contains numbers
        if (/\d/.test(password)) strength++;
        
        // Contains special chars
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
        
        // Contains both lower and upper case
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        
        // Update strength meter
        passwordStrengthBars.forEach((bar, index) => {
            bar.classList.remove('active');
            if (index < strength) {
                bar.classList.add('active');
            }
        });
        
        // Update strength text
        let strengthLevel = '';
        if (strength <= 2) {
            strengthLevel = 'Weak';
            strengthText.style.color = '#e74c3c';
        } else if (strength <= 4) {
            strengthLevel = 'Medium';
            strengthText.style.color = '#f39c12';
        } else {
            strengthLevel = 'Strong';
            strengthText.style.color = '#2ecc71';
        }
        strengthText.textContent = strengthLevel;
    });

    // Form validation
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic validation
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        
        if (!document.getElementById('agreeTerms').checked) {
            alert('You must agree to the terms and conditions');
            return;
        }
        
        // Collect form data
        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            username: document.getElementById('registerUsername').value,
            password: password,
            userType: userTypeSelect.value,
            // Add other fields based on user type
        };
        
        // Add patient-specific fields if patient
        if (userTypeSelect.value === 'patient') {
            formData.dob = document.getElementById('dob').value;
            formData.gender = document.getElementById('gender').value;
            formData.diabetesType = document.getElementById('diabetesType').value;
        }
        
        // Add doctor-specific fields if doctor
        if (userTypeSelect.value === 'doctor') {
            formData.licenseNumber = document.getElementById('licenseNumber').value;
            formData.specialization = document.getElementById('specialization').value;
            formData.hospital = document.getElementById('hospital').value;
        }
        
        // In a real app, you would send this data to your backend
        console.log('Registration data:', formData);
        
        // Simulate registration success
        alert('Registration successful! Redirecting to login...');
        window.location.href = 'login.html';
    });

    // Social login buttons
    document.querySelector('.google-btn').addEventListener('click', function(e) {
        e.preventDefault();
        alert('Google registration would be implemented here');
    });
    
    document.querySelector('.facebook-btn').addEventListener('click', function(e) {
        e.preventDefault();
        alert('Facebook registration would be implemented here');
    });
});