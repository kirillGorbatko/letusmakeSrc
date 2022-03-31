import SmoothScroll from 'smooth-scroll';
import 'smoothscroll-for-websites';
import { menuClose, bodyUnlock } from 'components/functions';

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

// ScrollOnClick (Navigation)
let link = document.querySelectorAll('._goto-block');
if (link) {
	let blocks = [];
	for (let index = 0; index < link.length; index += 1) {
		let el = link[index];
		let blockName = el.getAttribute('href').replace('#', '');
		if (blockName !== '' && blocks.indexOf(blockName)) {
			blocks.push(blockName);
		}
		el.addEventListener('click', (e) => {
			if (document.querySelector('.menu-open')) {
				menuClose();
				bodyUnlock();
			}
			let targetBlockClass = el.getAttribute('href').replace('#', '');
			let targetBlock = document.querySelector(`.${targetBlockClass}`);
			gotoBlock(targetBlock);
			e.preventDefault();
		});
	}

	window.addEventListener('scroll', () => {
		let oldCurrentLink = document.querySelectorAll('._goto-block._active');
		if (oldCurrentLink) {
			for (let index = 0; index < oldCurrentLink.length; index += 1) {
				let oldEl = oldCurrentLink[index];
				oldEl.classList.remove('_active');
			}
		}
		for (let index = 0; index < blocks.length; index += 1) {
			let block = blocks[index];
			let blockItem = document.querySelector(`.${block}`);
			if (blockItem) {
				let blockOffset = offset(blockItem).top;
				let blockHeight = blockItem.offsetHeight;
				if ((window.scrollY > blockOffset - window.innerHeight / 3) && window.scrollY < (blockOffset + blockHeight) - window.innerHeight / 3) {
					let currentLinks = document.querySelectorAll(`._goto-block[href="#${block}"]`);
					for (let i = 0; i < currentLinks.length; i += 1) {
						let currentLink = currentLinks[i];
						currentLink.classList.add('_active');
					}
				}
			}
		}
	});
}

// ScrollOnClick (Simple)
let gotoLinks = document.querySelectorAll('._goto');
if (gotoLinks) {
	for (let index = 0; index < gotoLinks.length; index += 1) {
		let gotoLink = gotoLinks[index];
		gotoLink.addEventListener('click', (e) => {
			let targetBlockClass = gotoLink.getAttribute('href').replace('#', '');
			let targetBlock = document.querySelector(`.${targetBlockClass}`);
			gotoBlock(targetBlock);
			e.preventDefault();
		});
	}
}

// Header scroll && Scroll items
let scrItems = document.querySelectorAll('[data-scr]');

function scrollOnscroll() {
	let srcValue = window.scrollY;
	let header = document.querySelector('header.header');
	if (header !== null) {
		if (srcValue > 10) {
			header.classList.add('scroll');
		} else {
			header.classList.remove('scroll');
		}
	}
	if (scrItems.length > 0) {
		for (let index = 0; index < scrItems.length; index += 1) {
			let scrItem = scrItems[index];
			let scrItemOffset = offset(scrItem).top;
			let scrItemHeight = scrItem.offsetHeight;

			let scrItemPoint = window.innerHeight - (window.innerHeight - scrItemHeight) / 0.4;
			if (window.innerHeight > scrItemHeight) {
				scrItemPoint = window.innerHeight - scrItemHeight / 0.4;
			}

			if ((srcValue > scrItemOffset - scrItemPoint) && srcValue < (scrItemOffset + scrItemHeight)) {
				scrItem.classList.add('_active');
			}
		}
	}
}

setTimeout(() => {
	document.addEventListener('DOMContentLoaded', scrollOnscroll);
	scrollOnscroll();
}, 100);

window.addEventListener('scroll', scrollOnscroll);
