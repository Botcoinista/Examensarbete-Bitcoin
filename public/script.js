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
document.getElementById('registrationForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    // Collect form data
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const username = document.getElementById('register-username').value;
  
    // Send HTTP request to backend
    try {
      const response = await fetch('http://localhost:9999/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, username })
      });
      console.log("client side:", response.status)
  
      if (response.ok) {
        // Registration successful, display success message or redirect to another page
        console.log('Registration successful');
      } else {
        // Registration failed, display error message
        console.error('Registration failed');
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error:', error);
    }
  });
  

// Show more text function
function showMore(cardNumber) {
  const text = document.getElementById(`text-${cardNumber}`);
  text.classList.remove('hidden');
}

// Get all card elements
const cards = document.querySelectorAll('.shadow-md');

// Add click event listener to each card
cards.forEach(card => {
  card.addEventListener('click', () => {
    const imageSrc = card.querySelector('img').src;
    const title = card.querySelector('h3').textContent;
    const text = card.querySelector('p').textContent;
    
    // Set modal content
    document.getElementById('modal-image').src = imageSrc;
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-text').textContent = text;
    
    // Show modal
    document.getElementById('modal').classList.remove('hidden');
  });
});

// Close modal when clicking 'x' button
document.getElementById('close-modal').addEventListener('click', () => {
  document.getElementById('modal').classList.add('hidden');
});

// Close modal when clicking outside modal content
document.getElementById('modal').addEventListener('click', (e) => {
  if (e.target === document.getElementById('modal')) {
    document.getElementById('modal').classList.add('hidden');
  }
});
