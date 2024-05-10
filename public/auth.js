

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
  const registrationForm = document.getElementById("registrationForm");
  
  // Show login modal event listeners
  const loginBtnDesktop = document.getElementById("loginButton");
  const loginBtnMobile = document.getElementById("loginButtonMobile");
  const closeBtn = document.getElementById("close-loginModal");
  const registerLink = document.getElementById("registerLink");
  
  loginBtnDesktop.addEventListener("click", function () {
    loginModal.classList.remove("hidden");
  });
  
  loginBtnMobile.addEventListener("click", function () {
    loginModal.classList.remove("hidden");
  });
  
  closeBtn.addEventListener("click", function () {
    loginModal.classList.add("hidden");
  });

  registerLink.addEventListener("click", () => {
    loginModal.classList.add("hidden");
    registrationModal.classList.remove("hidden");

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
          localStorage.setItem('accessToken', data.accessToken);
          console.log('Access Token:', data.accessToken);
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
const isAuthenticated = () => {
  const accessToken = localStorage.getItem('accessToken');
  return accessToken !== null;
};

// Function to fetch user profile data
const fetchUserProfile = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch('http://localhost:9999/auth/protected', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (response.ok) {
      const userData = await response.json();
      console.log('User Profile Data:', userData);
      // Proceed with rendering the profile page with the fetched user data
    } else {
      console.error('Error fetching user profile:', response.statusText);
      // Handle error response (e.g., token expired or invalid)
      // Redirect to login page or display an error message
    }
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    // Handle unexpected errors
  }
};

// Check if the user is authenticated before fetching profile data
document.addEventListener('DOMContentLoaded', () => {
  if (!isAuthenticated()) {
    console.log('User is not authenticated. Redirecting to login page...');
    // Redirect the user to the login page
    // window.location.href = 'http://127.0.0.1:5502/public/index.html';
  } else {
    console.log('User is authenticated. Fetching user profile...');
    // Fetch user profile data if the user is authenticated
    fetchUserProfile();
  }
});






// // Function to check if the user is authenticated
// function isAuthenticated() {
//   // Check if the access token is present
//   const token = localStorage.getItem('accessToken');
//   return !!token; // Convert the token existence check into a boolean
// }

// // Protect the profile page by redirecting to login if not authenticated
// function protectProfilePage() {
//   if (isAuthenticated()) {
//       console.log("User authenticated, showing profile page");
//       // greetUser();


//   }
// }



// function updateNavLinkVisibility() {
//   const profileNavLink = document.getElementById('profileNavLink'); 
//   console.log("Checking authentication for profile link...");
//   if (isAuthenticated()) {
//       console.log("User authenticated, showing profile link");
//       profileNavLink.style.display = 'block'; // Show the link if authenticated
//   } else {
//       console.log("User not authenticated, hiding profile link");
//       profileNavLink.style.display = 'none'; // Hide the link if not authenticated
//   }
// }


// // // Call the function to update the link visibility after the DOM content is loaded
// document.addEventListener('DOMContentLoaded', updateNavLinkVisibility);





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
//       document.getElementById('username').textContent = data.username || 'Unknown User';
     
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


