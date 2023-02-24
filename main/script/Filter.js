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

    filteringCart(cardsDOM) {
        let data_matrix = this.getMatrixData();
        const metamorphosis = __getMetamorphosis(data_matrix)
        const suitableIds = __getSuitableIds(metamorphosis, cardsDOM)
        print(suitableIds);
        hiddenAllCard(cardsDOM, suitableIds);
        showSuitableCards(cardsDOM, suitableIds)

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

        function __getSuitableIds(metamorphosis, cardsDOM){
            let suitableIds = [];
            for (let card of cardsDOM) {
                const id = card.dataset.idCard;

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
        function hiddenAllCard(cardsDOM){
            for (let card of cardsDOM){
                card.classList.add('hidden')
            }
        }
        function showSuitableCards(cardsDOM, suitableIds){
            for (let card of cardsDOM){
                if (suitableIds.includes(card.dataset.idCard))
                card.classList.remove('hidden');
            }
        }
    }
}

