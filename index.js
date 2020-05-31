class MenuItem {
    constructor(name, val) {
        this.name = name;
        this.link = `#${this.name}`;
        this.class = '';
        this.val = val;
    }

    clearItemClass() {
        this.class = '';
    }

    setItemClass() {
        this.class = 'active';
    }
}

class MenuList {
    constructor() {
        this.index = 0;
        this.itemsList = [];
        this.loadMenuList(['menu', 'about us', 'contact']);
        this.renderMenuList();
        this.activateItemByKey();
    }

    loadMenuList(menuElements) {
        menuElements.map((item, i) => {
            let newEl = new MenuItem(item, i);
            if (i === 0) {
                newEl.class = 'active';
            }
            this.itemsList.push(newEl);
        })
    }

    renderMenuList() {
        document.body.innerHTML = "";
        const ul = document.createElement('ul');
        ul.classList.add('menu__list')
        let stringItems = '';
        this.itemsList.map(item => {
            stringItems += `<li onclick="getItem(event)" value="${item.val}" class="menu__item ${item.class}"><a href="${item.link}" class="menu__link">${item.name}</a></li>`
        })
        ul.innerHTML = stringItems;
        document.body.append(ul);
    }

    lowerIndex() {
        this.index === 0 ? this.index = this.itemsList.length-1 : this.index -= 1;
    }

    higherIndex() {
        this.index === this.itemsList.length-1 ? this.index = 0 : this.index += 1;
    }

    activateItemByClick(ev) {
        const listElements = ev.target.closest('ul').getElementsByClassName('menu__item');
        
        for(let i = 0; i<listElements.length; i++) {         
            listElements[i].classList.remove('active');
        }
            ev.target.closest('.menu__item').classList.add('active');
            this.index = ev.target.closest('.menu__item').value;
    }

    activateItemByKey() {
        document.addEventListener('keydown', (event) => {
            this.itemsList[this.index].clearItemClass();
            if (event.key === 'ArrowLeft') {
                this.lowerIndex();
                
            } else if (event.key === 'ArrowRight') {
                this.higherIndex();
            }
            this.itemsList[this.index].setItemClass();
            this.renderMenuList();
            
        });
    }
}

function getItem(event) {
    newMenuList.activateItemByClick(event);
}

let newMenuList = new MenuList();
