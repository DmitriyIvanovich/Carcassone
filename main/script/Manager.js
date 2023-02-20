class Manager {
    constructor(_desk, _show) {
        this.desk = new Desk(cardData);
        this.show = new Show();
    }

    start() {
        this.show.showCards(this.desk);
        manager.show.updateCounters()
        runEvents();

        function runEvents() {
            runEventChoice();
            runEventWriteOff();
        }

        function runEventWriteOff() {
            let button = document.querySelector('#write-offWindow a');
            button.addEventListener('click', writeOffCard)

            function writeOffCard(event) {
                event.preventDefault();
                let dataCard = manager.show.clearWriteOffWindow();
                if (!dataCard) return;
                manager.desk.writeOffCard(dataCard);

                manager.show.addCardInHistoryWindow(dataCard, manager.desk.cardsInGame.length);

                let id = dataCard[0];
                let data_FulldataCard = manager.desk.getCardById(id) 
                manager.show.updateDesk(data_FulldataCard);
                manager.show.updateCounters(manager.desk.getDataForSpecialObject())

            }
        }

        function runEventChoice() {
            let cards = document.querySelector('#desk > .cards');
            cards.addEventListener('click', choice);

            function choice(event) {
                if (!event.target.closest('.cards > .card')) return;
                let card = event.target.closest('.cards > .card');
                manager.show.showCardInWriteOffWindow(card);
            }
        }
    }
}