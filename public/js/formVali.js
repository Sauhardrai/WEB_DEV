(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

// password shower btn
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");
const eyeIcon = document.getElementById("eyeIcon");

togglePassword.addEventListener("click", () => {
  const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);
  eyeIcon.classList.toggle("fa-eye");
  eyeIcon.classList.toggle("fa-eye-slash");
});