let print = console.log;
let dir = console.dir;
// 111, 221, 121 x9 f1
// 121, 121, 121 x8 f1
// 111, 222, 121 x4
// 121, 222, 121 x1
// 111, 111, 111 x4 s4
// 111, 122, 111 x2 s2
// 131, 111, 111 x5 f1
// 111, 322, 121 x3
// 121, 322, 111 x3
// 131, 311, 111 x2 f1
// card_111 313 111 x3 f1
// card_131 222 111 x4
// card_131 222 121 x3
// card_133 113 111 x5 f2
// card_121 322 331 x5
// card_111 333 111 x3
// card_333 333 333 x1
// card_111 333 333 x4 f1
// card_121 333 333 x3

let cardData = [
    ['111221121', 9, ['1f']],
    ['121121121', 8, ['1f', '3s']],
    ['111222121', 4],
    ['121222121', 1],
    ['111111111', 4, ['4s']],
    ['111122111', 2, ['2s']],
    ['131111111', 5, ['1f']],
    ['111322121', 3],
    ['121322111', 3],
    ['131311111', 2, ['1f']],
    ['111313111', 3, ['1f']],
    ['131222111', 4],
    ['131222121', 3],
    ['133113111', 5, ['2f']],
    ['121322331', 5],
    ['111333111', 3],
    ['333333333', 1],
    ['111333333', 4, ['1f']],
    ['121333333', 3],
];

class Card {
    constructor() {
        this.data = cardData.slice(0);

    }
    getAllCardsId() {
        return this.data.map((item) => item[0])
    }
    getCardById(id) {
        let card = {}
        this.data.forEach(item => {
            if (item[0] === id) {
                card.id = id;
                card.numberCards = item[1];
                card.specialCardsData = item[2];
                card.numberSpecialCards = numberSpecialCards();
                card.allData = item;

                function numberSpecialCards() {
                    let arr = card.specialCardsData;
                    if (!arr) return 0;
                    let number = arr.reduce((prev, item) => {
                        return prev + parseInt(item);
                    }, 0)
                    return number;
                }
            }
        });
        return card
    }
}

export { Card }