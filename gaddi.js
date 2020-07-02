var pList = ['bot', 'sunu', 'mimi', 'samrat'];
function getInitialDeck() {
    let cards = [];
    ["clubs", "diamonds", "hearts", "spades"].forEach(suit => {
        for (let i = 1; i <= 13; i++) {
            cards.push(i + '_of_' + suit)
        }
    })
    return JSON.parse(JSON.stringify(cards))
}
var deck = getInitialDeck();
function playGame() {
    console.log = () => { }
    var cards = [];
    var players = shuffle([...pList]);
    var curr = 0;
    var pile = [];
    function next() {
        curr = curr === players.length - 1 ? 0 : curr + 1;
    }
    function shuffle(array) {
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
    function distributeCards() {
        deck = shuffle(deck);
        curr = 0;
        while (deck.length) {
            cards[players[curr]] = cards[players[curr]] || [];
            cards[players[curr]].push(deck.shift());
            curr = curr === players.length - 1 ? 0 : curr + 1;
        }
    }
    function match(a, b) {
        if (!a || !b) return false;
        let numa = a.split('_')[0], suita = a.split('_').pop();
        let numb = b.split('_')[0], suitb = b.split('_').pop();
        return numa==numb//suita == suitb;
    }
    function turn() {
        if (players.some(player => cards[player].length === 52)) {
            console.log(players[curr], ' won the game ', cards);
            deck = cards[players[curr]];
            return 1;
        }
        if(!players.length){ 
          deck = pile;
          pile = [];
          players = shuffle([...pList]);
          distributeCards();
          curr = 0;
          console.log("redistribute as all cards in pile");
        }
        var cp = players[curr];
        var card = cards[cp].shift();
        if (!card) {
            console.log(cp, "kicked out as has no cards");
            players.splice(curr, 1);
            curr = 0;
            return;
        }
        if (match(card, pile[pile.length - 1])) {
            console.log(cp, 'wins the pile as cards match ', card, pile[pile.length - 1], '\n');
            console.log('------ new turn -------');
            pile.push(card);
            cards[cp] = cards[cp].concat(pile);
            pile = [];
            return;
        }
        pile.push(card);
        console.log(cp, 'placed card', card, 'on pile', pile);
        next();
    }
    distributeCards();
    while (turn() !== 1);
    return players[curr];
}
let obj = {};
console.info('starting sim');
for (let i = 0; i < 1000000; i++) {
    let res = playGame();
    obj[res] = obj[res] || 0;
    obj[res]++;
}
localStorage[Date.now()] = JSON.stringify(obj);
console.info(Object.keys(obj).sort((a,b)=>obj[a]-obj[b]).map(k=> k+' - '+obj[k]).reverse())
