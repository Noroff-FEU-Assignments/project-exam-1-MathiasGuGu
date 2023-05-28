`
<div class="hamburger-container" data-state="open">
				<div class="bar"></div>
				<div class="bar"></div>
				<div class="bar"></div>
			</div>
`;

const sideBarState = {
	open: false,
};

const hamburgerContainer = document.querySelector('.hamburger-container');
const modal = document.querySelector('.navbar-modal');
const backdrop = document.querySelector('.navbar-backdrop');

hamburgerContainer?.addEventListener('click', (e) => {
	console.log('click');
	sideBarState.open = !sideBarState.open;
});

backdrop?.addEventListener('click', (e) => {
	console.log('backdrop');
	sideBarState.open = false;
});

window.addEventListener('click', () => {
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
