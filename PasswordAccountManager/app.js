//login feature
document.getElementById('login-button').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Example hardcoded credentials
    const correctUsername = 'admin';
    const correctPassword = '123';

    // Error message display
    const errorMessage = document.getElementById('error-message');

    // Validate credentials
    if (username === correctUsername && password === correctPassword) {
        errorMessage.style.display = 'none';
        
        // Redirect to index.html
        window.location.href = 'index.html';  // This will navigate to the index.html page
    } else {
        errorMessage.style.display = 'block';
    }
});


//password management feature
// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('password-form');
    const passwordList = document.getElementById('password-list');

    // Load passwords from localStorage
    const loadPasswords = () => {
        const savedPasswords = JSON.parse(localStorage.getItem('passwords')) || [];
        passwordList.innerHTML = ''; // Clear current list
        savedPasswords.forEach((password, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                Site: ${password.site}, Username: ${password.username}, Password: ${password.password}
                <button onclick="deletePassword(${index})">Delete</button>
            `;
            passwordList.appendChild(li);
        });
    };

    // Save a new password
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const site = document.getElementById('site').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Get existing passwords from localStorage
        const savedPasswords = JSON.parse(localStorage.getItem('passwords')) || [];

        // Add the new password to the list
        savedPasswords.push({ site, username, password });

        // Save the updated list back to localStorage
        localStorage.setItem('passwords', JSON.stringify(savedPasswords));

        // Clear form fields
        form.reset();

        // Reload the password list
        loadPasswords();
    });

    // Initial load of passwords when the page is ready
    loadPasswords();
});


// Function to delete a password
function deletePassword(index) {
    // Get existing passwords from localStorage
    const savedPasswords = JSON.parse(localStorage.getItem('passwords')) || [];

    // Remove the password at the given index
    savedPasswords.splice(index, 1);

    // Save the updated list back to localStorage
    localStorage.setItem('passwords', JSON.stringify(savedPasswords));

    // Reload the password list
    loadPasswords();
}


// generate a password feature
function generatePassword() {
    const length = parseInt(document.getElementById('password-length').value);
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<>?";
    let password = "";

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }

    // Display the generated password in the password output area
    document.getElementById('generated-password').textContent = password;
}


//password strength checker
document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password-checker'); 
    const checkButton = document.getElementById('check-btn');

    // Regular expressions for validation
    const regex = {
        length: /^.{8,}$/, // At least 8 characters
        uppercase: /[A-Z]/, // At least one uppercase letter
        lowercase: /[a-z]/, // At least one lowercase letter
        digit: /\d/, // At least one number
        special: /[!@#$%^&+=]/, // At least one special character
    };

    // Function to update the strength indicator
    function updateStrengthIndicator() {
        const password = passwordInput.value;

        // Check each condition and update the class accordingly
        document.getElementById('length').className = regex.length.test(password) ? 'valid' : 'invalid';
        document.getElementById('uppercase').className = regex.uppercase.test(password) ? 'valid' : 'invalid';
        document.getElementById('lowercase').className = regex.lowercase.test(password) ? 'valid' : 'invalid';
        document.getElementById('digit').className = regex.digit.test(password) ? 'valid' : 'invalid';
        document.getElementById('special').className = regex.special.test(password) ? 'valid' : 'invalid';
    }

    // Event listener for the check button to validate password on click
    checkButton.addEventListener('click', updateStrengthIndicator);
});


//darkmode feature, changes the buttons href each time the button is pressed allowing to use two different CCS files to switch through. Creating a darkmode feature
function darkmode(){
    var theme = document.getElementById('theme');
    var themeName = theme.getAttribute('href');
    if (themeName == 'styles.css') {
        theme.setAttribute('href', 'darkmode.css');
        localStorage.setItem('theme', 'dark');
    } else {
        theme.setAttribute('href', 'styles.css');
        localStorage.setItem('theme', 'light');
    }
}

