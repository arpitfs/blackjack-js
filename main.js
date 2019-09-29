let suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'],
    values = ['Ace', 'Jack', 'King', 'Queen', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];

let cardDic= {'Ace':1, 'Jack':10, 'King':10, 'Queen':10, 'Two':2, 'Three':3, 'Four':4, 'Five':5, 'Six':6, 'Seven':7, 'Eight':8, 'Nine':9, 'Ten':10}

let textArea = document.getElementById('text-area');
    newGameButton = document.getElementById('new-game-button');
    hitButton = document.getElementById('hit-button');
    titleArea = document.getElementById('title-area');
    stayButton = document.getElementById('stay-button');

let deck = [];
let playerCards = [],
    dealerCards = [];

function createDeck(){    
    for(suitsIdx = 0 ; suitsIdx < suits.length ; suitsIdx++){
        for(valuesIdx = 0 ; valuesIdx < values.length ; valuesIdx++){
            let card = {
                suit : suits[suitsIdx],
                value : values[valuesIdx]
            };
            deck.push(card);           
        }
    }     
    return deck;
}       

newGameButton.addEventListener('click', function(){
    newGameButton.style.display  = 'none';
    let deck = createDeck();
    shuffleCards(deck);
   
    playerCards = [ getNextCard(deck), getNextCard(deck)];  
    dealerCards = [ getNextCard(deck), getNextCard(deck)];
    
    titleArea.innerHTML = '<h1>Game On!</h1>';    
    showStatus();
});

function showStatus(){
    let dealerScore = getDealerCardsScore(dealerCards),
        playerScore = getPlayerCardsScore(playerCards);       

        textArea.innerText = 'Dealers Cards: \n' + getDealerCards(dealerCards) + 'Score : ' + getDealerCardsScore(dealerCards) + '\n \n' +
                             'Players Cards: \n' + getPlayerCards(playerCards) + 'Score : ' + getPlayerCardsScore(playerCards);                                

        if(dealerScore > 21){
            textArea.innerText += '\n\n' + ' PLAYER WINS'  
            newGameButton.style.display = 'inline';
            hitButton.style.display = 'none';
            stayButton.style.display = 'none';
        }                     
        else if (playerScore > 21){
            textArea.innerText += '\n\n' + ' DEALER WINS'   
            newGameButton.style.display = 'inline';
            hitButton.style.display = 'none';
            stayButton.style.display = 'none';                   
        }
        else if(dealerScore == 21 || playerScore == 21)
        {
            textArea.innerText += '\n\n' + ' BLACK JACK'
            dealerScore == 21? textArea.innerText += '\n\n' + 'DEALER WINS' : null
            playerScore == 21? textArea.innerText += '\n\n' + 'PLAYER WINS' : null
        }
}

hitButton.addEventListener('click', function(){
    playerCards.push(getNextCard(deck));    
    showStatus();
});

stayButton.addEventListener('click', function(){
    let dealerScore = getDealerCardsScore(dealerCards),
        playerScore = getPlayerCardsScore(playerCards);
    if(playerScore >= dealerScore){
        dealerCards.push(getNextCard(deck));    
    }    
    showStatus();
});

function getDealerCardsScore(dealerCards){  
    let score = 0;
    for(let i=0;i<dealerCards.length;i++){             
        score = score + cardDic[dealerCards[i].value];               
    }    
    return score;
}

function getPlayerCardsScore(playerCards){
    let score = 0;
    for(let i=0;i<playerCards.length;i++){     
        score = score + cardDic[playerCards[i].value];      
    }    
    return score;
}

function getDealerCards(collectionOfDealerCards){    
    let dealerCardsFullString = [];
    for(let i = 0; i < collectionOfDealerCards.length; i++){
        dealerCardsFullString[i] = collectionOfDealerCards[i].value + ' of ' + collectionOfDealerCards[i].suit + '\n';        
    }
    return dealerCardsFullString;
}

function getPlayerCards(collectionOfPlayerCards){
    let playerCardsFullString = [];
    for(let i = 0; i < collectionOfPlayerCards.length; i++){
        playerCardsFullString[i] = collectionOfPlayerCards[i].value + ' of ' + collectionOfPlayerCards[i].suit + '\n'
    }
    return playerCardsFullString;
}

function getNextCard(deck){
  let card = deck.shift();  
  return card;
};

function shuffleCards(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
}


