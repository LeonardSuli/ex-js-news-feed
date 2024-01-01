

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
  
  
  // Funzione per generare la card col markup
  function generateCard(card){
    
    // Variabile per creare bottoni ad ogni nuovo tag
    const tagsButtons = card.tags.map(tag => `<button class="btn_${tag}">${tag}</button>`).join('');
    
    // Inserito data in formato italiano
    card.published = new Date(card.published).toLocaleDateString('it-IT');
    // console.log(card.published);

    // Creato markup della card in HTML
    const cardMarkup = `<div class="card">
                            <h2>${card.title}</h2>
                            <span id="author">pubblicato da ${card.author}</span>
                            <span id="published">in data ${card.published}</span>
                            <p id="content">${card.content}</p>
                            <img src="./assets/img/${card.image.url}" alt="${card.image.alt}">
                            ${tagsButtons}

                        </div>`

    return cardMarkup

}


// Seleziono l'elemento DOM dove aggiungo tutte le card
const cardsEl = document.querySelector('.cards')


// Uso il ciclo foreach per iterare le card
cards.forEach(card => {

    // console.log(card);

    // Salvo in una variabile la funzione per generare la card
    const cardEl = generateCard(card)
    // console.log(cardEl);

    // Aggiungo il markup HTML al container delle carte nel DOM
    cardsEl.insertAdjacentHTML("beforeend", cardEl);

})

