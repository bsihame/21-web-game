document.addEventListener("DOMContentLoaded", async() => {
  //variable
  //getCards()
  // let div = document.querySelector("#startGame");
  let div = document.querySelector("#startGame")
  let start = document.querySelector("#start")
  let deckId;
  let score = 0
  let count;
  let value;
  let displayScore = document.createElement("h1")
  div.appendChild(displayScore);
  
  const getCards = async (num) => {
    try{
      //fetch shuffle deck
      let card = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
      //debugger
      
      deckId = card.data.deck_id
      let drawCards = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${num}`);
      debugger
      
      let cards = drawCards.data.cards
      cards.forEach(card => {
        //creat
        let img = document.createElement("img");
        let ulImg = document.createElement("ul");
        let displayCard = document.createElement("li")
        
        
        img.src = card.image
        displayCard.appendChild(img)
        ulImg.appendChild(displayCard)
        div.appendChild(ulImg)
        
        value = card.value
        if(value === "ACE"){
          score += 11
        } else if (value === "KING"||value === "QUEEN"||value === "JACK" ){
          score += 10
        } else {
          score += Number(value)
        }
        
      });
      
      displayScore.innerText = score;
      
    } catch(err) {
      console.log(err)
    }
  }

  const getOneCard = async () => {
    try {
    let drawOneCard = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
    let addCard = drawOneCard.data.cards
    // addCard.forEach(card => {
      //creat
      let img = document.createElement("img");
      let ulImg = document.createElement("ul");
      let displayCard = document.createElement("li")
      
      
      img.src = addCard.image
      displayCard.appendChild(img)
      ulImg.appendChild(displayCard)
      div.appendChild(ulImg)
      
      value = card.value
      if(value === "ACE"){
        score += 11
      } else if (value === "KING"||value === "QUEEN"||value === "JACK" ){
        score += 10
      } else {
        score += Number(value)
      }
      debugger
      
  // })

  displayScore.innerText = score;
} catch (err) {
  console.log(err)
}
}
  // add event listener
  start.addEventListener("click", () => {
      
    getCards(2);
  })

  hit.addEventListener("click", ()=> {
    getOneCard();
  });

  stay.addEventListener("click", ()=> {
    getCards(3);
  })

  
});
