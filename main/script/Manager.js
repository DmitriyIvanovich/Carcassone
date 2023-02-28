class Manager {
    constructor(_desk, _show) {
        this.desk = new Desk(cardData);
        this.show = new Show();
        this.filter = new Filter(this.desk);
    }

    start() {
        this.runModalWindowDeskSelection()
        this.show.showCards(this.desk);
        this.show.updateCounters()

        runEvents();

        function runEvents() {
            runHendlerChoice();
            runHendlerWriteOff();
            runHendlerFilter();
            runHendlerMenuBar();
            runHendlerHistory();
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
                _skrollingFullDownHistory();

                let id = dataCard[0];
                let data_FulldataCard = manager.desk.getCardById(id)
                manager.show.updateDesk(data_FulldataCard);
                manager.show.updateCounters(manager.desk.getDataForSpecialObject())


                function _skrollingFullDownHistory() {
                    let scrolDiv = document.querySelector('#history>.cards');
                    scrolDiv.scrollTop = 9999999;
                }
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
            function selectSpecialObject(event) {
                if (!event.target.closest('label')) return;
                updateShowDesk(event);
            }

            function updateShowDesk(event) {
                const cardsDOM = document.querySelectorAll('#desk .card')
                manager.filter.filteringCart(cardsDOM)
            }
        }

        function runHendlerMenuBar() {
            let div = document.getElementById('menuBar');
            div.addEventListener('click', (event) => {
                manager.show.openMenuBar(div);
            });

            div.addEventListener('mouseleave', (event) => {

                manager.show.closeMenuBar(div);
            });
            div.addEventListener('click', (event) => {
                if (event.target.closest('.restart')) {
                    manager.runModalWindowDeskSelection();
                    manager.show.closeMenuBar(div);
                }
            });
        }
        function runHendlerHistory() {
            // let scrolDiv = document.querySelector('#history>.cards');
            // scrolDiv.addEventListener('scroll', (event) => {
            //     print(scrolDiv.scrollTop)
            // })
        }
    }

    restart() {
        this.desk.restartDesk();
        this.show.restartCard(this.desk);
        this.show.updateCounters();
    }

    runModalWindowDeskSelection() {
        let modal = document.createElement('div');
        modal.id = 'modal';
        modal.innerHTML = `<div class="message"><h3>Выберите режим игры</h3><div class="mode"></div></div>`;
        modal.querySelector('.mode').innerHTML =
            `<img src="./image/abbot.png" data-mode="abbot">
        <img src="./image/princesse.png" data-mode="princesse">`;
        let abbot = modal.querySelector('.mode :first-child');
        abbot.addEventListener('click', (event) => {
            cardData = deskAbbot;
            manager.restart();
            print(1)
            modal.remove()
        })
        let princesse = modal.querySelector('.mode :last-child');
        princesse.addEventListener('click', (event) => {
            cardData = deskAbbotPrincesseDragon;
            manager.restart();
            modal.remove()
        })
        modal.addEventListener('click', (event)=>{
            if (event.target.id === 'modal')modal.remove()
        })
        let divMain = document.querySelector('#main')
        divMain.append(modal);
    }
}