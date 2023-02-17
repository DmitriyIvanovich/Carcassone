import { Card } from './data.js'

let print = console.log;
let dir = console.dir;
'use strict'

let desk;


restartDesk();
showCards();





function restartDesk() {
    desk = new Card();
}

function showCards() {
    let cards = new DocumentFragment();

    for (let id of desk.getAllCardsId()) {
        let img = document.createElement('img');
        let src = `./image/card_${id.substr(0, 3)} ${id.substr(3, 3)} ${id.substr(6, 3)}.png`;
        img.setAttribute('src', src);

        let point = document.createElement('div');
        point.classList.add('point');
        point.innerHTML = desk.getCardById(id).numberCards
        if (desk.getCardById(id).numberSpecialCards > 0) {
            point.classList.add('special')
        };

        let div = document.createElement('div');
        div.className = 'card';
        div.append(img, point);

        cards.append(div);
    }
    document.querySelector('#desk > .cards').append(cards);
}
