class Manager {
    constructor(_desk, _show) {
        this.desk = new Desk(cardData);
        this.show = new Show();
        this.filter = new Filter(this.desk);
    }

    start() {
        this.show.showCards(this.desk);
        this.show.updateCounters()

        runEvents();

        function runEvents() {
            runHendlerChoice();
            runHendlerWriteOff();
            runHendlerFilter();
            runHendlerMenuBar();
        }

        function runHendlerWriteOff() {
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

        function runHendlerChoice() {
            let cards = document.querySelector('#desk > .cards');
            cards.addEventListener('click', choice);

            function choice(event) {
                if (!event.target.closest('.cards > .card')) return;
                let card = event.target.closest('.cards > .card');
                manager.show.showCardInWriteOffWindow(card);
            }
        }

        function runHendlerFilter() {
            let but = document.querySelector('#filter > div.buttonOpenClose');
            but.onclick = () => manager.filter.differentHiddenFilter();

            let win = document.querySelector('#filter > div.filterMainWindow');
            win.addEventListener('click', eventMatrixMouseL);
            win.addEventListener('contextmenu', eventMatrixMouseR);
            win.addEventListener('click', selectSpecialObject);
            win.addEventListener('click', zeroingMatrixBut);

            function eventMatrixMouseL(event) {
                let target = event.target;
                if (!target.closest('.tab')) return;
                let tab = target.closest('.tab');
                if (tab.dataset.value < manager.filter.numberLocation) {
                    tab.dataset.value++;
                }
                updateShowDesk(event);
            }
            function eventMatrixMouseR(event) {
                event.preventDefault()
                let target = event.target;
                if (!target.closest('.tab')) return;
                let tab = target.closest('.tab');
                if (tab.dataset.value > 0) {
                    tab.dataset.value--;
                }
                updateShowDesk(event);
            }
            function zeroingMatrixBut(event) {
                if (!event.target.closest('div.buttonClear')) return;
                manager.filter.clearMatrix();
                manager.filter.clearSelectCheckboxes();
                updateShowDesk(event);
            }
            function selectSpecialObject(event){
                if (!event.target.closest('label')) return;
                updateShowDesk(event);
            }

            function updateShowDesk(event){
                const cardsDOM = document.querySelectorAll('#desk .card')
                manager.filter.filteringCart(cardsDOM)
            }
        }

        function runHendlerMenuBar(){
            let div = document.getElementById('menuBar');
            div.addEventListener('click', (event)=>{
               div.classList.add('open');
            setTimeout(()=>div.firstElementChild.classList.remove('close'), 500);
            });

            div.addEventListener('mouseleave', (event)=>{
                div.firstElementChild.classList.add('close')
                div.classList.remove('open') 
            });
        }
    }
}