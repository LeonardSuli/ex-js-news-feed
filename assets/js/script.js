

//Step 1: struttura dei dati

const news = [

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
      tags: "cucina",
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
        alt: "Arte sul muro nel parcheggio bici.",
      }
    }
];

console.log(news);