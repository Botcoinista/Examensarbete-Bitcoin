// class BitcoinCards extends HTMLElement {
//     connectedCallback() {
//         this.innerHTML = `
//             <div class="container mx-auto min-h-screen">
//                 <div class="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-8 justify-center">
//                     ${this.generateCardsHtml()}
//                 </div>
//             </div>
//         `;
//         this.setupEventListeners();
//     }

//     generateCardsHtml() {
//         const cardsData = [
//             {
//                 id: 1,
//                 imgSrc: "./images/DALL·E-satoshi.png",
//                 title: "Varför skapades Bitcoin",
//                 description: "Bitcoin lanserades i januari 2009 av en anonym skapare som använde pseudonymen Satoshi Nakamoto som svar på den globala finanskrisen.",
//                 moreText: "Detta initiativ syftade till att skapa en ekonomisk infrastruktur oberoende av centralbanker och traditionella finansiella institutioner..."
//             },
//             // More cards can be added here
//         ];

//         return cardsData.map(card => `
//             <div class="mt-10 relative max-w-xs mx-auto">
//                 <div id="card-${card.id}" class="card bg-white rounded-lg shadow-md p-6 cursor-pointer transition-transform duration-300 hover:scale-105">
//                     <div class="w-full">
//                         <img src="${card.imgSrc}" alt="${card.title}" class="rounded-md mb-4 w-72 h-52 object-cover">
//                     </div>
//                     <h3 class="text-lg font-semibold text-gray-800">${card.title}</h3>
//                     <div class="text-gray-600">
//                         <p id="text-${card.id}">
//                             ${card.description}
//                             <span class="text-blue-500 cursor-pointer hidden sm:block">Visa mer...</span>
//                         </p>
//                         <p class="hidden-text hidden">${card.moreText}</p>
//                         <button class="toggle-text text-rose-500 cursor-pointer sm:hidden">Visa mer...</button>
//                     </div>
//                 </div>
//             </div>
//         `).join('');
//     }

//     setupEventListeners() {
//         this.querySelectorAll('.card').forEach(card => {
//             card.addEventListener('click', () => {
//                 const hiddenText = card.querySelector('.hidden-text');
//                 const isVisible = hiddenText.classList.contains('hidden');
//                 hiddenText.classList.toggle('hidden', !isVisible);
//                 const toggleButton = card.querySelector('.toggle-text');
//                 toggleButton.textContent = isVisible ? 'Visa mindre...' : 'Visa mer...';
//             });
//         });
//     }
// }

// customElements.define('bitcoin-cards', BitcoinCards);
