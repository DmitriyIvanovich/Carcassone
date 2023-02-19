class Desk {
    constructor(cardData) {
        this.__startData = cardData.slice(0);
        this.cards = this.__createCards(this.__startData);
        this.cardsInGame = [];
    }

    getAllCardsId() {
        return this.__startData.map((item) => item[0])
    }

    getCardById(id) {
        for (let card of this.cards) {
            if (card.id === id) return card
        }
        return null;
    }

    writeOffCard(dataCard) {
        let card = this.__removeCardInDesk(dataCard);
        this.cardsInGame.push(card);
        return dataCard;
    }

    restartDesk(cardData) {
        // constructor(cardData);
    }

    __createCards(data) {
        let cards = [];

        data.forEach(item => {
            let card = {};
            card.id = item[0];
            card.numberCards = item[1];
            card.specialCards = __getspecialCardsData(item);
            card.startData = item;


            function __getspecialCardsData(data) {
                if (!data[2]) return null;
                let specObjs = {};
                let str = data[2];
                let arr = str.split(' ');
                arr.forEach(item => {
                    let nameObj = item.match(/\D/g).join('');
                    nameObj = __convertNameSpecialObj(nameObj);
                    let number = +item.match(/\d/g).join('');
                    specObjs[nameObj] = number;

                    function __convertNameSpecialObj(shortName) {
                        switch (shortName) {
                            case 'f':
                                return 'flower';
                            case 's':
                                return 'sobor';
                            case 'd':
                                return 'dragon';
                            case 'p':
                                return 'princesse';
                            case 'o':
                                return 'portal';
                        }
                    }
                })
                return specObjs;
            }
            cards.push(card);
        });
        return cards;
    }

    __removeCardInDesk(dataCard) {
        let card = this.getCardById(dataCard[0]);
        card.numberCards--;
        for (let speciasObj of dataCard[1]){
            if (!card.specialCards[speciasObj]) continue;
            card.specialCards[speciasObj]--;
            if (card.specialCards[speciasObj] === 0) delete card.specialCards[speciasObj];
        }
    }

    
}