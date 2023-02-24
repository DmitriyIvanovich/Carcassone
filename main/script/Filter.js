class Filter {
    constructor(desk) {
        this.desk = desk;
        this.numberLocation = 3;
    }
    getMatrixData() {
        let elemMatrix = document.querySelectorAll('#filter .choicePanel .tab')
        let arr = [];
        for (let elem of elemMatrix) {
            arr.push(+elem.dataset.value)
        }
        // print(arr);
        return arr;
    }

    getCheckboxSelected() {
        const elements = document.querySelectorAll('#filter input[type="checkbox"]')
        let selectSpecObj_id = [];
        for (let elem of elements) {
            if (elem.checked) selectSpecObj_id.push(elem.id)
        }
        return selectSpecObj_id;
    }

    differentHiddenFilter() {
        let win = document.querySelector('.filterMainWindow');
        win.classList.toggle('close');
    }
    clearMatrix() {
        let elemMatrix = document.querySelectorAll('.choicePanel .tab')
        for (let tab of elemMatrix) {
            tab.dataset.value = 0;
        }
    }
    clearSelectCheckboxes(){
        const elems = document.querySelectorAll('#filter input[type="checkbox"]');
        for (let elem of elems){
            elem.checked = false;
        }
    }

    filteringCart(cardsDOM) {
        let data_matrix = this.getMatrixData();
        const metamorphosis = __getMetamorphosis(data_matrix);
        const checkboxesSelected = this.getCheckboxSelected();
        const suitableIds = __getSuitableIds(metamorphosis, cardsDOM, checkboxesSelected);

        __hiddenAllCard(cardsDOM, suitableIds);
        __showSuitableCards(cardsDOM, suitableIds)

        function __getMetamorphosis(data_matrix) {
            let metamorphosis = [data_matrix];
            for (let i = 0; i < 3; i++) {
                let new_metamorphos = [];
                for (let n = 0; n < 3; n++) {
                    for (let m = 0; m < 3; m++) {
                        new_metamorphos.push(metamorphosis.slice(-1)[0][6 + n - m * 3])
                    }
                }
                metamorphosis.push(new_metamorphos)
                new_metamorphos = [];
            }
            return metamorphosis
        }

        function __getSuitableIds(metamorphosis, cardsDOM, checkboxesSelected) {
            let suitableIds = [];
            for (let card of cardsDOM) {

                const id = card.dataset.idCard;
                // print(manager.desk.getCardById(id).specialCards)
                let flag1 = true;
                for (let item of checkboxesSelected) {
                    let flag11 = false;
                    for (let specObj in manager.desk.getCardById(id).specialCards) {
                        if (specObj === item) flag11 = true;
                    }
                    if (flag11 === false) flag1 = false;
                }
                if (flag1 === false) continue;

                for (let metamorphos of metamorphosis) {
                    let flag2 = true;
                    metamorphos.forEach((item, index) => {
                        if (item === 0 || flag2 === false) return;
                        // print(item, id[index])
                        if (item !== +id[index]) flag2 = false;
                    })
                    if (flag2 === true) {
                        suitableIds.push(id)
                        break;
                    }
                }
            }
            return suitableIds;
        }
        function __hiddenAllCard(cardsDOM) {
            for (let card of cardsDOM) {
                card.classList.add('hidden')
            }
        }
        function __showSuitableCards(cardsDOM, suitableIds) {
            for (let card of cardsDOM) {
                if (suitableIds.includes(card.dataset.idCard))
                    card.classList.remove('hidden');
            }
        }
    }
}

