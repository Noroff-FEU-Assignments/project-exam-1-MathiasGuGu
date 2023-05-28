const INPUTS = Array.from(document.querySelectorAll('input'));
const textArea = document.querySelectorAll('textarea');
const formButton = document.querySelector('#form-button');
const form = document.querySelector('form');
let checkList = [...INPUTS, ...textArea];

const checkInput = (text, id) => {
	switch (id) {
		case 'name':
			return text.length >= 5;
		case 'email':
			let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			return re.test(text);
		case 'subject':
			return text.length >= 15;
		case 'message':
			return text.length >= 25;
	}
};

checkList.forEach((item) => {
	item.dataset.state = 'wrong';
	item.addEventListener('input', () => {
		if (checkInput(item.value, item.id)) {
			item.dataset.state = 'yes';
		} else {
			item.dataset.state = 'check';
		}
	});
});
