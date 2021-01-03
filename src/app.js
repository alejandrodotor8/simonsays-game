const btnPlay = document.getElementById('BTN-play');
const textExplain = document.getElementById('text-explain');

//? items
const item1 = document.getElementById('item-1');
const item2 = document.getElementById('item-2');
const item3 = document.getElementById('item-3');
const item4 = document.getElementById('item-4');
const item5 = document.getElementById('item-5');
const item6 = document.getElementById('item-6');
const item7 = document.getElementById('item-7');
const item8 = document.getElementById('item-8');
const item9 = document.getElementById('item-9');

const lastLevel = 10;
class Game {
	constructor() {
		this.init();
		this.generateSequence();
		setTimeout(() => this.nextLevel(), 500);
	}
	init() {
		this.nextLevel = this.nextLevel.bind(this);
		this.selectItem = this.selectItem.bind(this);
		btnPlay.classList.add('hide');
		textExplain.classList.add('hide');
		this.level = 1;
		this.items = {
			item1,
			item2,
			item3,
			item4,
			item5,
			item6,
			item7,
			item8,
			item9,
		};
	}
	generateSequence() {
		this.sequence = new Array(lastLevel)
			.fill(0)
			.map((n) => Math.floor(Math.random() * 9));
	}
	nextLevel() {
      this.subLevel = 0;
      this.illuminateSequence();
      this.addEventClick();
      
	}
	numToItem(num) {
		switch (num) {
			case 0:
				return 'item1';
			case 1:
				return 'item2';
			case 2:
				return 'item3';
			case 3:
				return 'item4';
			case 4:
				return 'item5';
			case 5:
				return 'item6';
			case 6:
				return 'item7';
			case 7:
				return 'item8';
			case 8:
				return 'item9';
		}
	}
	itemToNum(item) {
		switch (item) {
			case 'item1':
				return 0;
			case 'item2':
				return 1;
			case 'item3':
				return 2;
			case 'item4':
				return 3;
			case 'item5':
				return 4;
			case 'item6':
				return 5;
			case 'item7':
				return 6;
			case 'item8':
				return 7;
			case 'item9':
				return 8;
		}
	}
	illuminateSequence() {
		for (let i = 0; i < this.level; i++) {
			const item = this.numToItem(this.sequence[i]);
         setTimeout(() => this.illuminateItem(item), 1000 * i);
      }
	}
	illuminateItem(item) {
		this.items[item].classList.add('light');
		setTimeout(() => this.illuminateItemOFF(item), 350);
	}
	illuminateItemOFF(item) {
		this.items[item].classList.remove('light');
	}
	addEventClick() {
		this.items.item1.addEventListener('click', this.selectItem);
		this.items.item2.addEventListener('click', this.selectItem);
		this.items.item3.addEventListener('click', this.selectItem);
		this.items.item4.addEventListener('click', this.selectItem);
		this.items.item5.addEventListener('click', this.selectItem);
		this.items.item6.addEventListener('click', this.selectItem);
		this.items.item7.addEventListener('click', this.selectItem);
		this.items.item8.addEventListener('click', this.selectItem);
		this.items.item9.addEventListener('click', this.selectItem);
	}
	deleteEventClick() {
		this.items.item1.removeEventListener('click', this.selectItem);
		this.items.item2.removeEventListener('click', this.selectItem);
		this.items.item3.removeEventListener('click', this.selectItem);
		this.items.item4.removeEventListener('click', this.selectItem);
		this.items.item5.removeEventListener('click', this.selectItem);
		this.items.item6.removeEventListener('click', this.selectItem);
		this.items.item7.removeEventListener('click', this.selectItem);
		this.items.item8.removeEventListener('click', this.selectItem);
      this.items.item9.removeEventListener('click', this.selectItem);
	}
	selectItem(ev) {
		const nameItem = ev.target.dataset.item;
		const numItem = this.itemToNum(nameItem);
		this.illuminateItem(nameItem);
		if (numItem === this.sequence[this.subLevel]) {
			this.subLevel++;
			if (this.subLevel === this.level) {
            this.level++;
            this.deleteEventClick();
				if (this.level === lastLevel + 1) {
					//WON
					this.wonGame();
				} else {
					setTimeout(() => this.nextLevel(), 1000);
				}
			}
		} else {
			//LOST
			this.lostGame();
		}
	}
	wonGame() {
		swal('Perfect', 'Congrats, you WON!', 'success').then(() => {
			this.deleteEventClick();
			this.init.bind(this);
			btnPlay.classList.remove('hide');
			textExplain.classList.remove('hide');
		});
	}
	lostGame() {
		swal('Oops', 'Sorry, you lost!', 'error').then(() => {
			this.deleteEventClick();
         this.init.bind(this);
         btnPlay.classList.remove('hide');
			textExplain.classList.remove('hide');
		});
	}
}

function startGame() {
	let game = new Game();
}
