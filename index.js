document.addEventListener("DOMContentLoaded", async () => {
  //declare variables
  let div = document.querySelector("#startGame");
  let start = document.querySelector("#start");
  let deckId;
  let score = 0;
  let count;
  let value;

  let displayScore = document.createElement("h1");
  div.appendChild(displayScore);
  const player = () => {
    getCards(2);
    getCards(1);
  }
  const getId = async () => {
    try {
      //get one shuffled deck
      let card = await axios.get(
        "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
      );
      deckId = card.data.deck_id;
      debugger;
    } catch (err) {
      console.log(err);
    }
  };

  const getCards = async num => {
    try {
      // draw cards depend of the rules
      let drawCards = await axios.get(
        `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${num}`
      );
      debugger;

      let cards = drawCards.data.cards;
      cards.forEach(card => {
        //creat
        let img = document.createElement("img");
        let ulImg = document.createElement("ul");
        let displayCard = document.createElement("li");

        img.src = card.image;
        displayCard.appendChild(img);
        ulImg.appendChild(displayCard);
        div.appendChild(ulImg);

        value = card.value;
        if (value === "ACE") {
          score += 11;
        } else if (value === "KING" || value === "QUEEN" || value === "JACK") {
          score += 10;
        } else {
          score += Number(value);
        }
      });

      displayScore.innerText = score;
    } catch (err) {
      console.log(err);
    }
  };
  // add event listeners
  start.addEventListener("click", () => {
    getCards(2);
  });

  hit.addEventListener("click", () => {
    getCards(1);
  });

  stay.addEventListener("click", ()=> {
    getCards(3);
  })

  getId();
  player()
});
