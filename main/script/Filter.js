class Filter{
    constructor(desk){
        this.desk = desk;
        this.numberLocation = 3;
        }
    getMatrixData(){
        let elemMatrix = document.querySelectorAll('#filter . choicePanel .tab')
        let arr = [];
        for (let elem of elemMatrix){
            arr.push(+elem.dataset.value)
        }
        print(arr);
        return arr;
    }

    differentHiddenFilter(){
        let win = document.querySelector('.filterMainWindow');
        win.classList.toggle('close');
    }
    clearMatrix(){
        let elemMatrix = document.querySelectorAll('.choicePanel .tab')
        for (let tab of elemMatrix) {
            tab.dataset.value = 0;
        }
    }
}

