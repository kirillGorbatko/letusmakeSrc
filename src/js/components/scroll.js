import SmoothScroll from 'smooth-scroll';
import 'smoothscroll-for-websites';
import { menuClose, bodyUnlock } from 'components/functions';
import { GLOBAL_VARS } from 'utils/constants';
import { onWindowScroll } from 'utils';

let blocks = [];
// ========================================================================================================================================================

function offset(el) {
	let rect = el.getBoundingClientRect();
	let scrollLeft = window.scrollX || document.documentElement.scrollLeft;
	let scrollTop = window.scrollY || document.documentElement.scrollTop;
	return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
}

function gotoBlock(targetBlock) {
	let currentOffset = 70;
	let currentHeader = '';
	let options = {
		speedAsDuration: true,
		speed: 500,
		header: currentHeader,
		offset: currentOffset,
		easing: 'easeOutQuad',
	};

	new SmoothScroll().animateScroll(targetBlock, '', options);
}

function setActualState() {
	const $oldCurrentLinks = document.querySelectorAll(`.gotoBlock.${GLOBAL_VARS.activeState}`);
	if ($oldCurrentLinks.length) {
		$oldCurrentLinks.forEach(element => {
			const oldEl = element;
			oldEl.classList.remove(GLOBAL_VARS.activeState);
		});
	}
	blocks.forEach(element => {
		const block = element;
		let blockItem = document.querySelector(`.${block}`);
		if (blockItem) {
			let blockOffset = offset(blockItem).top;
			let blockHeight = blockItem.offsetHeight;
			if ((window.scrollY > blockOffset - window.innerHeight / 3) && window.scrollY < (blockOffset + blockHeight) - window.innerHeight / 3) {
				const $currentLinks = document.querySelectorAll(`.gotoBlock[href="#${block}"]`);
				$currentLinks.forEach(currentEl => {
					const currentLink = currentEl;
					currentLink.classList.add(GLOBAL_VARS.activeState);
					console.log(currentLink);
				});
			}
		}
	});
}

// ScrollOnClick (Navigation)
const $links = document.querySelectorAll('.gotoBlock');
if ($links.length) {
	$links.forEach(element => {
		const el = element;
		const blockName = el.getAttribute('href').replace('#', '');

		if (blockName !== '' && blocks.indexOf(blockName)) {
			blocks.push(blockName);
		}
		el.addEventListener('click', (e) => {
			if (document.querySelector('.menuOpen')) {
				menuClose();
				bodyUnlock();
			}

			let targetBlockClass = el.getAttribute('href').replace('#', '');
			let targetBlock = document.querySelector(`.${targetBlockClass}`);
			gotoBlock(targetBlock);
			e.preventDefault();
		});
	});

	onWindowScroll(setActualState);
}

// ScrollOnClick (Simple)
const $gotoLinks = document.querySelectorAll('.goTo');
if ($gotoLinks.length) {
	$gotoLinks.forEach(element => {
		const gotoLink = element;
		gotoLink.addEventListener('click', (e) => {
			let targetBlockClass = gotoLink.getAttribute('href').replace('#', '');
			let targetBlock = document.querySelector(`.${targetBlockClass}`);
			gotoBlock(targetBlock);
			e.preventDefault();
		});
	});
}

// Header scroll && Scroll items
let $animateItems = document.querySelectorAll('.animateItem');

function scrollOnscroll() {
	let srcValue = window.scrollY;
	let header = document.querySelector('header.header');
	if (header !== null) {
		if (srcValue > 10) {
			header.classList.add('headerScroll');
		} else {
			header.classList.remove('headerScroll');
		}
	}
	if ($animateItems.length) {
		$animateItems.forEach(el => {
			const scrItem = el;
			let scrItemOffset = offset(scrItem).top;
			let scrItemHeight = scrItem.offsetHeight;

			let scrItemPoint = window.innerHeight - (window.innerHeight - scrItemHeight) / 1.5;
			if (window.innerHeight > scrItemHeight) {
				scrItemPoint = window.innerHeight - scrItemHeight / 1.5;
			}

			if ((srcValue > scrItemOffset - scrItemPoint) && srcValue < (scrItemOffset + scrItemHeight)) {
				scrItem.classList.add(GLOBAL_VARS.activeState);
			}
		});
	}
}

setTimeout(() => {
	document.addEventListener('DOMContentLoaded', scrollOnscroll);
	scrollOnscroll();
}, 100);

onWindowScroll(scrollOnscroll);
