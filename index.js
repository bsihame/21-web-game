document.addEventListener("DOMContentLoaded", () => {
  //declare variables

  let divPlayer = document.querySelector("#player-turn");
  let divComputer = document.querySelector("#computer-turn");
  let start = document.querySelector("#start");
  let deckId;
  let playerScore = 0;
  let computerScore = 0;
  let value;

  
  let displayScorePlayer = document.createElement("p");
  let displayScoreComputer = document.createElement("p");
  divPlayer.appendChild(displayScorePlayer);
  divComputer.appendChild(displayScoreComputer);

  const getId = async () => {
    try {
      //get one shuffled deck
      let card = await axios.get(
        "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
      );
      deckId = card.data.deck_id;
    } catch (err) {
      console.log(err);
    }
  };

  const player = async num => {
    try {
      // draw cards depend of the rules
      let drawCards = await axios.get(
        `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${num}`
      );

      let cards = drawCards.data.cards;
      cards.forEach(card => {
        let imgPlayer = document.createElement("img");
        imgPlayer.src = card.image;
        divPlayer.appendChild(imgPlayer);
        value = card.value;
        
        if (value === "ACE") {
          if (playerScore <= 10) {
            playerScore += 11;
          } else {
            playerScore += 1;
          }
        } else if (value === "KING" || value === "QUEEN" || value === "JACK") {
          playerScore += 10;
        } else {
          playerScore += Number(value);
        }
      });
      if (playerScore === 21) {
        result = "You Won!!";
        console.log("P1")
      } else if (playerScore > 21) {
        result = "You Are Busted!!";
        console.log("P2")
      }
      displayScorePlayer.innerText = playerScore;
      let h2 = document.createElement("h2");
      let div = document.querySelector("#startGame")
      h2.innerText = result;
      div.appendChild(h2)

    } catch (err) {
      console.log(err);
    }
  };

  const computer = async num => {
    try {
      // draw cards depend of the rules
      let drawCards = await axios.get(
        `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${num}`
      );
      let cards = drawCards.data.cards;

      cards.forEach(card => {
        let imgComputer = document.createElement("img");
        imgComputer.src = card.image;
        divComputer.appendChild(imgComputer);
        value = card.value;
        
        if (value === "ACE") {
          if (computerScore <= 10) {
            computerScore += 11;
          } else {
            computerScore += 1;
          }
        } else if (value === "KING" || value === "QUEEN" || value === "JACK") {
          computerScore += 10;
        } else {
          computerScore += Number(value);
        }
        // check the winner
      });
        if (computerScore === 21) {
          result = "You Are Busted!!";
          console.log("C1")
        } else if (computerScore > 21) {
          result = "You Won!!";
          console.log("C2")
        }
    
        displayScoreComputer.innerText = computerScore;
        let h2 = document.createElement("h2");
        let div = document.querySelector("#startGame")
        h2.innerText = result;
        div.appendChild(h2)
      
    } catch (err) {
      console.log(err);
    }
  };

  // add event listeners

  getId();
  
  start.addEventListener("click", () => {
    player(2);
  });

  hit.addEventListener("click", () => {
    player(1);
  });

  stay.addEventListener("click", () => {
    computer(3);
  });
});
