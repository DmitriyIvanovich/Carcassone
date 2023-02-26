class Desk {
    constructor(cardData) {
        this.restartDesk()
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

    restartDesk() {
        print('restart desk')
        this.__startData = cardData.slice(0);
        this.cards = this.__createCards(this.__startData);
        this.cardsInGame = [];
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
                            case 'v':
                                return 'vulcano';
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

    getDataForSpecialObject(){
        let specialObjects = {};
        for (let item of this.cards){
            if (!item.specialCards) continue;
            for (let key in item.specialCards){
                if (specialObjects[key]===undefined){
                    specialObjects[key]= item.specialCards[key];
                }
                else specialObjects[key] += item.specialCards[key];
            }
        }
        return(specialObjects)
    }
    
    getNumberCardNow(){
        let numbersAllCard = 0;
        for (let card of this.cards) {
            numbersAllCard += card.numberCards
        }
        return numbersAllCard;
    }
    getNumberCardInGame(){
        // print(this.cardsInGame.length)
        return this.cardsInGame.length;
    }
}