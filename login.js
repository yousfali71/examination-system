// login validation
const form = document.getElementById("loginForm");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.getElementById("email");
  const password = document.getElementById("password");

  const emailError = document.getElementById("email-error");
  const passwordError = document.getElementById("password-error");
  const loginError = document.getElementById("login-error");

  email.classList.remove("is-invalid");
  password.classList.remove("is-invalid");
  emailError.textContent = "";
  passwordError.textContent = "";
  loginError.textContent = "";
  loginError.classList.add("d-none");

  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (!storedUser) {
    alert("No registered user found. Please register first.");
    window.location.replace("index.html");
    return;
  }

  let valid = true;

  if (!email.value.trim()) {
    valid = false;
    email.classList.add("is-invalid");
    emailError.textContent = "Please enter your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    valid = false;
    email.classList.add("is-invalid");
    emailError.textContent = "Please enter a valid email address.";
  }

  if (!password.value.trim()) {
    valid = false;
    password.classList.add("is-invalid");
    passwordError.textContent = "Please enter your password.";
  }

  if (
    valid &&
    (email.value.trim() !== storedUser.email ||
      password.value !== storedUser.password)
  ) {
    valid = false;
    loginError.textContent = "Invalid email or password. Please try again.";
    loginError.classList.remove("d-none");
  }

  if (valid) {
    localStorage.setItem("isLoggedIn", "true");
    window.location.replace("exam.html");
  }
});
