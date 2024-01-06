

// Step 1: struttura dei dati
// Partendo dai dati forniti crea le strutture dati necessarie sfruttando array 
// e oggetti facendo attenzione agli attributi che caratterizzano ciascuna news.


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
      }
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
      }
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
      }
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
      }
    }
];

// console.log(cards);
  
  
// Step 2 - Stampa dei dati in pagina
// Prendendo come riferimento il layout di esempio presente nell'HTML 
// stampa in pagina le news del nostro feed utilizzando JavaScript.
  

// Seleziono l'elemento della DOM dove aggiungo tutte le card e la salvo in una variabile
const cardsEl = document.querySelector('.cards');
  

// Funzione che rende una lista di card dentro la DOM
renderCards(cards, cardsEl);


// Step 3: filtri
// Crea l’interfaccia dei filtri utilizzando tag di input appropriati. 
// Recupera in JavaScript i valori selezionati dall’utente da utilizzare 
// nel codice per le logiche di filtraggio gli elementi.


// Seleziono l'elemento select nella DOM e la salvo in una variabile
const selectEl = document.getElementById('tag_type');


// Aggiungo un event listener con l'evento change per la select
selectEl.addEventListener('change', function(e){

  console.log(e.target.value);
  
  // Filtro le carte in base al tag selezionato
  const filteredCards = cards.filter(card => {

    // Verifico se almeno un elemento dell'array di tags è uguale al tag selezionato
    for (let i = 0; i < card.tags.length; i++) {
      
      if (card.tags[i] === e.target.value || e.target.value === 'all') {
        return true;
      }
      
    }
    
  });

  console.log(filteredCards);

  // Resetto la select ogni volta che cambio option
  cardsEl.innerHTML = '';

  // Condizione che specifica che se un tag non ha una card restituisce un empty state
  if(filteredCards.length === 0){

    cardsEl.innerHTML = `<h2 class='empty_state'>No news available.</h2>`;

  }else{

    // Altrimenti restituisce la card richista
    renderCards(filteredCards, cardsEl);

  }


});


// Ottengo l'unicità dei tipi di tag
const typesList = new Set(cards.flatMap(card => card.tags));

console.log(typesList);
































/**
 * Funzione per generare il markup della card
 * @param {object} card L'oggetto della card
 * @returns object
 */
function generateCard(card){
    
  // Inserito data in formato italiano
  card.published = new Date(card.published).toLocaleDateString('it-IT');
  
  // Ciclo map per creare bottoni ad ogni nuovo tag aggiunto
  const tagsButtons = card.tags.map(tag => 
    `<button class="btn_${tag}">${tag}</button>`).join('');

  // Creato markup della card in HTML con il template literal
  const cardMarkup = `<div class="card">
                          <h2>${card.title}</h2>
                          <span id="author">pubblicato da ${card.author}</span>
                          <span id="published">in data ${card.published}</span>
                          <p id="content">${card.content}</p>
                          <img src="./assets/img/${card.image.url}" alt="${card.image.alt}">
                          ${tagsButtons}
                      </div>`;
                          // <i id="icon" class="fa-solid fa-bookmark"></i>

  return cardMarkup
  
}


/**
 * Rende una lista di card dentro la DOM
 * @param {Array} cardsList Un'array dell'oggetto della card
 * @param {Object} domElement Il node dove inseriamo le card
 */
function renderCards(cardsList, domElement) {
  
  // Uso il ciclo foreach per iterare le card
  cardsList.forEach(card => {
    
    // console.log(card);
    
    // Inserisco la funzione per generare la card col markup
    // e la faccio iterare nel ciclo forEach
    const cardEl = generateCard(card);
    // console.log(cardEl);
    
    // Aggiungo il markup HTML al container delle carte nel DOM
    domElement.insertAdjacentHTML("beforeend", cardEl); 
    
    })
}










