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

    // Collect form data
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
    const username = document.getElementById("register-username").value;

    // Send HTTP request to backend
    try {
      const response = await fetch("http://localhost:9999/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, username }),
      });
      console.log("client side:", response.status);

    
      if (response.ok) {
        // If registration is successful, modify the modal content
        const modalTitle = document.querySelector('#registrationModal h2');
        const formElements = document.querySelectorAll('#registrationModal form > div');
        const submitButton = document.querySelector('#registrationModal button[type="submit"]');
        const errorMessage = document.getElementById("errorMessage");

        // Clear previous errors
        errorMessage.textContent = '';
        errorMessage.classList.add('hidden');  

        // Change the modal title
        modalTitle.textContent = "Registreringen Lyckades!";

        // Hide form elements and button
        formElements.forEach(el => el.style.display = 'none');
        submitButton.style.display = 'none';

        // Optional: Show a different message or further instructions
        const successMessage = document.createElement('p');
        successMessage.textContent = "Du kommer strax vidare...";
        document.querySelector('#registrationModal form').appendChild(successMessage);

        // Redirect after 1.5 seconds to login modal or another page
        setTimeout(() => {
            // Assuming loginModal is an existing element you want to show
            document.getElementById('loginModal').classList.remove('hidden');
            // Optionally close the registration modal if needed
            document.getElementById('registrationModal').classList.add('hidden');
        }, 1500);
    } else {
      const data = await response.json(); 
      errorMessage.textContent = data.message || "Registration failed, please try again.";
      errorMessage.classList.remove('hidden');
        console.error("Registration failed");
    }
} catch (error) {
    console.error("Error:", error);
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
//   document.addEventListener('DOMContentLoaded', function() {
//     const loginBtnDesktop = document.getElementById('loginButton');
//     const loginBtnMobile = document.getElementById('loginButtonMobile');
//     const loginModal = document.getElementById('loginModal');
//     const closeBtn = document.getElementById('close-loginModal');

//     loginBtnDesktop.addEventListener('click', function() {
//         loginModal.classList.remove('hidden');
//     });

//     loginBtnMobile.addEventListener('click', function() {
//       loginModal.classList.remove('hidden');
//   });

//     closeBtn.addEventListener('click', function() {
//         loginModal.classList.add('hidden');
//     });
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

document.getElementById("current-year").textContent = new Date().getFullYear();


