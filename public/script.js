// const userCardTemplate = document.querySelector("[data-user-template]");
// const userCardContainer = document.querySelector("[data-user-cards-container]");
// const searchInput = document.querySelector("[data-search]");

// let users = [];

//    // Attach event listener after populating users array
//    searchInput.addEventListener("input", e => {
//     const value = e.target.value.toLowerCase();
//     users.forEach(user => {
//         const isVisible =
//             user.name.toLowerCase().includes(value) ||
//             user.email.toLowerCase().includes(value);
//         user.element.classList.toggle("hide", !isVisible);
//     });
// })

// fetch("https://jsonplaceholder.typicode.com/users")
//     .then(response => response.json())
//     .then(data => {
//         users = data.map(user => {
//             const card = userCardTemplate.content.cloneNode(true).querySelector(".card");
//             const header = card.querySelector("[data-header]");
//             const body = card.querySelector("[data-body]");
//             header.textContent = user.name;
//             body.textContent = user.email;
//             userCardContainer.append(card);
//             return { name: user.name, email: user.email, element: card }
//         });
//     })

// Registration

document
  .getElementById("registrationForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    // Clear any previous error messages
    clearErrorMessage();

    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
    const username = document.getElementById("register-username").value;

    try {
      const response = await fetch("http://localhost:9999/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, username }),
      });

      if (response.ok) {
        const data = await response.json();
        showSuccessMessage(data.message); // Show success message from the server
        console.log(data.message)
        setTimeout(() => {
          hideModal();
          resetModal();
          showLoginForm(); // Show login form after successful registration
          clearFormFields();
        }, 1500);
      } else {
        const data = await response.json(); // Show error message from the server
        console.log(data.message)
        showError(data.message);
      }
    } catch (error) {
      showError("Ett oväntat fel uppstod, vänligen försök igen.");
    }
  });

function showSuccessMessage(message) {
  const successMessage = document.getElementById("successMessage");
  successMessage.textContent = message;
  successMessage.classList.remove("hidden");
}

function showError(message) {
  const errorMessage = document.getElementById("errorMessage");
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");
}

function hideModal() {
  const modal = document.getElementById("registrationModal");
  modal.classList.add("hidden");
}

function showLoginForm() {
  const loginModal = document.getElementById("loginModal");
  loginModal.classList.remove("hidden");
}

function clearErrorMessage() {
  const errorMessage = document.getElementById("errorMessage");
  errorMessage.textContent = "";
  errorMessage.classList.add("hidden");
}

close -
  registrationModal.addEventListener("click", function () {
    clearErrorMessage();
  });

document
  .getElementById("close-registrationModal")
  .addEventListener("click", function () {
    resetModal();
  });

function resetModal() {
  const form = document.querySelector("#registrationModal form");
  const successMessage = document.getElementById("successMessage");
  form.classList.remove("hidden");
  successMessage.classList.add("hidden");
  clearFormFields();
}

function clearFormFields() {
  document.getElementById("register-email").value = "";
  document.getElementById("register-password").value = "";
  document.getElementById("register-username").value = "";
}

document.getElementById("loginLink").addEventListener("click", function () {
  hideModal();
  showLoginForm();
});

// REGISTRATION MODAL
document.addEventListener("DOMContentLoaded", function () {
  const registerBtnDesktop = document.getElementById("registerButton");
  const registerBtnMobile = document.getElementById("registerButtonMobile");
  const registrationModal = document.getElementById("registrationModal");
  const closeBtn = document.getElementById("close-registrationModal");

  registerBtnDesktop.addEventListener("click", function () {
    registrationModal.classList.remove("hidden");
  });

  registerBtnMobile.addEventListener("click", function () {
    registrationModal.classList.remove("hidden");
  });

  closeBtn.addEventListener("click", function () {
    registrationModal.classList.add("hidden");
  });
});





// LOGIN
document.addEventListener("DOMContentLoaded", function () {
  // Elements related to login modal
  const loginBtnDesktop = document.getElementById("loginButton");
  const loginBtnMobile = document.getElementById("loginButtonMobile");
  const loginModal = document.getElementById("loginModal");
  const closeBtn = document.getElementById("close-loginModal");

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
  const loginForm = document.getElementById("loginForm");
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
          successMessage.textContent = data.message;
          successMessage.style.display = "block";
          setTimeout(() => {
            window.location.href = "/public/om"; // Redirect to profile page
          }, 5000);
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

  // Optionally, handle closing the modal
  const closeModalBtn = document.getElementById("close-loginModal");
  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", function () {
      document.getElementById("loginModal").classList.add("hidden");
    });
  }
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


// ALTERNATIVE LOGIN AND REGISTRATION

// document.getElementById('registrationForm').addEventListener('submit', function(event) {
//   event.preventDefault();
//   const email = document.getElementById('register-email').value;
//   const password = document.getElementById('register-password').value;
//   const username = document.getElementById('register-username').value;

//   fetch('http://localhost:9999/auth/register', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password, username })
//   })
//   .then(response => response.json())
//   .then(data => {
//       document.getElementById('registrationMessage').textContent = data.message || 'Registered successfully!';
//   })
//   .catch(error => {
//       document.getElementById('registrationMessage').textContent = 'Failed to register!';
//   });
// });




// document.getElementById('loginForm').addEventListener('submit', function(event) {
//   event.preventDefault();
//   const email = document.getElementById('login-email').value;
//   const password = document.getElementById('login-password').value;

//   fetch('http://localhost:9999/auth/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password })
//   })
//   .then(response => response.json())
//   .then(data => {
//       document.getElementById('loginMessage').textContent = data.message;
//   })
//   .catch(error => {
//       document.getElementById('loginMessage').textContent = 'Failed to login!';
//   });
// });



// GET ALL CARD ELEMENTS
document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".card");
  const modal = document.getElementById("modal");

  // Function to show modal
  function showModal(imageSrc, title, text, hiddenText) {
    document.getElementById("modal-image").src = imageSrc;
    document.getElementById("modal-title").textContent = title;
    document.getElementById("modal-text").textContent = text;
    document.getElementById("modal-hidden-text").textContent = hiddenText;
    modal.classList.remove("hidden");
  }

  // Event listener for cards
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const screenWidth =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;

      if (screenWidth > 768) {
        // Only show modal on larger screens
        const imageSrc = card.querySelector("img").src;
        const title = card.querySelector("h3").textContent;
        const text = card.querySelector("p").textContent;
        const hiddenText = card.querySelector(".hidden-text").textContent;

        showModal(imageSrc, title, text, hiddenText);
      }
    });
  });

  // Close modal
  document.getElementById("close-modal").addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // Close modal by clicking outside
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });

  // Toggle hidden text for small screens
  const toggleButtons = document.querySelectorAll(".toggle-text");
  toggleButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const hiddenText = this.closest(".card").querySelector(".hidden-text");
      const isVisible = !hiddenText.classList.contains("hidden");
      hiddenText.classList.toggle("hidden");
      this.textContent = isVisible ? "Visa mer..." : "Visa mindre...";
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  hamburgerBtn.addEventListener("click", function () {
    mobileMenu.classList.toggle("hidden");
    // Optionally toggle icons for open and close
    this.querySelector("svg.block").classList.toggle("hidden");
    this.querySelector("svg.hidden").classList.toggle("hidden");
  });
});

// Set current year in footer
document.getElementById("current-year").textContent = new Date().getFullYear();
