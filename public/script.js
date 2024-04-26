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



// GET ALL CARD ELEMENTS
document.addEventListener("DOMContentLoaded", function () {
  // Initialize modal and card elements, ensure they exist before proceeding
  const modal = document.getElementById("modal");
  const cards = document.querySelectorAll(".card");

  if (modal) {
    // Define showModal function only if modal is present
    function showModal(imageSrc, title, text, hiddenText) {
      document.getElementById("modal-image").src = imageSrc;
      document.getElementById("modal-title").textContent = title;
      document.getElementById("modal-text").textContent = text;
      document.getElementById("modal-hidden-text").textContent = hiddenText;
      modal.classList.remove("hidden");
    }

    if (cards.length > 0) { // Check if there are any cards
      cards.forEach(card => {
        card.addEventListener("click", function () {
          const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
          if (screenWidth > 768) {
            // Modal interaction specifics
            const imageSrc = card.querySelector("img").src;
            const title = card.querySelector("h3").textContent;
            const text = card.querySelector("p").textContent;
            const hiddenText = card.querySelector(".hidden-text").textContent;

            showModal(imageSrc, title, text, hiddenText);
          }
        });
      });
    }

    const closeModalButton = document.getElementById("close-modal");
    if (closeModalButton) {
      closeModalButton.addEventListener("click", function () {
        modal.classList.add("hidden");
      });
    }

    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        modal.classList.add("hidden");
      }
    });
  }

  // Toggle hidden text only if toggle buttons exist
  const toggleButtons = document.querySelectorAll(".toggle-text");
  if (toggleButtons.length > 0) {
    toggleButtons.forEach(button => {
      button.addEventListener("click", function () {
        const hiddenText = this.closest(".card").querySelector(".hidden-text");
        const isVisible = !hiddenText.classList.contains("hidden");
        hiddenText.classList.toggle("hidden");
        this.textContent = isVisible ? "Visa mer..." : "Visa mindre...";
      });
    });
  }
});


// HAMBURGER MENU
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
// SETS CURRENT YEAR IN FOOTER
document.getElementById("current-year").textContent = new Date().getFullYear();
