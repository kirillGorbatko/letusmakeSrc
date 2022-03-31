let bodyLockStatus = true;

export const bodyLock = (delay = 500) => {
	let body = document.querySelector('body');
	if (bodyLockStatus) {
		let lockPadding = document.querySelectorAll('[data-lp]');
		for (let index = 0; index < lockPadding.length; index += 1) {
			const el = lockPadding[index];
			el.style.paddingRight = `${window.innerWidth} - ${document.querySelector('.wrapper').offsetWidth} + px`;
		}
		body.style.paddingRight = `${window.innerWidth} - ${document.querySelector('.wrapper').offsetWidth} + px`;
		document.documentElement.classList.add('lock');

		bodyLockStatus = false;
		setTimeout(() => {
			bodyLockStatus = true;
		}, delay);
	}
};

export const bodyUnlock = (delay = 500) => {
	let body = document.querySelector('body');
	if (bodyLockStatus) {
		let lockPadding = document.querySelectorAll('[data-lp]');
		setTimeout(() => {
			for (let index = 0; index < lockPadding.length; index += 1) {
				const el = lockPadding[index];
				el.style.paddingRight = '0px';
			}
			body.style.paddingRight = '0px';
			document.documentElement.classList.remove('lock');
		}, delay);
		bodyLockStatus = false;
		setTimeout(() => {
			bodyLockStatus = true;
		}, delay);
	}
};

export const bodyLockToggle = (delay = 500) => {
	if (document.documentElement.classList.contains('lock')) {
		bodyUnlock(delay);
	} else {
		bodyLock(delay);
	}
};

export function menuInit() {
	let iconMenu = document.querySelector('.iconMenu');
	if (iconMenu) {
		iconMenu.addEventListener('click', (e) => {
			if (bodyLockStatus) {
				bodyLockToggle();
				document.documentElement.classList.toggle('menu-open');
			}
		});
	}
}

export function menuClose() {
	bodyUnlock();
	document.documentElement.classList.remove('menu-open');
}

export function uniqArray(array) {
	return array.filter((item, index, self) => {
		return self.indexOf(item) === index;
	});
}
