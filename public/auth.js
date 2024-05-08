

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
  // Global variables for login modal
  const loginForm = document.getElementById("loginForm");
  const loginButton = document.getElementById("loginButton");
  const loginModal = document.getElementById("loginModal");
  
  // Show login modal event listeners
  const loginBtnDesktop = document.getElementById("loginButton");
  const loginBtnMobile = document.getElementById("loginButtonMobile");
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
        console.log("Login Response Data:", data); 
        if (response.ok) {
          // If login is successful, store the access token and redirect to the profile page
          localStorage.setItem('accessToken', data.accessToken); // Assuming `data.accessToken` contains the token
        
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
        errorMessage.textContent = "An unexpected error occurred. Please try again.";
        errorMessage.style.display = "block";
      }
    });
  }
});

// Function to check if the user is authenticated
function isAuthenticated() {
  // Check if the access token is present
  const token = localStorage.getItem('accessToken');
  return !!token; // Convert the token existence check into a boolean
}

// Protect the profile page by redirecting to login if not authenticated
function protectProfilePage() {
  if (!isAuthenticated()) {
    // q: how to Protect the route?

      // Redirect to the login page if the user isn't authenticated
      window.location.href = "http://127.0.0.1:5502/public/index.html";
  }
}

protectProfilePage();

function updateNavLinkVisibility() {
  const profileNavLink = document.getElementById('profileNavLink'); 
  console.log("Checking authentication for profile link...");
  if (isAuthenticated()) {
      console.log("User authenticated, showing profile link");
      profileNavLink.style.display = 'block'; // Show the link if authenticated
  } else {
      console.log("User not authenticated, hiding profile link");
      profileNavLink.style.display = 'none'; // Hide the link if not authenticated
  }
}


// // Call the function to update the link visibility after the DOM content is loaded
document.addEventListener('DOMContentLoaded', updateNavLinkVisibility);





// function greetUser() {
//   // Get the access token from local storage
//   const token = localStorage.getItem('accessToken');
//   // Decode the token to get the user ID
//   const decodedToken = jwt_decode(token);
//   // Fetch the user's details using the user ID
//   fetch(`http://localhost:9999/user/${decodedToken.id}`, {
//       headers: {
//           Authorization: `Bearer ${token}`
//       }
//   })
//   .then(response => response.json())
//   .then(data => {
//       // Update the profile page with the user's details
//       document.getElementById('username').textContent = data.username;
     
//   });
// }

// // On the profile page, invoke the protection function to verify access
// if (window.location.pathname.includes('profil.html')) {
//   protectProfilePage();
// }



// Logout function
function logOut() {
  const loginButton = document.getElementById("loginButton");
  loginButton.textContent = "Login";
  loginButton.onclick = function () {
    document.getElementById("loginModal").classList.toggle("hidden");
  };
  console.log("Logging out...");
  window.location.href = "http://127.0.0.1:5502/public/index.html";
}


