

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
  
// Seleziono l'elemento select nella DOM e la salvo in una variabile
const selectEl = document.getElementById('tag_type');

// Seleziono l'elemento checkbox nella DOM e la salvo in una variabile
const checkboxEl = document.getElementById('news_saved');

const bookmark = document.getElementById('bookmark');



// Funzione che rende una lista di card dentro la DOM
renderCards(cards, cardsEl);


// Step 3: filtri
// Crea l’interfaccia dei filtri utilizzando tag di input appropriati. 
// Recupera in JavaScript i valori selezionati dall’utente da utilizzare 
// nel codice per le logiche di filtraggio gli elementi.


// Aggiungo un event listener con l'evento change per la select
selectEl.addEventListener('change', function(e){

  // console.log(e.target.value);
  
  // Filtro le carte in base al tag selezionato
  const filteredCards = cards.filter(card => {

    // Verifico se almeno un elemento dell'array di tags è uguale al tag selezionato
    for (let i = 0; i < card.tags.length; i++) {
      
      if (card.tags[i] === e.target.value || e.target.value === 'all') {
        return true;
      }
      
    }
    
  });

  // console.log(filteredCards);

  // Resetto la select ogni volta che cambio option
  cardsEl.innerHTML = '';

  // Condizione che specifica che se un tag non ha una card restituisce un empty state
  if(filteredCards.length == 0){

    cardsEl.innerHTML = `<h2 class='empty_state'>No news available.</h2>`;

  }else{

    // Altrimenti restituisce la card richista
    renderCards(filteredCards, cardsEl);

  }

});


// Ottengo l'unicità dei tipi di tag
const tagsList = new Set(cards.flatMap(card => card.tags));

// console.log(tagsList);


// Funzione che restituisce le options dinamicamente
renderOptions(tagsList, selectEl);



// Step 4: bookmark
// 1-Crea su ogni componente News un pulsante per il salvataggio della News.
// 2-Se clicchiamo l’icona bookmark, cambiamo l’aspetto dell’icona (es. da vuota a piena) 
//   e aggiungiamo l’id della News nell’array degli id delle news salvate.
// 3-L’id della news è un dato “nascosto” che vorrai inserire in pagina per recuperarlo in seguito
//   al click dell’icona bookmark. Per farlo dovresti utilizzare un data-attribute.
// 4-In fase di stampa dell’elenco di news dovrai controllare se la news è salvata o meno 
//   per poter dare il giusto aspetto all’icona bookmark.


checkboxEl.addEventListener('click', function(){
  console.log('ciao');


})








/**
 * Rende tutte le options nella select dinamicamente
 * @param {Array} optionsList Una lista di stringhe
 * @param {object} selectDomEl L'elemento DOM della select dove appendere tutte le options
 */
function renderOptions(optionsList, selectDomEl){

  optionsList.forEach(optionValue => {
    
    const optionEl = document.createElement('option');

    optionEl.value = optionValue;
    optionEl.innerText = optionValue;
    
    
    // const capitalizedName = optionValue.charAt(0).toUpperCase() + optionValue.slice(1, optionValue.length).toLowerCase();
    
    // optionEl.value = capitalizedName;
    // optionEl.innerText = capitalizedName;
    
    selectDomEl.appendChild(optionEl);
    
  })
}


/**
 * Funzione per generare il markup della card
 * @param {object} card L'oggetto della card
 * @returns object
 */
function generateCard(card){
    
  // Inserito data in formato italiano
  card.published = new Date(card.published).toLocaleDateString('it-IT');
  console.log(card.published);
  
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
                          <i id="bookmark-${card.id}" class="${card.bookmarked ? 'fa-solid' : 'fa-regular'} fa-bookmark bookmark"
                          data-id="${card.id}"></i>
                      </div>`;

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





























