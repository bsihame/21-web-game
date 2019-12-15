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
  
  const getCards = async () => {
    try{
      //get one shuffled deck
      let card = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
      deckId = card.data.deck_id
      debugger
    } catch(err) {
      console.log(err)
    }
  }
 
});