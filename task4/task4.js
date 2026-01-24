document.getElementById("registrationForm").addEventListener("submit", function(e) {
  e.preventDefault(); // prevent form submission until validation passes

  let valid = true;

  // Name validation
  const name = document.getElementById("name").value.trim();
  if (!/^[A-Za-z\s]+$/.test(name)) {
    document.getElementById("nameError").textContent = "Name must contain only alphabets.";
    valid = false;
  } else {
    document.getElementById("nameError").textContent = "";
  }

  // Email validation
  const email = document.getElementById("email").value.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    document.getElementById("emailError").textContent = "Invalid email format.";
    valid = false;
  } else {
    document.getElementById("emailError").textContent = "";
  }

  // Password validation
  const password = document.getElementById("password").value;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
  if (!passwordRegex.test(password)) {
    document.getElementById("passwordError").textContent = "Password must be 8+ chars, include uppercase, lowercase, number, and special char.";
    valid = false;
  } else {
    document.getElementById("passwordError").textContent = "";
  }

  // Date of Birth validation (must be 18+)
  const dob = new Date(document.getElementById("dob").value);
  const today = new Date();
  const age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  if (age < 18) {
    document.getElementById("dobError").textContent = "You must be at least 18 years old.";
    valid = false;
  } else {
    document.getElementById("dobError").textContent = "";
  }

  // Phone validation
  const phone = document.getElementById("phone").value.trim();
  if (!/^\d{10}$/.test(phone)) {
    document.getElementById("phoneError").textContent = "Phone must be exactly 10 digits.";
    valid = false;
  } else {
    document.getElementById("phoneError").textContent = "";
  }

  // If all validations pass
  if (valid) {
    alert("Form submitted successfully!");
    // Here you can send data to server
  }
});

// Real-time password strength indicator
document.getElementById("password").addEventListener("input", function() {
  const password = this.value;
  let strength = "Weak";

  // Custom rule using Math object: score based on length and variety
  let score = 0;
  score += Math.min(2, Math.floor(password.length / 4)); // length factor
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[@$!%*?&]/.test(password)) score++;

  if (score >= 5) strength = "Strong";
  else if (score >= 3) strength = "Medium";

  document.getElementById("strength").textContent = "Password Strength: " + strength;
});
