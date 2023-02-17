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
    [1, 1, 1, 2, 2, 1, 1, 2, 1, [9, '1f']],
    [1, 2, 1, 1, 2, 1, 1, 2, 1, [8, '4f', '3s']],
    [1, 1, 1, 2, 2, 2, 1, 2, 1, [4]],
    [1, 2, 1, 2, 2, 2, 1, 2, 1, [1]],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, [4]],
    [1, 1, 1, 1, 2, 2, 1, 1, 1, [2]],
    [1, 3, 1, 1, 1, 1, 1, 1, 1, [5]],
    [1, 1, 1, 3, 2, 2, 1, 2, 1, [3]],
    [1, 2, 1, 3, 2, 2, 1, 1, 1, [3]],
    [1, 3, 1, 3, 1, 1, 1, 1, 1, [2]],
    [1, 1, 1, 3, 1, 3, 1, 1, 1, [3]],
    [1, 3, 1, 2, 2, 2, 1, 1, 1, [4]],
    [1, 3, 1, 2, 2, 2, 1, 2, 1, [3]],
    [1, 3, 3, 1, 1, 3, 1, 1, 1, [5]],
    [1, 2, 1, 3, 2, 2, 3, 3, 1, [5]],
    [1, 1, 1, 3, 3, 3, 1, 1, 1, [3]],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, [1]],
    [1, 1, 1, 3, 3, 3, 3, 3, 3, [4]],
    [1, 2, 1, 3, 3, 3, 3, 3, 3, [3]],
];

class Card {
    constructor() {
        this.data = cardData.slice(0);

    }
    getAllCardsId() {
        return this.data.map((item) => item.slice(0, 9).join(''))
    }
    // getAllNumberCards(){
    //     return this.data.map((item) => item[9][0])
    // }
    // getAllSpecialCards(){
    //     return this.data.map((item) => item[9].slice(1))
    // }
    getCardById(id) {
        let card = {}
        this.data.forEach(item => {
            if (item.slice(0, 9).join('') === id) {
                card.id = id;
                card.numberCards = item[9][0];
                card.specialCards = item[9].slice(1)
                card.numberSpecialCards = numberSpecialCards()
                card.allData = item;

                function numberSpecialCards() {
                    let arr = item[9].slice(1);
                    let number = arr.reduce((prev, item) => {
                        return prev + parseInt(item);
                    }, 0)
                    print(number)
                    return number;
                }
            }
        });
        return card
    }
}

let card = new Card()

export { Card }