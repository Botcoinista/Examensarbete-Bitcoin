// REGISTRATION
document.addEventListener("DOMContentLoaded", function () {
    // Initialize all event listeners once the DOM is fully loaded
    const registrationForm = document.getElementById("registrationForm");
    const registerBtnDesktop = document.getElementById("registerButton");
    const registerBtnMobile = document.getElementById("registerButtonMobile");
    const registrationModal = document.getElementById("registrationModal");
    const closeBtn = document.getElementById("close-registrationModal");
    const loginLink = document.getElementById("loginLink");
  
    // Event listeners for modal controls
    registerBtnDesktop.addEventListener("click", () =>
      registrationModal.classList.remove("hidden")
    );
    registerBtnMobile.addEventListener("click", () =>
      registrationModal.classList.remove("hidden")
    );
    closeBtn.addEventListener("click", () => {
      registrationModal.classList.add("hidden");
      registerFunctions.resetModal();
    });
    loginLink.addEventListener("click", () => {
      registerFunctions.hideModal();
      registerFunctions.showLoginForm();
    });
  
    // Handle form submission
    registrationForm.addEventListener("submit", async function (event) {
      event.preventDefault();
      registerFunctions.clearErrorMessage();
  
      const email = document.getElementById("register-email").value;
      const password = document.getElementById("register-password").value;
      const username = document.getElementById("register-username").value;
  
      console.log("Registering with:", { email, password, username });
  
      try {
        const response = await fetch("http://localhost:9999/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, username }),
        });
  
        if (response.ok) {
          const data = await response.json();
          registerFunctions.showSuccessMessage(data.message);
          setTimeout(() => {
            registerFunctions.hideModal();
            registerFunctions.resetModal();
            registerFunctions.showLoginForm();
            registerFunctions.clearFormFields();
          }, 1500);
        } else {
          const data = await response.json();
          registerFunctions.showError(data.message);
        }
      } catch (error) {
        registerFunctions.showError(
          "An unexpected error occurred. Please try again."
        );
      }
    });
  });
  // Define all functions related to registration modal
  const registerFunctions = {
    showSuccessMessage: function (message) {
      document.getElementById("successMessage").textContent = message;
      document.getElementById("successMessage").classList.remove("hidden");
    },
    showError: function (message) {
      document.getElementById("errorMessage").textContent = message;
      document.getElementById("errorMessage").classList.remove("hidden");
    },
    hideModal: function () {
      document.getElementById("registrationModal").classList.add("hidden");
    },
    showLoginForm: function () {
      document.getElementById("loginModal").classList.remove("hidden");
    },
    clearErrorMessage: function () {
      document.getElementById("errorMessage").textContent = "";
      document.getElementById("errorMessage").classList.add("hidden");
    },
    resetModal: function () {
      const form = document.querySelector("#registrationModal form");
      form.reset();
      document.getElementById("successMessage").classList.add("hidden");
      this.clearFormFields(); // Properly scoped call
    },
    clearFormFields: function () {
      document.getElementById("register-email").value = "";
      document.getElementById("register-password").value = "";
      document.getElementById("register-username").value = "";
    },
  };
  
  // LOGIN
  document.addEventListener("DOMContentLoaded", function () {
    const loginBtnDesktop = document.getElementById("loginButton");
    const loginBtnMobile = document.getElementById("loginButtonMobile");
    const loginModal = document.getElementById("loginModal");
    const closeBtn = document.getElementById("close-loginModal");
    const loginForm = document.getElementById("loginForm");
    const loginButton = document.getElementById("loginButton");
  
    // Handle showing the login modal for both desktop and mobile buttons
    loginBtnDesktop.addEventListener("click", function () {
      loginModal.classList.remove("hidden");
    });
  
    loginBtnMobile.addEventListener("click", function () {
      loginModal.classList.remove("hidden");
    });
  
    // Handle closing the login modal
    closeBtn.addEventListener("click", function () {
      loginModal.classList.add("hidden");
    });
  
    // Login form processing
    if (loginForm) {
      loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;
        const errorMessage = document.getElementById("errorMessageLogin");
        const successMessage = document.getElementById("successMessageLogin");
  
        try {
          const response = await fetch("http://localhost:9999/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });
  
          const data = await response.json();
          if (response.ok) {
            // Change login button to log out
            loginButton.textContent = "Log out";
            loginButton.onclick = function () {
              logOut();
            };
            successMessage.textContent = data.message;
            successMessage.style.display = "block";
            setTimeout(() => {
              window.location.href = "http://127.0.0.1:5502/public/profil.html";
            }, 1500);
          } else {
            errorMessage.textContent = data.message;
            errorMessage.style.display = "block";
          }
        } catch (error) {
          errorMessage.textContent =
            "Ett oväntat fel uppstod, vänligen försök igen.";
          errorMessage.style.display = "block";
        }
      });
    }
  });
  
  const registerLink = document.getElementById("registerLink");
  registerLink.addEventListener("click", function () {
    document.getElementById("loginModal").classList.add("hidden");
    document.getElementById("registrationModal").classList.remove("hidden");
  });
  
  // LOGIN MODAL
  document.addEventListener("DOMContentLoaded", function () {
    const loginBtnDesktop = document.getElementById("loginButton");
    const loginBtnMobile = document.getElementById("loginButtonMobile");
    const loginModal = document.getElementById("loginModal");
    const closeBtn = document.getElementById("close-loginModal");
  
    loginBtnDesktop.addEventListener("click", function () {
      loginModal.classList.remove("hidden");
    });
  
    loginBtnMobile.addEventListener("click", function () {
      loginModal.classList.remove("hidden");
    });
  
    closeBtn.addEventListener("click", function () {
      loginModal.classList.add("hidden");
    });
  });
  
  // LOGOUT FUNCTION
  function logOut() {
    // Perform logout operations
    console.log("Logging out...");
    // Reset the login button to original state
    loginButton.textContent = "Login";
    loginButton.onclick = function () {
      document.getElementById("loginModal").classList.toggle("hidden");
    };
    // Optionally redirect or change the interface
    window.location.href = "http://127.0.0.1:5502/public/index.html";
  }