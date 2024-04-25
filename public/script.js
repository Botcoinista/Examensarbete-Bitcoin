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
        showSuccessMessage(data.message ); // Show success message from the server
        setTimeout(() => {
          hideModal(); 
          resetModal();
          showLoginForm();  // Show the login form
          clearFormFields();
        }, 1500);
      } else {
        const data = await response.json(); // Show error message from the server
        showError(data.message);
      }
    } catch (error) {
      showError("Ett oväntat fel uppstod, vänligen försök igen.");
    }
  });

 function showSuccessMessage(message) {
  const successMessage = document.getElementById("successMessage");
  successMessage.textContent = message
  successMessage.classList.remove('hidden');
}

function showError(message) {
  const errorMessage = document.getElementById("errorMessage");
  errorMessage.textContent = message;
  errorMessage.classList.remove('hidden');
}

function hideModal() {
  const modal = document.getElementById('registrationModal');
  modal.classList.add('hidden');
}

function showLoginForm() {
  const loginModal = document.getElementById('loginModal');
  loginModal.classList.remove('hidden');
}


function clearErrorMessage() {
  const errorMessage = document.getElementById("errorMessage");
  errorMessage.textContent = '';
  errorMessage.classList.add('hidden');
}

close-registrationModal.addEventListener('click', function() {
  clearErrorMessage();
});

document.getElementById('close-registrationModal').addEventListener('click', function() {
  resetModal();
});

function resetModal() {
  const form = document.querySelector('#registrationModal form');
  const successMessage = document.getElementById("successMessage");
  form.classList.remove('hidden');
  successMessage.classList.add('hidden');
  clearFormFields();
}

function clearFormFields() {
  document.getElementById('register-email').value = '';
  document.getElementById('register-password').value = '';
  document.getElementById('register-username').value = '';
}

document.getElementById('loginLink').addEventListener('click', function() {
  hideModal();
  showLoginForm();
});

// LOGIN
document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async function(event) {
      event.preventDefault();
      const email = document.getElementById("login-email").value;
      const password = document.getElementById("login-password").value;
      const errorDiv = document.getElementById("login-error"); // Ensure this ID exists for displaying errors.

      try {
        const response = await fetch("http://localhost:9999/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (response.ok) {
          alert("Login Successful");
          // Handle successful login, e.g., redirect or change UI state
        } else {
          // Display the error message from the server in the modal
          errorDiv.textContent = data.message;
          errorDiv.style.display = 'block'; // Make sure the error div is visible
        }
      } catch (error) {
        // Handle network errors or other unexpected issues
        errorDiv.textContent = "Server error or network issue. Please try again later.";
        errorDiv.style.display = 'block';
      }
    });
  }

  // Optionally, handle closing the modal
  const closeModalBtn = document.getElementById('close-loginModal');
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', function() {
      document.getElementById('loginModal').style.display = 'none';
    });
  }
});








  // REGISTRATION MODAL
  document.addEventListener('DOMContentLoaded', function() {
    const registerBtnDesktop = document.getElementById('registerButton');
    const registerBtnMobile = document.getElementById('registerButtonMobile');
    const registrationModal = document.getElementById('registrationModal');
    const closeBtn = document.getElementById('close-registrationModal');

    registerBtnDesktop.addEventListener('click', function() {
        registrationModal.classList.remove('hidden');
    });

    registerBtnMobile.addEventListener('click', function() {
      registrationModal.classList.remove('hidden');
  });

    closeBtn.addEventListener('click', function() {
        registrationModal.classList.add('hidden');
    });
});

// LOGIN MODAL
  document.addEventListener('DOMContentLoaded', function() {
    const loginBtnDesktop = document.getElementById('loginButton');
    const loginBtnMobile = document.getElementById('loginButtonMobile');
    const loginModal = document.getElementById('loginModal');
    const closeBtn = document.getElementById('close-loginModal');

    loginBtnDesktop.addEventListener('click', function() {
        loginModal.classList.remove('hidden');
    });

    loginBtnMobile.addEventListener('click', function() {
      loginModal.classList.remove('hidden');
  });

    closeBtn.addEventListener('click', function() {
        loginModal.classList.add('hidden');
    });
});









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

document.getElementById("current-year").textContent = new Date().getFullYear();


