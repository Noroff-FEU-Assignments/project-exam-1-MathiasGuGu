import client from './shared/builder.js';
import builder from './shared/urlMaker.js';
const urlFor = (source) => builder.image(source);

const sideBarState = {
	open: false,
};

const hamburgerContainer = document.querySelector('.hamburger-container');
const modal = document.querySelector('.navbar-modal');
const backdrop = document.querySelector('.navbar-backdrop');
const searchbar = document.querySelector('.navbar-search');
const searchDropdown = document.querySelector('.search-dropdown');

function debounce(func, timeout = 300) {
	let timer;
	return (...args) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			func.apply(this, args);
		}, timeout);
	};
}

const processChange = debounce((e) => queryForPosts(e));

const queryForPosts = async (e) => {
	console.log(e.target.value.length);
	if (e.target.value.length === 0) {
		return;
	}
	const data = await client.fetch(
		`*[_type == 'post' && [title] match '${e.target.value}']`
	);

	showSearchDropdown(data);
};

const showSearchDropdown = (data) => {
	searchDropdown.innerHTML = '';
	searchDropdown.dataset.state = 'open';

	data.forEach((element) => {
		const a = document.createElement('a');
		a.href = `post.html?slug=${element.slug.current}`;
		a.classList.add('search-dropdown-item');
		const img = document.createElement('img');
		img.src = urlFor(element.mainImage.asset._ref);
		const h2 = document.createElement('h2');
		h2.innerText = element.title;
		a.append(img);
		a.append(h2);
		searchDropdown?.append(a);
	});
};

searchbar?.addEventListener('keydown', (e) => {
	if (e.target.value.length === 1) {
		searchDropdown.dataset.state = 'closed';
		return;
	}
	processChange(e);
});

hamburgerContainer?.addEventListener('click', (e) => {
	console.log('click');
	sideBarState.open = !sideBarState.open;
});

backdrop?.addEventListener('click', (e) => {
	backdrop.dataset.state = 'closed';
	searchDropdown.dataset.state = 'closed';

	sideBarState.open = false;
});

window.addEventListener('click', () => {
	searchDropdown.dataset.state = 'closed';
	sideBarState.open ? disableScroll() : enableScroll();

	sideBarState.open
		? (hamburgerContainer.dataset.state = 'open')
		: (hamburgerContainer.dataset.state = 'closed');

	sideBarState.open
		? (modal.dataset.state = 'open')
		: (modal.dataset.state = 'closed');

	sideBarState.open
		? (backdrop.dataset.state = 'open')
		: (backdrop.dataset.state = 'closed');
});

let keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

function preventDefault(e) {
	e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
	if (keys[e.keyCode]) {
		preventDefault(e);
		return false;
	}
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
	window.addEventListener(
		'test',
		null,
		Object.defineProperty({}, 'passive', {
			get: function () {
				supportsPassive = true;
			},
		})
	);
} catch (e) {}

let wheelOpt = supportsPassive ? { passive: false } : false;
let wheelEvent =
	'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

function disableScroll() {
	window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
	window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
	window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
	window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

function enableScroll() {
	window.removeEventListener('DOMMouseScroll', preventDefault, false);
	window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
	window.removeEventListener('touchmove', preventDefault, wheelOpt);
	window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}
