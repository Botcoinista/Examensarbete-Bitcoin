console.log("Script loaded");

document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded and parsed");

    const searchInput = document.getElementById('searchInput');
    const resultsContainer = document.getElementById('searchResults');
    const articles = document.querySelectorAll('.searchable'); // Ensure this class is on your articles

    searchInput.addEventListener('input', function() {
        console.log("Input event triggered");
        const searchQuery = this.value.toLowerCase();
        resultsContainer.innerHTML = ''; // Clear previous results
        resultsContainer.style.display = 'none'; // Hide results initially

        if (searchQuery.length > 0) {
            fetch('../data/articles.json') // Adjust the path as needed
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Nätverksfel, kunde inte ladda artiklar!');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log("Loaded articles:", data);
                 

                    let matches = data.filter(item => item.title.toLowerCase().includes(searchQuery));
                    if (matches.length > 0) {
                        matches.forEach(item => {
                            const resultElement = document.createElement('div');
                            resultElement.className = 'search-result-item';
                            resultElement.innerHTML = `<a href="${item.url}">${item.title}</a> - ${item.description}`;
                            resultsContainer.appendChild(resultElement);
                        });
                        resultsContainer.style.display = 'block'; // Show results
                    } else {
                        resultsContainer.innerHTML = '<div>Inga träffa funna.</div>';
                        resultsContainer.style.display = 'block'; 
                    }

                    // Hide all articles initially
                    articles.forEach(article => article.style.display = 'none');

                    // Display only the articles that match
                    matches.forEach(match => {
                        const articleToDisplay = Array.from(articles).find(article => article.textContent.toLowerCase().includes(match.title.toLowerCase()));
                        if (articleToDisplay) {
                            articleToDisplay.style.display = '';
                        }
                    });
                })
                .catch(error => {
                    console.error('Failed to load articles:', error);
                    resultsContainer.innerHTML = '<div>Fel när artiklar skulle laddas!</div>';
                    resultsContainer.style.display = 'block'; 
                });
        } else {
            resultsContainer.innerHTML = ''; // Clear results if the search query is empty
            articles.forEach(article => article.style.display = ''); // Show all articles if no query
            resultsContainer.style.display = 'none'; // Hide if search query is empty
        }
    });
});