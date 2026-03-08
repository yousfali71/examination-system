// form validation
const form = document.getElementById("registerForm");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  form
    .querySelectorAll(".form-control")
    .forEach((input) => input.classList.remove("is-invalid"));

  form
    .querySelectorAll(".invalid-feedback")
    .forEach((div) => (div.textContent = ""));

  const firstName = document.getElementById("first-name");
  const lastName = document.getElementById("last-name");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirm-password");

  const firstNameError = document.getElementById("first-name-error");
  const lastNameError = document.getElementById("last-name-error");
  const emailError = document.getElementById("email-error");
  const passwordError = document.getElementById("password-error");
  const confirmMatchError = document.getElementById("confirm-match-error");

  let valid = true;

  if (!firstName.value.trim().match(/^[A-Za-z]+$/)) {
    valid = false;
    firstName.classList.add("is-invalid");
    firstNameError.textContent = "Enter a valid first name (letters only).";
  }

  if (!lastName.value.trim().match(/^[A-Za-z]+$/)) {
    valid = false;
    lastName.classList.add("is-invalid");
    lastNameError.textContent = "Enter a valid last name (letters only).";
  }

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;
  if (!email.value.trim().match(emailPattern)) {
    valid = false;
    email.classList.add("is-invalid");
    emailError.textContent = "Enter a valid email address (name@example.com).";
  }

  if (password.value.length < 8) {
    valid = false;
    password.classList.add("is-invalid");
    passwordError.textContent = "Password must be at least 8 characters.";
  }

  if (confirmPassword.value !== password.value) {
    valid = false;
    confirmPassword.classList.add("is-invalid");
    confirmMatchError.textContent = "Passwords must match.";
  }

  if (valid) {
    localStorage.setItem(
      "user",
      JSON.stringify({
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value,
      }),
    );

    window.location.replace("login.html");
  }
});
