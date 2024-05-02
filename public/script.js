// Parse HTML articles
function parseArticles(htmlContent) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, 'text/html');

  // Extract relevant information from the parsed HTML document
  const title = doc.querySelector('title').textContent;
  const headlines = doc.querySelectorAll('h1, h2, h3');
  const textContent = doc.body.textContent;

  return { title, headlines, textContent };
}

// Build search index
function buildSearchIndex(articles) {
  const index = [];
  articles.forEach((article, index) => {
      const parsedArticle = parseArticles(article);
      index.push({
          id: index,
          title: parsedArticle.title,
          headlines: Array.from(parsedArticle.headlines).map(h => h.textContent),
          textContent: parsedArticle.textContent
      });
  });
  return index;
}

// Implement search functionality
function search(query, index) {
  const results = index.filter(article =>
      article.title.includes(query) ||
      article.headlines.some(headline => headline.includes(query)) ||
      article.textContent.includes(query)
  );
  return results;
}

// Example usage
// const articles = [...]; // Array of HTML article contents
// const searchIndex = buildSearchIndex(articles);
// const query = 'Bitcoin';
// const searchResults = search(query, searchIndex);
// console.log(searchResults);



// GET ALL CARD ELEMENTS
document.addEventListener("DOMContentLoaded", function () {
  // Initialize modal and card elements, ensure they exist before proceeding
  const modal = document.getElementById("modal");
  const cards = document.querySelectorAll(".card");

  if (modal) {
    // Define showModal function only if modal is present.
    function showModal(imageSrc, title, text, hiddenText) {
      document.getElementById("modal-image").src = imageSrc;
      document.getElementById("modal-title").textContent = title;
      document.getElementById("modal-text").textContent = text;
      document.getElementById("modal-hidden-text").textContent = hiddenText;
      modal.classList.remove("hidden");
    }

    if (cards.length > 0) { // Check if there are any cards. The if statement is not necessary, but it's a good practice to ensure that the event listeners are only added if the elements exist.
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
