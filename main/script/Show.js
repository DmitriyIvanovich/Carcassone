class Show {
    constructor() {
    }

    showCards(desk) {
        let cardsNode = new DocumentFragment();

        for (let card of desk.cards) {
            let img = document.createElement('img');
            let src = `./image/card_${card.id.substr(0, 3)} ${card.id.substr(3, 3)} ${card.id.substr(6, 3)}.png`;
            img.setAttribute('src', src);
            img.dataset.idCard = card.id;

            let point = document.createElement('div');
            point.classList.add('point');
            point.innerHTML = card.numberCards
            if (card.specialCards) {
                point.classList.add('special')
            };

            let div = document.createElement('div');
            div.className = 'card';
            div.dataset.idCard = card.id;
            div.append(img, point);

            cardsNode.append(div);
        }
        document.querySelector('#desk > .cards').append(cardsNode);
    }

    clearWriteOffWindow() {
        let writeOffCard = document.querySelector('#selectCard');
        if (!writeOffCard) return null;
        let idCard = writeOffCard.dataset.idCard;
        let specialObjDiv = document.querySelector('#write-offWindow .specialObjects');
        let specialObj = getSpecialObjInDiv(specialObjDiv);
        writeOffCard.parentNode.innerHTML = '';
        specialObjDiv.innerHTML = ''

        return [idCard, specialObj];

        function getSpecialObjInDiv(Div) {
            let specialObj = [];
            let listCheckbox = Div.querySelectorAll('input[type="checkbox"]')
            for (let item of listCheckbox) {
                if (item.checked) specialObj.push(item.name);
            }

            return specialObj;
        }
    }

    showCardInWriteOffWindow(card) {
        let idCard = card.dataset.idCard;
        let img = card.firstElementChild.cloneNode(false);
        img.id = 'selectCard';
        let div = document.querySelector('#write-offWindow > .card');
        div.innerHTML = '';
        div.append(img);

        div = document.querySelector('#write-offWindow .specialObjects');
        div.innerHTML = '';
        let specialObjs = manager.desk.getCardById(idCard).specialCards;
        for (let obj in specialObjs) {
            let label = document.createElement('label')
            label.for = obj;
            label.innerHTML = `<input type="checkbox" name="${obj}" id="${obj}"><span>${obj}</span>`;
            div.append(label)
        }
    }

    addCardInHistoryWindow(dataCard, cardsInGame) {
        let divHistory = document.querySelector('#history .cards > .wrapper')
        let divCard = document.createElement('div')
        divCard.className = 'card';
        let divIcon = document.createElement('div');
        divIcon.className = 'icon';
        let img = document.createElement('img');
        let src = `./image/card_${dataCard[0].substr(0, 3)} ${dataCard[0].substr(3, 3)} ${dataCard[0].substr(6, 3)}.png`;
        img.setAttribute('src', src);
        let divMiniIcon = document.createElement('div');
        divMiniIcon.className = 'miniIcon';
        if (dataCard[1].length != 0) {
            for (let item of dataCard[1]) {
                let imgSpecObj = document.createElement('img');
                let src = `./image/special_${item}.png`;
                imgSpecObj.setAttribute('src', src);
                divMiniIcon.append(imgSpecObj)
            }
        }
        let divInfo = document.createElement('div');
        divInfo.className = 'info';
        divInfo.innerHTML = `<span>Ход №${cardsInGame-1}</span>`
        

        divIcon.append(img)
        divIcon.append(divMiniIcon)
        divCard.append(divIcon, divInfo);
        divHistory.append(divCard)
    }
    updateDesk(data_FulldataCard){
        let domCard = document.querySelector(`#desk .card[data-id-card = '${+data_FulldataCard.id}']`)
        if (data_FulldataCard.numberCards <= 0) {
            domCard.style.display = 'none';
            return
        }
        let domPoint = domCard.querySelector('.point');
        if (isEmpty(data_FulldataCard.specialCards)) {
            domPoint.classList.remove('special');
        }
        domPoint.innerHTML = `${data_FulldataCard.numberCards}`
        
        function isEmpty(obj) {
            for (let key in obj) {
                return false;
            }
            return true;
        }
    }

    updateCounters(){
        this.__updateSpecialObjectBar(manager.desk.getDataForSpecialObject())
        this.__updateDeskCounter(manager.desk.getNumberCardNow())
        this.__updateHistoryCounter(manager.desk.getNumberCardInGame())
    }

    __updateHistoryCounter(numberCards){
        let h3 = document.querySelector('#history h3')
        h3.firstElementChild.textContent = numberCards;
    }

    __updateDeskCounter(numberCards){
        let h3 = document.querySelector('.rightSide h3')
        h3.firstElementChild.textContent = numberCards;
    }

    __updateSpecialObjectBar(DataForSpecialObject){
        let lis = document.querySelectorAll('#specialObjectBar li');
        anchor: for (let elem of lis){
            let nameObj = elem.querySelector('img').src;
            for (let key in DataForSpecialObject){
                if (nameObj.includes(key)){
                    elem.lastElementChild.innerHTML = `${DataForSpecialObject[key]}`
                    continue anchor;
                }
            }
            if (!elem.classList.contains('enpty')) elem.classList.add('enpty')
        }
    }
}