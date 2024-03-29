// Step 1: struttura dei dati
// Partendo dai dati forniti crea le strutture dati necessarie sfruttando array 
// e oggetti facendo attenzione agli attributi che caratterizzano ciascuna news.

// Data structure
const cards = [

    {
      id: 1,
      title: "Scoperta di una nuova specie di papera di gomma",
      content: "Un breve articolo sulla recente scoperta di una specie di papera di gomma mai vista prima.",
      tags: ["geo", "tech"],
      author: "Diana Rossi",
      published: "2023-02-11",
      image: {
        url: "rubber-duck.jpg",
        alt: "Una papera di gomma gigante al mare."
      },
      bookmarked: true
    },

    {
      id: 2,
      title: "Esplorando le profondità marine: il mistero degli abissi",
      content: "Un viaggio nelle profondità dell'oceano alla scoperta di creature misteriose e inesplorate.",
      tags: ["viaggi", "geo"],
      author: "Fabio Marino",
      published: "2023-03-14",
      image: {
        url: "deep-sea.jpg",
        alt: "Abissi dell'oceano inesplorati."
      },
      bookmarked: false
    },

    {
      id: 3,
      title: "Viaggio culinario: alla ricerca dei sapori perduti",
      content: "Esplorazione di tradizioni culinarie dimenticate e la ricerca di sapori autentici.",
      tags: ["cucina"],
      author: "Marta Bianchi",
      published: "2023-04-20",
      image: {
        url: "kitchen-food.jpg",
        alt: "Ingredienti per una ricetta squisita.",
      },
      bookmarked: false
    },

    {
      id: 4,
      title: "Arte moderna: oltre i confini convenzionali",
      content: "Un'analisi delle tendenze e delle sfide nell'arte contemporanea, con interviste ad artisti emergenti.",
      tags: ["arte", "tech"],
      author: "Gabriele Neri",
      published: "2023-05-29",
      image: {
        url: "modern-art.jpg",
        alt: "Arte moderna sul muro.",
      },
      bookmarked: false
    }
];


// Card bookmarkate
const bookmarked = [1];  


// Variabili
let filteredCards = cards;
let checkedCards = cards;
   

// Seleziono l'elemento della DOM dove aggiungo tutte le card e la salvo in una variabile
const cardsEl = document.querySelector('.cards');
  
// Seleziono l'elemento select nella DOM e la salvo in una variabile
const selectEl = document.getElementById('tag_type');

// Seleziono l'elemento checkbox nella DOM e la salvo in una variabile
const checkEl = document.getElementById('checked');


// Funzione che rende una lista di card dentro la DOM
renderCards(cards, cardsEl);


// Aggiungo un event listener con l'evento change per la select
selectEl.addEventListener('change', function(e){

  // Filtro le carte in base al tag selezionato
  const filteredCards = cards.filter(card => {

    // Verifico se almeno un elemento dell'array di tags è uguale al tag selezionato
    for (let i = 0; i < card.tags.length; i++) {
      
      if (card.tags[i] === e.target.value || e.target.value === 'all') {

        return true;

      }
      
    }
    
  });


  joinCards = filteredCards.filter(value => checkedCards.includes(value));

  // Funzione per gestire l'esecuzione delle cards della select
  manageCardRendering(joinCards);

});


// Ottengo l'unicità dei tipi di tag
const tagsList = new Set(cards.flatMap(card => card.tags));


// Funzione che restituisce le options dinamicamente
renderOptions(tagsList, selectEl);


// Aggiungo un event listener con l'evento change per la checkbox
checkEl.addEventListener('change', function(e){

  if(!e.target.checked){

    checkedCards = cards;

    manageCardRendering(filteredCards);

    return

  }


  checkedCards = cards.filter(card => {

    return bookmarked.includes(card.id);

  })


  joinCards = checkedCards.filter(value => filteredCards.includes(value));

  // Funzione per gestire l'esecuzione delle cards della checkbox
  manageCardRendering(joinCards);

})


// Funzione per gestire l'esecuzione delle cards della select e checkbox
function manageCardRendering(cards){

  // Resetto la select ogni volta che cambio option
  cardsEl.innerHTML = '';

  // Condizione che specifica che se un tag non ha una card restituisce un empty state
  if(cards.length == 0){

    cardsEl.innerHTML = `<h2 class='empty_state'>No news available.</h2>`;

  }else{

    // Altrimenti restituisce la card richista
    renderCards(cards, cardsEl);

  }
  
}


/**
 * Funzione che rende tutte le options nella select dinamicamente
 * @param {Array} optionsList Una lista di stringhe
 * @param {object} selectDomEl L'elemento DOM della select dove appendere tutte le options
 */
function renderOptions(optionsList, selectDomEl){

  optionsList.forEach(optionValue => {
    
    const optionEl = document.createElement('option');

    optionEl.value = optionValue;
    optionEl.innerText = optionValue;
    
    selectDomEl.appendChild(optionEl);
    
  })
}


/**
 * Funzione per generare il markup della card
 * @param {object} card L'oggetto della card
 * @returns object
 */
function generateCard(card){

  // Destructuring della card
  const {id, title, content, tags, author, published, image} = card;

  // Inserito data in formato italiano
  const date = card.published.split('-').reverse().join('/');
  
  // Ciclo map per creare bottoni ad ogni nuovo tag aggiunto
  const tagsButtons = tags.map(tag => `<button class="btn_${tag}">${tag}</button>`).join('');

    
    // Creato markup della card in HTML con il template literal
  const cardMarkup = `<div class="card">
                          <h2>${title}</h2>
                          <span id="author">pubblicato da ${author}</span>
                          <span id="published">in data ${date}</span>
                          <p id="content">${content}</p>
                          <img src="./assets/img/${image.url}" alt="${image.alt}">
                          ${tagsButtons}
                          <div>
                              <i class="fa-${isBookmarked(card) ? 'solid' : 'regular'} fa-bookmark ${isBookmarked(card) ? 'bookmarked' : '' }" data-id="${id}"></i>
                          </div>
                      </div>`;

  return cardMarkup    

};


// Funzione per selezionare il bookmark
function handleCardClicks(e){

    // console.log(e.target.getAttribute('data-id'));

    const iconId = Number(e.target.getAttribute('data-id'))

    bookmarked.push(iconId)

    e.target.className = `fa-solid fa-bookmark bookmarked`

};


/**
 * Funzione per sapere se l'elemento è bookmarkato o meno
 * @param {Object} card 
 * @returns {Boolean}
 */
function isBookmarked(card){

  return bookmarked.includes(card.id)

}


/**
 * Rende una lista di card dentro la DOM
 * @param {Array} cardsList Un'array dell'oggetto della card
 * @param {Object} domElement Il node dove inseriamo le card
 */
function renderCards(cardsList, domElement) {
  
  // Uso il ciclo foreach per iterare le card
  cardsList.forEach(card => {
    
    // Inserisco la funzione per generare la card col markup
    // e la faccio iterare nel ciclo forEach
    const cardEl = generateCard(card);
    // console.log(cardEl);
    
    // Aggiungo il markup HTML al container delle carte nel DOM
    domElement.insertAdjacentHTML("beforeend", cardEl); 
    
  })

  // Prendo il Bookmark
  const iconsEl = document.querySelectorAll('.card i');

  // Itero sopra il bookmark cliccati
  iconsEl.forEach(card => {

    card.addEventListener('click', handleCardClicks)

  })

}
